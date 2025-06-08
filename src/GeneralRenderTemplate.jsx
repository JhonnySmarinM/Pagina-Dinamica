import React, { useState, useEffect, useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube, FaLinkedinIn, FaPinterestP, FaTwitter } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Import IndexedDB utility functions
import { loadData } from "./utils/indexedDB";

// Define breakpoints and columns outside component
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 4, md: 4, sm: 4, xs: 4, xxs: 4 };

const defaultLayout = [
  { i: "1", x: 0, y: 0, w: 1, h: 1 },
  { i: "2", x: 1, y: 0, w: 1, h: 1 },
  { i: "3", x: 2, y: 0, w: 1, h: 1 },
  { i: "4", x: 3, y: 0, w: 1, h: 1 },
  { i: "5", x: 0, y: 1, w: 1, h: 1 },
  { i: "6", x: 1, y: 1, w: 1, h: 1 },
  { i: "7", x: 2, y: 1, w: 1, h: 1 },
  { i: "8", x: 3, y: 1, w: 1, h: 1 },
  { i: "9", x: 0, y: 2, w: 1, h: 1 },
  { i: "10", x: 1, y: 2, w: 1, h: 1 },
  { i: "11", x: 2, y: 2, w: 1, h: 1 },
  { i: "12", x: 3, y: 2, w: 1, h: 1 },
  { i: "13", x: 0, y: 3, w: 1, h: 1 },
  { i: "14", x: 1, y: 3, w: 1, h: 1 },
  { i: "15", x: 2, y: 3, w: 1, h: 1 },
  { i: "16", x: 3, y: 3, w: 1, h: 1 },
];

const defaultMovableCells = [
  { i: "1", content: "LOGO", bgColor: "#FFFFFF" },
  { i: "2", content: "REDES", bgColor: "#EAEAEA" },
  { i: "3", content: "PUBLICIDAD 1", bgColor: "#FFDDC1" },
  { i: "4", content: "PUBLICIDAD 2", bgColor: "#FFC8DD" },
  { i: "5", content: "VIDEO CORPORATIVO", bgColor: "#C1E1FF" },
  { i: "6", content: "EMPRESA", bgColor: "#C1FFD7" },
  { i: "7", content: "PRODUCTOS Y SERVICIOS", bgColor: "#F9F9A1" },
  { i: "8", content: "RESERVAS USUARI@S", bgColor: "#FFB3BA" },
  { i: "9", content: "CALENDARIO EVENTOS", bgColor: "#D5BAFF" },
  { i: "10", content: "FOTO/TEXTO 1", bgColor: "#FCD5CE" },
  { i: "11", content: "FOTO/TEXTO 2", bgColor: "#D0F4DE" },
  { i: "12", content: "FOTO/TEXTO 3", bgColor: "#FFDAC1" },
  { i: "13", content: "SLIDE 1", bgColor: "#E0BBE4" },
  { i: "14", content: "SLIDE 2", bgColor: "#FFDFD3" },
  { i: "15", content: "SLIDE 3", bgColor: "#CDEAC0" },
  { i: "16", content: "SLIDE 4", bgColor: "#B5EAD7" },
];

