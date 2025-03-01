import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1"; // Change this if deployed

export const getAllNotes = async () => {
  const response = await axios.get(`${API_BASE_URL}/notes`);
  return response.data;
};

export const getNoteById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData) => {
  const response = await axios.post(`${API_BASE_URL}/notes/create`, noteData);
  return response.data;
};

export const updateNote = async (id, noteData) => {
  const response = await axios.put(`${API_BASE_URL}/notes/${id}`, noteData);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/notes/${id}`);
  return response.data;
};
