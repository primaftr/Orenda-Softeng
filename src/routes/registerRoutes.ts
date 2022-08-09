import express, { Request, Response } from "express";
import errorHandling from "src/utils/errorHandling";
import { dataSource } from "../config/ormconfig";
import { User } from "../entity/User";
import { validateEmail } from "../utils/validate";

interface Users {
  email: string;
}
interface Users extends Array<User> {}

const router = express.Router();

router.post("/api/register", async (req: Request, res: Response) => {
  const { Users } = req.body;
  if (!Users) {
    return res.status(400).send("Invalid request!");
  }
  const normalizedEmail: Users = Users.map((email: string) => ({ email }));
  let error;

  for (let i in normalizedEmail) {
    const { errorMessage } = validateEmail(normalizedEmail[i].email);
    errorMessage !== null ? (error = errorMessage) : null;
  }
  try {
    if (error) {
      throw new Error(error);
    }
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(normalizedEmail)
      .execute();
  } catch (err: any) {
    const { status, message } = errorHandling(err, "email");
    return res.status(status).send(message);
  }
  return res.status(204).send();
});

export { router as registerRoutes };
