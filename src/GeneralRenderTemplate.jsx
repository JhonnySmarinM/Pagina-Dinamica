import React, { useState, useEffect, useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube, FaLinkedinIn, FaPinterestP, FaTwitter } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

  // Load initial state from sessionStorage
  useEffect(() => {
    const storedMovableCells = window.sessionStorage.getItem('movableCells');
    const storedLayout = window.sessionStorage.getItem('layout');
    const storedFormData = window.sessionStorage.getItem('formData');

    let initialMovableCells = defaultMovableCells;
    let initialLayout = defaultLayout;
    let initialSocialLinks = {};
    let initialFormData = {};

    if (storedLayout) {
      try {
        const parsedLayout = JSON.parse(storedLayout);
        // Validate layout structure basic check
        if (Array.isArray(parsedLayout) && parsedLayout.length === defaultLayout.length && parsedLayout.every(item => item.i && typeof item.x === 'number')) {
          initialLayout = parsedLayout;
        } else {
           console.warn('Invalid layout data in sessionStorage. Using defaultLayout.');
        }
      } catch (error) {
        console.error('Error parsing layout from sessionStorage. Using defaultLayout.', error);
      }
    }

    if (storedMovableCells) {
      try {
        const parsedCells = JSON.parse(storedMovableCells);
         // Validate cells structure basic check
        if (Array.isArray(parsedCells) && parsedCells.length === defaultMovableCells.length && parsedCells.every(cell => cell.i && cell.content && cell.bgColor)) {
           initialMovableCells = parsedCells;
        } else {
           console.warn('Invalid movableCells data in sessionStorage. Using defaultMovableCells.');
        }
      } catch (error) {
        console.error('Error parsing movableCells from sessionStorage. Using defaultMovableCells.', error);
      }
    }

    if (storedFormData) {
      try {
        const parsedFormData = JSON.parse(storedFormData);
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
          // Add checks for other image cells (10, 11, 12)
           if (cell.i === '10' && parsedFormData.fotoTexto1 && typeof parsedFormData.fotoTexto1 === 'string' && parsedFormData.fotoTexto1.startsWith('data:image')) {
            return { ...cell, type: 'image', value: parsedFormData.fotoTexto1, content: cell.content };
          }
           if (cell.i === '11' && parsedFormData.fotoTexto2 && typeof parsedFormData.fotoTexto2 === 'string' && parsedFormData.fotoTexto2.startsWith('data:image')) {
            return { ...cell, type: 'image', value: parsedFormData.fotoTexto2, content: cell.content };
          }
           if (cell.i === '12' && parsedFormData.fotoTexto3 && typeof parsedFormData.fotoTexto3 === 'string' && parsedFormData.fotoTexto3.startsWith('data:image')) {
            return { ...cell, type: 'image', value: parsedFormData.fotoTexto3, content: cell.content };
          }
          
          // If cell type was image but value is invalid, revert to text
          if (cell.type === 'image' && (!cell.value || typeof cell.value !== 'string' || !cell.value.startsWith('data:image'))) {
               console.warn(`Cell ${cell.i} had invalid image value. Reverting to text.`);
               return { ...cell, type: 'text', value: cell.content || 'CONTENIDO' }; // Revert to text content
           }

          return cell;
        });
      } catch (error) {
        console.error('Error parsing formData from sessionStorage. Using default social links and image handling.', error);
      }
    }

    setLayout(initialLayout);
    setMovableCells(initialMovableCells);
    setSocialLinks(initialSocialLinks);

  }, []);

  // Load carousel images from formData
  useEffect(() => {
    const storedFormData = window.sessionStorage.getItem('formData');
    if (storedFormData) {
      try {
        const parsedFormData = JSON.parse(storedFormData);
        if (parsedFormData.carouselImages && Array.isArray(parsedFormData.carouselImages)) {
          setCarouselImages(parsedFormData.carouselImages.filter(img => 
            typeof img === 'string' && img.startsWith('data:image')
          ));
        }
        if (parsedFormData.carouselImages2 && Array.isArray(parsedFormData.carouselImages2)) {
          setCarouselImages2(parsedFormData.carouselImages2.filter(img => 
            typeof img === 'string' && img.startsWith('data:image')
          ));
        }
      } catch (error) {
        console.error('Error parsing formData for carousel images:', error);
      }
    }
  }, []);

  // Load video data from formData
  useEffect(() => {
    const storedFormData = window.sessionStorage.getItem('formData');
    if (storedFormData) {
      try {
        const parsedFormData = JSON.parse(storedFormData);
        if (parsedFormData.videoUrl && typeof parsedFormData.videoUrl === 'string') {
          setVideoUrl(parsedFormData.videoUrl);
        }
        if (parsedFormData.videoFile && typeof parsedFormData.videoFile === 'string') {
          setVideoFile(parsedFormData.videoFile);
        }
      } catch (error) {
        console.error('Error parsing formData for video:', error);
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
          {embedUrl ? (
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
          ) : cell.value.startsWith('data:video') ? (
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
        {movableCells.map((cell) => (
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
