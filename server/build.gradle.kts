import com.moowork.gradle.node.yarn.YarnTask
import com.bmuschko.gradle.docker.tasks.image.DockerBuildImage

buildscript {
    repositories {
        mavenCentral()
        jcenter()
    }
    dependencies {
        classpath("com.bmuschko:gradle-docker-plugin:3.3.1")
    }
}

plugins {
    id("com.moowork.node") version "1.2.0"
    id("com.bmuschko.docker-remote-api") version "3.3.3"
}

node {
    version = "10.5.0"
    npmVersion = "6.1.0"
    yarnVersion = "1.7.0"
    download = true
}

tasks {
    val javascriptRuntime = arrayOf(
            fileTree("node_modules"),
            "package.json",
            "tsconfig.json",
            "yarn.lock")

    "build"(YarnTask::class) {
        dependsOn("yarn", "copyClientToServer")

        inputs.files(javascriptRuntime)
        inputs.dir("src")
        outputs.dir("dist")

        args = listOf("run", "build")
    }

    "testServer"(YarnTask::class) {
        dependsOn("yarn")

        inputs.files(javascriptRuntime)
        inputs.dir("src")
        outputs.dir("dist")

        args = listOf("run", "test")
    }

    "startServer"(YarnTask::class) {
        dependsOn("yarn", "build")

        inputs.files(javascriptRuntime)
        inputs.dir("src")
        outputs.dir("dist")
        outputs.upToDateWhen { false }

        args = listOf("run", "startServerDaemon")
    }

    "stopServer"(YarnTask::class) {
        dependsOn("yarn")

        inputs.files(javascriptRuntime)
        inputs.dir("src")
        outputs.dir("dist")
        outputs.upToDateWhen { false }
        mustRunAfter(":e2e:e2e")

        args = listOf("run", "stopServerDaemon")
    }

    "copyClientToServer"(Copy::class) {
        dependsOn(":client:build")

        from("../client/build")
        into("dist/assets")
        outputs.upToDateWhen { false }
    }

    "dockerBuildImage"(DockerBuildImage::class) {
        dependsOn(":server:build")

        inputDir = project.projectDir
        tag = "jtlwheeler/node-express-starter:latest"
    }
}

