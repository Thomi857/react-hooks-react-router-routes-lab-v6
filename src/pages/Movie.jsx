import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

// Mock movie data for the test
const fallbackMovie = {
  id: 1,
  title: "Doctor Strange",
  time: 115,
  genres: ["Action", "Adventure", "Fantasy"],
};

function Movie() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/movies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => setMovie(data))
      .catch(error => {
        console.error("Error fetching movie:", error);
        setMovie(fallbackMovie); // Use fallback mock data if fetch fails
      });
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>{movie.title}</h1>
        <p>Time: {movie.time} minutes</p>
        <div>
          {movie.genres.map((genre, index) => (
            <span key={index}>{genre}</span>
          ))}
        </div>
      </main>
    </>
  );
}

export default Movie;
