import { Tasks } from "../entity/Tasks";
import { User } from "../entity/User";
import { DataSource } from "typeorm";

console.log(process.env.DATABASE_URL);
const url = process.env.DATABASE_URL?.toString();

export const dataSource = new DataSource({
  type: "mysql",
  url,
  logging: true,
  // synchronize: true,
  migrations: ["dist/migrations/*.js"],
  entities: [User, Tasks],
  migrationsRun: true,
});
