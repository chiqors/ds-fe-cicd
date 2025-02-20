pipeline {
    agent any

    environment {
        PATH = "${tool 'NodeJS_18'}/bin:${env.PATH}" // Ensure Node.js is available globally
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Set up Node.js') {
            tools {
                nodejs 'NodeJS_18' // Configure Node.js 18 in Jenkins settings
            }
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    // Use the SonarQube Scanner tool installed in Jenkins
                    script {
                        def scannerHome = tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                        sh '''
                            ${scannerHome}/bin/sonar-scanner 
                                -Dsonar.projectKey=ds-fe-cid
                                -Dsonar.sources=.
                                -Dsonar.projectBaseDir=./frontend
                                -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/coverage/**
                        '''
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                dir('frontend') {
                    sh 'docker build -t ds-fe .'
                }
            }
        }

        stage('Docker Image Scan with Trivy') {
            steps {
                sh '''
                # Install Trivy if not already installed
                if ! command -v trivy &> /dev/null; then
                    echo "Trivy not found, installing..."
                    curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh
                fi

                # Run Trivy scan
                trivy image ds-fe
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d -p 8080:80 --name ds-fe-container ds-fe'
            }
        }

        stage('Run Load Tests with k6') {
            steps {
                sh '''
                # Install K6 if not already installed
                if ! command -v k6 &> /dev/null; then
                    echo "K6 not found, installing..."
                    sudo apt update
                    sudo apt install -y gnupg
                    curl -s https://dl.k6.io/key.gpg | sudo apt-key add -
                    echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
                    sudo apt update
                    sudo apt install -y k6
                fi

                # Run K6 load tests
                k6 run frontend/load-test.js
                '''
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh '''
                            echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                            docker tag ds-fe chiqors/ds-fe:latest
                            docker push chiqors/ds-fe:latest
                        '''
                    }
                }
            }
        }

        stage('Simulate Kubernetes Deployment') {
            steps {
                echo 'Deploy success'
            }
        }
    }

    post {
        always {
            cleanWs() // Clean workspace after build
        }
    }
}