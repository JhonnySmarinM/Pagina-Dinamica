import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { FaEnvelope, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./App.css";
import FormTemplate from "./FormTemplate";
import Admin from "./components/Admin/Admin";
import GeneralRenderTemplate from "./GeneralRenderTemplate";
import Auth from "./components/auth/auth";

// Add styles for grid cells
const gridCellStyle = {
  width: '100%',
  height: '100%',
  minHeight: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #ccc',
  backgroundColor: '#fff',
  padding: '10px',
  boxSizing: 'border-box'
};

function App() {
  // Mock data for testing - using a single object instead of an array
  const [dataProps] = useState({
    id: 1,
    title: "Mi Empresa",
    businessType: "Restaurante",
    address: "Calle Principal 123",
    phone: "123-456-7890",
    email: "contacto@miempresa.com",
    emailClient: "cliente@miempresa.com",
    updated_at: new Date().toISOString(),
    isPublished: false,
    socialLinks: {
      whatsapp: "https://wa.me/1234567890",
      facebook: "https://facebook.com/miempresa",
      instagram: "https://instagram.com/miempresa",
      youtube: "https://youtube.com/miempresa",
      linkedin: "https://linkedin.com/company/miempresa",
      tiktok: "https://tiktok.com/@miempresa",
      pinterest: "https://pinterest.com/miempresa",
      twitter: "https://twitter.com/miempresa"
    },
    logo: "",
    backgroundImage: "",
    carouselImages: [
      "https://via.placeholder.com/300/FF0000/FFFFFF?text=Image+1",
      "https://via.placeholder.com/300/00FF00/FFFFFF?text=Image+2",
      "https://via.placeholder.com/300/0000FF/FFFFFF?text=Image+3",
    ],
    carouselImages2: [
      "https://via.placeholder.com/300/FF00FF/FFFFFF?text=Image+4",
      "https://via.placeholder.com/300/FFFF00/FFFFFF?text=Image+5",
      "https://via.placeholder.com/300/00FFFF/FFFFFF?text=Image+6",
    ],
    services: [
      { name: "Servicio 1", description: "Descripción del servicio 1", carouselImagesServicio: "https://via.placeholder.com/300/FF0000/FFFFFF?text=Service+1" },
      { name: "Servicio 2", description: "Descripción del servicio 2", carouselImagesServicio: "https://via.placeholder.com/300/00FF00/FFFFFF?text=Service+2" }
    ],
    centralCarousel: [
      { image: "https://via.placeholder.com/300/0000FF/FFFFFF?text=Central+1", description: "Descripción 1" },
      { image: "https://via.placeholder.com/300/FF00FF/FFFFFF?text=Central+2", description: "Descripción 2" }
    ],
    movableCells: [
      { i: '1', x: 0, y: 0, w: 1, h: 1, content: 'LOGO', bgColor: '#D3D3D3' },
      { i: '2', x: 1, y: 0, w: 1, h: 1, content: 'REDES SOCIALES', bgColor: '#FF2D2D' },
      { i: '3', x: 2, y: 0, w: 1, h: 1, content: 'PUBLICIDAD 1', bgColor: '#A89C5D' },
      { i: '4', x: 3, y: 0, w: 1, h: 1, content: 'PUBLICIDAD 2', bgColor: '#FFC300' },
      { i: '5', x: 0, y: 1, w: 1, h: 1, content: 'VIDEO CORPORATIVO', bgColor: '#00BFFF' },
      { i: '6', x: 1, y: 1, w: 1, h: 1, content: 'EMPRESA', bgColor: '#295A6D' },
      { i: '7', x: 2, y: 1, w: 1, h: 1, content: 'PRODUCTOS Y SERVICIOS', bgColor: '#2B7A78' },
      { i: '8', x: 3, y: 1, w: 1, h: 1, content: 'RESERVAS', bgColor: '#FF6F00' },
      { i: '9', x: 0, y: 2, w: 1, h: 1, content: 'CALENDARIO', bgColor: '#FFFFFF' },
      { i: '10', x: 1, y: 2, w: 1, h: 1, content: 'FOTO/TEXTO 1', bgColor: '#BDB89B' },
      { i: '11', x: 2, y: 2, w: 1, h: 1, content: 'FOTO/TEXTO 2', bgColor: '#BDB89B' },
      { i: '12', x: 3, y: 2, w: 1, h: 1, content: 'FOTO/TEXTO 3', bgColor: '#BDB89B' },
      { i: '13', x: 0, y: 3, w: 1, h: 1, content: 'SLIDE 1', bgColor: '#FF8000' },
      { i: '14', x: 1, y: 3, w: 1, h: 1, content: 'SLIDE 2', bgColor: '#FF8000' },
      { i: '15', x: 2, y: 3, w: 1, h: 1, content: 'SLIDE 3', bgColor: '#FF8000' },
      { i: '16', x: 3, y: 3, w: 1, h: 1, content: 'SLIDE 4', bgColor: '#FF8000' }
    ]
  });

  const [logo, setLogo] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const layout = [
    // Fila 1
    { i: "1", x: 0, y: 0, w: 2, h: 2, static: false }, // LOGO NOMBRE SLOGAN
    { i: "2", x: 2, y: 0, w: 2, h: 2, static: false }, // CONTACT@ REDES S@CIALES
    { i: "3", x: 4, y: 0, w: 2, h: 2, static: false }, // BANNER PUBLI 1 (fijo)
    { i: "4", x: 6, y: 0, w: 2, h: 2, static: false }, // BANNER PUBLI 2 (slide)
    // Fila 2
    { i: "5", x: 0, y: 2, w: 2, h: 2, static: false }, // VIDEO CORPORATIVO (link YOUtube)
    { i: "6", x: 2, y: 2, w: 2, h: 2, static: false }, // empresa
    { i: "7", x: 4, y: 2, w: 2, h: 2, static: false }, // Productos Servicios
    { i: "8", x: 6, y: 2, w: 2, h: 2, static: false }, // RESERVAS USUARI@S
    // Fila 3
    { i: "9", x: 0, y: 4, w: 2, h: 2, static: false }, // CALENDARIO EVENTOS
    { i: "10", x: 2, y: 4, w: 2, h: 2, static: false }, // FOTO/ TEXTO 1
    { i: "11", x: 4, y: 4, w: 2, h: 2, static: false }, // FOTO/ TEXTO 2
    { i: "12", x: 6, y: 4, w: 2, h: 2, static: false }, // FOTO/ TEXTO 3
    // Fila 4
    { i: "13", x: 0, y: 6, w: 2, h: 2, static: false }, // SLIDE 1
    { i: "14", x: 2, y: 6, w: 2, h: 2, static: false }, // SLIDE 2
    { i: "15", x: 4, y: 6, w: 2, h: 2, static: false }, // SLIDE 3
    { i: "16", x: 6, y: 6, w: 2, h: 2, static: false }, // SLIDE 4
  ];

  const carouselImages = [
    "https://via.placeholder.com/300/FF0000/FFFFFF?text=Image+1",
    "https://via.placeholder.com/300/00FF00/FFFFFF?text=Image+2",
    "https://via.placeholder.com/300/0000FF/FFFFFF?text=Image+3",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const renderGridLayout = () => (
    <GridLayout className="layout" layout={layout} cols={8} rowHeight={180}>
      <div key="1" className="box" style={gridCellStyle}>
        {logo ? (
          <img src={logo} alt="Logo" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        ) : (
          <>
            <p>Sube tu logo</p>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </>
        )}
      </div>
      <div key="2" className="box" style={gridCellStyle}>
        <FaEnvelope size={30} />
        <FaWhatsapp size={30} />
        <FaFacebook size={30} />
        <FaInstagram size={30} />
      </div>
      <div key="3" className="box" style={gridCellStyle}>
        <Slider {...sliderSettings}>
          {carouselImages.map((src, index) => (
            <div key={`carousel-${index}`}>
              <img src={src} alt={`Slide ${index + 1}`} style={{ maxWidth: "100%", maxHeight: "100%" }} />
            </div>
          ))}
        </Slider>
      </div>
      <div key="4" className="box" style={gridCellStyle}>PUBLIC 2</div>
      <div key="5" className="box" style={gridCellStyle}>VIDEO CORPORATIVO</div>
      <div key="6" className="box" style={gridCellStyle}>EMPRESA</div>
      <div key="7" className="box" style={gridCellStyle}>PRODUCTOS Y SERVICIOS</div>
      <div key="8" className="box" style={gridCellStyle}>RESERVAS USUARIOS</div>
      <div key="9" className="box" style={gridCellStyle}>CALENDARIO EVENTOS</div>
      <div key="10" className="box" style={gridCellStyle}>FOTO/TEXTO 1</div>
      <div key="11" className="box" style={gridCellStyle}>FOTO/TEXTO 2</div>
      <div key="12" className="box" style={gridCellStyle}>FOTO/TEXTO 3</div>
      <div key="13" className="box" style={gridCellStyle}>SLIDE 1</div>
      <div key="14" className="box" style={gridCellStyle}>SLIDE 2</div>
      <div key="15" className="box" style={gridCellStyle}>SLIDE 3</div>
      <div key="16" className="box" style={gridCellStyle}>SLIDE 4</div>
    </GridLayout>
  );

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FormTemplate data={[dataProps]} />} />
          <Route
            path="/webtemplateCreate"
            element={
              <GeneralRenderTemplate
                layout={layout}
                movableCells={JSON.parse(window.sessionStorage.getItem('movableCells')) || []}
                formData={JSON.parse(window.sessionStorage.getItem('formData')) || {}}
              />
            }
          />
          <Route
            path="/mypage/:id"
            element={<GeneralRenderTemplate datas={[dataProps]} gridLayout={renderGridLayout()} />}
          />
          <Route path="/:id" element={<FormTemplate data={[dataProps]} />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin data={[dataProps]} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;