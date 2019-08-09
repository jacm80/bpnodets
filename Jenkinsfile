pipeline {
    agent any
    stages {
        stage('test') {
            steps { 
                echo 'execute test'
                sh 'yarn start:test'
                sh 'yarn test'
                sh 'yarn stop:test'
            }
        }
    }
}