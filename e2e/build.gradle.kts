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
            "yarn.lock")

    register<YarnTask>("e2e") {
        dependsOn("yarn", ":server:startServer")

        inputs.files(javascriptRuntime)
        inputs.dir("src")

        args = listOf("run", "e2e")

        finalizedBy(":server:stopServer")
    }

    register<YarnTask>("e2eProd") {
        dependsOn("yarn", ":composeUp")
        val envs = mapOf("PROTRACTOR_BASE_URL" to "http://localhost:8080")
        setEnvironment(envs)

        inputs.files(javascriptRuntime)
        inputs.dir("src")

        args = listOf("run", "e2e")
    }
}