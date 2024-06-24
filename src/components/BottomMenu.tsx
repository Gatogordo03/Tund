import React from "react";
import { Business } from "./Business";
import "./BottomMenu.css";

interface BottomMenuProps {
  businesses: Business[];
  onSelect: (business: Business) => void;
}

const BottomMenu: React.FC<BottomMenuProps> = ({ businesses, onSelect }) => {
  return (
    <div className="bottom-menu">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar negocios..."
      />
      <div className="business-list">
        {businesses.map((business) => (
          <div
            key={business.id}
            className="business-item"
            onClick={() => onSelect(business)}
          >
            <h5>{business.name}</h5>
            <p>{business.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomMenu;
