import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";

function FormTemplate({data = null}) {
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem("token"));

    const handleGeneratePage = () => {
      if (token) {
      navigate("/webtemplateCreate", { state: formData }); // Envía los datos a la página de vista previa
      } else {
        navigate("/auth"); // Redirige al usuario al inicio de sesión si no hay
      }
    };
  const url = window.location.href;
  const id = url.split("/")[3]; // Assuming the ID is the first parameter after the domain

  const selectedData = data ? data.find(item => item.id === parseInt(id)) : null;
    console.log("selectedData---------|||------------", selectedData);
  useEffect(() => {
    if (selectedData) {
      setFormData(selectedData);
    }
  }, [selectedData]);
  
  console.log("$$$$$$$-----4$$$$$-----$$$$", data);
  const [formData, setFormData] = useState(data && data.length ? selectedData : {
    title: "",
    businessType: "",
    address: "",
    phone: "",
    email: "",
    socialLinks: {
      whatsapp: "",
      facebook: "",
      instagram: "",
      youtube: "",
      linkedin: "",
      tiktok: "",
      pinterest: "",
      twitter: "",
    },
    logo: "",
    backgroundImage: "",
    carouselImages: [],
    carouselImages2: [],
    services: [{ name: "", description: "", carouselImagesServicio: "" }],
    centralCarousel: [{ image: "", description: "" }],
    emailClient: (() => {
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.email;
      }
      return "";
    })()
  });
  
  console.log(" localStorage.getItem>>>>>>>>>>>>>",   (() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.email;
    }
    return "";
  })());

  const [preview, setPreview] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (section) => {
    setActiveAccordion((prev) => (prev === section ? null : section));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      socialLinks: {
        ...prevData.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          [type]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCarouselImagesChange = (e) => {
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
        carouselImages: [...prevData.carouselImages, ...images],
      }));
    });
  };

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
        carouselImages2: [...prevData.carouselImages2, ...images],
      }));
    });
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...formData.services];
    updatedServices[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      services: updatedServices,
    }));
  };

  const handleServiceImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedServices = [...formData.services];
        updatedServices[index].carouselImagesServicio = reader.result;
        setFormData((prevData) => ({
          ...prevData,
          services: updatedServices,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  {/* Carrusel Central */}
  const handleCentralCarouselChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCarousel = [...formData.centralCarousel];
    updatedCarousel[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      centralCarousel: updatedCarousel,
    }));
  };

  const handleCentralCarouselImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedCarousel = [...formData.centralCarousel];
        updatedCarousel[index].image = reader.result;
        setFormData((prevData) => ({
          ...prevData,
          centralCarousel: updatedCarousel,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addCentralCarouselItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      centralCarousel: [...prevData.centralCarousel, { image: "", description: "" }],
    }));
  };

  const removeCentralCarouselItem = (index) => {
    const updatedCarousel = formData.centralCarousel.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      centralCarousel: updatedCarousel,
    }));
  };

  const addService = () => {
    setFormData((prevData) => ({
      ...prevData,
      services: [
        ...prevData.services,
        { name: "", description: "", carouselImagesServicio: "" },
      ],
    }));
  };

  const removeService = (index) => {
    const updatedServices = formData.services.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      services: updatedServices,
    }));
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Cerrando sesión...");
    setTimeout(() => (window.location.href = "/auth"), 1500);
    // navigate("/auth", { replace: true }); // Redirige al usuario al inicio de sesión (u otra ruta)
  };
    return (
       <>
         {token && (
            <div style={{ textAlign: "right", padding: "10px", margin: "10px" }}>
                <a href="/">
                <button className="accionButton" onClick={handleLogout} >Salir</button>
              </a>
                <a href="/admin/">
                <button className="accionButton"  >admin</button>
              </a>
            </div>  
          )}
             
      <div className="generatecontainer">
        <h1 className="hedercontainer">Generador de Página Web</h1>
        <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: "600px", margin: "auto" }}>

          {/* Información General */}
<h2 className="switchcontainer">
  Información General
  <label className="toggle-switch" style={{ marginLeft: "10px" }}>
    <input
      type="checkbox"
      checked={activeAccordion === "general"}
      onChange={() => toggleAccordion("general")}
    />
    <div>
      <span className="slider"></span>
    </div>
  </label>
