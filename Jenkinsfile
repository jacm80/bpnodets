pipeline {
    agent any
    stages {
        stage('test') {
            steps { 
                echo 'execute test'
                sh 'npm run start:test'
                sh 'npm run test'
                sh 'npm run stop:test'
            }
        }
    }
}