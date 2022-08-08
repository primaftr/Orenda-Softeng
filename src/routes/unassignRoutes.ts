import express, { Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Tasks } from "../entity/Task";
import { User } from "../entity/User";
import errorHandling from "../utils/errorHandling";
import { validateEmail } from "../utils/validate";

const taskRepository = dataSource.getRepository(Tasks);
const userRepository = dataSource.getRepository(User);
const router = express.Router();

router.delete("/api/unassign", async (req: Request, res: Response) => {
  const { user: userReq, task: taskReq } = req.body;
  const { errorMessage } = validateEmail(userReq);
  if (errorMessage) {
    return res.status(400).send(errorMessage);
  }

  const findUser = await userRepository.find({ where: { email: userReq } });
  console.log(findUser);

  if (findUser.length == 0) {
    return res.status(400).send("Email not found!");
  }

  for (let task of taskReq) {
    if (typeof task !== "string") {
      return res.status(400).send("Invalid task!");
    }
  }

  const result = await dataSource
    .createQueryBuilder()
    .delete()
    .from(Tasks)
    .where("task IN(:...task)", { task: taskReq })
    .execute();
  if (result.affected == 0) {
    return res.status(400).send("Task not found!");
  }

  return res.status(204).send();
});

export { router as unassignRoutes };