</h2>
{activeAccordion === "general" && (
  <div>
    <label htmlFor="title">Título de la Página:</label>
    <input
      className="inputcontainer"
      type="text"
      id="title"
      name="title"
      value={formData.title}
      onChange={handleChange}
      required
    />
    <label htmlFor="businessType">Tipo de Negocio:</label>
    <select
      className="inputcontainer"
      id="businessType"
      name="businessType"
      value={formData.businessType}
      onChange={handleChange}
      required
    >
      <option value="">Seleccione un tipo de negocio</option>
            <option value="Restaurante">Restaurante</option>
            <option value="Tienda de Ropa">Tienda de Ropa</option>
            <option value="Consultoría">Consultoría</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Educación">Educación</option>
            <option value="Salud y Bienestar">Salud y Bienestar</option>
            <option value="Gimnasio">Gimnasio</option>
            <option value="Supermercado">Supermercado</option>
            <option value="Agencia de Viajes">Agencia de Viajes</option>
            <option value="Peluquería">Peluquería</option>
            <option value="Inmobiliaria">Inmobiliaria</option>
            <option value="Marketing Digital">Marketing Digital</option>
            <option value="Eventos">Eventos</option>
            <option value="Tienda Online">Tienda Online</option>
            <option value="Otro">Otro</option>
    </select>
    <label htmlFor="address">Dirección:</label>
    <input
      className="inputcontainer"
      type="text"
      id="address"
      name="address"
      value={formData.address}
      onChange={handleChange}
      required
    />
    <label htmlFor="phone">Teléfono:</label>
    <input
      className="inputcontainer"
      type="tel"
      id="phone"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      required
    />
    <label htmlFor="email">Correo Electrónico:</label>
    <input
      className="inputcontainer"
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />
  </div>
)}

          {/* Redes Sociales */}
          <h2 className="switchcontainer">
            Redes Sociales
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "social"}
                onChange={() => toggleAccordion("social")}
              />
              <div>
              <span className="slider"></span>
              </div>            </label>
          </h2>
          {activeAccordion === "social" && (
            <div>
              {Object.keys(formData.socialLinks).map((key) => (
                <div key={key}>
                  <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                  <input
                    className="inputcontainer"
                    id={key}
                    name={key}
                    value={formData.socialLinks[key]}
                    onChange={handleSocialChange}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Subir Logotipo */}
          <h2 className="switchcontainer">
            Subir Logotipo
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "logo"}
                onChange={() => toggleAccordion("logo")}
              />
              <div>
              <span className="slider"></span>
              </div>            </label>
          </h2>
          {activeAccordion === "logo" && (
            <div>
              <label htmlFor="logo">Subir Logotipo:</label>
              <input
                type="file"
                id="logo"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "logo")}
              />
            </div>
          )}

          {/* Carrusel Central */}
          <h2 className="switchcontainer">
            Carrusel Central
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "carouselCentral"}
                onChange={() => toggleAccordion("carouselCentral")}
              />
              <div>
              <span className="slider"></span>
              </div>            </label>
          </h2>
          {activeAccordion === "carouselCentral" && (
            <div>
              {formData.centralCarousel.map((item, index) => (
                <div key={index}>
                  <label htmlFor={`centralCarouselImage${index}`}>Imagen del Carrusel:</label>
                  <input
                    type="file"
                    id={`centralCarouselImage${index}`}
                    accept="image/*"
                    onChange={(e) => handleCentralCarouselImageChange(index, e)}
                  />
                  <label htmlFor={`centralCarouselDescription${index}`}>Descripción:</label>
                  <textarea
                    id={`centralCarouselDescription${index}`}
                    name="description"
                    value={item.description}
                    onChange={(e) => handleCentralCarouselChange(index, e)}
                    required
                  />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button type="button" onClick={() => removeCentralCarouselItem(index)}>
                      Eliminar Imagen
                    </button>
                    <button type="button" onClick={addCentralCarouselItem}>
                      Añadir Imagen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Carruseles 1 y 2 */}
          <h2 className="switchcontainer">
            Subir Imágenes Carruseles
            <label className="toggle-switch" style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={activeAccordion === "carousels"}
                onChange={() => toggleAccordion("carousels")}
              />
              <div>
              <span className="slider"></span>
              </div>            </label>
          </h2>
          {activeAccordion === "carousels" && (
            <div>
              <label htmlFor="carouselImages1">Subir Imagen Carrusel 1:</label>
              <input
                type="file"
                id="carouselImages1"
                accept="image/*"
                multiple
                onChange={handleCarouselImagesChange}
              />
              <label htmlFor="carouselImages2">Subir Imagen Carrusel 2:</label>
              <input
                type="file"
                id="carouselImages2"
                accept="image/*"
                multiple
                onChange={handleCarouselImagesChange2}
              />
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
              </div>            </label>
          </h2>
          {activeAccordion === "services" && (
            <div>
              {formData.services.map((service, index) => (
                <div key={index}>
                  <label htmlFor={`serviceName${index}`}>Nombre del Servicio:</label>
                  <input
                    type="text"
                    id={`serviceName${index}`}
                    name="name"
                    value={service.name}
                    onChange={(e) => handleServiceChange(index, e)}
                    required
                  />
                  <label htmlFor={`serviceDescription${index}`}>Descripción:</label>
                  <textarea
                    id={`serviceDescription${index}`}
                    name="description"
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, e)}
                    required
                  />
                  <label htmlFor={`carouselImagesServicio${index}`}>
                    Subir Imagen del Servicio:
                  </label>
                  <input
                    type="file"
                    id={`carouselImagesServicio${index}`}
                    accept="image/*"
                    onChange={(e) => handleServiceImageChange(index, e)}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button type="button" onClick={() => removeService(index)}>
                      Eliminar Servicio
                    </button>
                    <button type="button" onClick={addService}>
                      Añadir Servicio
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button type="button" onClick={handleGeneratePage}>
              Generar Página
            </button>
          </div>
        </form>
      </div>
       </> 
    );
};

export default FormTemplate;