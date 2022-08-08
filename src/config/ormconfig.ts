import { DataSource } from "typeorm";
import { User } from "../entity/User";

// import path from "path";
import { Tasks } from "../entity/Task";

const url = "mysql://root@localhost:3306/orenda";
export const dataSource = new DataSource({
  type: "mysql",
  url,
  logging: true,
  // synchronize: true,
  migrations: ["src/migration/*.ts"],
  entities: [User, Tasks],
});
