import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SignIn from "./SignIn";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");

  const navigate = useNavigate();

  const Submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(
        <div className="spinner-grow text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
      setSuccess("");
      setError("");

      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("phone", phone);
      data.append("password", password);

      const response = await axios.post(
        "https://jeffson5f8n.pythonanywhere.com/api/signup",
        data
      );

      setLoading("");
      setSuccess(response.data.message);
      // Save user data to localStorage after successful sign-up
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      
      <div className="signup-card">
        <h1 className="signup-title">Sign Up</h1>
        <div className="feedback">
          <b className="text-info">{loading}</b>
          <b className="text-success">{success}</b>
          <b className="text-danger">{error}</b>
        </div>

        <form className="form-ish" onSubmit={Submit}>
          <input
            type="text"
            value={username}
            className="form-control"
            placeholder="Enter Your Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            value={email}
            className="form-control"
            placeholder="Enter Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            value={phone}
            className="form-control"
            placeholder="Enter Your PhoneNumber"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            value={password}
            className="form-control"
            placeholder="Enter Your Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            Already have an account?{" "}
            <Link to="/login" element={<SignIn />} className="signin-link">
              Sign in
            </Link>
          </p>
          <button className="btn btn-submit" onClick={() => navigate("/home")}>
            <b>SIGN UP</b>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
