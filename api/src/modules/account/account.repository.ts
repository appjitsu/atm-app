import { EntityRepository } from "@mikro-orm/sqlite";
import { Account } from "./account.entity.js";

export class AccountRepository extends EntityRepository<Account> {
  async exists(accountID: string) {
    console.log("AccountID", accountID);
    process.stdout.write(accountID);
    const count = await this.count({ accountID });
    return count > 0;
  }
}
