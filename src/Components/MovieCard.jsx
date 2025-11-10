// import React from "react";
// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

// function MovieCard({ movie }) {
//   return (
//     <>
//       <img src={IMAGE_BASE_URL + movie.poster_path} alt=''
//         className="w-24 md:w-48 rounded-lg hover:border-[3px] border-gray-400 cursor-pointer hover:scale-110 transition-all duration-150 ease-in shadow-lg shadow-black"/>
//     </>
//   )
// }

// export default MovieCard;



import React, { useState } from "react";
import Modal from "react-modal";
import GlobalApi from "../services/GlobalApi";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

Modal.setAppElement("#root");

function MovieCard({ movie }) {
  const [isOpen, setIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const openTrailer = () => {
    GlobalApi.getMovieTrailer(movie.id)
      .then((res) => {
        const trailer = res.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer ? trailer.key : null);
        setIsOpen(true);
      })
      .catch((err) => console.error("Error loading trailer:", err));
  };

  return (
    <>
      <img
        src={IMAGE_BASE_URL + movie.poster_path}
        alt={movie.title}
        onClick={openTrailer}
        className="w-24 md:w-48 rounded-lg hover:border-[3px] border-gray-400 cursor-pointer hover:scale-110 transition-all duration-150 ease-in shadow-lg shadow-black"
      />

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 9999,
          },
          content: {
            background: "transparent",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
          },
        }}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-10 bg-red-600 text-white font-bold px-3 py-1 rounded-full text-lg cursor-pointer"
        >
          ✕
        </button>

        {trailerKey ? (
          <iframe
            width="80%"
            height="450"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title={movie.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="rounded-xl shadow-lg"
          ></iframe>
        ) : (
          <p className="text-white text-xl">No trailer found 😢</p>
        )}
      </Modal>
    </>
  );
}

export default MovieCard;
