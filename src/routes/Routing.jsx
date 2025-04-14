import { Routes, Route } from "react-router";
import HomePage from "../pages/homepage/HomePage";
import ErrorPage from "../pages/error/ErrorPage";
import Layout from "../layout/Layout";
import GenrePage from "../pages/genrepage/GenrePage";
import GamePage from "../pages/gamepage/GamePage";
import SearchPage from "../pages/searchpage/SearchPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import SettingsPage from "../pages/auth/SettingsPage";
import ProfilePage from "../pages/auth/ProfilePage";
import WorkInProgressPage from "../pages/error/WorkInProgressPage";

export default function Routing() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/games/:genre" element={<GenrePage />} />
        <Route path="/games/:slug/:id" element={<GamePage />} />
        <Route path="/search" element={<SearchPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/work-in-progress" element={<WorkInProgressPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
