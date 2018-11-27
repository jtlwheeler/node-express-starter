import com.moowork.gradle.node.yarn.YarnTask

plugins {
    id("com.moowork.node") version "1.2.0"
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
            "yarn.lock"
    )

    register<YarnTask>("build") {
        dependsOn("yarn")

        inputs.files(javascriptRuntime)
        inputs.dir("src")
        outputs.dir("build")

        args = listOf("run", "build")
    }

    register<YarnTask>("testClient") {
        dependsOn("yarn")

        inputs.files(javascriptRuntime)
        inputs.dir("src")
        outputs.dir("build/dist")

        args = listOf("run", "test")
    }

    register("test") {
        dependsOn("testClient")
    }

    register("check") {
        dependsOn("test")
    }
}