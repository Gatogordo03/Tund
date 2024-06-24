import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import AppointmentScheduler from "./AppointmentScheduler";
import { Business } from "./Business";
import "./AMenu.css";

interface AMenuProps {
  business: Business | null;
  onClose: () => void;
  onExpand: () => void;
}

const AMenu: React.FC<AMenuProps> = ({ business, onClose, onExpand }) => {
  const [scheduling, setScheduling] = useState(false);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  const handleScheduleClick = () => {
    setScheduling(true);
    onExpand();
  };

  const handleSchedule = (time: string) => {
    console.log(`Scheduled time: ${time}`); // Use the time variable
    setAppointmentConfirmed(true);
    setTimeout(() => {
      setAppointmentConfirmed(false);
      setScheduling(false);
      onClose();
    }, 2000);
  };

  if (!business) return null;

  return (
    <div className="amenu">
      <div className="amenu-header">
        <h5>{business.name}</h5>
        <FaTimes onClick={onClose} style={{ cursor: "pointer" }} />
      </div>
      {appointmentConfirmed ? (
        <div className="confirmation">
          <h5>Cita agendada con éxito</h5>
        </div>
      ) : scheduling ? (
        <AppointmentScheduler business={business} onSchedule={handleSchedule} />
      ) : (
        <>
          <p>{business.address}</p>
          <p>{business.description}</p>
          <ButtonGroup vertical>
            <Button variant="primary" onClick={handleScheduleClick}>
              Agendar Cita
            </Button>
            <Button variant="success">Llamar</Button>
            <Button variant="danger">Reportar</Button>
          </ButtonGroup>
        </>
      )}
    </div>
  );
};

export default AMenu;
