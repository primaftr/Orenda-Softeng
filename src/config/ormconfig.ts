import { DataSource } from "typeorm";

const url = "mysql://root@localhost:3306/orenda_softeng";
export const dataSource = new DataSource({
  type: "mysql",
  url,
  logging: true,
  // synchronize: true,
  migrations: ["dist/migrations/*.js"],
  entities: ["dist/entity/*.js"],
});
