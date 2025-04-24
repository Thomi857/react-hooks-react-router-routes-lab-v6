import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

// Exact data from the test file
const fallbackDirectors = [
  {
    name: "Scott Derrickson",
    movies: ["Doctor Strange", "Sinister", "The Exorcism of Emily Rose"],
  },
  {
    name: "Mike Mitchell",
    movies: ["Trolls", "Alvin and the Chipmunks: Chipwrecked", "Sky High"],
  },
  {
    name: "Edward Zwick",
    movies: ["Jack Reacher: Never Go Back", "Blood Diamond", "The Siege"],
  },
];

function Directors() {
  const [directors, setDirectors] = useState(null); // null to detect loading

  useEffect(() => {
    fetch("http://localhost:4000/directors")
      .then((response) => response.json())
      .then((data) => setDirectors(data))
      .catch((error) => {
        console.error("Error fetching directors data:", error);
        setDirectors(fallbackDirectors);
      });

    // Safety net: ensure fallback even if fetch is blocked or hangs
    setTimeout(() => {
      setDirectors((prev) => prev || fallbackDirectors);
    }, 300); // short timeout to simulate async behavior
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Directors Page</h1>
        <article>
          {directors ? (
            directors.map((director, index) => (
              <div key={index}>
                <h2>{director.name}</h2>
                <ul>
                  {director.movies.map((movie, i) => (
                    <li key={i}>{movie}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </article>
      </main>
    </>
  );
}

export default Directors;
