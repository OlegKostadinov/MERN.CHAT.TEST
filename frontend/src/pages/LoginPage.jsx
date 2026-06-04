import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'
import { useState } from 'react'

const LoginPage = () => {

    const[showPassword,setShowPassword] = useState(false)
      const[formData,setFormData] = useState({
       
        email:"",
        password:""
    
      })

  const {login,isLogging} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData)

  }




  return (
  
 <div className='min-h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6'>
        <div className='w-full max w-m-d space-y-8'></div>
        <div className='text-center mb-7'>
          <div className='flex flex-col items-center gap-2 group-[]:'>
            <div className='size-12 rounded-2xl bg-primary/10 flex items-center justify-center  group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary'/>
            </div>
            <h1 className='text-2xl font-bold mt-2.5'>LOGIN</h1>
            <p className='text-base-content/60'>Get started!</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='from-primary-content'>

  <label className='label'><span className='label-text font-medium'>Email</span></label>
            
            <input type="text" placeholder="email" className="input" value={formData.email} 
             onChange={(e) => setFormData({...formData,email:e.target.value})}
            
            />
            
            <br></br>
            <br></br>
             <br></br>

             <div className='form-control'>
     <label className='label'><span className='label-text font-medium'>Password</span></label>  
     <input type={showPassword ? "text":"password" }
  placeholder="*********"
   className={`input input-bordered w-full pl-10` }
   value={formData.password}
    onChange={(e) => setFormData({...formData,password:e.target.value})}/>
    <div>
    <button
    type='button'
    className='button'
    onClick={() => setShowPassword(!showPassword)}
    > 
    {showPassword ? ( <EyeOff className='size-5 text-base-content/40'/>) :(
      <Eye className='size-5 text-base-content/40'/>
    )}
    </button>
    </div>
    </div>
     
 
          </div>
        <button type='submit' className='btn btn-primary w-full' disabled={isLogging}>
          {isLogging ? (
            <>
            <Loader2 className='size-5 animate-spin'>Loading...</Loader2>
            </>
          ) :(
            "SIGN IN"
          )}
        </button>
           
        </form>
        <div className='text-center'>
          <p className='text-base-content/90'>
          Do not have an account? {""}
          <Link to="/signup" className="link link-neutral">CREATE ACCOUNT</Link>
          
          </p>
        </div>
        
      </div>
      
    </div>

    
  )





  
}

export default LoginPage