
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUserShield, FaArrowRight } from "react-icons/fa";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Login failed.");
        return;
      }

      sessionStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-icon">
          <FaUserShield />
        </div>

        <span className="admin-login-label">BAJRANGI MILK</span>

        <h1>Welcome Back</h1>

        <p className="admin-login-subtitle">
          Sign in to manage your milk business.
        </p>

        <form onSubmit={handleLogin}>
          <div className="admin-input-group">
            <label>Admin Username</label>
            <div className="admin-input-box">
              <FaUserShield />
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label>Password</label>
            <div className="admin-input-box">
              <FaLock />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {error && <div className="admin-login-error">{error}</div>}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
            {!loading && <FaArrowRight />}
          </button>
        </form>

        <div className="admin-login-footer">
          <FaLock />
          Secure Admin Access
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
