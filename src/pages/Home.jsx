import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";

// Mock data for the test
const fallbackMovies = [
  { id: 1, title: "Doctor Strange", genre: "Action", year: 2016 },
  { id: 2, title: "The Imitation Game", genre: "Drama", year: 2014 },
  { id: 3, title: "Trolls", genre: "Animation", year: 2016 },
];

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/movies")
      .then((r) => r.json())
      .then((data) => setMovies(data))
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setMovies(fallbackMovies); // Use fallback mock data if fetch fails
      });
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Home Page</h1>
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </>
  );
}

export default Home;
