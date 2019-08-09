pipeline {
    agent any
    stages {
        stage('test') {
            steps { 
                echo 'execute test'
                sh 'yarn start:test'
                pidServerTest = sh(script: 'ps -A | grep -i app.ts | sed -e \'q\' | cut -c1-5', returnStdout: true).trim()
                sh 'yarn test'
                sh 'kill -9  $pidServerTest'
            }
        }
    }
}