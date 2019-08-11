pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('Install Dependencies') {
            steps { 
                echo 'prepare dependencies'
                sh "npm install -g yarn"
                sh "npm install mocha chai ts-node -g"
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