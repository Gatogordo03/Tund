// businesses.ts
export interface Business {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  description: string;
  availableHours: {
    day: string;
    hours: { time: string; available: boolean }[];
  }[];
}

export const businesses: Business[] = [
  {
    id: 1,
    name: "Auditorio Ejemplo",
    lat: 19.39611111,
    lng: -99.09194444,
    address: "123 Calle Principal, Ciudad Ejemplo",
    description: "Una reserva para poder ocupar el auditorio de la UPIICSA.",
    availableHours: [
      {
        day: "Lunes",
        hours: [
          { time: "08:00", available: true },
          { time: "09:00", available: true },
          { time: "10:00", available: false },
          // Agrega más horas...
        ],
      },
      {
        day: "Martes",
        hours: [
          { time: "08:00", available: true },
          { time: "09:00", available: false },
          { time: "10:00", available: true },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Medico Ejemplo",
    lat: 19.23501111,
    lng: -99.05142444,
    address: "456 Calle Principal, Ciudad Ejemplo",
    description: "Un servicio medico para agendar una cita de revision.",
    availableHours: [
      {
        day: "Lunes",
        hours: [
          { time: "08:00", available: true },
          { time: "09:00", available: true },
          { time: "10:00", available: false },
          // Agrega más horas...
        ],
      },
      {
        day: "Martes",
        hours: [
          { time: "08:00", available: true },
          { time: "09:00", available: false },
          { time: "10:00", available: true },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "SPA",
    lat: 19.42611111,
    lng: -99.14194444,
    address: "789 Calle Secundaria, Ciudad Ejemplo",
    description:
      "Un lujoso SPA para relajarse a demas de servicio quiropractico.",
    availableHours: [
      {
        day: "Lunes",
        hours: [
          { time: "08:00", available: true },
          { time: "09:00", available: true },
          { time: "10:00", available: false },
          // Agrega más horas...
        ],
      },
      {
        day: "Martes",
        hours: [
          { time: "08:00", available: true },
          { time: "09:00", available: false },
          { time: "10:00", available: true },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Uñas y Belleza",
    lat: 19.39621111,
    lng: -99.10194444,
    address: "321 Avenida de los Libros, Ciudad Ejemplo",
    description:
      "Un servicio de atencion de belleza donde se ponen uñas, pestañas y tratamientos capilares.",
    availableHours: [
      {
        day: "Lunes",
        hours: [
          { time: "08:00", available: true },
          { time: "09:00", available: true },
          { time: "10:00", available: false },
          // Agrega más horas...
        ],
      },
      {
        day: "Martes",
        hours: [
          { time: "08:00", available: true },
          { time: "09:00", available: false },
          { time: "10:00", available: true },
        ],
      },
    ],
  },
  // Agrega más negocios de prueba aquí
];
