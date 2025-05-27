import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

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
  { id: "1", content: "LOGO", bgColor: "#FFFFFF" },
  { id: "2", content: "REDES", bgColor: "#EAEAEA" },
  { id: "3", content: "PUBLICIDAD 1", bgColor: "#FFDDC1" },
  { id: "4", content: "PUBLICIDAD 2", bgColor: "#FFC8DD" },
  { id: "5", content: "VIDEO CORPORATIVO", bgColor: "#C1E1FF" },
  { id: "6", content: "EMPRESA", bgColor: "#C1FFD7" },
  { id: "7", content: "PRODUCTOS Y SERVICIOS", bgColor: "#F9F9A1" },
  { id: "8", content: "RESERVAS USUARI@S", bgColor: "#FFB3BA" },
  { id: "9", content: "CALENDARIO EVENTOS", bgColor: "#D5BAFF" },
  { id: "10", content: "FOTO/TEXTO 1", bgColor: "#FCD5CE" },
  { id: "11", content: "FOTO/TEXTO 2", bgColor: "#D0F4DE" },
  { id: "12", content: "FOTO/TEXTO 3", bgColor: "#FFDAC1" },
  { id: "13", content: "SLIDE 1", bgColor: "#E0BBE4" },
  { id: "14", content: "SLIDE 2", bgColor: "#FFDFD3" },
  { id: "15", content: "SLIDE 3", bgColor: "#CDEAC0" },
  { id: "16", content: "SLIDE 4", bgColor: "#B5EAD7" },
];

const GeneralRenderTemplate = () => {
  const [layout, setLayout] = useState(defaultLayout);
  const [movableCells, setMovableCells] = useState(defaultMovableCells);

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const renderCellContent = (cell) => {
    switch (cell.content) {
      case "LOGO":
        return (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
            alt="Logo"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        );
      case "REDES":
        return (
          <div style={{ display: "flex", justifyContent: "space-around", fontSize: "1.5rem" }}>
            <FaFacebookF />
            <FaInstagram />
            <FaTiktok />
            <FaWhatsapp />
          </div>
        );
      case "VIDEO CORPORATIVO":
        return (
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Video"
            frameBorder="0"
            allowFullScreen
          />
        );
      default:
        return (
          <div
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
      <GridLayout
        className="layout"
        layout={layout}
        cols={4}
        rowHeight={150}
        width={1200}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".react-grid-item"
      >
        {movableCells.map((cell) => (
          <div
            key={cell.id}
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
      </GridLayout>

      <footer style={{ marginTop: "2rem", textAlign: "center" }}>
        <hr />
        <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default GeneralRenderTemplate;
