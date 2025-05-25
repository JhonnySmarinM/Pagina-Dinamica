// Importar módulos y hooks necesarios de React
import React, { useState, useEffect } from "react";
// Importar hook para navegación programática
import { useNavigate } from "react-router-dom";

// Importar estilos CSS para este componente (o generales)
import "./App.css";

// Componente funcional FormTemplate que recibe data y gridLayout como props
function FormTemplate({ data = null, gridLayout = null }) {
  // Hook para la navegación programática
  const navigate = useNavigate();

  // Función para manejar la generación de la página y navegar a la vista previa
  const handleGeneratePage = () => {
    // Navegar a la ruta /webtemplateCreate y pasar la info de las celdas generadas
    navigate("/webtemplateCreate", { state: { ...formData, movableCells: getMovableCellsFromForm() } });
  };

  // Obtener la URL current para extraer el ID si existe (para edición)
  const url = window.location.href;
  // Extraer el ID de la URL (asumiendo que es el tercer segmento)
  const id = url.split("/")[3];

  // Encontrar los datos correspondientes al ID si la prop data existe
  const selectedData = data ? data.find(item => item.id === parseInt(id)) : null;
  console.log("selectedData---------|||------------", selectedData); // Log de los datos seleccionados

  // Efecto para cargar los datos seleccionados en el estado del formulario cuando selectedData cambie
  useEffect(() => {
    if (selectedData) {
      setFormData(selectedData); // Establecer el estado del formulario con los datos obtenidos
    }
  }, [selectedData]); // Dependencia: este efecto se ejecuta cuando selectedData cambia

  console.log("$$$$$$$-----4$$$$$-----$$$$", data); // Log general de la prop data

  // Estado local para almacenar los datos del formulario
  const [formData, setFormData] = useState(data && data.length ? selectedData : { // Inicializar con selectedData si existe, de lo contrario con valores por defecto
    title: "", // Título de la página
    businessType: "", // Tipo de negocio
    address: "", // Dirección
    phone: "", // Teléfono
    email: "", // Correo electrónico
    socialLinks: { // Objeto para enlaces a redes sociales
      whatsapp: "",
      facebook: "",
      instagram: "",
      youtube: "",
      linkedin: "",
      tiktok: "",
      pinterest: "",
      twitter: "",
    },
    logo: "", // URL/Base64 del logo
    backgroundImage: "", // URL/Base64 de la imagen de fondo
    carouselImages: [], // Array para imágenes del carrusel 1
    carouselImages2: [], // Array para imágenes del carrusel 2
    services: [{ name: "", description: "", carouselImagesServicio: "" }], // Array de servicios
    centralCarousel: [{ image: "", description: "" }], // Array para carrusel central
    emailClient: "", // Correo electrónico del cliente (parece no estar en el estado inicial de App.jsx)
    movableCells: Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      content: `Celda ${i + 1}`,
      bgColor: [
        "#D3D3D3", // 1
        "#FF2D2D", // 2
        "#A89C5D", // 3
        "#FFC300", // 4
        "#00BFFF", // 5
        "#295A6D", // 6
        "#2B7A78", // 7
        "#FF6F00", // 8
        "#FFFFFF", // 9
        "#BDB89B", // 10
        "#BDB89B", // 11
        "#BDB89B", // 12
        "#FF8000", // 13
        "#FF8000", // 14
        "#FF8000", // 15
        "#FF8000"  // 16
      ][i],
    })),
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
            {formData.movableCells.map((cell, index) => (
              <div
                key={cell.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  cursor: "move",
                  background: cell.bgColor,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <input
                  type="text"
                  value={cell.content}
                  onChange={(e) => {
                    const updatedCells = [...formData.movableCells];
                    updatedCells[index].content = e.target.value;
                    setFormData((prevData) => ({
                      ...prevData,
                      movableCells: updatedCells,
                    }));
                  }}
                  style={{ marginBottom: "8px", width: "90%" }}
                />
                <input
                  type="color"
                  value={cell.bgColor}
                  onChange={(e) => {
                    const updatedCells = [...formData.movableCells];
                    updatedCells[index].bgColor = e.target.value;
                    setFormData((prevData) => ({
                      ...prevData,
                      movableCells: updatedCells,
                    }));
                  }}
                  style={{ width: "90%" }}
                />
              </div>
            ))}
          </div>
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

  // Renderizado principal del componente FormTemplate
  return (
    // Contenedor principal del formulario
    <div className="form-container">
      {/* Renderizar el gridLayout si se pasa como prop (actualmente no se usa aquí según el último cambio en App.jsx) */}
      {gridLayout}
      {/* Contenido principal del formulario */}
      <div className="form-content">
        {/* Título del formulario */}
        <h1>Formulario de Configuración</h1>
        {/* Formulario HTML */}
        <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: "600px", margin: "auto" }}>
          {/* Información General */}
          <h2>Información General</h2>
          <label htmlFor="title">Título de la Página:</label>
          <input className="inputcontainer" type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
          <label htmlFor="businessType">Tipo de Negocio:</label>
          <input className="inputcontainer" type="text" id="businessType" name="businessType" value={formData.businessType} onChange={handleChange} required />
          <label htmlFor="address">Dirección:</label>
          <input className="inputcontainer" type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
          <label htmlFor="phone">Teléfono:</label>
          <input className="inputcontainer" type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          <label htmlFor="email">Correo Electrónico:</label>
          <input className="inputcontainer" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

          {/* Subir Logotipo */}
          <h2>Subir Logotipo</h2>
          <input type="file" id="logo" accept="image/*" onChange={(e) => handleFileChange(e, "logo")}/>
          {formData.logo && <img src={formData.logo} alt="Logo" style={{maxWidth: 120, margin: 8}} />}

          {/* Carrusel Publicidad 1 */}
          <h2>Carrusel Publicidad 1</h2>
          <input type="file" id="carouselImages1" accept="image/*" multiple onChange={handleCarouselImagesChange} />
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
            {formData.carouselImages.map((img, i) => <img key={i} src={img} alt="pub1" style={{maxWidth: 80}} />)}
          </div>

          {/* Carrusel Publicidad 2 */}
          <h2>Carrusel Publicidad 2</h2>
          <input type="file" id="carouselImages2" accept="image/*" multiple onChange={handleCarouselImagesChange2} />
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
            {formData.carouselImages2.map((img, i) => <img key={i} src={img} alt="pub2" style={{maxWidth: 80}} />)}
          </div>

          {/* Subir Video Empresarial */}
          <h2>Subir Video Empresarial</h2>
          <input type="text" id="videoUrl" name="videoUrl" placeholder="URL de YouTube" value={formData.videoUrl || ''} onChange={handleChange} />

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
              {service.carouselImagesServicio && <img src={service.carouselImagesServicio} alt="servicio" style={{maxWidth: 80}} />}
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
          {formData.fotoTexto1 && <img src={formData.fotoTexto1} alt="foto1" style={{maxWidth: 80}} />}

          {/* Subir Foto/Texto 2 */}
          <h2>Subir Foto/Texto 2</h2>
          <input type="file" name="fotoTexto2" accept="image/*" onChange={e => handleFileChange(e, "fotoTexto2")}/>
          <input type="text" name="texto2" placeholder="Texto 2" value={formData.texto2 || ''} onChange={handleChange} />
          {formData.fotoTexto2 && <img src={formData.fotoTexto2} alt="foto2" style={{maxWidth: 80}} />}

          {/* Subir Foto/Texto 3 */}
          <h2>Subir Foto/Texto 3</h2>
          <input type="file" name="fotoTexto3" accept="image/*" onChange={e => handleFileChange(e, "fotoTexto3")}/>
          <input type="text" name="texto3" placeholder="Texto 3" value={formData.texto3 || ''} onChange={handleChange} />
          {formData.fotoTexto3 && <img src={formData.fotoTexto3} alt="foto3" style={{maxWidth: 80}} />}

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button type="button" onClick={handleGeneratePage}>
              Generar Página
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Exportar el componente FormTemplate
export default FormTemplate;