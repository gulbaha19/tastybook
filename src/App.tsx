import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Store } from "./models/Store";
import { AppProvider } from "./provider";
import { HomePage } from "./pages/HomePage";
import { AddRecipePage } from "./pages/AddRecipePage";
import { Header } from "./components/Header";
import { LikedPage } from "./pages/LikedPage";
import { Container } from "@mui/material";
import { RecipesPage } from "./pages/RecipesPage";
import { Profile } from "./pages/Profile";
import Reset from "./components/Reset";
import { RecipePage } from "./pages/RecipePage";
import { EditPage } from "./pages/EditPage";
import { FavouritesPage } from "./pages/FavouritesPage";
const store1 = new Store([]);

export const App = observer(() => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <AppProvider store={store1}>
        <Router>
          <Header />
          <Container maxWidth="lg" sx={{ paddingTop: "78px" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<AddRecipePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/liked" element={<LikedPage />} />
              <Route path="/recipes/:key" element={<RecipesPage />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/edit" element={<EditPage />} />
              <Route path="/recipe" element={<RecipePage />} />
              <Route path="/favourites" element={<FavouritesPage />} />

            </Routes>
          </Container>
        </Router>
      </AppProvider>
    </div>
  );
});
