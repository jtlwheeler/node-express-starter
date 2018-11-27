import com.moowork.gradle.node.yarn.YarnTask
import com.bmuschko.gradle.docker.tasks.image.DockerBuildImage

repositories {
    mavenCentral()
    jcenter()
}

plugins {
    id("com.moowork.node") version "1.2.0"
    id("com.bmuschko.docker-remote-api") version "4.0.5"
}

node {
    version = "10.5.0"
    npmVersion = "6.1.0"
    yarnVersion = "1.12.3"
    download = true
}

tasks {
    register<Delete>("clean") {
        delete("build", "node_modules")
    }

    val javascriptRuntime = arrayOf(
            fileTree("node_modules"),
            "package.json",
            "tsconfig.json",
            "yarn.lock")

    register<YarnTask>("build") {
        dependsOn("yarn", "copyClientToServer")

        inputs.files(javascriptRuntime)
        inputs.dir("src")
        outputs.dir("dist")

        args = listOf("run", "build")
    }

    register<YarnTask>("testServer") {
        dependsOn("yarn")

        inputs.files(javascriptRuntime)
        inputs.dir("src")
        outputs.dir("dist")

        args = listOf("run", "test")
    }

    register("test") {
        dependsOn("testServer")
    }

    register("check") {
        dependsOn("test")
    }

    register<YarnTask>("startServer") {
        dependsOn("yarn", "build")

        inputs.files(javascriptRuntime)
        inputs.dir("src")
        outputs.dir("dist")
        outputs.upToDateWhen { false }

        args = listOf("run", "startServerDaemon")
    }

    register<YarnTask>("stopServer") {
        dependsOn("yarn")

        inputs.files(javascriptRuntime)
        inputs.dir("src")
        outputs.dir("dist")
        outputs.upToDateWhen { false }
        mustRunAfter(":e2e:e2e")

        args = listOf("run", "stopServerDaemon")
    }

    register<Copy>("copyClientToServer") {
        dependsOn(":client:build")

        from("../client/build")
        into("dist/assets")
        outputs.upToDateWhen { false }
    }

    register<DockerBuildImage>("dockerBuildImage") {
        dependsOn("build")

        inputs.dir("dist")
        outputs.dir(project.projectDir)

        inputDir.set(project.projectDir)
        tag.set("jtlwheeler/node-express-starter:latest")
    }
}

