 //Simulates a login check.
 
 
function login(username, password) {
    if (typeof username !== 'string' ||  password.length < 6) {
        return false
       
        }
       
         
    

    // Example hardcoded credentials for testing
   // const validUser = 'admin';
   // const validPass = '1234';

    return  true//username === validUser && password === validPass;
}

module.exports = { login };