import { Entity, EntityManager, Property } from "@mikro-orm/sqlite";
import { Transaction } from "./transaction.entity.js";

@Entity({
  expression: (em: EntityManager) => {
    return em.getRepository(Transaction).listTransactionsQuery();
  },
})
export class TransactionListing {
  @Property()
  amount!: number;

  @Property()
  type!: string;

  @Property()
  accountHolder!: string;

  @Property()
  totalTransactions!: number;
}
