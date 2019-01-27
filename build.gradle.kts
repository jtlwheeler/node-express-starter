import com.avast.gradle.dockercompose.DockerComposePlugin

plugins {
    id("com.avast.gradle.docker-compose") version "0.8.13"
    id("com.github.node-gradle.node") version "1.3.0"
}

apply {
    plugin("docker-compose")
    plugin("com.github.node-gradle.node")
}

tasks {
    "composeUp" {
        dependsOn(getTasksByName("dockerBuildImage", true))
    }
}

dockerCompose {
    useComposeFiles = listOf("docker-compose.yml")
    projectName = "node-express-starter"
}

node {
    version = "10.15.0"
    npmVersion = "6.1.0"
    yarnVersion = "1.13.0"
    download = true
}