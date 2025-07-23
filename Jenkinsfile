pipeline {
    agent any

    environment {
        IMAGE_NAME = "your-app"
        REGISTRY = "your-dockerhub-username"
    }

    tools {
        nodejs "NodeJS_18"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/your-repo.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Code Quality - SonarQube') {
            environment {
                SONARQUBE_SCANNER_HOME = tool 'SonarQubeScanner'
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh "${SONARQUBE_SCANNER_HOME}/bin/sonar-scanner"
                }
            }
        }

        stage('Security Scans') {
            steps {
                // For Node.js
                dir('backend') {
                    sh 'npm audit || true'
                    sh 'npx snyk test || true'
                }
                // Trivy Docker image scan
                sh 'trivy image $REGISTRY/$IMAGE_NAME || true'
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    sh 'docker build -t $REGISTRY/$IMAGE_NAME:latest .'
                    withCredentials([string(credentialsId: 'dockerhub-password', variable: 'DOCKERHUB_PASS')]) {
                        sh 'echo $DOCKERHUB_PASS | docker login -u $REGISTRY --password-stdin'
                        sh 'docker push $REGISTRY/$IMAGE_NAME:latest'
                    }
                }
            }
        }

        stage('Helm Deploy to Minikube') {
            steps {
                sh '''
                helm upgrade --install your-app ./helm-chart \
                  --set image.repository=$REGISTRY/$IMAGE_NAME \
                  --set image.tag=latest
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
