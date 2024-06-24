import React, { useState } from "react";
import { Business } from "./Business";
import { Button } from "react-bootstrap";
import "./AppointmentScheduler.css";

interface AppointmentSchedulerProps {
  business: Business;
  onSchedule: (time: string) => void;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  business,
  onSchedule,
}) => {
  const [selectedDay, setSelectedDay] = useState(
    business.availableHours[0].day
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value);
    setSelectedTime(null); // Reset the selected time
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleSchedule = () => {
    if (selectedTime) {
      onSchedule(selectedTime);
    }
  };

  const selectedDayHours =
    business.availableHours.find((day) => day.day === selectedDay)?.hours || [];

  return (
    <div className="appointment-scheduler">
      <div className="day-selector">
        <label htmlFor="day">Selecciona un día:</label>
        <select id="day" value={selectedDay} onChange={handleDayChange}>
          {business.availableHours.map((day) => (
            <option key={day.day} value={day.day}>
              {day.day}
            </option>
          ))}
        </select>
      </div>
      <div className="time-grid">
        {selectedDayHours.map((hour) => (
          <button
            key={hour.time}
            className={`time-slot ${
              hour.available ? "available" : "unavailable"
            } ${hour.time === selectedTime ? "selected" : ""}`}
            onClick={() => hour.available && handleTimeClick(hour.time)}
            disabled={!hour.available}
          >
            {hour.time}
          </button>
        ))}
      </div>
      <Button
        variant="primary"
        onClick={handleSchedule}
        disabled={!selectedTime}
      >
        Agendar Cita
      </Button>
    </div>
  );
};

export default AppointmentScheduler;
