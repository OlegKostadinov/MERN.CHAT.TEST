import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2, MessageSquare } from 'lucide-react'
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast'

const SignUpPage = () => {

  const[showPassword,setShowPassword] = useState(false)
  const[formData,setFormData] = useState({
   
    email:"",
    name:"",
    password:""

  })
  const {signup,isSigningUp} = useAuthStore();
  const validateForm = () => {

    if(!formData.name.trim()) return toast.error("Name is required!");
    if(!formData.email.trim()) return toast.error("Email is required!");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email format!");
    if(!formData.password.trim()) return toast.error("Password is required!");
    if(formData.password.length < 6) return toast.error("Password must have at least 6 characters!");
     
    return true
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
  if (success === true) signup(formData);
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
            <h1 className='text-2xl font-bold mt-2.5'>Create Account</h1>
            <p className='text-base-content/60'>Get started with your free account</p>
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
              <label className='label'><span className='label-text font-medium'>Name</span></label>
              
                   <input type="text" placeholder="name" className="input" value={formData.name} 
                   onChange={(e) => setFormData({...formData,name:e.target.value})} />
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
        <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
          {isSigningUp ? (
            <>
            <Loader2 className='size-5 animate-spin'>Loading...</Loader2>
            </>
          ) :(
            "Create Account"
          )}
        </button>
           
        </form>
        <div className='text-center'>
          <p className='text-base-content/55'>
          Already have an account? {""}
          <Link to="/login" className="link link-primary">SIGN IN</Link>
          
          </p>
        </div>
        
      </div>
      
    </div>

    
  )
}

export default SignUpPage