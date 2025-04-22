import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SignUp from "./SignUp";

const SignIn = () => {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");

    let navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        try {
            setLoading(
                <div class="spinner-grow text-warning" role="status">
                    <span class="visually-hidden">Redirecting...</span>
                </div>
            );
            setError("");

            const data = new FormData();
            data.append("username", username);
            data.append("password", password);

            const response = await axios.post("https://jeffson5f8n.pythonanywhere.com/api/signin", data);

            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/");
            } else {
                setLoading("");
                setError(response.data.message);
            }

            setUsername("");
            setPassword("");
        } catch (error) {
            setLoading("");
            setError("Something went wrong");
        }
    };

    return (
        <div className="m-4 row justify-content-center">
            
            <div className="row p-4 col-md-8 card shadow">
                <b className="text-warning">{loading}</b>
                <b className="text-danger">{error}</b>
                <h1><b><u>SIGN IN</u></b></h1>
                
                <form onSubmit={submit}>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        className="form-control"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    /> <br />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="form-control"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    /> <br />
                    
                    <p>Already have an account <Link to="/signup" element={<SignUp />}>Sign Up</Link></p>
                    <br />
                    <button className="btn btn-primary" onClick={() => navigate("/home")} >SIGN IN</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
