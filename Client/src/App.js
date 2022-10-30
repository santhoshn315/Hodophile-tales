import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LIGHT } from "./constants/actoinTypes";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const themeState = useSelector((state) => state.theme) || LIGHT;
  const user = JSON.parse(localStorage.getItem("profile"));
  const theme = createTheme({
    palette: {
      primary: { main: "#1976d2" },
      secondary: { main: "#03a9f4" },
      type: themeState,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/posts" />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route
              exact
              path="/auth"
              element={!user ? <Auth /> : <Navigate replace to={"/posts"} />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
