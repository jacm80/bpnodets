pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('Install Dependencies') {
            steps { 
                echo 'prepare dependencies'
                sh "npm install -g yarn"
                sh "yarn install"
            }
        }
        stage('test') {
            steps{
                sh 'yarn run test'
            }
        }
    }
}