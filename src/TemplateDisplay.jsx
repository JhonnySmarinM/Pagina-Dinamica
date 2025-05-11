import React, { useState, useEffect } from "react";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation, useNavigate } from "react-router-dom";

function TemplateDisplay({ datas = {} }) {
  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state;

  console.log("Datos recibidos:", data);

  // Estado para controlar la visibilidad de los modales
  const [isHomeModalOpen, setHomeModalOpen] = useState(false);
  const [isServicesModalOpen, setServicesModalOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [currentIndex3, setCurrentIndex3] = useState(0);
  const [currentIndex4, setCurrentIndex4] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Estado para el spinner y deshabilitar botón
  const [formData, setFormData] = useState({}); // Tu estado de datos (anteriormente data)
  const [responsePreview, setResponsePreview] = useState(null); // Estado para la previsualización (anteriormente preview)

  const handleIndicatorClick = (index, carouselNumber) => {
    if (carouselNumber === 1) {
      setCurrentIndex1(index);
      document.querySelector(".carousel1").scrollTo({
        left: index * 310,
        behavior: "smooth",
      });
    } else if (carouselNumber === 2) {
      setCurrentIndex2(index);
      document.querySelector(".carousel2").scrollTo({
        left: index * 310,
        behavior: "smooth",
      });
    } else if (carouselNumber === 3) {
      setCurrentIndex3(index);
      document.querySelector(".carousel3").scrollTo({
        left: index * 310,
        behavior: "smooth",
      });
    } else if (carouselNumber === 4) {
      setCurrentIndex4(index);
      document.querySelector(".carousel4").scrollTo({
        left: index * 310,
        behavior: "smooth",
      });
    }
  };

  // Funciones para abrir y cerrar los modales
  const openHomeModal = () => setHomeModalOpen(true);
  const closeHomeModal = () => setHomeModalOpen(false);

  const openServicesModal = () => setServicesModalOpen(true);
  const closeServicesModal = () => setServicesModalOpen(false);

  const openContactModal = () => setContactModalOpen(true);
  const closeContactModal = () => setContactModalOpen(false);

  useEffect(() => {
    // Intervalo para mover los carruseles automáticamente
    const interval = setInterval(() => {
      const carousels = document.querySelectorAll('.carousel');
      carousels.forEach(carousel => {
        carousel.scrollBy({ left: 300, behavior: "smooth" });
      });
    }, 2000); // Mueve el carrusel cada 2 segundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  let dinamicID = 0;

  const saveTemplate = async (e) => {
    e.preventDefault(); // Evitar que el formulario recargue la página por defecto

    let body = JSON.stringify(data);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://login-1k91.onrender.com/api/v1/dataform/',
      referrerPolicy: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      data: body
    };

    const response = axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setPreview(response.data);
        dinamicID = response.data.id;
        console.log(dinamicID);
        // Guardar el ID en el almacenamiento local
        window.localStorage.setItem("id", dinamicID);
        // Redirigir a la nueva URL
        window.location.href = '/admin';
      })
      .catch((error) => {
        console.log(error);
        alert("Error save success", error);
      });
  };

  
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "20px",
          padding: "20px",
          width: "100%",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <button className="accionButton" >
          <a href="/" >Formulario</a>
        </button>
        {/* <button className="accionButton" >
          <a href="http://" onClick={deleteTemplate}>Eliminar</a>
        </button> */}
        <button className="accionButton" onClick={saveTemplate} >
          <a href="http://">Guardar</a>
        </button>
        {/* <button className="accionButton"> */}
        {/* Publicar con manejo del evento */}
        {/* <a href="#" onClick={handlePublish}>Publicar</a> */}
        {/* </button> */}
          <button className="accionButton" >
            <a href="/admin">Admin</a>
          </button>
      </div>
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          width: "100%",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",

        }}
      >
        {/* Logo */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img
            src={data.logo || "default-logo.jpg"}
            alt="Logo"
            style={{ height: "200px", width: "300px",
              minWidth: "300px",
              maxWidth: "300px",
          }}
            
          />
        </div>

        {/* Redes Sociales y Carruseles */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flex: 2,
            maxWidth: "900px",
          }}
        >
          {/* Redes Sociales */}
          <div
            style={{
              width: "25%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              gap: "10px",
            }}
          >
            {/* WhatsApp */}
            <a href="https://web.whatsapp.com/"
              style={{
                backgroundColor: "#25D366",
                padding: "10px",
                borderRadius: "5px",
                display: "inline-block",
                margin: "1px",
                color: "#fff",
              }}
            >
              <i className="fab fa-whatsapp" style={{ fontSize: "24px" }}></i>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/"
              style={{
                backgroundColor: "#3b5998",
                padding: "10px",
                borderRadius: "5px",
                display: "inline-block",
                margin: "1px",
                color: "#fff",
              }}
            >
              <i className="fab fa-facebook-f" style={{ fontSize: "24px" }}></i>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/"
              style={{
                backgroundColor: "#E1306C",
                padding: "10px",
                borderRadius: "5px",
                display: "inline-block",
                margin: "1px",
                color: "#fff",
              }}
            >
              <i className="fab fa-instagram" style={{ fontSize: "24px" }}></i>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/login/es"
              style={{
                backgroundColor: "#0077B5",
                padding: "10px",
                borderRadius: "5px",
                display: "inline-block",
                margin: "1px",
                color: "#fff",
              }}
            >
              <i className="fab fa-linkedin-in" style={{ fontSize: "24px" }}></i>
            </a>

            {/* TikTok */}
            <a href="https://www.tiktok.com/"
              style={{
                backgroundColor: "#000000",
                padding: "10px",
                borderRadius: "5px",
                display: "inline-block",
                margin: "1px",
                color: "#fff",
              }}
            >
              <i className="fab fa-tiktok" style={{ fontSize: "24px" }}></i>
            </a>

            {/* Telegram */}
            <a href="https://web.telegram.org/"
              style={{
                backgroundColor: "#0088cc",
                padding: "10px",
                borderRadius: "5px",
                display: "inline-block",
                margin: "1px",
                color: "#fff",
              }}
            >
              <i className="fab fa-telegram-plane" style={{ fontSize: "24px" }}></i>
            </a>

            {/* Gmail */}
            <a href="mailto:tucorreo@gmail.com"
              style={{
                backgroundColor: "#D14836",
                padding: "10px",
                borderRadius: "5px",
                display: "inline-block",
                margin: "1px",
                color: "#fff",
              }}
            >
              <i className="fas fa-envelope" style={{ fontSize: "24px" }}></i>
            </a>

            {/* Pinterest */}
            <a href="https://www.pinterest.com/"
              style={{
                backgroundColor: "#E60023",
                padding: "10px",
                borderRadius: "5px",
                display: "inline-block",
                margin: "1px",
                color: "#fff",
              }}
            >
              <i className="fab fa-pinterest" style={{ fontSize: "24px" }}></i>
            </a>
          </div>



          {/* Carruseles */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              flex: 2,
              width: "100%",
            }}
          >
            {/* Primer Carrusel */}
            <div style={{ maxWidth: "400px", margin: "0 auto" }}>
              <div
                className="carousel carousel1"
                style={{
                  display: "flex",
                  gap: "10px",
                  overflowX: "hidden",
                  scrollBehavior: "smooth",
                  flex: 1,
                }}
              >
                {data.carouselImages2.map((img, index) => (
                  <img
                    key={index}
                    src={`${img}`}
                    alt="Viajes"
                    style={{
                      height: "200px",
                      width: "300px",
                      borderRadius: "10px",
                      flexShrink: 0,
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                {data.carouselImages2.map((_, index) => (
                  <span
                    key={index}
                    onClick={() => handleIndicatorClick(index, 1)}
                    style={{
                      height: "10px",
                      width: "10px",
                      margin: "0 5px",
                      borderRadius: "50%",
                      backgroundColor: currentIndex1 === index ? "#333" : "#ccc",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>
            <div style={{ maxWidth: "400px", margin: "0 auto" }}>
              <div
                className="carousel carousel2"
                style={{
                  display: "flex",
                  gap: "10px",
                  overflowX: "hidden",
                  scrollBehavior: "smooth",
                  flex: 1,
                }}
              >
                {data.carouselImages.map((img, index) => (
                  <img
                    key={index}
                    src={`${img}`}
                    alt="Comida"
                    style={{
                      height: "200px",
                      width: "300px",
                      borderRadius: "10px",
                      flexShrink: 0,
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                {data.carouselImages.map((_, index) => (
                  <span
                    key={index}
                    onClick={() => handleIndicatorClick(index, 2)}
                    style={{
                      height: "10px",
                      width: "10px",
                      margin: "0 5px",
                      borderRadius: "50%",
                      backgroundColor: currentIndex2 === index ? "#333" : "#ccc",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Botones 
      <div
        style={{
          width: "100%",
          maxWidth: "1400px", // Increased maxWidth for wider container
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        <button
          onClick={openHomeModal}
          style={{
            backgroundColor: "transparent",
            border: "2px solid #007BFF",
            color: "#007BFF",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Home
        </button>
        <button
          onClick={openServicesModal}
          style={{
            backgroundColor: "transparent",
            border: "2px solid #007BFF",
            color: "#007BFF",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Servicios
        </button>
        <button
          onClick={openContactModal}
          style={{
            backgroundColor: "transparent",
            border: "2px solid #007BFF",
            color: "#007BFF",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Contactanos
        </button>
      </div> */}

      {/* Carrusel Central */}
<div style={{ maxWidth: "1400px", margin: "0 auto", height:"auto" }}> {/* Ajusta la altura a auto */}
  <div
    className="carousel carousel3"
    style={{
      display: "flex",
      gap: "0px", 
      padding: "20px",
      height: "auto",
      minHeight: "300px",
      marginTop: "20px",
      flexDirection: "row", // Aseguramos que el carrusel tenga flexión horizontal
      flex: 1,
      overflowX: "hidden",
      scrollBehavior: "smooth",
    }}
  >
    {/* Verifica si hay servicios */}
    {data.centralCarousel && data.centralCarousel.length > 0 ? (
      data.centralCarousel.map((service, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            minWidth: "500px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            padding: "20px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#fff",
            flexShrink: 0,
            transition: "transform 0.3s ease",
          }}
        >
          <img
            src={service.image}
            alt={`Service Image ${index}`}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <p
            style={{
              fontSize: "14px",
              color: "#555",
              lineHeight: "1.6",
              textAlign: "justify",
              flex: 1,
            }}
          >
            {service.description}
          </p>
        </div>
      ))
    ) : (
      <p>No hay servicios disponibles seccion superior.</p>
    )}
  </div>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
    }}
  >
    {data.centralCarousel &&
      data.centralCarousel.length > 0 &&
      data.centralCarousel.map((_, index) => (
        <span
          key={index}
          onClick={() => handleIndicatorClick(index, 3)}
          style={{
            height: "10px",
            width: "10px",
            margin: "0 5px",
            borderRadius: "50%",
            backgroundColor: currentIndex3 === index ? "#333" : "#ccc",
            cursor: "pointer",
          }}
        />
      ))}
  </div>
</div>

{/* Segundo Carrusel */}
<div style={{ maxWidth: "1200px", margin: "0 auto", marginTop: "40px" }}> {/* Espacio entre carruseles */}
  <div
    className="carousel carousel4"
    style={{
      display: "flex",
      gap: "20px",
      padding: "20px",
      height: "auto",
      minHeight: "350px",
      marginTop: "20px",
      flexDirection: "row", // Aseguramos que el carrusel también esté alineado horizontalmente
      flex: 1,
      overflowX: "hidden",
      scrollBehavior: "smooth",
    }}
  >
    {/* Verifica si hay servicios */}
    {data.services && data.services.length > 0 ? (
      data.services.map((service, index) => (
        <div
          key={index}
          style={{
            minWidth: "250px",
            height: "auto",
            borderRadius: "10px",
            border: "1px solid #ddd",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            flexShrink: 0,
            transition: "transform 0.3s ease",
          }}
        >
          <img
            src={service.carouselImagesServicio}
            alt={`Service Image ${index}`}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          />
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#333",
            }}
          >
            {service.name}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#555",
              lineHeight: "1.6",
              textAlign: "justify",
            }}
          >
            {service.description}
          </p>
        </div>
      ))
    ) : (
      <p>No hay servicios disponibles carrusel Central.</p>
    )}
  </div>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
    }}
  >
    {data.services && data.services.length > 0 && data.services.map((_, index) => (
      <span
        key={index}
        onClick={() => handleIndicatorClick(index, 4)}
        style={{
          height: "10px",
          width: "10px",
          margin: "0 5px",
          borderRadius: "50%",
          backgroundColor: currentIndex4 === index ? "#333" : "#ccc",
          cursor: "pointer",
        }}
      />
    ))}
  </div>
</div>


      {/* Footer */}
      <footer
        style={{
          width: "100%",
          backgroundColor: "#007BFF",
          color: "#fff",
          padding: "20px",
          textAlign: "center",
          position: "relative",
          bottom: 0,
          marginTop: "2%",
        }}
      >
        <div>
           {data.phone}
        </div>
        <div>
           {data.address}
        </div>
        <div>
          {data.email}
        </div>

        <p className="footer-text">
          &copy; 2025 Mi Compañía. Todos los derechos reservados.
        </p>
      </footer>

      {/* Modales */}
      {/*
      {isHomeModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeHomeModal}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "10px",
              width: "300px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Bienvenido a Home</h2>
            <p>Esta es la ventana emergente para la página Home.</p>
            <button
              onClick={closeHomeModal}
              style={{
                backgroundColor: "#007BFF",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}*/}

      {isServicesModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeServicesModal}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "10px",
              width: "300px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Servicios</h2>
            <p
            className="services-text"
            >Esta es la ventana emergente para los servicios.</p>
            <button
              onClick={closeServicesModal}
              style={{
                backgroundColor: "#007BFF",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {isContactModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeContactModal}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "10px",
              width: "300px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Contáctanos</h2>
            <p>Esta es la ventana emergente para contactarnos.</p>
            <button
              onClick={closeContactModal}
              style={{
                backgroundColor: "#007BFF",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplateDisplay;
