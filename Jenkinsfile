pipeline {
    agent any

    environment {
        GITHUB_CREDENTIALS_ID = 'GitHub'  // Make sure this matches the credentials ID you configured
        GIT_REPO_URL = 'https://github.com/mohit435/test_pipeline.git'
        GIT_BRANCH = 'main'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the repository
                checkout([$class: 'GitSCM', branches: [[name: "*/${env.GIT_BRANCH}"]],
                          userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.GITHUB_CREDENTIALS_ID]]])
            }
        }
        stage('Build') {
            steps {
                // Your build steps here
                echo 'Building...'
            }
        }
        stage('Test') {
            steps {
                // Your test steps here
                echo 'Testing...'
            }
        }
        stage('Push to GitHub') {
            steps {
                script {
                    // Configure git user
                    sh 'git config user.email "mohitkumardeshmukh435@gmail.com"'
                    sh 'git config user.name "mohit"'

                    // Commit changes
                    sh 'git add .'
                    sh 'git commit -m "Automated commit from Jenkins"'

                    // Push changes back to GitHub
                    withCredentials([usernamePassword(credentialsId: env.GITHUB_CREDENTIALS_ID, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                        sh 'git push origin ${env.GIT_BRANCH}'
                    }
                }
            }
        }
    }
}
