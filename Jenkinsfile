pipeline {
    agent any

    environment {
        GITHUB_CREDENTIALS_ID =checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'GitHub', 
                                    url: 'https://github.com/mohit435/test.git']])
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
        }
    }
}
