import com.moowork.gradle.node.yarn.YarnTask

plugins {
    id("com.github.node-gradle.node")
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