import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      console.error("Email or password cannot be empty");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://notes-app-backend-1-wic7.onrender.com/api/v1/auth/login",
        {
          email,
          password,
        }
      );

  

      const token = response.data?.token || response.data?.payload?.at;

      if (token) {
        localStorage.setItem("token", token); //  Store token in localStorage
        navigate("/"); //  Redirect to Dashboard
      } else {
        console.error("No token received from API");
      }
    } catch (error) {
      console.error("Login failed:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Login to Stickeez
        </Typography>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          Dont have an account ? Register{" "}
        </Link>
      </Box>
    </Container>
  );
};

export default Login;
