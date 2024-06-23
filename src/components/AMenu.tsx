import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

interface AMenuProps {
  business: { name: string; address: string } | null;
  onClose: () => void;
}

const AMenu: React.FC<AMenuProps> = ({ business, onClose }) => {
  if (!business) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        padding: "1rem",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>{business.name}</h5>
        <FaTimes onClick={onClose} style={{ cursor: "pointer" }} />
      </div>
      <p>{business.address}</p>
      <ButtonGroup vertical>
        <Button variant="primary">Agendar Cita</Button>
        <Button variant="secondary">Ver Detalles</Button>
        <Button variant="success">Llamar</Button>
        <Button variant="danger">Reportar</Button>
      </ButtonGroup>
    </div>
  );
};

export default AMenu;
