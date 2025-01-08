import {
  EntityManager,
  MikroORM,
  Options,
} from "@mikro-orm/postgresql";

import config from "./mikro-orm.config.js";
import { Account } from "./modules/account/account.entity.js";
import { AccountRepository } from "./modules/account/account.repository.js";
import { TransactionRepository } from "./modules/transaction/transaction.repository.js";
import { Transaction } from "./modules/transaction/transaction.entity.js";

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  account: AccountRepository;
  transaction: TransactionRepository;
}

let cache: Services;

export async function initORM(options?: Options): Promise<Services> {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init({
    ...config,
    ...options,
  });

  return (cache = {
    orm,
    em: orm.em,
    account: orm.em.getRepository(Account),
    transaction: orm.em.getRepository(Transaction),
  });
}
