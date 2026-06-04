import { create } from "zustand";
import {axiosInstance} from '../lib/axios.js'
import axios from "axios";
import toast from 'react-hot-toast'
import {io} from 'socket.io-client'

const BASE_URL = "http://localhost:3003"
export const useAuthStore = create((set,get) => ({

    authUser: null,
    isSigningUp: false,
    isLogging: false,
    isCheckingAuth: true,
    onlineUsers:[],
    socket:null,

    checkAuth: async () => {

        try{
        const res = await axiosInstance.get("/auth/check");
        set({authUser: res.data});
         get().connectSocket();

        } catch(error){
           set({authUser: null})
           console.log("Error in check auth:","", error)
        } finally{
            set({isCheckingAuth: false})
        }
        
     


    },

    signup: async (data) => {
        set({isSigningUp: true});
        try{

      const res = await axiosInstance.post("/auth/signup", data);
      set({authUser:res.data});
      toast.success("Account created!");
      
       get().connectSocket();
      

        }
        catch(error){
          toast.error(error.response.data.message);
        }
        finally{
            set({isSigningUp:false});
        }
        
    },

    login: async (data) => {

        set({isLogging:true})
       try{
        const res = await axiosInstance.post("/auth/login", data);
      set({authUser:res.data});
      toast.success("Login - success!");

      get().connectSocket();

       } catch(error){
      toast.error(error.response.data.message)
       }
       finally{
        set({isLogging: false})
       }
    },

    logout: async () => {
        try{
     await axiosInstance.post("/auth/logout");
      set({authUser:null});
      toast.success("Logged out successfully!");

      get().disconnectSocket();

        } catch(error) {
toast.error(error.response.data.message);
        }
    },

    connectSocket: async () => {
        
        const {authUser} = get();
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL,{
            query:{
                userId:authUser.id
            }
        });
        socket.connect();
        set({socket:socket});

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers:userIds})
        })
    },

    disconnectSocket: async () => {
       
        if(get().socket?.connected) get().socket.disconnect();
    },

}))
