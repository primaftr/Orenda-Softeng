import express, { Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Tasks } from "../entity/Tasks";
import { User } from "../entity/User";
import errorHandling from "../utils/errorHandling";
import { validateEmail } from "../utils/validate";

const taskRepository = dataSource.getRepository(Tasks);
const userRepository = dataSource.getRepository(User);
const router = express.Router();

router.post("/api/assign", async (req: Request, res: Response) => {
  const { user: userReq, task: taskReq } = req.body;
  const { errorMessage } = validateEmail(userReq);
  if (errorMessage) {
    return res.status(400).send(errorMessage);
  }

  const users = await userRepository.find({ where: { email: userReq } });
  if (users.length == 0) {
    return res.status(400).send("Email not found!");
  }

  for (let task of taskReq) {
    if (typeof task !== "string") {
      return res.status(400).send("Invalid task!");
    }

    const tasks = await taskRepository.find({ where: { task } });
    if (tasks.length !== 0) {
      try {
        await dataSource
          .createQueryBuilder()
          .relation(Tasks, "email")
          .of(tasks)
          .add(users);
      } catch (err) {
        const { status, message } = errorHandling(err, "Task");
        return res.status(status).send(message);
      }
    } else {
      try {
        const newTask = new Tasks();
        newTask.task = task;
        newTask.email = users;
        await dataSource.manager.save(newTask);
      } catch (err) {
        const { status, message } = errorHandling(err, "Task");
        return res.status(status).send(message);
      }
    }
    return res.status(204).send();
  }
});

export { router as assignRoutes };
