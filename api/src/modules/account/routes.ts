import express, { Request, Response } from "express";
import { initORM } from "../../db.js";

const router = express.Router();

router.get("/:accountID", async (request: Request, response: Response) => {
  const db = await initORM();

  const { accountID } = request.params as { accountID: string };

  // make sure the account exists
  if (!await db.account.exists(accountID)) {
    response.status(404).send({ "error": "Account not found" });
  } else {

    try {
      const account = await db.account.findOneOrFail(
        { accountID },
        {
          populate: ["fullName", "transactions"],
        },
      );
      response.send(account);
    } catch (err: any) {
      response.status(404).send({ "error": err.message });
    }
  }
});

export default router;