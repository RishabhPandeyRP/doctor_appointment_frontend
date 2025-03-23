"use client"

import React, { useEffect, useState } from "react"
import "./NavBar.css"
import Image from "next/image"
import Link from "next/link"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const NavBar = () => {
    const router = useRouter()
    const [mobMenu, setMobMenu] = useState(false)
    const [user, setUser] = useState<string | undefined>("")

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

    useEffect(() => {
        const token = Cookies.get("token")
        const username = Cookies.get("username")

        if (!token) {
            toast.error("Not loggedin , redirecting to login page")
            router.push("/login")
        } else {
            toast.success("You are logged in")
            setUser(username)
        }
    }, [])


    const toggleMobMenu = () => {
        setMobMenu(!mobMenu)
    }

    const logoutHandler = () => {
        Cookies.remove("token")
        Cookies.remove("username")
        router.push("/login")
    }

    return (
        <div className="nav">
            <div className="content">
                <div className="img-container">
                    <Image src="/mecareLogo.svg" alt="" className="img" fill />
                </div>

                <div className={`nav-links desktop`}>
                    <div className="nav-list">
                        <Link href={"/"} className="nav-items"><div>Home</div></Link>
                        <Link href={"/doctors2"} className="nav-items"><div>Appointments</div></Link>
                        <Link href={"#"} className="nav-items"><div>Health Blog</div></Link>
                        <Link href={"#"} className="nav-items"><div>Reviews</div></Link>


                    </div>



                    {
                        user ? <div className="nav-btn">
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
                    <div className={`nav-links-mobile mobile ${mobMenu} ? 'open' : ''`}>
                        <div className="nav-listMob">
                            <Link href={"/"} className="nav-items"><div>Home</div></Link>
                            <Link href={"/doctors2"} className="nav-items"><div>Appointments</div></Link>
                            <Link href={"#"} className="nav-items"><div>Health Blog</div></Link>
                            <Link href={"#"} className="nav-items"><div>Reviews</div></Link>


                        </div>


                        {
                            user ? <div className="nav-btnMob">
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