const ReservationCell = ({ cell }) => {
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [reservationData, setReservationData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    personas: '1',
    notas: ''
  });

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!reservationData.nombre || !reservationData.email || !reservationData.telefono || !reservationData.fecha || !reservationData.hora) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    alert(`${cell.value.mensajeConfirmacion}\n\nDetalles de tu reserva:\nNombre: ${reservationData.nombre}\nEmail: ${reservationData.email}\nTeléfono: ${reservationData.telefono}\nFecha: ${reservationData.fecha}\nHora: ${reservationData.hora}\nPersonas: ${reservationData.personas}`);
    setShowReservationForm(false);
    setReservationData({
      nombre: '',
      email: '',
      telefono: '',
      fecha: '',
      hora: '',
      personas: '1',
      notas: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name}, Value: ${value}`);
    setReservationData(prev => ({
      ...prev,
      [name]: value
    }));
    console.log('Updated reservationData:', { ...reservationData, [name]: value });
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "flex-start",
      gap: "4px",
      padding: "8px",
      background: `linear-gradient(135deg, ${cell.value.colorFondo}, ${cell.value.colorBoton})`,
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      overflow: "hidden",
      minHeight: "0",
      flex: "1 1 auto",
      position: "relative"
    }}>
      {!showReservationForm ? (
        <>
          <h3 style={{ 
            margin: "0", 
            color: "#FFFFFF", 
            fontSize: "clamp(0.8rem, 2vw, 1.2rem)", 
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            fontWeight: "bold",
            lineHeight: "1.2",
            padding: "2px 0",
            flex: "0 0 auto"
          }}>
            {cell.value.titulo}
          </h3>
          <p style={{
            margin: "0",
            fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
            textAlign: "center",
            color: "#FFFFFF",
            marginBottom: "8px"
          }}>
            {cell.value.subtitulo}
          </p>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "8px",
            width: "100%",
            flex: "1 1 auto",
            overflow: "auto",
            minHeight: "0"
          }}>
            <div style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: "4px",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}>
              <i className="fas fa-clock" style={{ color: "#FFD700", flexShrink: "0" }}></i>
              <div style={{ fontSize: "0.9em", color: "#FFFFFF" }}>
                <div style={{ fontWeight: "bold" }}>Horario de Atención:</div>
                <div>{cell.value.horarioAtencion.dias.join(", ")}</div>
                <div>{cell.value.horarioAtencion.horario}</div>
              </div>
            </div>
            <div style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: "4px",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}>
              <i className="fas fa-info-circle" style={{ color: "#FFD700", flexShrink: "0" }}></i>
              <div style={{ fontSize: "0.9em", color: "#FFFFFF" }}>
                <div>Duración: {cell.value.duracionCita} minutos</div>
                <div>Capacidad: {cell.value.capacidadMaxima} personas</div>
              </div>
            </div>
            <button 
              onClick={() => setShowReservationForm(true)}
              style={{
                backgroundColor: cell.value.colorBoton,
                color: "#FFFFFF",
                border: "none",
                borderRadius: "4px",
                padding: "8px 16px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                marginTop: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
              }}
            >
              <i className="fas fa-calendar-plus" style={{ marginRight: "6px" }}></i>
              Reservar Ahora
            </button>
          </div>
        </>
      ) : (
        <form 
          onSubmit={handleReservationSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            height: "100%",
            overflow: "auto"
          }}
        >
          <h3 style={{ 
            margin: "0", 
            color: "#FFFFFF", 
            fontSize: "1.1rem", 
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
          }}>
            Formulario de Reserva
          </h3>
          
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            pointerEvents: "auto",
            zIndex: 100
          }}>
            <input
              type="text"
              name="nombre"
              value={reservationData.nombre}
              onChange={handleInputChange}
              placeholder="Nombre completo"
              required
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.3)",
                backgroundColor: "rgba(255,255,255,0.9)",
                fontSize: "0.9rem"
              }}
            />
            
            <input
              type="email"
              name="email"
              value={reservationData.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
              required
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.3)",
                backgroundColor: "rgba(255,255,255,0.9)",
                fontSize: "0.9rem"
              }}
            />
            
            <input
              type="tel"
              name="telefono"
              value={reservationData.telefono}
              onChange={handleInputChange}
              placeholder="Teléfono"
              required
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.3)",
                backgroundColor: "rgba(255,255,255,0.9)",
                fontSize: "0.9rem"
              }}
            />
            
            <input
              type="date"
              name="fecha"
              value={reservationData.fecha}
              onChange={handleInputChange}
              required
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.3)",
                backgroundColor: "rgba(255,255,255,0.9)",
                fontSize: "0.9rem",
                cursor: "pointer",
                pointerEvents: "auto",
                zIndex: 10
              }}
              tabIndex="0"
            />
            
            <input
              type="time"
              name="hora"
              value={reservationData.hora}
              onChange={handleInputChange}
              required
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.3)",
                backgroundColor: "rgba(255,255,255,0.9)",
                fontSize: "0.9rem",
                cursor: "pointer",
                pointerEvents: "auto",
                zIndex: 10
              }}
              tabIndex="0"
            />
            
            <select
              name="personas"
              value={reservationData.personas}
              onChange={handleInputChange}
              required
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.3)",
                backgroundColor: "rgba(255,255,255,0.9)",
                fontSize: "0.9rem"
              }}
            >
              {[...Array(parseInt(cell.value.capacidadMaxima))].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'persona' : 'personas'}</option>
              ))}
            </select>
            
            <textarea
              name="notas"
              value={reservationData.notas}
              onChange={handleInputChange}
              placeholder="Notas adicionales (opcional)"
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.3)",
                backgroundColor: "rgba(255,255,255,0.9)",
                fontSize: "0.9rem",
                minHeight: "60px",
                resize: "vertical"
              }}
            />
          </div>
          
          <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
            <button
              type="button"
              onClick={() => setShowReservationForm(false)}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.3)",
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "#FFFFFF",
                cursor: "pointer",
                fontSize: "0.9rem"
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: cell.value.colorBoton,
                color: "#FFFFFF",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "bold"
              }}
            >
              Confirmar Reserva
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const GeneralRenderTemplate = () => {
  const [movableCells, setMovableCells] = useState(defaultMovableCells);
  const [layout, setLayout] = useState(defaultLayout);
  const [socialLinks, setSocialLinks] = useState({});
  const [carouselImages, setCarouselImages] = useState([]);
  const [carouselImages2, setCarouselImages2] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const ResponsiveGridLayout = WidthProvider(Responsive);

  // Memoize the layout to prevent unnecessary recalculations
  const layouts = useMemo(() => ({
    lg: layout,
    md: layout,
    sm: layout,
    xs: layout,
    xxs: layout
  }), [layout]);

  // Load initial state from IndexedDB
  useEffect(() => {
    const loadInitialData = async () => {
      const storedMovableCells = await loadData('movableCells');
      const storedFormData = await loadData('formData');
      const storedLayout = await loadData('layout'); // If layout is also saved separately

      let initialMovableCells = defaultMovableCells;
      let initialLayout = defaultLayout;
      let initialSocialLinks = {};
      let initialFormData = {};

      if (storedLayout) {
        try {
          const parsedLayout = storedLayout;
          // Validate layout structure basic check
          if (Array.isArray(parsedLayout) && parsedLayout.length === defaultLayout.length && parsedLayout.every(item => item.i && typeof item.x === 'number')) {
            initialLayout = parsedLayout;
          } else {
             console.warn('Invalid layout data in IndexedDB. Using defaultLayout.');
          }
        } catch (error) {
          console.error('Error parsing layout from IndexedDB. Using defaultLayout.', error);
        }
      }

      if (storedMovableCells) {
        try {
          const parsedCells = storedMovableCells;
           // Validate cells structure basic check
          if (Array.isArray(parsedCells) && parsedCells.length === defaultMovableCells.length && parsedCells.every(cell => cell.i && cell.content && cell.bgColor)) {
             initialMovableCells = parsedCells;
          } else {
             console.warn('Invalid movableCells data in IndexedDB. Using defaultMovableCells.');
          }
        } catch (error) {
          console.error('Error parsing movableCells from IndexedDB. Using defaultMovableCells.', error);
        }
      }

      if (storedFormData) {
        try {
          const parsedFormData = storedFormData;
           initialFormData = parsedFormData;
          // Guardar los enlaces sociales
          if (parsedFormData.socialLinks) {
            initialSocialLinks = parsedFormData.socialLinks;
          }
          // Update image cells based on loaded formData, clean up invalid image values
          initialMovableCells = initialMovableCells.map(cell => {
            if (cell.i === '1' && parsedFormData.logo && typeof parsedFormData.logo === 'string' && parsedFormData.logo.startsWith('data:image')) {
              return { ...cell, type: 'image', value: parsedFormData.logo, content: 'LOGO' };
            }
            if (cell.i === '3' && parsedFormData.carouselImages && Array.isArray(parsedFormData.carouselImages) && parsedFormData.carouselImages.length > 0 && typeof parsedFormData.carouselImages[0] === 'string' && parsedFormData.carouselImages[0].startsWith('data:image')) {
              return { ...cell, type: 'image', value: parsedFormData.carouselImages[0], content: cell.content };
            }
            if (cell.i === '4' && parsedFormData.carouselImages2 && Array.isArray(parsedFormData.carouselImages2) && parsedFormData.carouselImages2.length > 0 && typeof parsedFormData.carouselImages2[0] === 'string' && parsedFormData.carouselImages2[0].startsWith('data:image')) {
              return { ...cell, type: 'image', value: parsedFormData.carouselImages2[0], content: cell.content };
            }
            // Add checks for other image cells (10, 11, 12, 13, 14, 15, 16)
             if (cell.i === '10' && parsedFormData.fotoTexto1 && typeof parsedFormData.fotoTexto1 === 'string' && parsedFormData.fotoTexto1.startsWith('data:image')) {
              return { ...cell, type: 'fotoTexto', value: { ...cell.value, image: parsedFormData.fotoTexto1 } };
            }
             if (cell.i === '11' && parsedFormData.fotoTexto2 && typeof parsedFormData.fotoTexto2 === 'string' && parsedFormData.fotoTexto2.startsWith('data:image')) {
              return { ...cell, type: 'fotoTexto', value: { ...cell.value, image: parsedFormData.fotoTexto2 } };
            }
             if (cell.i === '12' && parsedFormData.fotoTexto3 && typeof parsedFormData.fotoTexto3 === 'string' && parsedFormData.fotoTexto3.startsWith('data:image')) {
              return { ...cell, type: 'fotoTexto', value: { ...cell.value, image: parsedFormData.fotoTexto3 } };
            }
             if (cell.i === '13' && parsedFormData.carouselVerticalImages && Array.isArray(parsedFormData.carouselVerticalImages) && parsedFormData.carouselVerticalImages.length > 0) {
              return { ...cell, type: 'verticalCarousel', value: parsedFormData.carouselVerticalImages };
            }
             if (cell.i === '14' && parsedFormData.carouselHorizontalImages && Array.isArray(parsedFormData.carouselHorizontalImages) && parsedFormData.carouselHorizontalImages.length > 0) {
              return { ...cell, type: 'horizontalCarousel', value: parsedFormData.carouselHorizontalImages };
            }
             if (cell.i === '15' && parsedFormData.carouselVerticalImages2 && Array.isArray(parsedFormData.carouselVerticalImages2) && parsedFormData.carouselVerticalImages2.length > 0) {
              return { ...cell, type: 'verticalCarousel', value: parsedFormData.carouselVerticalImages2 };
            }
             if (cell.i === '16' && parsedFormData.carouselHorizontalImages2 && Array.isArray(parsedFormData.carouselHorizontalImages2) && parsedFormData.carouselHorizontalImages2.length > 0) {
              return { ...cell, type: 'horizontalCarousel', value: parsedFormData.carouselHorizontalImages2 };
            }
            // Set values for cells 6, 7, 8, 9 based on formData
             if (cell.i === '6' && parsedFormData.title) {
              return { 
                ...cell, 
                type: 'text', // Type remains text, content will be rendered by renderCellContent
                value: {
                  title: parsedFormData.title,
                  businessType: parsedFormData.businessType,
                  address: parsedFormData.address,
                  phone: parsedFormData.phone,
                  email: parsedFormData.email
                }
              };
            }
             if (cell.i === '7' && parsedFormData.services) {
              return { ...cell, type: 'services', value: parsedFormData.services };
            }
             if (cell.i === '8' && parsedFormData.reservas) {
              return { ...cell, type: 'reservas', value: parsedFormData.reservas };
            }
             if (cell.i === '9' && parsedFormData.calendario) {
              return { 
                ...cell, 
                type: 'calendar',
                value: { tipo: parsedFormData.calendario, url: parsedFormData.calendarioUrl }
              };
            }

            // If cell type was image but value is invalid, revert to text
            if (cell.type === 'image' && (!cell.value || typeof cell.value !== 'string' || !cell.value.startsWith('data:image'))) {
                 console.warn(`Cell ${cell.i} had invalid image value. Reverting to text.`);
                 return { ...cell, type: 'text', value: cell.content || 'CONTENIDO' }; // Revert to text content
             }

            return cell;
          });
          // Update social links, carousel images, and video data from formData
          setSocialLinks(initialFormData.socialLinks || {});
          setCarouselImages(initialFormData.carouselImages || []);
          setCarouselImages2(initialFormData.carouselImages2 || []);
          setVideoUrl(initialFormData.videoUrl || "");
          setVideoFile(initialFormData.videoFile || "");

        } catch (error) {
          console.error('Error parsing formData from IndexedDB. Using default social links and image handling.', error);
        }
      }

      setLayout(initialLayout);
      setMovableCells(initialMovableCells);
    };

    loadInitialData();
  }, []);

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
    // Saving layout to IndexedDB is optional here, as it's primarily handled by FormTemplate
    // If needed, uncomment the line below:
    // saveData('layout', newLayout).catch(e => console.error('Error saving layout to IndexedDB:', e));
  };

  const renderCellContent = (cell) => {
    const cellContent = JSON.parse(JSON.stringify(cell));
    const cellKey = `cell-${cell.i}`;

    if (cell.type === 'image' && cell.value && typeof cell.value === 'string' && cell.value.startsWith('data:image')) {
      console.log(`Rendering image for cell ${cell.i}. Value:`, cell.value.substring(0, 50) + '...');
      return (
        <div key={`${cellKey}-image-container`} style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff"}}>
          <img
            key={`${cellKey}-image`}
            src={cell.value}
            alt={cell.content}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
            onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }}
          />
        </div>
      );
    }

    if (cell.type === 'video' && cell.value) {
      const getEmbedUrl = (url) => {
        if (!url) return null;
        
        // Handle YouTube URLs
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
          const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)?.[1];
          return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        }
        
        // Handle Vimeo URLs
        if (url.includes('vimeo.com')) {
          const videoId = url.match(/(?:vimeo\.com\/)(\d+)/i)?.[1];
          return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
        }
        
        return null;
      };

      const embedUrl = getEmbedUrl(cell.value);

      return (
        <div key={`${cellKey}-video`} style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFE4E1",
          borderRadius: "8px",
          overflow: "hidden",
          padding: "0.5rem"
        }}>
          {cell.videoType === 'url' && embedUrl ? (
            <iframe
              key={`${cellKey}-iframe`}
              width="100%"
              height="100%"
              src={embedUrl}
              title="Video Corporativo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            />
          ) : cell.videoType === 'file' && cell.value.startsWith('data:video') ? (
            <video
              key={`${cellKey}-video`}
              width="100%"
              height="100%"
              controls
              style={{
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              <source src={cell.value} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          ) : (
            <div style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.1rem",
              wordWrap: "break-word",
              color: "#333",
              padding: "1rem"
            }}>
              {cell.content}
            </div>
          )}
        </div>
      );
    }

    if (cell.i === '6' && cell.value) {
      return (
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
          gap: "4px",
          padding: "8px",
          background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          overflow: "hidden",
          minHeight: "0",
          flex: "1 1 auto",
          position: "relative"
        }}>
          <h3 style={{ 
            margin: "0", 
            color: "#FFFFFF", 
            fontSize: "clamp(0.8rem, 2vw, 1.2rem)", 
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            fontWeight: "bold",
            lineHeight: "1.2",
            padding: "2px 0",
            flex: "0 0 auto"
          }}>
            {cell.value.title}
          </h3>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "3px",
            width: "100%",
            fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
            color: "#FFFFFF",
            flex: "1 1 auto",
            overflow: "auto",
            minHeight: "0"
          }}>
            <p style={{ 
              margin: "0", 
              display: "flex", 
              alignItems: "center", 
              gap: "6px",
              backgroundColor: "rgba(255,255,255,0.2)",
              padding: "2px 6px",
              borderRadius: "4px",
              lineHeight: "1.2",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: "0 0 auto"
            }}>
              <i className="fas fa-building" style={{ color: "#FFD700", flexShrink: "0" }}></i>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{cell.value.businessType}</span>
            </p>
            <p style={{ 
              margin: "0", 
              display: "flex", 
              alignItems: "center", 
              gap: "6px",
              backgroundColor: "rgba(255,255,255,0.2)",
              padding: "2px 6px",
              borderRadius: "4px",
              lineHeight: "1.2",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: "0 0 auto"
            }}>
              <i className="fas fa-map-marker-alt" style={{ color: "#FFD700", flexShrink: "0" }}></i>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{cell.value.address}</span>
            </p>
            <p style={{ 
              margin: "0", 
              display: "flex", 
              alignItems: "center", 
              gap: "6px",
              backgroundColor: "rgba(255,255,255,0.2)",
              padding: "2px 6px",
              borderRadius: "4px",
              lineHeight: "1.2",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: "0 0 auto"
            }}>
              <i className="fas fa-phone" style={{ color: "#FFD700", flexShrink: "0" }}></i>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{cell.value.phone}</span>
            </p>
            <p style={{ 
              margin: "0", 
              display: "flex", 
              alignItems: "center", 
              gap: "6px",
              backgroundColor: "rgba(255,255,255,0.2)",
              padding: "2px 6px",
              borderRadius: "4px",
              lineHeight: "1.2",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: "0 0 auto"
            }}>
              <i className="fas fa-envelope" style={{ color: "#FFD700", flexShrink: "0" }}></i>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{cell.value.email}</span>
            </p>
          </div>
        </div>
      );
    }

    if (cell.i === '7' && cell.value) {
      return (
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
          gap: "4px",
          padding: "8px",
          background: "linear-gradient(135deg, #4ECDC4, #2B7A78)",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          overflow: "hidden",
          minHeight: "0",
          flex: "1 1 auto",
          position: "relative"
        }}>
          <h3 style={{ 
            margin: "0", 
            color: "#FFFFFF", 
            fontSize: "clamp(0.8rem, 2vw, 1.2rem)", 
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            fontWeight: "bold",
            lineHeight: "1.2",
            padding: "2px 0",
            flex: "0 0 auto"
          }}>
            Productos y Servicios
          </h3>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "3px",
            width: "100%",
            fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
            color: "#FFFFFF",
            flex: "1 1 auto",
            overflow: "auto",
            minHeight: "0"
          }}>
            {cell.value.map((service, index) => (
              <div key={index} style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: "4px",
                padding: "4px",
                display: "flex",
                flexDirection: "column",
                gap: "2px"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  lineHeight: "1.2",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  <i className="fas fa-star" style={{ color: "#FFD700", flexShrink: "0" }}></i>
                  <span style={{ 
                    overflow: "hidden", 
                    textOverflow: "ellipsis",
                    fontWeight: "bold"
                  }}>
                    {service.name}
                  </span>
                </div>
                {service.description && (
                  <div style={{
                    fontSize: "0.9em",
                    paddingLeft: "20px",
                    lineHeight: "1.2",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    whiteSpace: "normal"
                  }}>
                    {service.description}
                  </div>
                )}
                {service.carouselImagesServicio && (
                  <div style={{
                    width: "100%",
                    height: "60px",
                    marginTop: "4px",
                    borderRadius: "4px",
                    overflow: "hidden"
                  }}>
                    <img 
                      src={service.carouselImagesServicio} 
                      alt={service.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (cell.i === '8' && cell.value) {
      console.log('ReservationCell received cell:', cell);
      return <ReservationCell cell={cell} />;
    }

    if (cell.i === '9' && cell.value) {
      const renderCalendar = () => {
        switch (cell.value.tipo) {
          case 'google':
            return (
              <iframe
                src={cell.value.url || "https://calendar.google.com/calendar/embed?src=primary"}
                style={{
                  border: 0,
                  width: "100%",
                  height: "100%",
                  frameborder: "0",
                  scrolling: "no"
                }}
                title="Google Calendar"
              />
            );
          case 'outlook':
            return (
              <iframe
                src={cell.value.url || "https://outlook.live.com/calendar/0/deeplink"}
                style={{
                  border: 0,
                  width: "100%",
                  height: "100%",
                  frameborder: "0",
                  scrolling: "no"
                }}
                title="Outlook Calendar"
              />
            );
          case 'ical':
            return (
              <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "8px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px"
              }}>
                <i className="fas fa-calendar-alt" style={{ fontSize: "2rem", color: "#007bff" }}></i>
                <h3 style={{ margin: "0", color: "#333", fontSize: "1.1rem", textAlign: "center" }}>
                  Calendario iCal
                </h3>
                <p style={{ margin: "0", color: "#666", fontSize: "0.9rem", textAlign: "center" }}>
                  {cell.value.url ? (
                    <a 
                      href={cell.value.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#007bff",
                        textDecoration: "none",
                        padding: "8px 16px",
                        backgroundColor: "#fff",
                        borderRadius: "4px",
                        border: "1px solid #007bff"
                      }}
                    >
                      Ver Calendario
                    </a>
                  ) : (
                    "No hay URL de calendario configurada"
                  )}
                </p>
              </div>
            );
          default:
            return (
              <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "8px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px"
              }}>
                <i className="fas fa-calendar" style={{ fontSize: "2rem", color: "#6c757d" }}></i>
                <h3 style={{ margin: "0", color: "#333", fontSize: "1.1rem", textAlign: "center" }}>
                  Calendario de Eventos
                </h3>
                <p style={{ margin: "0", color: "#666", fontSize: "0.9rem", textAlign: "center" }}>
                  Selecciona un tipo de calendario en el formulario
                </p>
              </div>
            );
        }
      };

      return (
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
          gap: "4px",
          padding: "8px",
          background: "linear-gradient(135deg, #D5BAFF, #9D4EDD)",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          overflow: "hidden",
          minHeight: "0",
          flex: "1 1 auto",
          position: "relative"
        }}>
          {renderCalendar()}
        </div>
      );
    }

    if (cell.i === '10' && cell.value) {
      return (
        <div style={{
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
        }}>
          {cell.value.image && (
            <img
              src={cell.value.image}
              alt="Foto 1"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          )}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            background: "rgba(0, 0, 0, 0.4)",
            color: cell.value.textColor || "#FFFFFF",
            fontFamily: cell.value.fontFamily || "Arial"
          }}>
            {cell.value.title && (
              <h3 style={{
                margin: "0 0 8px 0",
                fontSize: "clamp(1.2rem, 3vw, 2rem)",
                textAlign: "center",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                fontWeight: "bold",
                color: cell.value.textColor || "#FFFFFF",
                fontFamily: cell.value.fontFamily || "Arial"
              }}>
                {cell.value.title}
              </h3>
            )}
            {cell.value.description && (
              <p style={{
                margin: "0",
                fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
                textAlign: "center",
                lineHeight: "1.4",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                color: cell.value.textColor || "#FFFFFF",
                fontFamily: cell.value.fontFamily || "Arial"
              }}>
                {cell.value.description}
              </p>
            )}
          </div>
        </div>
      );
    }

    if (cell.i === '11' && cell.value) {
      return (
        <div style={{
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
        }}>
          {cell.value.image && (
            <img
              src={cell.value.image}
              alt="Foto 2"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          )}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            background: "rgba(0, 0, 0, 0.4)",
            color: cell.value.textColor || "#FFFFFF",
            fontFamily: cell.value.fontFamily || "Arial"
          }}>
            {cell.value.title && (
              <h3 style={{
                margin: "0 0 8px 0",
                fontSize: "clamp(1.2rem, 3vw, 2rem)",
                textAlign: "center",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                fontWeight: "bold",
                color: cell.value.textColor || "#FFFFFF",
                fontFamily: cell.value.fontFamily || "Arial"
              }}>
                {cell.value.title}
              </h3>
            )}
            {cell.value.description && (
              <p style={{
                margin: "0",
                fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
                textAlign: "center",
                lineHeight: "1.4",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                color: cell.value.textColor || "#FFFFFF",
                fontFamily: cell.value.fontFamily || "Arial"
              }}>
                {cell.value.description}
              </p>
            )}
          </div>
        </div>
      );
    }

    if (cell.i === '12' && cell.value) {
      return (
        <div style={{
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
        }}>
          {cell.value.image && (
            <img
              src={cell.value.image}
              alt="Foto 3"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          )}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            background: "rgba(0, 0, 0, 0.4)",
            color: cell.value.textColor || "#FFFFFF",
            fontFamily: cell.value.fontFamily || "Arial"
          }}>
            {cell.value.title && (
              <h3 style={{
                margin: "0 0 8px 0",
                fontSize: "clamp(1.2rem, 3vw, 2rem)",
                textAlign: "center",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                fontWeight: "bold",
                color: cell.value.textColor || "#FFFFFF",
                fontFamily: cell.value.fontFamily || "Arial"
              }}>
                {cell.value.title}
              </h3>
            )}
            {cell.value.description && (
              <p style={{
                margin: "0",
                fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
                textAlign: "center",
                lineHeight: "1.4",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                color: cell.value.textColor || "#FFFFFF",
                fontFamily: cell.value.fontFamily || "Arial"
              }}>
                {cell.value.description}
              </p>
            )}
          </div>
        </div>
      );
    }

    if (cell.i === '13' && cell.value && cell.value.length > 0) {
      const verticalCarouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        vertical: true,
        verticalSwiping: true,
        arrows: true,
        adaptiveHeight: true
      };

      return (
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #E0BBE4, #957DAD)", // Soft purple gradient
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          overflow: "hidden",
          padding: "8px",
          position: "relative"
        }}>
          <h3 style={{
            margin: "0 0 10px 0",
            color: "#FFFFFF",
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
            textAlign: "center",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            fontWeight: "bold"
          }}>
            Nuestras Novedades
          </h3>
          <div style={{ flex: "1", width: "100%", overflow: "hidden" }}>
            <Slider {...verticalCarouselSettings} style={{ width: "100%", height: "100%" }}>
              {cell.value.map((image, index) => (
                !!image && typeof image === 'string' && image.startsWith('data:image') && (
                  <div key={index} style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "5px"
                  }}>
                    <img
                      src={image}
                      alt={`Carrusel Vertical ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                      }}
                      onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }} // Hide broken images
                    />
                  </div>
                )
              ))}
            </Slider>
          </div>
        </div>
      );
    }

    if (cell.i === '14' && cell.value && cell.value.length > 0) {
      const horizontalCarouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        adaptiveHeight: true
      };

      return (
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FFDFD3, #FFA07A)", // Soft orange gradient
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          overflow: "hidden",
          padding: "8px",
          position: "relative"
        }}>
          <h3 style={{
            margin: "0 0 10px 0",
            color: "#FFFFFF",
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
            textAlign: "center",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            fontWeight: "bold"
          }}>
            Galería de Imágenes
          </h3>
          <div style={{ flex: "1", width: "100%", overflow: "hidden" }}>
            <Slider {...horizontalCarouselSettings} style={{ width: "100%", height: "100%" }}>
              {cell.value.map((image, index) => (
                !!image && typeof image === 'string' && image.startsWith('data:image') && (
                  <div key={index} style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "5px"
                  }}>
                    <img
                      src={image}
                      alt={`Carrusel Horizontal ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                      }}
                      onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }} // Hide broken images
                    />
                  </div>
                )
              ))}
            </Slider>
          </div>
        </div>
      );
    }

    if (cell.i === '15' && cell.value && cell.value.length > 0) {
      const verticalCarouselSettings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        vertical: true,
        verticalSwiping: true,
        arrows: true,
        adaptiveHeight: true
      };

      return (
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #CDEAC0, #83C5BE)", // Soft green gradient
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          overflow: "hidden",
          padding: "8px",
          position: "relative"
        }}>
          <h3 style={{
            margin: "0 0 10px 0",
            color: "#FFFFFF",
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
            textAlign: "center",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            fontWeight: "bold"
          }}>
            Eventos y Promociones
          </h3>
          <div style={{ flex: "1", width: "100%", overflow: "hidden" }}>
            <Slider {...verticalCarouselSettings2} style={{ width: "100%", height: "100%" }}>
              {cell.value.map((image, index) => (
                !!image && typeof image === 'string' && image.startsWith('data:image') && (
                  <div key={index} style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "5px"
                  }}>
                    <img
                      src={image}
                      alt={`Carrusel Vertical 2 ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                      }}
                      onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }} // Hide broken images
                    />
                  </div>
                )
              ))}
            </Slider>
          </div>
        </div>
      );
    }

    if (cell.i === '16' && cell.value && cell.value.length > 0) {
      const horizontalCarouselSettings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        adaptiveHeight: true
      };

      return (
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #B5EAD7, #79BB9A)", // Soft teal gradient
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          overflow: "hidden",
          padding: "8px",
          position: "relative"
        }}>
          <h3 style={{
            margin: "0 0 10px 0",
            color: "#FFFFFF",
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
            textAlign: "center",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            fontWeight: "bold"
          }}>
            Nuevos Proyectos
          </h3>
          <div style={{ flex: "1", width: "100%", overflow: "hidden" }}>
            <Slider {...horizontalCarouselSettings2} style={{ width: "100%", height: "100%" }}>
              {cell.value.map((image, index) => (
                !!image && typeof image === 'string' && image.startsWith('data:image') && (
                  <div key={index} style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "5px"
                  }}>
                    <img
                      src={image}
                      alt={`Carrusel Horizontal 2 ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                      }}
                      onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }} // Hide broken images
                    />
                  </div>
                )
              ))}
            </Slider>
          </div>
        </div>
      );
    }

    const normalizedContent = cellContent.content ? cellContent.content.trim().toUpperCase() : '';

    switch (normalizedContent) {
      case "LOGO":
        // This case is likely not needed if cell.type is 'image' with a valid logo
        // But keeping it as a fallback with a default image
        return (
          <div key={`${cellKey}-logo-default`} style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff"}}>
            <img
              key={`${cellKey}-default-img`}
              src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" // Default logo
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        );
      case "REDES SOCIALES": // Updated case to match the actual content
        return (
          <div key={`${cellKey}-redes`} style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            justifyContent: "center", 
            alignItems: "center", 
            gap: "0.5rem", 
            padding: "0.5rem", 
            fontSize: "1.8rem", 
            backgroundColor: "#FFE4E1", // Cambiado a rosa pastel
            borderRadius: "8px",
            width: "100%",
            height: "100%",
            overflow: "hidden"
          }}>
            <a 
              href={socialLinks.whatsapp || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                color: "#25D366", 
                opacity: socialLinks.whatsapp ? 1 : 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                textDecoration: "none"
              }}
            >
              <FaWhatsapp />
            </a>
            <a 
              href={socialLinks.facebook || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                color: "#1877F2", 
                opacity: socialLinks.facebook ? 1 : 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                textDecoration: "none"
              }}
            >
              <FaFacebookF />
            </a>
            <a 
              href={socialLinks.instagram || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                color: "#E4405F", 
                opacity: socialLinks.instagram ? 1 : 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                textDecoration: "none"
              }}
            >
              <FaInstagram />
            </a>
            <a 
              href={socialLinks.twitter || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                color: "#1DA1F2", 
                opacity: socialLinks.twitter ? 1 : 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                textDecoration: "none"
              }}
            >
              <FaTwitter />
            </a>
            <a 
              href={socialLinks.pinterest || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                color: "#BD081C", 
                opacity: socialLinks.pinterest ? 1 : 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                textDecoration: "none"
              }}
            >
              <FaPinterestP />
            </a>
            <a 
              href={socialLinks.youtube || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                color: "#FF0000", 
                opacity: socialLinks.youtube ? 1 : 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                textDecoration: "none"
              }}
            >
              <FaYoutube />
            </a>
            <a 
              href={socialLinks.linkedin || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                color: "#0A66C2", 
                opacity: socialLinks.linkedin ? 1 : 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                textDecoration: "none"
              }}
            >
              <FaLinkedinIn />
            </a>
            <a 
              href={socialLinks.tiktok || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                color: "#000000", 
                opacity: socialLinks.tiktok ? 1 : 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                textDecoration: "none"
              }}
            >
              <FaTiktok />
            </a>
          </div>
        );
      case "VIDEO CORPORATIVO":
        return (
          <div key={`${cellKey}-video`} style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFE4E1",
            borderRadius: "8px",
            overflow: "hidden",
            padding: "0.5rem"
          }}>
            {videoUrl ? (
              <iframe
                key={`${cellKey}-iframe`}
                width="100%"
                height="100%"
                src={videoUrl}
                title="Video Corporativo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              />
            ) : videoFile ? (
              <video
                key={`${cellKey}-video`}
                width="100%"
                height="100%"
                controls
                style={{
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <source src={videoFile} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            ) : (
              <div style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.1rem",
                wordWrap: "break-word",
                color: "#333",
                padding: "1rem"
              }}>
                {cell.content}
              </div>
            )}
          </div>
        );
      case "PUBLICIDAD 1":
        const carouselSettings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: true,
          adaptiveHeight: true
        };

        return (
          <div key={`${cellKey}-publicidad1`} style={{ 
            width: "100%", 
            height: "100%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            backgroundColor: "#FFE4E1",
            borderRadius: "8px",
            overflow: "hidden",
            padding: "0.5rem"
          }}>
            {carouselImages.length > 0 ? (
              <Slider {...carouselSettings} style={{ width: "100%", height: "100%" }}>
                {carouselImages.map((image, index) => (
                  <div key={`carousel-image-${index}`} style={{ 
                    width: "100%", 
                    height: "100%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center" 
                  }}>
                    <img
                      src={image}
                      alt={`Publicidad ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                        maxWidth: "100%",
                        maxHeight: "100%"
                      }}
                      onError={e => { 
                        e.target.onerror = null; 
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.1rem",
                wordWrap: "break-word",
                color: "#333"
              }}>
                {cell.content}
              </div>
            )}
          </div>
        );
      case "PUBLICIDAD 2":
        const carouselSettings2 = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: true,
          adaptiveHeight: true
        };

        return (
          <div key={`${cellKey}-publicidad2`} style={{ 
            width: "100%", 
            height: "100%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            backgroundColor: "#FFE4E1",
            borderRadius: "8px",
            overflow: "hidden",
            padding: "0.5rem"
          }}>
            {carouselImages2.length > 0 ? (
              <Slider {...carouselSettings2} style={{ width: "100%", height: "100%" }}>
                {carouselImages2.map((image, index) => (
                  <div key={`carousel2-image-${index}`} style={{ 
                    width: "100%", 
                    height: "100%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center" 
                  }}>
                    <img
                      src={image}
                      alt={`Publicidad 2 - ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                        maxWidth: "100%",
                        maxHeight: "100%"
                      }}
                      onError={e => { 
                        e.target.onerror = null; 
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.1rem",
                wordWrap: "break-word",
                color: "#333"
              }}>
                {cell.content}
              </div>
            )}
          </div>
        );
      default:
        return (
          <div
            key={`${cellKey}-default`}
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.1rem",
              wordWrap: "break-word",
            }}
          >
            {cell.content}
          </div>
        );
    }
  };

  return (
    <div className="template" style={{ padding: "1rem" }}>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={150}
        width={1200}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".react-grid-item"
        isDraggable={true}
        isResizable={true}
      >
        {console.log('Rendering movableCells:', movableCells)}
        {movableCells.map((cell) => {
          if (cell.i === '8') {
            console.log('ReservationCell received cell:', cell);
          }
          const cellContent = JSON.parse(JSON.stringify(cell));
          return (
            <div
              key={cell.i}
              className="react-grid-item"
              style={{
                backgroundColor: cell.bgColor,
                display: "flex",
                justifyContent: cell.content === "REDES" ? "flex-start" : "center",
                alignItems: cell.content === "REDES" ? "flex-start" : "center",
                border: "1px solid #ccc",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              {renderCellContent(cell)}
            </div>
          );
        })}
      </ResponsiveGridLayout>

      <footer style={{ marginTop: "2rem", textAlign: "center" }}>
        <hr />
        <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
      </footer>

      {/* TEMPORARY DEBUGGING: Render ReservationCell outside grid */}
      {/* Uncomment this block to test the ReservationCell independently */}
      {/*
      <div style={{ 
        marginTop: '50px', 
        padding: '20px', 
        border: '2px dashed red', 
        background: '#f0f0f0', 
        width: '400px', 
        height: '600px', 
        margin: 'auto'
      }}>
        <h3>Debug Reservation Cell (Outside Grid)</h3>
        <ReservationCell cell={movableCells.find(c => c.i === '8')} />
      </div>
      */}
    </div>
  );
};

export default GeneralRenderTemplate;
