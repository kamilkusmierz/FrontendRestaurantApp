export class CheckRequest {
  resteurantName: string;
  tableName: string;
  data: string;
  data2: string;
  constructor(resteurantName: string,
    tableName: string,
    data: string, data2: string) {
      this.resteurantName = resteurantName;
      this.tableName = tableName;
      this.data = data;
      this.data2 = data2;
    }
}
