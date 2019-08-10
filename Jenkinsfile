pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('test') {
            steps { 
                echo 'execute test'
                sh 'npm --version'
                // sh 'export PATH="/usr/local/:/usr/local/bin//npm:/usr/local/bin/:$PATH"'
                // sh 'npm run start:test'
                // sh 'npm run test'
                // sh 'npm run stop:test'
            }
        }
    }
}