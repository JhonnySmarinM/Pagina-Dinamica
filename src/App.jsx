import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import "./App.css";
import TemplateDisplay from "./TemplateDisplay";
import FormTemplate from "./FormTemplate";
import Admin from "./components/Admin/Admin";
import GeneralRenderTemplate from "./GeneralRenderTemplate";
import Auth from "./components/auth/auth";
import PrivateRouter from "./privateRouter";

function App() {
  const [formData, setFormData] = useState({
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
  });

  const [isLoading, setIsLoading] = useState(true); // Comienza en true para mostrar el spinner
  const [dataProps, setDataProps] = useState("dataProps"); // Variable que enviarás al componente Admin

  useEffect(() => {
    axios
      .get("https://login-1k91.onrender.com/api/v1/dataform/")
      .then((res) => {
        console.log("Fetched data:", res.data);
        setDataProps(res.data);
        setIsLoading(false); // Detener el spinner una vez que los datos se cargan
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setIsLoading(false); // Detener el spinner incluso si hay un error
      });
  }, []);

  return (
    <Router>
      <div>
        {isLoading ? ( // Mostrar spinner mientras isLoading es true
          <div className="spinner-container">
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          // Mostrar el contenido cuando isLoading sea false
          <Routes>
            <Route path="/" element={<FormTemplate />} />
            <Route
              path="/webtemplateCreate"
              element={<TemplateDisplay formData={formData} />}
            />
            <Route path="/admin" element={<Admin data={dataProps} />} />
            <Route
              path="/mypage/:id"
              element={<GeneralRenderTemplate datas={dataProps} />}
            />
            <Route path="/:id" element={<FormTemplate data={dataProps}  />} />
            <Route path="/auth" element={<Auth/>} />
          </Routes> 
        )}
      </div>
    </Router>
  );
}

export default App;
