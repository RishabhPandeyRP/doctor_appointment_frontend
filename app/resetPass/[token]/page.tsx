"use client";
import "./login.css";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

const ResetPassword = () => {
    const router = useRouter();
    const { token } = useParams(); // Extract token from URL

    const [formData, setFormData] = useState({
        password: "",
        confirm_password: "",
    });

    const [loading, setLoading] = useState(false);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5000/auth/reset-password", {
                token,
                password: formData.password,
            });

            if(response.status == 200){
                toast.success(response.data.message);
            setTimeout(() => router.push("/login"), 3000); // Redirect to login page
            }

            

        } catch (error: any) {
            console.error("Reset password error:", error);
            toast.error(error.message || "Error resetting password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-div">
            <div className="login-content">
                <h2 className="login-heading">Reset Password</h2>

                <form className="login-form">
                    <label htmlFor="password" className="muted-text">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        value={formData.password} 
                        onChange={changeHandler} 
                        id="password" 
                        className="inputs" 
                        required
                    />

                    <label htmlFor="confirm_password" className="muted-text">Confirm Password</label>
                    <input 
                        type="password" 
                        name="confirm_password" 
                        placeholder="Enter your password again" 
                        value={formData.confirm_password} 
                        onChange={changeHandler} 
                        id="confirm_password" 
                        className="inputs" 
                        required
                    />

                    <button className="buttons" id="rst-btn" onClick={resetHandler} disabled={loading}>
                        {loading ? "Resetting..." : "Reset"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
