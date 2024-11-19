// Define la estructura de la dirección de un usuario.
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { 
    lat: string; // Latitud
    lng: string; // Longitud
  };
}

// Define la estructura de la compañía de un usuario.
export interface Company {
  name: string; // Nombre de la compañía
  catchPhrase: string; // Eslogan de la compañía
  bs: string; // Actividad principal de la compañía
}

// Define la estructura completa de un usuario.
export interface UserComplete {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: Company;
  username?: string;
  website?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}
// Interfaz de 'User' que representa la estructura de datos básicos de un usuario
export interface User {
  id: number;
  name: string;
  username: string;  // 
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}
