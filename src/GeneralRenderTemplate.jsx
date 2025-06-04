import React, { useState, useEffect, useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube, FaLinkedinIn, FaPinterestP, FaTwitter } from "react-icons/fa";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

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

const GeneralRenderTemplate = () => {
  const [movableCells, setMovableCells] = useState(defaultMovableCells);
  const [layout, setLayout] = useState(defaultLayout);
  const [socialLinks, setSocialLinks] = useState({});
  const ResponsiveGridLayout = WidthProvider(Responsive);

  // Memoize the layout to prevent unnecessary recalculations
  const layouts = useMemo(() => ({
    lg: layout,
    md: layout,
    sm: layout,
    xs: layout,
    xxs: layout
  }), [layout]);

  // Load initial state from sessionStorage
  useEffect(() => {
    const storedMovableCells = window.sessionStorage.getItem('movableCells');
    const storedLayout = window.sessionStorage.getItem('layout');
    const storedFormData = window.sessionStorage.getItem('formData');

    if (storedLayout) {
      try {
        const parsedLayout = JSON.parse(storedLayout);
        setLayout(parsedLayout);
      } catch (error) {
        console.error('Error parsing layout:', error);
      }
    }

    if (storedMovableCells) {
      try {
        const parsedCells = JSON.parse(storedMovableCells);
        setMovableCells(parsedCells);
      } catch (error) {
        console.error('Error parsing movableCells:', error);
      }
    }

    if (storedFormData) {
      try {
        const parsedFormData = JSON.parse(storedFormData);
        // Guardar los enlaces sociales
        if (parsedFormData.socialLinks) {
          setSocialLinks(parsedFormData.socialLinks);
        }
        setMovableCells(prevCells => {
          return prevCells.map(cell => {
            if (cell.i === '1' && parsedFormData.logo) {
              return { ...cell, type: 'image', value: parsedFormData.logo, content: 'LOGO' };
            }
            if (cell.i === '3' && parsedFormData.carouselImages && parsedFormData.carouselImages.length > 0) {
              return { ...cell, type: 'image', value: parsedFormData.carouselImages[0], content: cell.content };
            }
            if (cell.i === '4' && parsedFormData.carouselImages2 && parsedFormData.carouselImages2.length > 0) {
              return { ...cell, type: 'image', value: parsedFormData.carouselImages2[0], content: cell.content };
            }
            if (cell.i === '10' && parsedFormData.fotoTexto1) {
              return { ...cell, type: 'image', value: parsedFormData.fotoTexto1, content: cell.content };
            }
            if (cell.i === '11' && parsedFormData.fotoTexto2) {
              return { ...cell, type: 'image', value: parsedFormData.fotoTexto2, content: cell.content };
            }
            if (cell.i === '12' && parsedFormData.fotoTexto3) {
              return { ...cell, type: 'image', value: parsedFormData.fotoTexto3, content: cell.content };
            }
            return cell;
          });
        });
      } catch (error) {
        console.error('Error parsing formData:', error);
      }
    }
  }, []);

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
    // Save layout to sessionStorage
    window.sessionStorage.setItem('layout', JSON.stringify(newLayout));
  };

  const renderCellContent = (cell) => {
    const cellContent = JSON.parse(JSON.stringify(cell));
    const cellKey = `cell-${cell.i}`;

    if (cell.type === 'image' && cell.value) {
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

    switch (cellContent.content) {
      case "LOGO":
        return (
          <div key={`${cellKey}-logo-default`} style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff"}}>
            <img
              key={`${cellKey}-default-img`}
              src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        );
      case "REDES":
        return (
          <div key={`${cellKey}-redes`} style={{ 
            display: "flex", 
            flexWrap: "wrap",
            justifyContent: "center", 
            alignItems: "center",
            gap: "1rem",
            padding: "1rem",
            fontSize: "2rem" 
          }}>
            <a 
              href={socialLinks.whatsapp || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "#25D366", opacity: socialLinks.whatsapp ? 1 : 0.5 }}
            >
              <FaWhatsapp />
            </a>
            <a 
              href={socialLinks.facebook || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "#1877F2", opacity: socialLinks.facebook ? 1 : 0.5 }}
            >
              <FaFacebookF />
            </a>
            <a 
              href={socialLinks.instagram || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "#E4405F", opacity: socialLinks.instagram ? 1 : 0.5 }}
            >
              <FaInstagram />
            </a>
            <a 
              href={socialLinks.youtube || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "#FF0000", opacity: socialLinks.youtube ? 1 : 0.5 }}
            >
              <FaYoutube />
            </a>
            <a 
              href={socialLinks.linkedin || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "#0A66C2", opacity: socialLinks.linkedin ? 1 : 0.5 }}
            >
              <FaLinkedinIn />
            </a>
            <a 
              href={socialLinks.tiktok || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "#000000", opacity: socialLinks.tiktok ? 1 : 0.5 }}
            >
              <FaTiktok />
            </a>
            <a 
              href={socialLinks.pinterest || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "#BD081C", opacity: socialLinks.pinterest ? 1 : 0.5 }}
            >
              <FaPinterestP />
            </a>
            <a 
              href={socialLinks.twitter || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "#1DA1F2", opacity: socialLinks.twitter ? 1 : 0.5 }}
            >
              <FaTwitter />
            </a>
          </div>
        );
      case "VIDEO CORPORATIVO":
        return (
          <div key={`${cellKey}-video`}>
            <iframe
              key={`${cellKey}-iframe`}
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video"
              frameBorder="0"
              allowFullScreen
            />
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
        {movableCells.map((cell) => (
          <div
            key={cell.i}
            className="react-grid-item"
            style={{
              backgroundColor: cell.bgColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ccc",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {renderCellContent(cell)}
          </div>
        ))}
      </ResponsiveGridLayout>

      <footer style={{ marginTop: "2rem", textAlign: "center" }}>
        <hr />
        <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default GeneralRenderTemplate;
