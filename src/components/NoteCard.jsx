import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";

const NoteCard = ({ note, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          m: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            maxHeight: "auto", // ✅ Limits content height before scrolling
          }}
        >
          {/* Title with noWrap to prevent overflow */}
          <Typography variant="h6" noWrap>
            {note.title}
          </Typography>

          {/* Scrollable content */}
          <Typography
            color="textSecondary"
            sx={{
              wordWrap: "break-word",
              overflowY: "auto",
              maxHeight: "90px",
            }}
          >
            {note.content}
          </Typography>
        </CardContent>

        {/* Buttons Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px",
          }}
        >
          <IconButton onClick={() => setOpen(true)} color="info">
            <Visibility />
          </IconButton>
          <div>
            <IconButton onClick={() => onEdit(note)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={() => onDelete(note)} color="error">
              <Delete />
            </IconButton>
          </div>
        </div>
      </Card>

      {/* Full Content Popup Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
        sx={{
          overflowY: "auto",
          wordWrap: "break-word", // ✅ Ensures text wraps properly
        }}
      >
        <DialogTitle>{note.title}</DialogTitle>
        <DialogContent
          sx={{
            overflowY: "auto",
            maxHeight: "400px", // ✅ Prevents full-screen overflow
            wordWrap: "break-word", // ✅ Ensures text wraps properly
            whiteSpace: "pre-wrap", // ✅ Maintains line breaks in text
          }}
        >
          <Typography color="textSecondary">{note.content}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NoteCard;
