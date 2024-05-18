import { Container, CircularProgress } from "@mui/material";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Inicio from "./views/Inicio";
import Tendencias from "./views/Tendencias";
import MovieBanner from "./components/MovieBanner";
import { useEffect, useState } from "react";
import CategoriasPelis from "./views/CategoriasPelis";
import Footer from "./components/Footer";
import DetallesPelis from "./views/DetallesPelis";

function App() {
  const [peliculas, setPeliculas] = useState(null);
  const [tentencias, setTendencias] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    try {
      const res = await fetch('http://localhost:5000/movies');
      const data = await res.json();
      console.log(data);
      setPeliculas(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  const getTendecnias = async () => {
    try {
      const res = await fetch('http://localhost:5000/movies/tendencias');
      const data = await res.json();
      console.log(data);
      setTendencias(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTendecnias();
  }, []);


  useEffect(() => {
    getMovies();
  }, []);



  const navList = [
    {
      title: "Inicio",
      path: "inicio"
    },
    {
      title: "Tendencias",
      path: "tendencias"
    },
    {
      title: "Categorias",
      path: "categorias"
    }
  ];
  

  return (
    <>
      <NavBar navList={navList} />
      <Container maxWidth="xl" sx={{ m: 0 }} disableGutters>
        {loading ? (
          <CircularProgress />
        ) : (
          <MovieBanner Peliculas={peliculas} />
        )}
      </Container>
      <Container sx={{ mt: 10 }} maxWidth="xl">
        <Routes>
          <Route path="/" element={<Inicio Peliculas={peliculas} />} />
          <Route path="/inicio" element={<Inicio Peliculas={peliculas}/>} />
          <Route path="/tendencias" element={<Tendencias PeliTendencias={tentencias}/>} />
          <Route path="/categorias" element={<CategoriasPelis Peliculas={peliculas}/>} />
          <Route path="/detalle/:id" element={<DetallesPelis />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
