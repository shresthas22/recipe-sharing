import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import { Container, Button, Box, Typography } from "@mui/material";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Recipe Sharing App
        </Typography>
        {token ? (
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </Box>
      {token && (
        <>
          <UserForm token={token} />
          <UserList token={token} />
        </>
      )}
    </Container>
  );
}

export default App;
