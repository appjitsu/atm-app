import { FindOptions, sql, EntityRepository } from "@mikro-orm/sqlite";
import { Transaction } from "./transaction.entity.js";
import { TransactionListing } from "./transaction-listing.entity.js";

// extending the EntityRepository exported from driver package, so we can access things like the QB factory
export class TransactionRepository extends EntityRepository<Transaction> {
  listTransactionsQuery() {
    // sub-query for total number of transactions
    const totalTransactions = this.em
      .createQueryBuilder(Transaction)
      .count()
      .where({ transaction: sql.ref("a.id") })
      .as("totalTransactions");

    // build final query
    return this.createQueryBuilder("a")
      .select(["amount", "type"])
      .addSelect(sql.ref("u.full_name").as("accountHolder"))
      .join("accountID", "u")
      .addSelect([totalTransactions]);
  }

  async listTransactions(options: FindOptions<TransactionListing>) {
    const [items, total] = await this.em.findAndCount(
      TransactionListing,
      {},
      options,
    );
    return { items, total };
  }
}
