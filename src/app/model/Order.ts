import { Food } from './Food';

export class Order {
  name: string;
  lastName: string;
  resteurantName: string;
  tableName: string;
  startDate: string;
  endDate: string;
  food: Food[];
  constructor(name: string, lastName: string, resteurantName: string,
    tablename: string, startDate: string, endDate: string, food: Food[]) {
    this.name = name;
    this.lastName = lastName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.food = food;
    this.tableName = tablename;
    this. resteurantName = resteurantName;

   }
}
