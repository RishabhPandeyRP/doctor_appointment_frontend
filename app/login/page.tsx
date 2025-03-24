"use client"
import "./login.css"
import toast from "react-hot-toast"
import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/AppContext"
import Link from "next/link"

const Login = () => {
    const router = useRouter()
    const {login} = useAuthContext()
    const [formData , setFormData] = useState({
        email : "",
        password : ""
    })
    const [loading , setLoading] = useState(false)
    const [message , setMessage] = useState("")

    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData , [e.target.name]:e.target.value})
    }

    const loginHandler = async (e:React.FormEvent)=>{
        e.preventDefault()

        try {
            setLoading(true)
            setMessage("")
            console.log("this is form data" , formData)
            const response = await axios.post("http://localhost:5000/auth/login" , formData , {headers:{"Content-Type":"application/json"}})
             setMessage(response.data.message)
            console.log(message)
            console.log("login response ", response.data)
            const {token , username} = response.data;

            login(token , username)



            // Cookies.set("token",token,{expires:1})
            // Cookies.set("username",username,{expires:1})


            if(response.status == 200){
                
                toast.success(message)
                setLoading(false)
                router.push("/")
                return
            }

            if (response.status == 500){
                
                toast.error(message)
                setLoading(false)
                return
            }

            toast.error("Some error occured")
            setLoading(false)
            
        } catch (error:any) {
            console.log("error :login" , error.message)
            toast.error("Error while logging up")
            setLoading(false)
        }

        
    }
    return (
        <div className="login-div">
            <div className="login-content">
                <h2 className="login-heading">Login</h2>

                <div>
                    <span className="muted-text">Are you a new member?</span>
                    <Link href={"/signup"}><span className="muted-text-2">Sign up here.</span></Link>
                    
                </div>


                <form className="login-form">
                    <label htmlFor="email" className="muted-text">Email</label>
                    <input type="email" name="email" placeholder="enter your email" value={formData.email} onChange={changeHandler} id="email" className="inputs" />

                    <label htmlFor="password" className="muted-text">Password</label>
                    <input type="password" name="password" placeholder="enter your password" value={formData.password} onChange={changeHandler} id="password" className="inputs" />


                    <button className="buttons" id="login-btn" onClick={loginHandler}>
                        {loading ? "Loging you in..." : "Login"}
                    </button>

                    <button className="buttons" id="rst-btn">
                        Reset
                    </button>
                </form>


                <div className="forgot-pass">
                    Forgot Password ?
                </div>
            </div>
        </div>
    )
}

export default Login