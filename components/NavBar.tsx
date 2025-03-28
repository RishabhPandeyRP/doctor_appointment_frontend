"use client"

import React, { useEffect, useState } from "react"
import "./NavBar.css"
import Image from "next/image"
import Link from "next/link"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useAuthContext } from "@/context/AppContext"
import axios from "axios"

const NavBar = () => {
    const router = useRouter()
    const [mobMenu, setMobMenu] = useState(false)
    const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
    // const [user, setUser] = useState<string | undefined>("")
    const { username, logout } = useAuthContext()

    // if(!username){
    //     toast.error("You are not logged in, please login")
    // }
    

    useEffect(() => {
        if (mobMenu) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return (() => {
            document.body.style.overflow = 'auto'
        })
    }, [mobMenu])

    const checkLogin = async(token:string)=>{
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/verifyToken/${token}`)
            if(response.status == 200){
                toast.success(`Welcome ${response.data.data.email}`)
                return
            }

        } catch (error:unknown) {
            
            

            if (error instanceof Error) {
                console.log("Error in navbar" , error.message)
                toast.error("Your session expired, please login again")
            
            } else {
                console.log("Unknown Error in navbar");
                toast.error("Unknown Error in navbar");
            }
        }
    }

    useEffect(()=>{
        if(!username){
            toast.error("Please login in")
            return
        }
        const cookieToken = Cookies.get("token")
        if(!cookieToken){
            toast.error("Please login in")
            return
        }
        else{
            checkLogin(cookieToken)
        }

    },[username])

    // useEffect(() => {
    //     const token = Cookies.get("token")
    //     const username = Cookies.get("username")

    //     if (!token) {
    //         toast.error("Not loggedin , redirecting to login page")
    //         router.push("/login")
    //     } else {
    //         toast.success("You are logged in")
    //         setUser(username)
    //     }
    // }, [])


    const toggleMobMenu = () => {
        setMobMenu(!mobMenu)
    }

    const logoutHandler = () => {
        // Cookies.remove("token")
        // Cookies.remove("username")
        logout()
        router.push("/login")
    }

    return (
        <div className="nav">
            <div className="content">
                
                    <div className="img-container">
                    <Link href={"/"}>
                        <Image src="/mecareLogo.svg" alt="" className="img" fill />
                        </Link>
                    </div>
                

                <div className={`nav-links desktop`}>
                    <div className="nav-list">
                        <Link href={"/"} className="nav-items"><div>Home</div></Link>
                        <Link href={"/doctors2"} className="nav-items"><div>Appointments</div></Link>
                        <Link href={"#"} className="nav-items"><div>Health Blog</div></Link>
                        <Link href={"#"} className="nav-items"><div>Reviews</div></Link>


                    </div>



                    {
                        username ? <div className="nav-btn-logout">
                            {/* <Link href={"/login"}><button className="loginbtn">Logout</button></Link> */}
                            <button className="signupbtn" onClick={logoutHandler}>Logout</button>

                        </div> : <div className="nav-btn">
                            <Link href={"/login"}><button className="loginbtn">Login</button></Link>
                            <Link href={"/signup"}><button className="signupbtn">Register</button></Link>

                        </div>
                    }
                </div>

                {mobMenu == true ? <>
                    <div className="overlay" onClick={toggleMobMenu}></div>
                    <div className={`nav-links-mobile mobile ${mobMenu ? 'open' : ''}`}>
                        <div className="nav-listMob">
                            <Link href={"/"} className="nav-items"><div>Home</div></Link>
                            <Link href={"/doctors2"} className="nav-items"><div>Appointments</div></Link>
                            <Link href={"#"} className="nav-items"><div>Health Blog</div></Link>
                            <Link href={"#"} className="nav-items"><div>Reviews</div></Link>


                        </div>


                        {
                            username ? <div className="nav-btnMob">
                                {/* <Link href={"/login"}><button className="loginbtn">Login</button></Link> */}
                                <button className="signupbtn" onClick={logoutHandler}>Logout</button>

                            </div> : <div className="nav-btnMob">
                                <Link href={"/login"}><button className="loginbtn">Login</button></Link>
                                <Link href={"/signup"}><button className="signupbtn">Register</button></Link>

                            </div>
                        }
                    </div></> : null}

                <button className="mobBtn" onClick={toggleMobMenu}>
                    {mobMenu ? 'X' : '☰'}
                </button>

            </div>
        </div>
    )
}

export default NavBar