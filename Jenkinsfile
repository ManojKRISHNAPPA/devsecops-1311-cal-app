pipeline {
    agent any 

    tools {
        jdk 'java-17'
        maven 'maven'
    }

    stages {
        stage('Git checkout') {
            steps {
                git url: 'https://github.com/ManojKRISHNAPPA/devsecops-1311-cal-app.git', branch: 'Test'
            }
        }

        stage('Compile') {
            steps {
                sh 'mvn clean compile'
            }
        }

        stage('Test & Coverage') {
            steps {
                // Run tests and generate JaCoCo report
                sh 'mvn clean test jacoco:report'
            }
            post {
                always {
                    // Publish JaCoCo coverage report in Jenkins
                    jacoco(
                        execPattern: 'target/jacoco.exec', 
                        classPattern: 'target/classes', 
                        sourcePattern: 'src/main/java'
                    )
                }
            }
        }

        stage('Mutation Testing') {
            steps {
                // Run PIT mutation testing
                sh 'mvn org.pitest:pitest-maven:mutationCoverage'
            }
            post {
                always {
                    // Archive PIT HTML/XML reports
                    archiveArtifacts artifacts: 'target/pit-reports/*', allowEmptyArchive: true
                    // Optionally publish HTML report for better visualization
                    publishHTML([
                        reportDir: 'target/pit-reports', 
                        reportFiles: 'index.html', 
                        reportName: 'PIT Mutation Report', 
                        allowMissing: true, 
                        alwaysLinkToLastBuild: true
                    ])
                }
            }
        }

        stage('Package') {
            steps {
                sh 'mvn clean package'
            }
        }
    }

    post {
        always {
            // Optionally archive the JAR file
            archiveArtifacts artifacts: 'target/*.jar', allowEmptyArchive: true
        }
    }
}
