"use client"
import "./login.css"

const Login = () => {
    return (
        <div className="login-div">
            <div className="login-content">
                <h2 className="login-heading">Login</h2>

                <div>
                    <span className="muted-text">Are you a new member?</span>
                    <span className="muted-text-2">Sign up here.</span>
                </div>


                <form className="login-form">
                    <label htmlFor="email" className="muted-text">Email</label>
                    <input type="email" name="" id="email" className="inputs" />

                    <label htmlFor="password" className="muted-text">Password</label>
                    <input type="password" name="" id="password" className="inputs" />


                    <button className="buttons" id="login-btn">
                        Login
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