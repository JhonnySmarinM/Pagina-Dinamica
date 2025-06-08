// Importar módulos y hooks necesarios de React
import React, { useState, useEffect, useMemo } from "react";
// Importar hook para navegación programática
import { useNavigate } from "react-router-dom";
// Importar componentes de react-grid-layout
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Importar IndexedDB utility functions
import { saveData, loadData } from "./utils/indexedDB";

// Importar estilos CSS para este componente (o generales)
import "./App.css";

// Componente funcional FormTemplate que recibe data y gridLayout como props
function FormTemplate({ data = null, gridLayout = null }) {
  // Hook para la navegación programática
  const navigate = useNavigate();
  const ResponsiveGridLayout = WidthProvider(Responsive);

  // Función para manejar la generación de la página y navegar a la vista previa
  const handleGeneratePage = async () => {
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
      // Handle EMPRESA cell (cell 6)
      if (cell.i === '6') {
        return {
          ...cell,
          type: 'text',
          content: 'EMPRESA',
          value: {
            title: formData.title,
            businessType: formData.businessType,
            address: formData.address,
            phone: formData.phone,
            email: formData.email
          }
        };
      }
      // Handle VIDEO CORPORATIVO cell (cell 5)
      if (cell.i === '5') {
        if (formData.videoUrl || formData.videoFile) {
          // Si hay una URL de video (YouTube o Vimeo)
          if (formData.videoUrl && typeof formData.videoUrl === 'string') {
            return { 
              ...cell, 
              type: 'video', 
              value: formData.videoUrl, 
              content: 'VIDEO CORPORATIVO',
              videoType: 'url'
            };
          }
          // Si hay un archivo de video
          if (formData.videoFile && typeof formData.videoFile === 'string' && formData.videoFile.startsWith('data:video')) {
            return { 
              ...cell, 
              type: 'video', 
              value: formData.videoFile, 
              content: 'VIDEO CORPORATIVO',
              videoType: 'file'
            };
          }
        }
        return { ...cell, type: 'text', value: null, content: 'VIDEO CORPORATIVO' };
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
        return {
          ...cell,
          type: 'fotoTexto',
          content: 'FOTO/TEXTO 1',
          value: {
            image: formData.fotoTexto1 || '',
            title: formData.fotoTexto1Title || '',
            description: formData.fotoTexto1Description || '',
            textColor: formData.fotoTexto1TextColor || '#FFFFFF',
            fontFamily: formData.fotoTexto1FontFamily || 'Arial'
          }
        };
      }
      // Handle FOTO/TEXTO 2 cell (cell 11)
      if (cell.i === '11') {
        return {
          ...cell,
          type: 'fotoTexto',
          content: 'FOTO/TEXTO 2',
          value: {
            image: formData.fotoTexto2 || '',
            title: formData.fotoTexto2Title || '',
            description: formData.fotoTexto2Description || '',
            textColor: formData.fotoTexto2TextColor || '#FFFFFF',
            fontFamily: formData.fotoTexto2FontFamily || 'Arial'
          }
        };
      }
      // Handle FOTO/TEXTO 3 cell (cell 12)
      if (cell.i === '12') {
        return {
          ...cell,
          type: 'fotoTexto',
          content: 'FOTO/TEXTO 3',
          value: {
            image: formData.fotoTexto3 || '',
            title: formData.fotoTexto3Title || '',
            description: formData.fotoTexto3Description || '',
            textColor: formData.fotoTexto3TextColor || '#FFFFFF',
            fontFamily: formData.fotoTexto3FontFamily || 'Arial'
          }
        };
      }
      // Handle VERTICAL CAROUSEL cell (cell 13)
      if (cell.i === '13') {
        return {
          ...cell,
          type: 'verticalCarousel',
          content: 'CARRUSEL VERTICAL',
          value: formData.carouselVerticalImages
        };
      }
      // Handle HORIZONTAL CAROUSEL cell (cell 14)
      if (cell.i === '14') {
        return {
          ...cell,
          type: 'horizontalCarousel',
          content: 'CARRUSEL HORIZONTAL',
          value: formData.carouselHorizontalImages
        };
      }
      // Handle VERTICAL CAROUSEL 2 cell (cell 15)
      if (cell.i === '15') {
        return {
          ...cell,
          type: 'verticalCarousel',
          content: 'CARRUSEL VERTICAL 2',
          value: formData.carouselVerticalImages2
        };
      }
      // Handle HORIZONTAL CAROUSEL 2 cell (cell 16)
      if (cell.i === '16') {
        return {
          ...cell,
          type: 'horizontalCarousel',
          content: 'CARRUSEL HORIZONTAL 2',
          value: formData.carouselHorizontalImages2
        };
      }
      // Handle PRODUCTOS Y SERVICIOS cell (cell 7)
      if (cell.i === '7') {
        return {
          ...cell,
          type: 'services',
          content: 'PRODUCTOS Y SERVICIOS',
          value: formData.services
        };
      }
      // Handle RESERVAS cell (cell 8)
      if (cell.i === '8') {
        return {
          ...cell,
          type: 'reservas',
          content: 'RESERVAS',
          value: {
            titulo: formData.reservas.titulo,
            subtitulo: formData.reservas.subtitulo,
            tipoReserva: formData.reservas.tipoReserva,
            horarioAtencion: formData.reservas.horarioAtencion,
            duracionCita: formData.reservas.duracionCita,
            capacidadMaxima: formData.reservas.capacidadMaxima,
            mensajeConfirmacion: formData.reservas.mensajeConfirmacion,
            colorBoton: formData.reservas.colorBoton,
            colorFondo: formData.reservas.colorFondo
          }
        };
      }
      // Handle CALENDARIO cell (cell 9)
      if (cell.i === '9') {
        return {
          ...cell,
          type: 'calendar',
          content: 'CALENDARIO',
          value: {
            tipo: formData.calendario || '',
            url: formData.calendarioUrl || ''
          }
        };
      }
      
      // For other cells, return as is
      return cell;
    });

    console.log('Guardando movableCells en handleGeneratePage:', updatedMovableCells);
    // Guardar los datos actualizados en IndexedDB
    try {
      await saveData('movableCells', updatedMovableCells);
      await saveData('formData', formData);
      console.log('Datos guardados en IndexedDB correctamente.');
    navigate("/webtemplateCreate");
    } catch (error) {
      console.error('Error al guardar en IndexedDB:', error);
      alert('Error al guardar la página. Demasiados datos. Por favor, contacta a soporte.');
    }
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
    reservas: selectedData?.reservas || {
      titulo: "Reserva tu espacio",
      subtitulo: "¡Reserva ahora y asegura tu lugar!",
      tipoReserva: "cita",
      horarioAtencion: {
        dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
        horario: "9:00 - 18:00"
      },
      duracionCita: "60",
      capacidadMaxima: "10",
      mensajeConfirmacion: "¡Gracias por tu reserva! Te contactaremos pronto.",
      colorBoton: "#FF6B6B",
      colorFondo: "#FFE4E1"
    },
    calendario: selectedData?.calendario || "",
    calendarioUrl: selectedData?.calendarioUrl || "",
    fotoTexto1: selectedData?.fotoTexto1 || "",
    fotoTexto1Title: selectedData?.fotoTexto1Title || "",
    fotoTexto1Description: selectedData?.fotoTexto1Description || "",
    fotoTexto1TextColor: selectedData?.fotoTexto1TextColor || "#FFFFFF",
    fotoTexto1FontFamily: selectedData?.fotoTexto1FontFamily || "Arial",
    // New fields for Foto/Texto 2
    fotoTexto2: selectedData?.fotoTexto2 || "",
    fotoTexto2Title: selectedData?.fotoTexto2Title || "",
    fotoTexto2Description: selectedData?.fotoTexto2Description || "",
    fotoTexto2TextColor: selectedData?.fotoTexto2TextColor || "#FFFFFF",
    fotoTexto2FontFamily: selectedData?.fotoTexto2FontFamily || "Arial",
    // New fields for Foto/Texto 3
    fotoTexto3: selectedData?.fotoTexto3 || "",
    fotoTexto3Title: selectedData?.fotoTexto3Title || "",
    fotoTexto3Description: selectedData?.fotoTexto3Description || "",
    fotoTexto3TextColor: selectedData?.fotoTexto3TextColor || "#FFFFFF",
    fotoTexto3FontFamily: selectedData?.fotoTexto3FontFamily || "Arial",
    // New field for Vertical Carousel Images (cell 13)
    carouselVerticalImages: selectedData?.carouselVerticalImages || [],
    // New field for Horizontal Carousel Images (cell 14)
    carouselHorizontalImages: selectedData?.carouselHorizontalImages || [],
    // New field for Vertical Carousel Images 2 (cell 15)
    carouselVerticalImages2: selectedData?.carouselVerticalImages2 || [],
    // New field for Horizontal Carousel Images 2 (cell 16)
    carouselHorizontalImages2: selectedData?.carouselHorizontalImages2 || [],
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
  const handleFileChange = (e, type, isMultiple = false) => {
    if (isMultiple) {
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
          [type]: [...prevData[type], ...images], // Append new images
        }));
      });
    } else {
    const file = e.target.files[0];
    if (file) {
      const reader = new window.FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          [type]: reader.result,
        }));
        if (e.target) {
          e.target.type = "";
          e.target.type = "file";
        }
      };
        reader.readAsDataURL(file);
      }
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
    { id: "8", type: "text", value: formData.reservas.titulo || "Reserva tu espacio", bgColor: "#FFB3BA" },
    { id: "9", type: "text", value: formData.calendario ? `Calendario: ${formData.calendario}` : "CALENDARIO EVENTOS", bgColor: "#D5BAFF" },
    { id: "10", type: formData.fotoTexto1 ? "image" : "text", value: formData.fotoTexto1 || formData.texto1 || "FOTO/TEXTO 1", bgColor: "#FCD5CE" },
    { id: "11", type: formData.fotoTexto2 ? "image" : "text", value: formData.fotoTexto2 || formData.texto2 || "FOTO/TEXTO 2", bgColor: "#D0F4DE" },
    { id: "12", type: formData.fotoTexto3 ? "image" : "text", value: formData.fotoTexto3 || formData.texto3 || "FOTO/TEXTO 3", bgColor: "#FFDAC1" },
    { id: "13", type: "text", value: (Array.isArray(formData.services) && formData.services[1] && formData.services[1].name) || "SLIDE 1", bgColor: "#E0BBE4" },
    { id: "14", type: "text", value: (Array.isArray(formData.services) && formData.services[2] && formData.services[2].name) || "SLIDE 2", bgColor: "#FFDFD3" },
    { id: "15", type: "text", value: (Array.isArray(formData.services) && formData.services[3] && formData.services[3].name) || "SLIDE 3", bgColor: "#CDEAC0" },
    { id: "16", type: "text", value: (Array.isArray(formData.services) && formData.services[4] && formData.services[4].name) || "SLIDE 4", bgColor: "#B5EAD7" },
  ];

  // Load initial state from IndexedDB
  useEffect(() => {
    const loadInitialData = async () => {
      const storedMovableCells = await loadData('movableCells');
      const storedFormData = await loadData('formData');

      let initialMovableCells = [
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
      ]; // Use default movableCells here

      let initialLayout = defaultLayout; // Assuming defaultLayout is defined elsewhere or will be loaded
      let initialSocialLinks = {};
      let initialFormData = {};

      if (storedMovableCells) {
        try {
          const parsedCells = storedMovableCells;
          // Validate cells structure basic check
          if (Array.isArray(parsedCells) && parsedCells.length === initialMovableCells.length && parsedCells.every(cell => cell.i && cell.content && cell.bgColor)) {
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
          console.error('Error parsing formData from IndexedDB. Using default social links and image handling.', error);
        }
      }

      // No initialLayout loading here as it's not strictly necessary for FormTemplate
      // If layout is explicitly needed from IndexedDB here, it should be loaded separately.
      // For now, only movableCells and formData are being loaded from IndexedDB.

      setMovableCells(initialMovableCells); // Update movableCells state directly here
      setSocialLinks(initialSocialLinks);

      // Overwrite formData with loaded data if available, otherwise keep initial state
      if (Object.keys(initialFormData).length > 0) {
        setFormData(prevFormData => ({
          ...prevFormData,
          ...initialFormData
        }));
      }
    };

    loadInitialData();
  }, []);

  // When the user uploads a logo, update cell 1 in real time (redundant with initial load, can be optimized)
  useEffect(() => {
    // This useEffect is primarily for real-time preview update, not initial load
    // The initial load logic is now handled in the main useEffect with IndexedDB

    // If there is a logo in formData, update the movableCells state for cell 1
    if (formData.logo && formData.logo !== "") {
      setFormData((prevData) => ({
        ...prevData,
        movableCells: prevData.movableCells.map(cell =>
          (cell.i === '1' || cell.id === '1')
            ? { ...cell, type: 'image', value: formData.logo } // Use 'image' type with value
            : cell
        )
      }));
    } else {
      // If no logo, show the text 'LOGO'
      setFormData((prevData) => ({
        ...prevData,
        movableCells: prevData.movableCells.map(cell =>
          (cell.i === '1' || cell.id === '1')
            ? { ...cell, type: 'text', value: 'LOGO' } // Use 'text' type with content
            : cell
        )
      }));
    }
  }, [formData.logo]); // Re-run effect if formData.logo changes

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

  const handlePreviewLayoutChange = async (newLayout) => {
    const updatedCells = formData.movableCells.map(cell => {
      const layoutItem = newLayout.find(item => item.i === cell.i);
      if (layoutItem) {
        return { 
          ...cell, 
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h
        };
      }
      return cell;
    });

    // Actualizar el estado local
    setFormData(prevData => ({ 
      ...prevData, 
      movableCells: updatedCells 
    }));

    // Guardar en IndexedDB
    try {
      await saveData('movableCells', updatedCells);
      console.log('Celdas movibles guardadas en IndexedDB correctamente desde preview.');
    } catch (error) {
      console.error('Error al guardar las celdas movibles desde preview:', error);
      alert('Error al guardar la vista previa. Demasiados datos.');
    }
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
          <h2 className="switchcontainer">
            Información General
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "infoGeneral"}
                onChange={() => toggleAccordion("infoGeneral")}
              />
              <div>
                <span className="slider"></span>
              </div>
            </label>
          </h2>
          {activeAccordion === "infoGeneral" && (
            <>
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
            </>
          )}

          {/* Subir Logotipo */}
          <h2 className="switchcontainer">
            Subir Logotipo
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "logoUpload"}
                onChange={() => toggleAccordion("logoUpload")}
              />
              <div>
                <span className="slider"></span>
              </div>
            </label>
          </h2>
          {activeAccordion === "logoUpload" && (
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
          )}

          {/* Redes Sociales */}
          <h2 className="switchcontainer">
            Redes Sociales
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "socialLinks"}
                onChange={() => toggleAccordion("socialLinks")}
              />
              <div>
                <span className="slider"></span>
              </div>
            </label>
          </h2>
          {activeAccordion === "socialLinks" && (
            <>
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
            </>
          )}

          {/* Carrusel Publicidad 1 */}
          <h2 className="switchcontainer">
            Carrusel Publicidad 1
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "carousel1"}
                onChange={() => toggleAccordion("carousel1")}
              />
              <div>
                <span className="slider"></span>
              </div>
            </label>
          </h2>
          {activeAccordion === "carousel1" && (
            <>
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
            </>
          )}

          {/* Carrusel Publicidad 2 */}
          <h2 className="switchcontainer">
            Carrusel Publicidad 2
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "carousel2"}
                onChange={() => toggleAccordion("carousel2")}
              />
              <div>
                <span className="slider"></span>
              </div>
            </label>
          </h2>
          {activeAccordion === "carousel2" && (
            <>
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
            </>
          )}

          {/* Subir Video Empresarial */}
          <h2 className="switchcontainer">
            Video Empresarial
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "videoUpload"}
                onChange={() => toggleAccordion("videoUpload")}
              />
              <div>
                <span className="slider"></span>
              </div>
            </label>
          </h2>
          {activeAccordion === "videoUpload" && (
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
          )}

          {/* Servicios */}
          <h2 className="switchcontainer">
            Servicios
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "services"}
                onChange={() => toggleAccordion("services")}
              />
              <div>
                <span className="slider"></span>
              </div>
            </label>
          </h2>
          {activeAccordion === "services" && (
            <>
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
            </>
          )}

          {/* Calendario */}
          <h2 className="switchcontainer">
            Calendario
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "calendar"}
                onChange={() => toggleAccordion("calendar")}
              />
              <div>
                <span className="slider"></span>
              </div>
            </label>
          </h2>
          {activeAccordion === "calendar" && (
            <div style={{ marginBottom: "20px" }}>
          <label>Selecciona un calendario:</label>
              <select 
                name="calendario" 
                value={formData.calendario} 
                onChange={handleChange}
                style={{ marginBottom: "10px" }}
              >
            <option value="">Selecciona...</option>
            <option value="google">Google Calendar</option>
            <option value="outlook">Outlook</option>
            <option value="ical">iCal</option>
          </select>

              {formData.calendario && (
                <div>
                  <label>URL del Calendario:</label>
                  <input
                    type="text"
                    name="calendarioUrl"
                    value={formData.calendarioUrl}
                    onChange={handleChange}
                    placeholder={
                      formData.calendario === 'google' 
                        ? "https://calendar.google.com/calendar/embed?src=..." 
                        : formData.calendario === 'outlook'
                        ? "https://outlook.live.com/calendar/0/..."
                        : "URL del calendario iCal"
                    }
                    style={{ marginTop: "5px" }}
                  />
                  <small style={{ display: "block", marginTop: "5px", color: "#666" }}>
                    {formData.calendario === 'google' 
                      ? "Pega la URL de incrustación de tu calendario de Google"
                      : formData.calendario === 'outlook'
                      ? "Pega la URL de tu calendario de Outlook"
                      : "Pega la URL de tu calendario iCal"}
                  </small>
                </div>
              )}
            </div>
          )}

          {/* Foto/Texto 1 */}
          <h2 className="switchcontainer">
            Foto/Texto 1
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "fotoTexto1"}
                onChange={() => toggleAccordion("fotoTexto1")}
              />
              <div>
                <span className="slider"></span>
              </div>
            </label>
          </h2>
          {activeAccordion === "fotoTexto1" && (
            <div style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "10px" }}>
                <label>Imagen:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'fotoTexto1')}
                  style={{ marginTop: "5px" }}
                />
                {formData.fotoTexto1 && (
                  <div style={{ marginTop: "10px" }}>
                    <img 
                      src={formData.fotoTexto1} 
                      alt="Vista previa" 
                      style={{ maxWidth: "200px", maxHeight: "200px" }} 
                    />
                  </div>
                )}
              </div>
              
              <div style={{ marginBottom: "10px" }}>
                <label>Título:</label>
                <input
                  type="text"
                  name="fotoTexto1Title"
                  value={formData.fotoTexto1Title}
                  onChange={handleChange}
                  placeholder="Ingrese el título"
                  style={{ marginTop: "5px", width: "100%" }}
                />
              </div>
              
              <div style={{ marginBottom: "10px" }}>
                <label>Descripción:</label>
                <textarea
                  name="fotoTexto1Description"
                  value={formData.fotoTexto1Description}
                  onChange={handleChange}
                  placeholder="Ingrese la descripción"
                  style={{ 
                    marginTop: "5px", 
                    width: "100%", 
                    minHeight: "100px",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc"
                  }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>Color del texto:</label>
                <input
                  type="color"
                  name="fotoTexto1TextColor"
                  value={formData.fotoTexto1TextColor}
                  onChange={handleChange}
                  style={{ marginTop: "5px" }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>Fuente del texto:</label>
                <select
                  name="fotoTexto1FontFamily"
                  value={formData.fotoTexto1FontFamily}
                  onChange={handleChange}
                  style={{ 
                    marginTop: "5px",
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc"
                  }}
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Impact">Impact</option>
                  <option value="Comic Sans MS">Comic Sans MS</option>
                </select>
              </div>
            </div>
          )}

          {/* Subir Foto/Texto 2 */}
          <h2 className="switchcontainer">
            Foto/Texto 2
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "fotoTexto2"}
                onChange={() => toggleAccordion("fotoTexto2")}
              />
              <div>
                <span className="slider"></span>
              </div>
            </label>
          </h2>
          {activeAccordion === "fotoTexto2" && (
            <div style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "10px" }}>
                <label>Imagen:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'fotoTexto2')}
                  style={{ marginTop: "5px" }}
                />
                {formData.fotoTexto2 && (
                  <div style={{ marginTop: "10px" }}>
                    <img 
                      src={formData.fotoTexto2} 
                      alt="Vista previa" 
                      style={{ maxWidth: "200px", maxHeight: "200px" }} 
                    />
                  </div>
                )}
              </div>
              
              <div style={{ marginBottom: "10px" }}>
                <label>Título:</label>
                <input
                  type="text"
                  name="fotoTexto2Title"
                  value={formData.fotoTexto2Title}
                  onChange={handleChange}
                  placeholder="Ingrese el título"
                  style={{ marginTop: "5px", width: "100%" }}
                />
              </div>
              
              <div style={{ marginBottom: "10px" }}>
                <label>Descripción:</label>
                <textarea
                  name="fotoTexto2Description"
                  value={formData.fotoTexto2Description}
                  onChange={handleChange}
                  placeholder="Ingrese la descripción"
                  style={{ 
                    marginTop: "5px", 
                    width: "100%", 
                    minHeight: "100px",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc"
                  }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>Color del texto:</label>
                <input
                  type="color"
                  name="fotoTexto2TextColor"
                  value={formData.fotoTexto2TextColor}
                  onChange={handleChange}
                  style={{ marginTop: "5px" }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>Fuente del texto:</label>
                <select
                  name="fotoTexto2FontFamily"
                  value={formData.fotoTexto2FontFamily}
                  onChange={handleChange}
                  style={{ 
                    marginTop: "5px",
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc"
                  }}
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Impact">Impact</option>
                  <option value="Comic Sans MS">Comic Sans MS</option>
                </select>
              </div>
            </div>
          )}

          {/* Subir Foto/Texto 3 */}
          <h2 className="switchcontainer">
            Foto/Texto 3
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "fotoTexto3"}
                onChange={() => toggleAccordion("fotoTexto3")}
              />
              <div>
                <span className="slider"></span>
              </div>
            </label>
          </h2>
          {activeAccordion === "fotoTexto3" && (
            <div style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "10px" }}>
                <label>Imagen:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'fotoTexto3')}
                  style={{ marginTop: "5px" }}
                />
                {formData.fotoTexto3 && (
                  <div style={{ marginTop: "10px" }}>
                    <img 
                      src={formData.fotoTexto3} 
                      alt="Vista previa" 
                      style={{ maxWidth: "200px", maxHeight: "200px" }} 
                    />
                  </div>
                )}
              </div>
              
              <div style={{ marginBottom: "10px" }}>
                <label>Título:</label>
                <input
                  type="text"
                  name="fotoTexto3Title"
                  value={formData.fotoTexto3Title}
                  onChange={handleChange}
                  placeholder="Ingrese el título"
                  style={{ marginTop: "5px", width: "100%" }}
                />
              </div>
              
              <div style={{ marginBottom: "10px" }}>
                <label>Descripción:</label>
                <textarea
                  name="fotoTexto3Description"
                  value={formData.fotoTexto3Description}
                  onChange={handleChange}
                  placeholder="Ingrese la descripción"
                  style={{ 
                    marginTop: "5px", 
                    width: "100%", 
                    minHeight: "100px",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc"
                  }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>Color del texto:</label>
                <input
                  type="color"
                  name="fotoTexto3TextColor"
                  value={formData.fotoTexto3TextColor}
                  onChange={handleChange}
                  style={{ marginTop: "5px" }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>Fuente del texto:</label>
                <select
                  name="fotoTexto3FontFamily"
                  value={formData.fotoTexto3FontFamily}
                  onChange={handleChange}
                  style={{ 
                    marginTop: "5px",
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc"
                  }}
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Impact">Impact</option>
                  <option value="Comic Sans MS">Comic Sans MS</option>
                </select>
              </div>
            </div>
          )}

          {/* Carrusel Vertical (Celda 13) */}
          <h2 className="switchcontainer">
            Carrusel Vertical
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "verticalCarousel"}
                onChange={() => toggleAccordion("verticalCarousel")}
              />
              <div>
                <span className="slider"></span>
              </div>
            </label>
          </h2>
          {activeAccordion === "verticalCarousel" && (
            <div style={{ marginBottom: "20px" }}>
              <label>Imágenes para el Carrusel Vertical:</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, 'carouselVerticalImages', true)}
                style={{ marginTop: "5px" }}
              />
              <small style={{ display: "block", marginTop: "5px", color: "#666" }}>
                Puedes seleccionar varias imágenes.
              </small>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '10px' }}>
                {formData.carouselVerticalImages.map((img, i) => (
                  !!img && typeof img === 'string' && img.startsWith('data:image') && (
                    <div key={i} style={{ width: 80, height: 80, background: '#fff', border: '1px solid #ddd', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={img} alt={`Vertical Carousel ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#fff' }} />
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Carrusel Horizontal (Celda 14) */}
          <h2 className="switchcontainer">
            Carrusel Horizontal
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "horizontalCarousel"}
                onChange={() => toggleAccordion("horizontalCarousel")}
              />
              <div>
                <span className="slider"></span>
              </div>
            </label>
          </h2>
          {activeAccordion === "horizontalCarousel" && (
            <div style={{ marginBottom: "20px" }}>
              <label>Imágenes para el Carrusel Horizontal:</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, 'carouselHorizontalImages', true)}
                style={{ marginTop: "5px" }}
              />
              <small style={{ display: "block", marginTop: "5px", color: "#666" }}>
                Puedes seleccionar varias imágenes.
              </small>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '10px' }}>
                {formData.carouselHorizontalImages.map((img, i) => (
                  !!img && typeof img === 'string' && img.startsWith('data:image') && (
                    <div key={i} style={{ width: 80, height: 80, background: '#fff', border: '1px solid #ddd', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={img} alt={`Horizontal Carousel ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#fff' }} />
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Carrusel Vertical 2 (Celda 15) */}
          <h2 className="switchcontainer">
            Carrusel Vertical 2
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "verticalCarousel2"}
                onChange={() => toggleAccordion("verticalCarousel2")}
              />
              <div>
                <span className="slider"></span>
              </div>
            </label>
          </h2>
          {activeAccordion === "verticalCarousel2" && (
            <div style={{ marginBottom: "20px" }}>
              <label>Imágenes para el Carrusel Vertical 2:</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, 'carouselVerticalImages2', true)}
                style={{ marginTop: "5px" }}
              />
              <small style={{ display: "block", marginTop: "5px", color: "#666" }}>
                Puedes seleccionar varias imágenes.
              </small>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '10px' }}>
                {formData.carouselVerticalImages2.map((img, i) => (
                  !!img && typeof img === 'string' && img.startsWith('data:image') && (
                    <div key={i} style={{ width: 80, height: 80, background: '#fff', border: '1px solid #ddd', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={img} alt={`Vertical Carousel 2 ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#fff' }} />
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Carrusel Horizontal 2 (Celda 16) */}
          <h2 className="switchcontainer">
            Carrusel Horizontal 2
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "horizontalCarousel2"}
                onChange={() => toggleAccordion("horizontalCarousel2")}
              />
              <div>
                <span className="slider"></span>
              </div>
            </label>
          </h2>
          {activeAccordion === "horizontalCarousel2" && (
            <div style={{ marginBottom: "20px" }}>
              <label>Imágenes para el Carrusel Horizontal 2:</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, 'carouselHorizontalImages2', true)}
                style={{ marginTop: "5px" }}
              />
              <small style={{ display: "block", marginTop: "5px", color: "#666" }}>
                Puedes seleccionar varias imágenes.
              </small>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '10px' }}>
                {formData.carouselHorizontalImages2.map((img, i) => (
                  !!img && typeof img === 'string' && img.startsWith('data:image') && (
                    <div key={i} style={{ width: 80, height: 80, background: '#fff', border: '1px solid #ddd', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={img} alt={`Horizontal Carousel 2 ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#fff' }} />
                    </div>
                  )
                ))}
              </div>
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
              if (cell.i === '6') {
                return (
                  <div
                    key={cell.i}
                    data-grid={{ x: cell.x, y: cell.y, w: cell.w, h: cell.h }}
                    style={{
                      border: "1px solid #ccc",
                      padding: "15px",
                      backgroundColor: cell.bgColor,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      overflow: "auto"
                    }}
                  >
                    <h3 style={{ margin: "0", color: "#333", fontSize: "1.2rem", textAlign: "center" }}>
                      {formData.title}
                    </h3>
                    <div style={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      gap: "8px",
                      width: "100%",
                      fontSize: "0.9rem"
                    }}>
                      <p style={{ margin: "0", display: "flex", alignItems: "center", gap: "5px" }}>
                        <i className="fas fa-building" style={{ color: "#666" }}></i>
                        {formData.businessType}
                      </p>
                      <p style={{ margin: "0", display: "flex", alignItems: "center", gap: "5px" }}>
                        <i className="fas fa-map-marker-alt" style={{ color: "#666" }}></i>
                        {formData.address}
                      </p>
                      <p style={{ margin: "0", display: "flex", alignItems: "center", gap: "5px" }}>
                        <i className="fas fa-phone" style={{ color: "#666" }}></i>
                        {formData.phone}
                      </p>
                      <p style={{ margin: "0", display: "flex", alignItems: "center", gap: "5px" }}>
                        <i className="fas fa-envelope" style={{ color: "#666" }}></i>
                        {formData.email}
                      </p>
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