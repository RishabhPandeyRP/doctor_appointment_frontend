"use client"
import "./signup.css"

const SignUp = () => {
    return (
        <div className="login-div">
            <div className="login-content">
                <h2 className="login-heading">Sign Up</h2>

                <div>
                    <span className="muted-text">Already a member?</span>
                    <span className="muted-text-2">Login</span>
                </div>


                <form className="login-form">
                    <label htmlFor="name" className="muted-text">Name</label>
                    <input type="text" name="" id="name" className="inputs" />

                    <label htmlFor="email" className="muted-text">Email</label>
                    <input type="email" name="" id="email" className="inputs" />

                    <label htmlFor="password" className="muted-text">Password</label>
                    <input type="password" name="" id="password" className="inputs" />


                    <button className="buttons" id="login-btn">
                        Submit
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