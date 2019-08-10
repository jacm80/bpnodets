pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        // stage('Cloning Git') {
        //     steps { 
        //         git 'https://github.com/jacm80/bpnodets.git'
        //     }
        // }
        stage('Install Dependencies') {
            steps { 
                echo 'prepare dependencies'
                sh 'npm install'
            }
        }
        stage('test') {
            steps{
                sh 'npm run test'
            }
        }
    }
}