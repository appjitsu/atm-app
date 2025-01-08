import { error } from "console";
import express, { Request, Response } from "express";
import { z } from "zod";

const router = express.Router();

const transactionSchema = z.object({
  amount: z.number(),
  type: z.string(),
});

router.put("/:accountID/withdraw", async (request: Request, response: Response) => {
  const dto = transactionSchema.parse(request.body);

  if (error) {
    return response.status(400).send(error.details[0].message);
  }

  try {
    const updatedAccount = await withdrawal(request.params.accountID, request.body.amount);
    return response.status(200).send(updatedAccount);
  } catch (err) {
    if(err instanceof Error) {
      return response.status(400).send({"error": err.message});
    }
  }
});

router.put("/:accountID/deposit", async (request: Request, response: Response) => {
  const {error} = transactionSchema.validate(request.body);

  if (error) {
    return response.status(400).send(error.details[0].message);
  }

  try {
    const updatedAccount = await deposit(request.params.accountID, request.body.amount);
    return response.status(200).send(updatedAccount);
  } catch (err) {
    if(err instanceof Error) {
      return response.status(400).send({"error": err.message});
    }
  }
});

export default router;