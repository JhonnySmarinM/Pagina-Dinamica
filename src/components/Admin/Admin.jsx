import React, { useState } from "react";
import styles from "./Admin.module.css";
// import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = ({ data = [] }) => {
  const emailClient = (() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.email;
    }
    return null;
  })();

  const filteredData = data.filter((item) => item.emailClient === emailClient);

  const [links, setLinks] = useState(filteredData);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [responsePreview, setResponsePreview] = useState(null);

  const publishLink = (index) => {
    const newLinks = [...links];
    newLinks[index].isPublished = true;
    setLinks(newLinks);
    toast.success("Enlace publicado con éxito");
  };

  const unpublishLink = (index) => {
    const newLinks = [...links];
    newLinks[index].isPublished = false;
    setLinks(newLinks);
    toast.info("Enlace despublicado");
  };

  const saveTemplate = async (e, id) => {
    e.preventDefault();
    setIsLoading(true);

    let body = JSON.stringify(formData);

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://login-1k91.onrender.com/api/v1/dataform/${id}/`,
      referrerPolicy: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    try {
      // const response = await axios.request(config);
      // console.log(JSON.stringify(response.data));
      setResponsePreview("response.data");
      toast.success("Eliminado con éxito");
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error(error);
      toast.error(`Error al eliminar: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Cerrando sesión...");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  const ListItem = ({ link, index }) => {
    const date = new Date(link.updated_at);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    return (
      <li className={styles.listItem}>
        <span>
          <a href={link.id} className={styles.link}>
            {link.title}
          </a>
        </span>
        <span>{"Published"}</span>
        <span>
          {!link.isPublished ? (
            <>
              <button className="accionButton" onClick={(e) => saveTemplate(e, link.id)} disabled={isLoading}>
                Delete
              </button>
              <button className="accionButton">
                <a href={`/${link.id}`} className={styles.link}>
                  Edit
                </a>
              </button>
              <button className="accionButton">
                <a href={`/mypage/${link.id}`} className={styles.link} target="_blank">
                  View
                </a>
              </button>
            </>
          ) : (
            <>
              <button className={styles.button} onClick={() => unpublishLink(index)} disabled={isLoading}>
                Unpublish
              </button>
              <button className="accionButton">
                <a href={`/mypage/${link.id}`} className={styles.link} target="_blank">
                  View
                </a>
              </button>
            </>
          )}
        </span>
      </li>
    );
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
      <div className={styles.header}>
        <button className={styles.button}>
          <a href="/formdata" className={styles.link}>
            Formulario
          </a>
        </button>
        <button className={styles.button} onClick={handleLogout}>
          Salir
        </button>
      </div>

      <h1 className={styles.title}>Admin Panel</h1>

      <div className={styles.listContainer}>
        {links.length > 0 ? (
          <ul className={styles.list}>
            <li className={styles.listItem} style={{ fontWeight: "bold", backgroundColor: "#f1f1f1" }}>
              <span>TITLE</span>
              <span>STATE</span>
              <span>ACTION</span>
            </li>
            {links.map((link, index) => (
              <ListItem key={index} link={link} index={index} />
            ))}
          </ul>
        ) : (
          <p className={styles.messageTable}>No hay paginas guardadas </p>
        )}
      </div>
    </div>
  );
};

export default Admin;
