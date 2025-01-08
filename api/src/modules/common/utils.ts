import { Request } from "express";
import { Account } from "../account/account.entity.js";
import { Transaction } from "../transaction/transaction.entity.js";

export function getAccountFromToken(req: Request): Account {
  if (!req.account) {
    throw new Error("Please provide your token via Authorization header");
  }

  return req.account as Account;
}

export function verifyTransactionPermissions(account: Account, transaction: Transaction): void {
  if (transaction.account.id !== account.id) {
    throw new Error("You are not the account holder for this transaction!");
  }
}

export class AuthError extends Error {}
