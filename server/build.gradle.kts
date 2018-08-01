import com.moowork.gradle.node.yarn.YarnTask

plugins {
    id("com.moowork.node") version "1.2.0"
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
        dependsOn(":react-client:buildProd")

        from("../react-client/build")
        into("dist/assets")
        outputs.upToDateWhen { false }
    }
}