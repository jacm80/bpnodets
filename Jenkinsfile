pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('Install Dependencies') {
            steps { 
                echo 'prepare dependencies'
                sh "npm install -g yarn"
                sh "npm install -g mocha"
                sh "yarn install"
            }
        }
        stage('build') {
            steps {
                sh 'yarn build'
            }
        }
        stage('test') {
            steps {
                sh 'yarn test'
            }
        }
    }
}