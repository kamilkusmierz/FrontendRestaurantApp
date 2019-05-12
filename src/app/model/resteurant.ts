export class Tables {
  id: number;
  x: number;
  y: number;
  owner: string;
}
export class Resteurant {
  id: number;
  filename: string;
  name: string;
  streetNumber: string;
  houseNumber: string;
  code: string;
  cityName: string;
  tables?: Tables[];
}
