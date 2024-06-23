import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Container,
  Typography,
  Box,
} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
import { getUsers, deleteUser } from "../api";

const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers(token);
      setUsers(users);
    };
    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    await deleteUser(id, token);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User List
        </Typography>
      </Box>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} secondary={user.email} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(user.id)}
              ></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserList;
