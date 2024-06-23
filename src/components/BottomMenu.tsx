import React, { useState, useEffect, useRef } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { FaChevronUp, FaChevronDown, FaTimes } from "react-icons/fa";
import { Business } from "./Business";
import "./BottomMenu.css";

interface BottomMenuProps {
  businesses: Business[];
  onSelect: (business: Business) => void;
}

const BottomMenu: React.FC<BottomMenuProps> = ({ businesses, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const menuRef = useRef<HTMLDivElement>(null);

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`bottom-menu ${isOpen ? 'open' : ''}`} ref={menuRef}>
      <div className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaChevronDown /> : <FaChevronUp />}
      </div>
      {isOpen && (
        <div className="menu-content">
          <Button variant="light" className="close-button" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </Button>
          <Form>
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                placeholder="Buscar negocios..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
          </Form>
          <ListGroup>
            {filteredBusinesses.map(business => (
              <ListGroup.Item key={business.id} onClick={() => onSelect(business)}>
                <strong>{business.name}</strong><br />
                {business.address}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
};

export default BottomMenu;
