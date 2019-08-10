pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('upservertest') {
            steps { 
                echo 'execute test'
                sh 'npm install'
                sh 'npm run start:test'
            }
        }
        stage('test') {
            steps{
                sh 'npm run test'
                sh 'npm run stop:test'
            }
        }
    }
}