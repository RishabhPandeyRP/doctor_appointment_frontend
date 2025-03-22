"use client"

import React, { useEffect, useState } from "react"
import "./NavBar.css"
import Image from "next/image"
import Link from "next/link"

const NavBar = () => {
    const [mobMenu , setMobMenu] = useState(false)
    useEffect(()=>{
        if(mobMenu){
            document.body.style.overflow = 'hidden'
        }else{
            document.body.style.overflow = 'auto'
        }

        return(()=>{
            document.body.style.overflow = 'auto'
        })
    } , [mobMenu])

    
    const toggleMobMenu = ()=>{
        setMobMenu(!mobMenu)
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

                    <div className="nav-btn">
                        <Link href={"/login"}><button className="loginbtn">Login</button></Link>
                        <Link href={"/signup"}><button className="signupbtn">Register</button></Link>
                        
                    </div>
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

                    <div className="nav-btnMob">
                        <Link href={"/login"}><button className="loginbtn">Login</button></Link>
                        <Link href={"/signup"}><button className="signupbtn">Register</button></Link>
                        
                    </div>
                </div></> : null}

                <button className="mobBtn" onClick={toggleMobMenu}>
                    {mobMenu ? 'X' : '☰'}
                </button>

            </div>
        </div>
    )
}

export default NavBar