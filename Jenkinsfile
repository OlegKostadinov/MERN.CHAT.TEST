pipeline{
  agent { label 'jenkins'}

  tools {
nodejs 'NodeJS 26.3.0' // Name of the NodeJS installation
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
                    
                    sh 'npm install'
                    
                   
                    npm test --ci --reporters=default
                '''
       }
      
       
     }

      stage ("Build Docker Image"){
       steps{
            sh 'docker compose build'
       }
       
     }
       
   }
}
