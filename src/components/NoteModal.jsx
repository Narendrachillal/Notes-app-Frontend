import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const NoteModal = ({ open, handleClose, refreshNotes, noteToEdit }) => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Load existing note when editing
  useEffect(() => {
    if (noteToEdit) {
      setNote({ title: noteToEdit.title, content: noteToEdit.content });
    } else {
      setNote({ title: "", content: "" });
    }
  }, [noteToEdit]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSaveNote = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      if (noteToEdit) {
        // ✅ Update existing note
        await axios.put(
          `http://localhost:5000/api/v1/notes/${noteToEdit._id}`,
          note,
          { headers }
        );
      } else {
        // ✅ Add new note
        await axios.post("http://localhost:5000/api/v1/notes/", note, {
          headers,
        });
      }

      refreshNotes();

      setNote({ title: "", content: "" }); // ✅ Reset form state
      handleClose(); // ✅ Close modal properly
    } catch (error) {
      alert(noteToEdit ? "Failed to update note!" : "Failed to add note!");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{noteToEdit ? "Edit Note" : "Add Note"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          name="title"
          margin="normal"
          value={note.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Content"
          name="content"
          margin="normal"
          multiline
          rows={4}
          value={note.content}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSaveNote} color="primary" variant="contained">
          {loading ? (
            <CircularProgress size={24} />
          ) : noteToEdit ? (
            "Update Note"
          ) : (
            "Add Note"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteModal;
