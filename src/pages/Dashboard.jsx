import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Button,
  CircularProgress,
  Grid2,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Logout, Add, Delete } from "@mui/icons-material";
import NoteCard from "../components/NoteCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoteModal from "../components/NoteModal";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch Notes Function
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token")?.trim();
      if (!token) {
        handleLogout();
        return;
      }
      const response = await axios.get("https://notes-app-backend-1-wic7.onrender.com"+"api/v1/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response?.data?.payload);
    } catch (error) {
      console.error("Error fetching notes:", error);
      if (error.response && [400, 401, 403].includes(error?.response?.status)) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ Open Add/Edit Modal
  const handleOpenModal = (note = null) => {
    setSelectedNote(note);
    setModalOpen(true);
  };

  // ✅ Close Modal
  const handleCloseModal = () => {
    setSelectedNote(null);
    setModalOpen(false);
  };

  // ✅ Open Delete Modal
  const handleOpenDeleteModal = (note) => {
    setNoteToDelete(note);
    setDeleteModalOpen(true);
  };

  // ✅ Close Delete Modal
  const handleCloseDeleteModal = () => {
    setNoteToDelete(null);
    setDeleteModalOpen(false);
  };

  // ✅ Delete Note Function
  const handleDeleteNote = async () => {
    if (!noteToDelete) return;

    try {
      const token = localStorage.getItem("token")?.trim();
      if (!token) {
        handleLogout();
        return;
      }

      await axios.delete(
        `http://localhost:5000/api/v1/notes/${noteToDelete._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDeleteModalOpen(false);
      fetchNotes(); // Refresh notes after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Container maxWidth="md">
      {/* ✅ Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Stickeez Notes
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ✅ Add Note Button */}
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ mt: 3, mb: 2 }}
        onClick={() => handleOpenModal(null)}
      >
        Add Note
      </Button>

      {/*  Notes List or Loader */}
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
      ) : notes.length > 0 ? (
        <Grid2 container spacing={2} gap={2} marginTop={1}>
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              refreshNotes={fetchNotes}
              onEdit={() => handleOpenModal(note)}
              onDelete={() => handleOpenDeleteModal(note)} //   delete function
            />
          ))}
        </Grid2>
      ) : (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", mt: 5, width: "100%" }}
        >
          No notes found. Add some notes!
        </Typography>
      )}

      {/* ✅ Add / Edit Note Modal */}
      <NoteModal
        open={modalOpen}
        handleClose={handleCloseModal}
        refreshNotes={fetchNotes}
        noteToEdit={selectedNote}
      />

      {/* ✅ Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this note? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteNote}
            color="error"
            variant="contained"
            startIcon={<Delete />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
