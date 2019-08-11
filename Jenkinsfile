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
        stage('build') {
            steps {
                sh 'yarn build'
            }
        }
    }
}