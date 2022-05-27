import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import MovieList from "./Componante/MovieList";
import NavBar from "./Componante/NavBar";
import "./index.css";
import MoviesDetails from "./Componante/MoviesDetails";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";
function App() {
  const [movies, setmovies] = useState([]);
  const [pagecount, setpagecount] = useState(0)

  // Get All Movies
  const getallmovie = async () => {
    const res = await axios.get(
      ` https://api.themoviedb.org/3/movie/popular?api_key=d6e34409ff94c207cf61b321211cd258&language=en-US`
    );
    setmovies(res.data.results);
    setpagecount(res.data.total_pages)
  };
  // Get current page
  const getpage = async (page) => {
    const res = await axios.get(
      ` https://api.themoviedb.org/3/movie/popular?api_key=d6e34409ff94c207cf61b321211cd258&language=ar-SA&page=${page}`
    );
    setmovies(res.data.results);
    setpagecount(res.data.total_pages)
  };
  useEffect(() => {
    return () => {
      getallmovie();
    };
  }, []);
  // Seearch
  const search = async (word) => {
    if (word === "") {
      getallmovie();
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=d6e34409ff94c207cf61b321211cd258&query=${word}&language=ar`
      );
      setmovies(res.data.results);
      setpagecount(res.data.total_pages)
    }
  };
  return (
    <div className="font color-body">
      <NavBar search={search} />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MovieList movies={movies} getpage={getpage} pagecount={pagecount} />} />
            <Route path="/movie/:id" element={<MoviesDetails />} />
          </Routes>
        </BrowserRouter>

      </Container>
    </div>
  );
}

export default App;
