import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppRoutes from "./routes/AppRoutes";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

function App() {
  // 🌗 Theme state (default: dark mode)
  const [darkMode, setDarkMode] = useState(true);

  // 🎨 Dynamic Theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#1976d2" },
      secondary: { main: "#ff4081" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
