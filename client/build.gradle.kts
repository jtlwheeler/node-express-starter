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
    "clean"(Delete::class) {
        delete("build", "node_modules")
    }

    val javascriptRuntime = arrayOf(
            fileTree("node_modules"),
            "package.json",
            "tsconfig.json",
            "yarn.lock"
    )

    "build"(YarnTask::class) {
        dependsOn("yarn")

        inputs.files(javascriptRuntime)
        inputs.dir("src")
        outputs.dir("build")

        args = listOf("run", "build")
    }

    "buildProd"(YarnTask::class) {
        dependsOn("yarn")

        inputs.files(javascriptRuntime)
        inputs.dir("src")
        outputs.dir("build")

        args = listOf("run", "build:prod")
    }

    "testClient"(YarnTask::class) {
        dependsOn("yarn")

        inputs.files(javascriptRuntime)
        inputs.dir("src")
        outputs.dir("build/dist")

        args = listOf("run", "test")
    }

    "test" {
        dependsOn("testClient")
    }

    "check" {
        dependsOn("test")
    }
}