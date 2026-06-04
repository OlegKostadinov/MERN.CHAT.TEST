import axios from "axios";
  

export const axiosInstance = axios.create({

     baseURL:"http://localhost:3003",
     withCredentials: true,
       headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 
      
       

     

})