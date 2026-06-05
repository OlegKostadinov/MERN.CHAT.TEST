pipeline{
  agent { label 'jenkins'}

  tools {
nodejs 'NodeJS' // Name of the NodeJS installation
}

   stages {
     stage ("checkout SCm"){
       steps{
           echo 'checkout from SCM Github'
       }
       
     }
      stage ("Test"){
       steps{
             sh '''
                    sh 'node --version'
                    sh 'npm install
                    mkdir -p reports/junit
                    npm test --ci --reporters=default --reporters=jest-junit
                '''
       }
       post {
                always {
                    // Publish JUnit test results
                    junit 'reports/junit/*.xml'
                }
            }
       
     }

      stage ("Build Docker Image"){
       steps{
            sh 'docker compose build'
       }
       
     }
       
   }
}