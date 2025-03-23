"use client"
import { useState } from "react"
import "./signup.css"
import toast from "react-hot-toast"
import axios from "axios"
import Link from "next/link"


const SignUp = () => {
    const [formData , setFormData] = useState({
        name : "",
        email : "",
        password : ""
    })
    const [loading , setLoading] = useState(false)
    const [message , setMessage] = useState("")

    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData , [e.target.name]:e.target.value})
    }

    const submitHandler = async (e:React.FormEvent)=>{
        e.preventDefault()

        try {
            setLoading(true)
            setMessage("")
            console.log("this is form data" , formData)
            const response = await axios.post("http://localhost:5000/auth/register" , formData , {headers:{"Content-Type":"application/json"}})
            setMessage(response.data.message)

            if(response.status == 200){
                if(response.data.message == "user already exists") {
                    toast.error(message)
                    setLoading(false)
                    return
                }
                toast.success(message)
                setLoading(false)
                return
            }

            if (response.status == 500){
                
                toast.error(message)
                setLoading(false)
                return
            }

            toast.error("Some error occured")
            setLoading(false)
        } catch (error) {
            toast.error("Error while signing up")
            setLoading(false)
        }

        
    }

    return (
        <div className="login-div">
            <div className="login-content">
                <h2 className="login-heading">Sign Up</h2>

                <div>
                    <span className="muted-text">Already a member?</span>
                    <Link href={"/login"} className="muted-text-2"><span>Login</span></Link>
                    
                </div>


                <form className="login-form">
                    <label htmlFor="name" className="muted-text">Name</label>
                    <input type="text" name="name" placeholder="enter your name" value={formData.name} onChange={changeHandler} id="name" className="inputs" />

                    <label htmlFor="email" className="muted-text">Email</label>
                    <input type="email" name="email" placeholder="enter your email" value={formData.email} onChange={changeHandler} id="email" className="inputs" />

                    <label htmlFor="password" className="muted-text">Password</label>
                    <input type="password" name="password" placeholder="enter your password" value={formData.password} onChange={changeHandler} id="password" className="inputs" />


                    <button className="buttons" id="login-btn" onClick={submitHandler}>
                        {loading ? "Submitting..." : "Submit"}
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

export default SignUp