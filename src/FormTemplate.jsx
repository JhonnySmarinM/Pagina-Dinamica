// Importar módulos y hooks necesarios de React
import React, { useState, useEffect, useMemo } from "react";
// Importar hook para navegación programática
import { useNavigate } from "react-router-dom";
// Importar componentes de react-grid-layout
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Importar estilos CSS para este componente (o generales)
import "./App.css";

// Componente funcional FormTemplate que recibe data y gridLayout como props
function FormTemplate({ data = null, gridLayout = null }) {
  // Hook para la navegación programática
  const navigate = useNavigate();
  const ResponsiveGridLayout = WidthProvider(Responsive);

  // Función para manejar la generación de la página y navegar a la vista previa
  const handleGeneratePage = () => {
    // Actualizar las celdas movibles con los datos actuales
    const updatedMovableCells = formData.movableCells.map(cell => {
      // Handle LOGO cell (cell 1)
      if (cell.i === '1') {
        if (formData.logo && typeof formData.logo === 'string' && formData.logo.startsWith('data:image')) {
          return { ...cell, type: 'image', value: formData.logo, content: 'LOGO' };
        } else {
          return { ...cell, type: 'text', value: null, content: 'LOGO' };
        }
      }
      // Handle VIDEO CORPORATIVO cell (cell 5)
      if (cell.i === '5') {
        if (formData.videoUrl || formData.videoFile) {
          return { 
            ...cell, 
            type: 'video', 
            value: formData.videoUrl || formData.videoFile, 
            content: 'VIDEO CORPORATIVO' 
          };
        } else {
          return { ...cell, type: 'text', value: null, content: 'VIDEO CORPORATIVO' };
        }
      }
      // Handle PUBLICIDAD 1 cell (cell 3)
      if (cell.i === '3') {
         if (formData.carouselImages && Array.isArray(formData.carouselImages) && formData.carouselImages.length > 0 && typeof formData.carouselImages[0] === 'string' && formData.carouselImages[0].startsWith('data:image')) {
           return { ...cell, type: 'image', value: formData.carouselImages[0], content: cell.content };
         } else {
            return { ...cell, type: 'text', value: null, content: cell.content || 'PUBLICIDAD 1' };
         }
      }
      // Handle PUBLICIDAD 2 cell (cell 4)
      if (cell.i === '4') {
         if (formData.carouselImages2 && Array.isArray(formData.carouselImages2) && formData.carouselImages2.length > 0 && typeof formData.carouselImages2[0] === 'string' && formData.carouselImages2[0].startsWith('data:image')) {
           return { ...cell, type: 'image', value: formData.carouselImages2[0], content: cell.content };
         } else {
            return { ...cell, type: 'text', value: null, content: cell.content || 'PUBLICIDAD 2' };
         }
      }
      // Handle FOTO/TEXTO 1 cell (cell 10)
      if (cell.i === '10') {
         if (formData.fotoTexto1 && typeof formData.fotoTexto1 === 'string' && formData.fotoTexto1.startsWith('data:image')) {
           return { ...cell, type: 'image', value: formData.fotoTexto1, content: cell.content };
         } else {
            return { ...cell, type: 'text', value: null, content: cell.content || 'FOTO/TEXTO 1' };
         }
      }
      // Handle FOTO/TEXTO 2 cell (cell 11)
      if (cell.i === '11') {
         if (formData.fotoTexto2 && typeof formData.fotoTexto2 === 'string' && formData.fotoTexto2.startsWith('data:image')) {
           return { ...cell, type: 'image', value: formData.fotoTexto2, content: cell.content };
         } else {
            return { ...cell, type: 'text', value: null, content: cell.content || 'FOTO/TEXTO 2' };
         }
      }
      // Handle FOTO/TEXTO 3 cell (cell 12)
      if (cell.i === '12') {
         if (formData.fotoTexto3 && typeof formData.fotoTexto3 === 'string' && formData.fotoTexto3.startsWith('data:image')) {
           return { ...cell, type: 'image', value: formData.fotoTexto3, content: cell.content };
         } else {
            return { ...cell, type: 'text', value: null, content: cell.content || 'FOTO/TEXTO 3' };
         }
      }
      
      // For other cells, return as is
      return cell;
    });

    console.log('Guardando movableCells en handleGeneratePage:', updatedMovableCells); // Debug log
    // Guardar los datos actualizados en sessionStorage
    window.sessionStorage.setItem('movableCells', JSON.stringify(updatedMovableCells));
    window.sessionStorage.setItem('formData', JSON.stringify(formData));
    navigate("/webtemplateCreate");
  };

  // Obtener la URL current para extraer el ID si existe (para edición)
  const url = window.location.href;
  // Extraer el ID de la URL (asumiendo que es el tercer segmento)
  const id = url.split("/")[3];

  // Encontrar los datos correspondientes al ID si la prop data existe
  const selectedData = data && Array.isArray(data) && data.length > 0 
    ? data.find(item => item.id === parseInt(id)) || data[0] 
    : null;
  // console.log("selectedData---------|||------------", selectedData); // Log de los datos seleccionados

  // Estado local para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    title: selectedData?.title || "Mi Empresa",
    businessType: selectedData?.businessType || "Tipo de Negocio",
    address: selectedData?.address || "Dirección",
    phone: selectedData?.phone || "Teléfono",
    email: selectedData?.email || "correo@ejemplo.com",
    socialLinks: selectedData?.socialLinks || {
      whatsapp: "",
      facebook: "",
      instagram: "",
      youtube: "",
      linkedin: "",
      tiktok: "",
      pinterest: "",
      twitter: "",
    },
    logo: selectedData?.logo || "",
    backgroundImage: selectedData?.backgroundImage || "",
    carouselImages: selectedData?.carouselImages || [],
    carouselImages2: selectedData?.carouselImages2 || [],
    videoUrl: selectedData?.videoUrl || "",
    videoFile: selectedData?.videoFile || "",
    services: selectedData?.services || [{ name: "Servicio 1", description: "Descripción del servicio 1", carouselImagesServicio: "" }],
    centralCarousel: selectedData?.centralCarousel || [{ image: "", description: "Descripción 1" }],
    emailClient: selectedData?.emailClient || "",
    // Initialize movableCells with default structure, then potentially overwrite with loaded data
    movableCells: selectedData?.movableCells && Array.isArray(selectedData.movableCells) && selectedData.movableCells.length === 16 
      ? selectedData.movableCells 
      : [
          { i: '1', x: 0, y: 0, w: 1, h: 1, content: 'LOGO', bgColor: '#D3D3D3', type: 'text' },
          { i: '2', x: 1, y: 0, w: 1, h: 1, content: 'REDES SOCIALES', bgColor: '#FFE4E1', type: 'social' },
          { i: '3', x: 2, y: 0, w: 1, h: 1, content: 'PUBLICIDAD 1', bgColor: '#A89C5D', type: 'text' },
          { i: '4', x: 3, y: 0, w: 1, h: 1, content: 'PUBLICIDAD 2', bgColor: '#FFC300', type: 'text' },
          { i: '5', x: 0, y: 1, w: 1, h: 1, content: 'VIDEO CORPORATIVO', bgColor: '#00BFFF', type: 'text' },
          { i: '6', x: 1, y: 1, w: 1, h: 1, content: 'EMPRESA', bgColor: '#295A6D', type: 'text' },
          { i: '7', x: 2, y: 1, w: 1, h: 1, content: 'PRODUCTOS Y SERVICIOS', bgColor: '#2B7A78', type: 'text' },
          { i: '8', x: 3, y: 1, w: 1, h: 1, content: 'RESERVAS', bgColor: '#FF6F00', type: 'text' },
          { i: '9', x: 0, y: 2, w: 1, h: 1, content: 'CALENDARIO', bgColor: '#FFFFFF', type: 'text' },
          { i: '10', x: 1, y: 2, w: 1, h: 1, content: 'FOTO/TEXTO 1', bgColor: '#BDB89B', type: 'text' },
          { i: '11', x: 2, y: 2, w: 1, h: 1, content: 'FOTO/TEXTO 2', bgColor: '#BDB89B', type: 'text' },
          { i: '12', x: 3, y: 2, w: 1, h: 1, content: 'FOTO/TEXTO 3', bgColor: '#BDB89B', type: 'text' },
          { i: '13', x: 0, y: 3, w: 1, h: 1, content: 'SLIDE 1', bgColor: '#FF8000', type: 'text' },
          { i: '14', x: 1, y: 3, w: 1, h: 1, content: 'SLIDE 2', bgColor: '#FF8000', type: 'text' },
          { i: '15', x: 2, y: 3, w: 1, h: 1, content: 'SLIDE 3', bgColor: '#FF8000', type: 'text' },
          { i: '16', x: 3, y: 3, w: 1, h: 1, content: 'SLIDE 4', bgColor: '#FF8000', type: 'text' }
        ]
  });

  // Estado para controlar la previsualización (no parece usarse actualmente)
  const [preview, setPreview] = useState(false);
  // Estado para controlar qué sección del acordeón está activa
  const [activeAccordion, setActiveAccordion] = useState(null);
  // Estado para almacenar la celda que se está arrastrando
  const [draggedCell, setDraggedCell] = useState(null);

  // Función para alternar la visibilidad de una sección del acordeón
  const toggleAccordion = (section) => {
    setActiveAccordion((prev) => (prev === section ? null : section));
  };

  // Manejador genérico para cambios en inputs simples (text, email, tel, select)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Actualizar el campo correspondiente en formData
    }));
  };

  // Manejador para cambios en los inputs de redes sociales
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      socialLinks: { // Actualizar el objeto socialLinks
        ...prevData.socialLinks,
        [name]: value, // Actualizar el campo específico de socialLinks
      },
    }));
  };

  // Manejador para carga de archivos (logo, backgroundImage)
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new window.FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          [type]: reader.result,
        }));
        // Forzar actualización del input file para que el evento change siempre se dispare
        if (e.target) {
          e.target.type = "";
          e.target.type = "file";
        }
      };
      reader.readAsDataURL(file); // Leer el archivo como URL de datos (Base64)
    }
  };

  // Manejador para carga de múltiples imágenes para el carrusel 1
  const handleCarouselImagesChange = (e) => {
    const files = Array.from(e.target.files);
    // Crear un array de promesas para leer cada archivo como URL de datos
    const readers = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    // Esperar a que todas las promesas se resuelvan (todos los archivos leídos)
    Promise.all(readers).then((images) => {
      setFormData((prevData) => ({
        ...prevData,
        carouselImages: [...prevData.carouselImages, ...images], // Añadir las nuevas imágenes al array existente
      }));
    });
  };

  // Manejador para carga de múltiples imágenes para el carrusel 2 (similar al anterior)
  const handleCarouselImagesChange2 = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((images) => {
      setFormData((prevData) => ({
        ...prevData,
        carouselImages2: [...prevData.carouselImages2, ...images], // Añadir las nuevas imágenes al array existente
      }));
    });
  };

  // Manejador para cambios en los campos de un servicio específico (nombre, descripción)
  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...formData.services];
    updatedServices[index][name] = value; // Actualizar el campo del servicio en el índice especificado
    setFormData((prevData) => ({
      ...prevData,
      services: updatedServices,
    }));
  };

  // Manejador para carga de imagen de un servicio específico
  const handleServiceImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedServices = [...formData.services];
        updatedServices[index].carouselImagesServicio = reader.result; // Almacenar la imagen (Base64) del servicio
        setFormData((prevData) => ({
          ...prevData,
          services: updatedServices,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  {/* Carrusel Central */}
  // Manejador para cambios en los campos del carrusel central (descripción)
  const handleCentralCarouselChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCarousel = [...formData.centralCarousel];
    updatedCarousel[index][name] = value; // Actualizar el campo del item del carrusel central
    setFormData((prevData) => ({
      ...prevData,
      centralCarousel: updatedCarousel,
    }));
  };

  // Manejador para carga de imagen de un item del carrusel central
  const handleCentralCarouselImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedCarousel = [...formData.centralCarousel];
        updatedCarousel[index].image = reader.result; // Almacenar la imagen (Base64) del item
        setFormData((prevData) => ({
          ...prevData,
          centralCarousel: updatedCarousel,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para añadir un nuevo item al carrusel central
  const addCentralCarouselItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      centralCarousel: [...prevData.centralCarousel, { image: "", description: "" }], // Añadir un nuevo objeto vacío
    }));
  };

  // Función para eliminar un item del carrusel central por índice
  const removeCentralCarouselItem = (index) => {
    // Filtrar el array para remover el item en el índice especificado
    const updatedCarousel = formData.centralCarousel.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      centralCarousel: updatedCarousel,
    }));
  };

  // Función para añadir un nuevo servicio
  const addService = () => {
    setFormData((prevData) => ({
      ...prevData,
      services: [
        ...prevData.services,
        { name: "", description: "", carouselImagesServicio: "" }, // Añadir un nuevo objeto de servicio vacío
      ],
    }));
  };

  // Función para eliminar un servicio por índice
  const removeService = (index) => {
    // Filtrar el array para remover el servicio en el índice especificado
    const updatedServices = formData.services.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      services: updatedServices,
    }));
  };

  // Manejador para el inicio del arrastre de una celda movible
  const handleDragStart = (index) => {
    setDraggedCell(index); // Almacenar el índice de la celda arrastrada
  };

  // Manejador para soltar una celda movible
  const handleDrop = (index) => {
    if (draggedCell !== null) {
      const updatedCells = [...formData.movableCells];
      // Remover la celda arrastrada de su posición original
      const [removed] = updatedCells.splice(draggedCell, 1);
      // Insertar la celda arrastrada en la nueva posición
      updatedCells.splice(index, 0, removed);
      setFormData((prevData) => ({
        ...prevData,
        movableCells: updatedCells,
      }));
      setDraggedCell(null); // Resetear el estado de la celda arrastrada
    }
  };

  // Función para renderizar las celdas movibles (con lógica de arrastrar y soltar simple)
  const renderMovableCells = () => {
    // Define the layout for different breakpoints
    const layouts = {
      lg: formData.movableCells.map(cell => ({
        i: cell.i,
        x: cell.x,
        y: cell.y,
        w: cell.w,
        h: cell.h,
      })),
    };

    return (
      <div>
        <h2 className="switchcontainer">
          Celdas Movibles
          <label className="toggle-switch" style={{ marginLeft: "10px" }}>
            <input
              type="checkbox"
              checked={activeAccordion === "movableCells"}
              onChange={() => toggleAccordion("movableCells")}
            />
            <div>
              <span className="slider"></span>
            </div>
          </label>
        </h2>
        {activeAccordion === "movableCells" && (
          <ResponsiveGridLayout
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 4, md: 4, sm: 4, xs: 4, xxs: 4 }}
            rowHeight={100}
            width={1200}
            onLayoutChange={(currentLayout, allLayouts) => {
              const updatedCells = formData.movableCells.map(cell => {
                const layoutItem = currentLayout.find(item => item.i === cell.i);
                if (layoutItem) {
                  return { ...cell, ...layoutItem };
                }
                return cell;
              });
              setFormData(prevData => ({ ...prevData, movableCells: updatedCells }));
            }}
          >
            {formData.movableCells.map((cell) => {
              // Ensure cell has valid properties
              const isValidImage = cell.type === 'image' && 
                typeof cell.value === 'string' && 
                (cell.value.startsWith('data:image') || 
                 cell.value.startsWith('http') || 
                 cell.value.startsWith('https'));
              
              // If cell should be an image but has invalid value, force it to text
              if (cell.type === 'image' && !isValidImage) {
                cell.type = 'text';
                cell.value = null;
              }
              
              return (
                <div
                  key={cell.i}
                  data-grid={{ x: cell.x, y: cell.y, w: cell.w, h: cell.h }}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    backgroundColor: cell.bgColor,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    type="text"
                    value={cell.content}
                    onChange={(e) => {
                      const updatedCells = [...formData.movableCells];
                      const cellIndex = updatedCells.findIndex(item => item.i === cell.i);
                      if (cellIndex > -1) {
                        updatedCells[cellIndex].content = e.target.value;
                        setFormData((prevData) => ({
                          ...prevData,
                          movableCells: updatedCells,
                        }));
                      }
                    }}
                    style={{ marginBottom: "8px", width: "90%" }}
                  />
                  <input
                    type="color"
                    value={cell.bgColor}
                    onChange={(e) => {
                      const updatedCells = [...formData.movableCells];
                      const cellIndex = updatedCells.findIndex(item => item.i === cell.i);
                      if (cellIndex > -1) {
                        updatedCells[cellIndex].bgColor = e.target.value;
                        setFormData((prevData) => ({
                          ...prevData,
                          movableCells: updatedCells,
                        }));
                      }
                    }}
                    style={{ width: "90%" }}
                  />
                  {isValidImage ? (
                    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff"}}>
                      <img
                        src={cell.value}
                        alt={cell.content}
                        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", maxWidth: "100%", maxHeight: "100%" }}
                        onError={e => { 
                          e.target.onerror = null; 
                          e.target.style.display = 'none';
                          // If image fails to load, convert cell to text
                          cell.type = 'text';
                          cell.value = null;
                        }}
                      />
                    </div>
                  ) : cell.i === '2' ? (
                    <div style={{ 
                      width: "100%", 
                      height: "100%", 
                      display: "flex", 
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignItems: "center", 
                      justifyContent: "center",
                      gap: "8px",
                      padding: "8px",
                      overflow: "hidden"
                    }}>
                      {formData.socialLinks.whatsapp && (
                        <a href={formData.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" style={{ fontSize: "24px", textDecoration: "none" }}>📱</a>
                      )}
                      {formData.socialLinks.facebook && (
                        <a href={formData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" style={{ fontSize: "24px", textDecoration: "none" }}>📘</a>
                      )}
                      {formData.socialLinks.instagram && (
                        <a href={formData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" style={{ fontSize: "24px", textDecoration: "none" }}>📸</a>
                      )}
                      {formData.socialLinks.twitter && (
                        <a href={formData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" style={{ fontSize: "24px", textDecoration: "none" }}>🐦</a>
                      )}
                      {formData.socialLinks.pinterest && (
                        <a href={formData.socialLinks.pinterest} target="_blank" rel="noopener noreferrer" style={{ fontSize: "24px", textDecoration: "none" }}>📌</a>
                      )}
                      {formData.socialLinks.youtube && (
                        <a href={formData.socialLinks.youtube} target="_blank" rel="noopener noreferrer" style={{ fontSize: "24px", textDecoration: "none" }}>📺</a>
                      )}
                      {formData.socialLinks.linkedin && (
                        <a href={formData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: "24px", textDecoration: "none" }}>💼</a>
                      )}
                      {formData.socialLinks.tiktok && (
                        <a href={formData.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" style={{ fontSize: "24px", textDecoration: "none" }}>🎵</a>
                      )}
                      {formData.socialLinks.gmail && (
                        <a href={formData.socialLinks.gmail} target="_blank" rel="noopener noreferrer" style={{ fontSize: "24px", textDecoration: "none" }}>📧</a>
                      )}
                    </div>
                  ) : (
                    <div style={{ fontWeight: "bold", textAlign: "center", fontSize: "1.1rem", wordWrap: "break-word" }}>
                      {cell.content}
                    </div>
                  )}
                </div>
              );
            })}
          </ResponsiveGridLayout>
        )}
      </div>
    );
  };

  // Función para mapear los campos del formulario a las celdas del grid
  const getMovableCellsFromForm = () => [
    { id: "1", type: formData.logo ? "image" : "text", value: formData.logo || "LOGO", bgColor: "#FFFFFF" },
    { id: "2", type: "text", value: "REDES", bgColor: "#EAEAEA" },
    { id: "3", type: Array.isArray(formData.carouselImages) && formData.carouselImages.length > 0 ? "image" : "text", value: (formData.carouselImages && formData.carouselImages[0]) || "PUBLICIDAD 1", bgColor: "#FFDDC1" },
    { id: "4", type: Array.isArray(formData.carouselImages2) && formData.carouselImages2.length > 0 ? "image" : "text", value: (formData.carouselImages2 && formData.carouselImages2[0]) || "PUBLICIDAD 2", bgColor: "#FFC8DD" },
    { id: "5", type: formData.videoUrl ? "video" : "text", value: formData.videoUrl || "VIDEO CORPORATIVO", bgColor: "#C1E1FF" },
    { id: "6", type: "text", value: formData.businessType || "EMPRESA", bgColor: "#C1FFD7" },
    { id: "7", type: "text", value: (Array.isArray(formData.services) && formData.services[0] && formData.services[0].name) || "PRODUCTOS Y SERVICIOS", bgColor: "#F9F9A1" },
    { id: "8", type: "text", value: formData.reservas || "RESERVAS USUARI@S", bgColor: "#FFB3BA" },
    { id: "9", type: "text", value: formData.calendario ? `Calendario: ${formData.calendario}` : "CALENDARIO EVENTOS", bgColor: "#D5BAFF" },
    { id: "10", type: formData.fotoTexto1 ? "image" : "text", value: formData.fotoTexto1 || formData.texto1 || "FOTO/TEXTO 1", bgColor: "#FCD5CE" },
    { id: "11", type: formData.fotoTexto2 ? "image" : "text", value: formData.fotoTexto2 || formData.texto2 || "FOTO/TEXTO 2", bgColor: "#D0F4DE" },
    { id: "12", type: formData.fotoTexto3 ? "image" : "text", value: formData.fotoTexto3 || formData.texto3 || "FOTO/TEXTO 3", bgColor: "#FFDAC1" },
    { id: "13", type: "text", value: (Array.isArray(formData.services) && formData.services[1] && formData.services[1].name) || "SLIDE 1", bgColor: "#E0BBE4" },
    { id: "14", type: "text", value: (Array.isArray(formData.services) && formData.services[2] && formData.services[2].name) || "SLIDE 2", bgColor: "#FFDFD3" },
    { id: "15", type: "text", value: (Array.isArray(formData.services) && formData.services[3] && formData.services[3].name) || "SLIDE 3", bgColor: "#CDEAC0" },
    { id: "16", type: "text", value: (Array.isArray(formData.services) && formData.services[4] && formData.services[4].name) || "SLIDE 4", bgColor: "#B5EAD7" },
  ];

  // Cuando el usuario sube un logo, actualiza la celda 1 del grid en tiempo real
  useEffect(() => {
    // Si hay un logo en selectedData y no hay uno en formData, úsalo
    if ((!formData.logo || formData.logo === "") && selectedData && selectedData.logo && selectedData.logo !== "") {
      setFormData((prevData) => ({
        ...prevData,
        movableCells: prevData.movableCells.map(cell =>
          (cell.i === '1' || cell.id === '1')
            ? { ...cell, type: 'text', value: 'LOGO' }
            : cell
        )
      }));
    } else if (formData.logo && formData.logo !== "") {
      // Si el usuario sube un logo, úsalo
      setFormData((prevData) => ({
        ...prevData,
        movableCells: prevData.movableCells.map(cell =>
          (cell.i === '1' || cell.id === '1')
            ? { ...cell, type: 'image', value: formData.logo }
            : cell
        )
      }));
    } else {
      // Si no hay logo, muestra el texto 'LOGO'
      setFormData((prevData) => ({
        ...prevData,
        movableCells: prevData.movableCells.map(cell =>
          (cell.i === '1' || cell.id === '1')
            ? { ...cell, type: 'text', value: 'LOGO' }
            : cell
        )
      }));
    }
  }, [formData.logo, selectedData && selectedData.logo]);

  // Estado para mostrar validación visual de logo subido
  const [logoUploaded, setLogoUploaded] = useState(false);
  // Resetear mensaje si se borra el logo
  useEffect(() => {
    if (!formData.logo) setLogoUploaded(false);
  }, [formData.logo]);

  // Memoize the layout for the preview section
  const previewLayout = useMemo(() => ({
    lg: formData.movableCells.map(cell => ({
      i: cell.i,
      x: cell.x,
      y: cell.y,
      w: cell.w,
      h: cell.h,
    }))
  }), [formData.movableCells]);

  const handlePreviewLayoutChange = (newLayout) => {
    const updatedCells = formData.movableCells.map(cell => {
      const layoutItem = newLayout.find(item => item.i === cell.i);
      if (layoutItem) {
        return { ...cell, ...layoutItem };
      }
      return cell;
    });
    setFormData(prevData => ({ ...prevData, movableCells: updatedCells }));
    console.log('Guardando movableCells en handlePreviewLayoutChange:', updatedCells); // Debug log
    // Save updated cells to sessionStorage
    window.sessionStorage.setItem('movableCells', JSON.stringify(updatedCells));
  };

  // Effect to ensure movableCells always has 16 items with necessary properties
  useEffect(() => {
    if (!formData.movableCells || !Array.isArray(formData.movableCells) || formData.movableCells.length !== 16) {
      console.warn('movableCells state is invalid. Resetting to default structure.');
      setFormData(prevData => ({
        ...prevData,
        movableCells: [
          { i: '1', x: 0, y: 0, w: 1, h: 1, content: 'LOGO', bgColor: '#D3D3D3', type: 'text' },
          { i: '2', x: 1, y: 0, w: 1, h: 1, content: 'REDES SOCIALES', bgColor: '#FFE4E1', type: 'social' },
          { i: '3', x: 2, y: 0, w: 1, h: 1, content: 'PUBLICIDAD 1', bgColor: '#A89C5D', type: 'text' },
          { i: '4', x: 3, y: 0, w: 1, h: 1, content: 'PUBLICIDAD 2', bgColor: '#FFC300', type: 'text' },
          { i: '5', x: 0, y: 1, w: 1, h: 1, content: 'VIDEO CORPORATIVO', bgColor: '#00BFFF', type: 'text' },
          { i: '6', x: 1, y: 1, w: 1, h: 1, content: 'EMPRESA', bgColor: '#295A6D', type: 'text' },
          { i: '7', x: 2, y: 1, w: 1, h: 1, content: 'PRODUCTOS Y SERVICIOS', bgColor: '#2B7A78', type: 'text' },
          { i: '8', x: 3, y: 1, w: 1, h: 1, content: 'RESERVAS', bgColor: '#FF6F00', type: 'text' },
          { i: '9', x: 0, y: 2, w: 1, h: 1, content: 'CALENDARIO', bgColor: '#FFFFFF', type: 'text' },
          { i: '10', x: 1, y: 2, w: 1, h: 1, content: 'FOTO/TEXTO 1', bgColor: '#BDB89B', type: 'text' },
          { i: '11', x: 2, y: 2, w: 1, h: 1, content: 'FOTO/TEXTO 2', bgColor: '#BDB89B', type: 'text' },
          { i: '12', x: 3, y: 2, w: 1, h: 1, content: 'FOTO/TEXTO 3', bgColor: '#BDB89B', type: 'text' },
          { i: '13', x: 0, y: 3, w: 1, h: 1, content: 'SLIDE 1', bgColor: '#FF8000', type: 'text' },
          { i: '14', x: 1, y: 3, w: 1, h: 1, content: 'SLIDE 2', bgColor: '#FF8000', type: 'text' },
          { i: '15', x: 2, y: 3, w: 1, h: 1, content: 'SLIDE 3', bgColor: '#FF8000', type: 'text' },
          { i: '16', x: 3, y: 3, w: 1, h: 1, content: 'SLIDE 4', bgColor: '#FF8000', type: 'text' }
        ]
      }));
    } else {
      // Ensure necessary properties are present if movableCells is an array of 16 items but potentially missing props
      const needsReset = formData.movableCells.some(cell => !cell.i || typeof cell.x !== 'number' || typeof cell.y !== 'number' || typeof cell.w !== 'number' || typeof cell.h !== 'number' || !cell.content || !cell.bgColor);
      if (needsReset) {
         console.warn('movableCells state is missing properties. Merging with default properties.');
         setFormData(prevData => ({
            ...prevData,
            movableCells: prevData.movableCells.map((cell, index) => ({
                ...[
                    { i: '1', x: 0, y: 0, w: 1, h: 1, content: 'LOGO', bgColor: '#D3D3D3', type: 'text' },
                    { i: '2', x: 1, y: 0, w: 1, h: 1, content: 'REDES SOCIALES', bgColor: '#FFE4E1', type: 'social' },
                    { i: '3', x: 2, y: 0, w: 1, h: 1, content: 'PUBLICIDAD 1', bgColor: '#A89C5D', type: 'text' },
                    { i: '4', x: 3, y: 0, w: 1, h: 1, content: 'PUBLICIDAD 2', bgColor: '#FFC300', type: 'text' },
                    { i: '5', x: 0, y: 1, w: 1, h: 1, content: 'VIDEO CORPORATIVO', bgColor: '#00BFFF', type: 'text' },
                    { i: '6', x: 1, y: 1, w: 1, h: 1, content: 'EMPRESA', bgColor: '#295A6D', type: 'text' },
                    { i: '7', x: 2, y: 1, w: 1, h: 1, content: 'PRODUCTOS Y SERVICIOS', bgColor: '#2B7A78', type: 'text' },
                    { i: '8', x: 3, y: 1, w: 1, h: 1, content: 'RESERVAS', bgColor: '#FF6F00', type: 'text' },
                    { i: '9', x: 0, y: 2, w: 1, h: 1, content: 'CALENDARIO', bgColor: '#FFFFFF', type: 'text' },
                    { i: '10', x: 1, y: 2, w: 1, h: 1, content: 'FOTO/TEXTO 1', bgColor: '#BDB89B', type: 'text' },
                    { i: '11', x: 2, y: 2, w: 1, h: 1, content: 'FOTO/TEXTO 2', bgColor: '#BDB89B', type: 'text' },
                    { i: '12', x: 3, y: 2, w: 1, h: 1, content: 'FOTO/TEXTO 3', bgColor: '#BDB89B', type: 'text' },
                    { i: '13', x: 0, y: 3, w: 1, h: 1, content: 'SLIDE 1', bgColor: '#FF8000', type: 'text' },
                    { i: '14', x: 1, y: 3, w: 1, h: 1, content: 'SLIDE 2', bgColor: '#FF8000', type: 'text' },
                    { i: '15', x: 2, y: 3, w: 1, h: 1, content: 'SLIDE 3', bgColor: '#FF8000', type: 'text' },
                    { i: '16', x: 3, y: 3, w: 1, h: 1, content: 'SLIDE 4', bgColor: '#FF8000', type: 'text' }
                  ][index], // Get default properties for this index
                ...cell // Merge with existing cell data (position, current content/color/type/value)
            }))
         }));
      }
    }
  }, [formData.movableCells]); // Re-run effect if movableCells state changes

  // Manejador para carga de archivo de video
  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verificar que el archivo sea un video
      if (!file.type.startsWith('video/')) {
        alert('Por favor, selecciona un archivo de video válido.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          videoFile: reader.result,
          videoUrl: "" // Limpiar la URL si se sube un archivo
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejador para cambios en la URL del video
  const handleVideoUrlChange = (e) => {
    const url = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      videoUrl: url,
      videoFile: "" // Limpiar el archivo si se ingresa una URL
    }));
  };

  // Renderizado principal del componente FormTemplate
  return (
    // Contenedor principal del formulario
    <div className="form-container">
      {/* Contenido principal del formulario */}
      <div className="form-content">
        {/* Título del formulario */}
        <h1>Formulario de Configuración</h1>
        {/* Formulario HTML */}
        <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: "600px", margin: "auto" }}>
          {/* Información General */}
          <h2>Información General</h2>
          <label htmlFor="title">Título de la Página:</label>
          <input className="inputcontainer" type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
          <label htmlFor="businessType">Tipo de Negocio:</label>
          <input className="inputcontainer" type="text" id="businessType" name="businessType" value={formData.businessType} onChange={handleChange} />
          <label htmlFor="address">Dirección:</label>
          <input className="inputcontainer" type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
          <label htmlFor="phone">Teléfono:</label>
          <input className="inputcontainer" type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          <label htmlFor="email">Correo Electrónico:</label>
          <input className="inputcontainer" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

          {/* Subir Logotipo */}
          <h2>Subir Logotipo</h2>
          <div style={{ marginBottom: "20px" }}>
            <input 
              type="file" 
              id="logo" 
              accept="image/*" 
              onChange={(e) => {
                handleFileChange(e, "logo");
                setLogoUploaded(true);
              }}
              style={{ marginBottom: "10px" }}
            />
            {formData.logo && typeof formData.logo === 'string' && formData.logo.trim() !== '' && (
              <div style={{ 
                marginTop: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#fff",
                width: "200px",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <img 
                  src={formData.logo} 
                  alt="Logo Preview" 
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                    background: "#fff"
                  }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
            {logoUploaded && (
              <div style={{ color: 'green', marginTop: 8, fontWeight: 'bold' }}>
                ¡Logo subido correctamente!
              </div>
            )}
          </div>

          {/* Redes Sociales */}
          <h2>Redes Sociales</h2>
          <label htmlFor="whatsapp">WhatsApp:</label>
          <input className="inputcontainer" type="text" id="whatsapp" name="whatsapp" placeholder="https://wa.me/" value={formData.socialLinks.whatsapp} onChange={handleSocialChange} />
          <label htmlFor="facebook">Facebook:</label>
          <input className="inputcontainer" type="text" id="facebook" name="facebook" placeholder="https://facebook.com/" value={formData.socialLinks.facebook} onChange={handleSocialChange} />
          <label htmlFor="instagram">Instagram:</label>
          <input className="inputcontainer" type="text" id="instagram" name="instagram" placeholder="https://instagram.com/" value={formData.socialLinks.instagram} onChange={handleSocialChange} />
          <label htmlFor="twitter">X / Twitter:</label>
          <input className="inputcontainer" type="text" id="twitter" name="twitter" placeholder="https://twitter.com/" value={formData.socialLinks.twitter} onChange={handleSocialChange} />
          <label htmlFor="pinterest">Pinterest:</label>
          <input className="inputcontainer" type="text" id="pinterest" name="pinterest" placeholder="https://pinterest.com/" value={formData.socialLinks.pinterest} onChange={handleSocialChange} />
          <label htmlFor="youtube">YouTube:</label>
          <input className="inputcontainer" type="text" id="youtube" name="youtube" placeholder="https://youtube.com/" value={formData.socialLinks.youtube} onChange={handleSocialChange} />
          <label htmlFor="linkedin">LinkedIn:</label>
          <input className="inputcontainer" type="text" id="linkedin" name="linkedin" placeholder="https://linkedin.com/" value={formData.socialLinks.linkedin} onChange={handleSocialChange} />
          <label htmlFor="tiktok">TikTok:</label>
          <input className="inputcontainer" type="text" id="tiktok" name="tiktok" placeholder="https://tiktok.com/" value={formData.socialLinks.tiktok} onChange={handleSocialChange} />
          <label htmlFor="gmail">Gmail:</label>
          <input className="inputcontainer" type="text" id="gmail" name="gmail" placeholder="mailto:example@gmail.com" value={formData.socialLinks.gmail || ''} onChange={handleSocialChange} />

          {/* Carrusel Publicidad 1 */}
          <h2>Carrusel Publicidad 1</h2>
          <input type="file" id="carouselImages1" accept="image/*" multiple onChange={handleCarouselImagesChange} />
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
            {formData.carouselImages.map((img, i) => (
              !!img && typeof img === 'string' && img.startsWith('data:image') && (
                <div key={i} style={{ width: 80, height: 80, background: '#fff', border: '1px solid #ddd', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={img} alt="pub1" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#fff' }} />
                </div>
              )
            ))}
          </div>

          {/* Carrusel Publicidad 2 */}
          <h2>Carrusel Publicidad 2</h2>
          <input type="file" id="carouselImages2" accept="image/*" multiple onChange={handleCarouselImagesChange2} />
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
            {formData.carouselImages2.map((img, i) => (
              !!img && typeof img === 'string' && img.startsWith('data:image') && (
                <div key={i} style={{ width: 80, height: 80, background: '#fff', border: '1px solid #ddd', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={img} alt="pub2" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#fff' }} />
                </div>
              )
            ))}
          </div>

          {/* Subir Video Empresarial */}
          <h2>Subir Video Empresarial</h2>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="videoUrl">URL del Video (YouTube o Vimeo):</label>
            <input 
              className="inputcontainer" 
              type="text" 
              id="videoUrl" 
              name="videoUrl" 
              placeholder="https://www.youtube.com/watch?v=..." 
              value={formData.videoUrl || ''} 
              onChange={handleVideoUrlChange} 
            />
            
            <div style={{ marginTop: "10px" }}>
              <label htmlFor="videoFile">O sube un archivo de video:</label>
              <input 
                type="file" 
                id="videoFile" 
                accept="video/*" 
                onChange={handleVideoFileChange}
                style={{ marginTop: "5px" }}
              />
              <small style={{ display: "block", marginTop: "5px", color: "#666" }}>
                Formatos aceptados: MP4, WebM, Ogg. Tamaño máximo: 100MB
              </small>
            </div>

            {(formData.videoUrl || formData.videoFile) && (
              <div style={{ 
                marginTop: "15px", 
                padding: "10px", 
                border: "1px solid #ddd", 
                borderRadius: "8px", 
                backgroundColor: "#fff" 
              }}>
                <h4 style={{ marginBottom: "10px" }}>Vista previa:</h4>
                {formData.videoUrl ? (
                  <iframe
                    width="100%"
                    height="315"
                    src={formData.videoUrl.includes('youtube.com') || formData.videoUrl.includes('youtu.be')
                      ? `https://www.youtube.com/embed/${formData.videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)?.[1]}`
                      : formData.videoUrl.includes('vimeo.com')
                      ? `https://player.vimeo.com/video/${formData.videoUrl.match(/(?:vimeo\.com\/)(\d+)/i)?.[1]}`
                      : formData.videoUrl}
                    title="Video Preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderRadius: "4px" }}
                  />
                ) : (
                  <video
                    controls
                    width="100%"
                    height="315"
                    src={formData.videoFile}
                    style={{ borderRadius: "4px" }}
                  >
                    Tu navegador no soporta el elemento de video.
                  </video>
                )}
              </div>
            )}
          </div>

          {/* Servicios */}
          <h2>Servicios</h2>
          {formData.services.map((service, index) => (
            <div key={index} style={{border: '1px solid #ccc', marginBottom: 8, padding: 8}}>
              <label>Nombre:</label>
              <input type="text" name="name" value={service.name} onChange={e => handleServiceChange(index, e)} />
              <label>Descripción:</label>
              <textarea name="description" value={service.description} onChange={e => handleServiceChange(index, e)} />
              <label>Imagen:</label>
              <input type="file" accept="image/*" onChange={e => handleServiceImageChange(index, e)} />
              {service.carouselImagesServicio && typeof service.carouselImagesServicio === 'string' && service.carouselImagesServicio.startsWith('data:image') && (
                <div style={{ width: 80, height: 80, background: '#fff', border: '1px solid #ddd', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                  <img src={service.carouselImagesServicio} alt="servicio" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#fff' }} />
                </div>
              )}
              <button type="button" onClick={() => removeService(index)}>Eliminar</button>
            </div>
          ))}
          <button type="button" onClick={addService}>Agregar Servicio</button>

          {/* Reservas */}
          <h2>Reservas</h2>
          <label>Texto para Reservas:</label>
          <input type="text" name="reservas" value={formData.reservas || ''} onChange={handleChange} />

          {/* Calendario */}
          <h2>Calendario</h2>
          <label>Selecciona un calendario:</label>
          <select name="calendario" value={formData.calendario || ''} onChange={handleChange}>
            <option value="">Selecciona...</option>
            <option value="google">Google Calendar</option>
            <option value="outlook">Outlook</option>
            <option value="ical">iCal</option>
          </select>

          {/* Subir Foto/Texto 1 */}
          <h2>Subir Foto/Texto 1</h2>
          <input type="file" name="fotoTexto1" accept="image/*" onChange={e => handleFileChange(e, "fotoTexto1")}/>
          <input type="text" name="texto1" placeholder="Texto 1" value={formData.texto1 || ''} onChange={handleChange} />
          {formData.fotoTexto1 && typeof formData.fotoTexto1 === 'string' && formData.fotoTexto1.startsWith('data:image') && (
            <div style={{ width: 80, height: 80, background: '#fff', border: '1px solid #ddd', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
              <img src={formData.fotoTexto1} alt="foto1" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#fff' }} />
            </div>
          )}

          {/* Subir Foto/Texto 2 */}
          <h2>Subir Foto/Texto 2</h2>
          <input type="file" name="fotoTexto2" accept="image/*" onChange={e => handleFileChange(e, "fotoTexto2")}/>
          <input type="text" name="texto2" placeholder="Texto 2" value={formData.texto2 || ''} onChange={handleChange} />
          {formData.fotoTexto2 && typeof formData.fotoTexto2 === 'string' && formData.fotoTexto2.startsWith('data:image') && (
            <div style={{ width: 80, height: 80, background: '#fff', border: '1px solid #ddd', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
              <img src={formData.fotoTexto2} alt="foto2" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#fff' }} />
            </div>
          )}

          {/* Subir Foto/Texto 3 */}
          <h2>Subir Foto/Texto 3</h2>
          <input type="file" name="fotoTexto3" accept="image/*" onChange={e => handleFileChange(e, "fotoTexto3")}/>
          <input type="text" name="texto3" placeholder="Texto 3" value={formData.texto3 || ''} onChange={handleChange} />
          {formData.fotoTexto3 && typeof formData.fotoTexto3 === 'string' && formData.fotoTexto3.startsWith('data:image') && (
            <div style={{ width: 80, height: 80, background: '#fff', border: '1px solid #ddd', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
              <img src={formData.fotoTexto3} alt="foto3" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#fff' }} />
            </div>
          )}

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button type="button" onClick={handleGeneratePage}>
              Generar Página
            </button>
          </div>
        </form>
      </div>
      {/* Vista previa en tiempo real */}
      <div className="preview-container" style={{ marginTop: 40 }}>
        <h2>Vista Previa</h2>
        <div style={{ width: '100%', minHeight: 600, border: '1px solid #ccc', borderRadius: 8, background: '#fff', padding: '20px' }}>
          <ResponsiveGridLayout
            className="layout"
            layouts={previewLayout}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 4, md: 4, sm: 4, xs: 4, xxs: 4 }}
            rowHeight={150}
            width={1200}
            onLayoutChange={handlePreviewLayoutChange}
            draggableHandle=".react-grid-item"
            isDraggable={true}
            isResizable={true}
          >
            {formData.movableCells.map((cell) => {
              if (cell.i === '2') {
                return (
                  <div
                    key={cell.i}
                    data-grid={{ x: cell.x, y: cell.y, w: cell.w, h: cell.h }}
                    style={{
                      border: "1px solid #ccc",
                      backgroundColor: "#FFE4E1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden"
                    }}
                  >
                    <div style={{ 
                      display: "flex", 
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignItems: "center", 
                      justifyContent: "center",
                      gap: "12px",
                      width: "100%",
                      height: "100%",
                      padding: "10px"
                    }}>
                      {formData.socialLinks.whatsapp && (
                        <a href={formData.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" style={{ fontSize: "28px", textDecoration: "none", color: "#000" }}>📱</a>
                      )}
                      {formData.socialLinks.facebook && (
                        <a href={formData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" style={{ fontSize: "28px", textDecoration: "none", color: "#000" }}>📘</a>
                      )}
                      {formData.socialLinks.instagram && (
                        <a href={formData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" style={{ fontSize: "28px", textDecoration: "none", color: "#000" }}>📸</a>
                      )}
                      {formData.socialLinks.twitter && (
                        <a href={formData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" style={{ fontSize: "28px", textDecoration: "none", color: "#000" }}>🐦</a>
                      )}
                      {formData.socialLinks.pinterest && (
                        <a href={formData.socialLinks.pinterest} target="_blank" rel="noopener noreferrer" style={{ fontSize: "28px", textDecoration: "none", color: "#000" }}>📌</a>
                      )}
                      {formData.socialLinks.youtube && (
                        <a href={formData.socialLinks.youtube} target="_blank" rel="noopener noreferrer" style={{ fontSize: "28px", textDecoration: "none", color: "#000" }}>📺</a>
                      )}
                      {formData.socialLinks.linkedin && (
                        <a href={formData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: "28px", textDecoration: "none", color: "#000" }}>💼</a>
                      )}
                      {formData.socialLinks.tiktok && (
                        <a href={formData.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" style={{ fontSize: "28px", textDecoration: "none", color: "#000" }}>🎵</a>
                      )}
                      {formData.socialLinks.gmail && (
                        <a href={formData.socialLinks.gmail} target="_blank" rel="noopener noreferrer" style={{ fontSize: "28px", textDecoration: "none", color: "#000" }}>📧</a>
                      )}
                    </div>
                  </div>
                );
              }

              const isValidImage = cell.type === 'image' && 
                typeof cell.value === 'string' && 
                (cell.value.startsWith('data:image') || 
                 cell.value.startsWith('http') || 
                 cell.value.startsWith('https'));
              
              if (cell.type === 'image' && !isValidImage) {
                cell.type = 'text';
                cell.value = null;
              }
              
              return (
                <div
                  key={cell.i}
                  data-grid={{ x: cell.x, y: cell.y, w: cell.w, h: cell.h }}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    backgroundColor: cell.bgColor,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isValidImage ? (
                    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff"}}>
                      <img
                        src={cell.value}
                        alt={cell.content}
                        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", maxWidth: "100%", maxHeight: "100%" }}
                        onError={e => { 
                          e.target.onerror = null; 
                          e.target.style.display = 'none';
                          cell.type = 'text';
                          cell.value = null;
                        }}
                      />
                    </div>
                  ) : (
                    <div style={{ fontWeight: "bold", textAlign: "center", fontSize: "1.1rem", wordWrap: "break-word" }}>
                      {cell.content}
                    </div>
                  )}
                </div>
              );
            })}
          </ResponsiveGridLayout>
        </div>
      </div>
    </div>
  );
}

// Exportar el componente FormTemplate
export default FormTemplate;