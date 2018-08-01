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
            "yarn.lock")

    "e2e"(YarnTask::class) {
        dependsOn("yarn", ":server:startServer")

        inputs.files(javascriptRuntime)
        inputs.dir("src")

        args = listOf("run", "e2e")

        finalizedBy(":server:stopServer")
    }

    "e2eProd"(YarnTask::class) {
        val envs = mapOf("PROTRACTOR_BASE_URL" to "http://localhost:8080")
        setEnvironment(envs)

        inputs.files(javascriptRuntime)
        inputs.dir("src")

        args = listOf("run", "e2e")
    }
}