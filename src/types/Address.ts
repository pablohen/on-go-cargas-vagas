export interface Address {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  location: Location;
}

export interface Location {
  type: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  longitude: string;
  latitude: string;
}
