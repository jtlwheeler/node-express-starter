import com.avast.gradle.dockercompose.DockerComposePlugin

plugins {
    id("com.avast.gradle.docker-compose") version "0.8.12"
}

apply{
    plugin("docker-compose")
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
