import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import store from "./app/store.js";
import "./index.css";
import AdminMoviesList from "./pages/admin/AdminMoviesList.jsx";
import AdminRoute from "./pages/admin/AdminRoute.jsx";
import AllComments from "./pages/admin/AllComments.jsx";
import CreateMovie from "./pages/admin/CreateMovie.jsx";
import GenreList from "./pages/admin/GenreList.jsx";
import UpdateMovie from "./pages/admin/UpdateMovie.jsx";
import Login from "./pages/auth/Login.jsx";
import PrivateRoute from "./pages/auth/PrivateRoute.jsx";
import Register from "./pages/auth/Register.jsx";
import Home from "./pages/home.jsx";
import AllMovies from "./pages/movies/AllMovies.jsx";
import MovieDetails from "./pages/movies/MovieDetails.jsx";
import Profile from "./pages/user/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/movies" element={<AllMovies />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movies/:id" element={<MovieDetails />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/movies/genre" element={<GenreList />} />
        <Route path="/admin/movies/create" element={<CreateMovie />} />
        <Route path="/admin/movies-list" element={<AdminMoviesList />} />
        <Route path="/admin/movies/update/:id" element={<UpdateMovie />} />
        <Route path="/admin/movies/comments" element={<AllComments />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
