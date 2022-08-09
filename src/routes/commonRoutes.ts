import express, { Request, Response } from "express";
import { In } from "typeorm";
import { dataSource } from "../config/ormconfig";
import { Tasks } from "../entity/Tasks";
import { User } from "../entity/User";
import { validateEmail } from "../utils/validate";

const router = express.Router();
const taskRepository = dataSource.getRepository(Tasks);
const userRepository = dataSource.getRepository(User);

router.get("/api/task/common", async (req: Request, res: Response) => {
  const { user: userReq } = req.body;
  if (!userReq) {
    return res.status(400).send("Invalid request!");
  }
  let error;
  if (userReq.length !== 2) {
    return res.status(400).send("Max input email is 2!");
  }

  for (let i in userReq) {
    const email = userReq[i];
    const { errorMessage } = validateEmail(email);
    errorMessage !== null ? (error = errorMessage) : null;
    const findUser = await userRepository.find({
      where: { email },
    });
    if (findUser.length == 0) {
      return res.status(400).send("Email not found!");
    }
  }
  if (error) {
    return res.status(400).send(error);
  }
  try {
    const common = await taskRepository
      .createQueryBuilder("task")
      .leftJoinAndSelect("task.email", "email")
      .where("email IN (:...email)", { email: userReq })
      .getMany();
    console.log(common);
    let tasks: any = [];
    for (let filterCommon of common) {
      if (filterCommon.email?.length == userReq.length) {
        tasks.push(filterCommon.task);
      }
    }
    if (!tasks) {
      return res.status(400).send("No common task found!");
    }
    return res.status(200).send({ tasks });
  } catch (error) {
    return res.status(400).send(error);
  }
});
export { router as commonRoutes };
