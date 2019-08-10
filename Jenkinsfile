pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('test') {
            steps { 
                echo 'execute test'
                sh 'npm --version'
                sh 'npm install'
                sh 'npm run start:test'
                sh 'npm run test'
                sh 'npm run stop:test'
            }
        }
    }
}