import {
  Collection,
  Entity,
  EntityRepositoryType,
  OneToMany,
  Property,
} from "@mikro-orm/sqlite";
import { BaseEntity } from "../common/base.entity.js";
import { Transaction } from "../transaction/transaction.entity.js";
import { AccountRepository } from "./account.repository.js";

@Entity({ repository: () => AccountRepository })
export class Account extends BaseEntity {
  [EntityRepositoryType]?: AccountRepository;

  @Property()
  fullName: string;

  @Property()
  accountID: string;

  @Property()
  email: string;

  // @Property({ hidden: true, lazy: true })
  // password: string;

  @OneToMany({ mappedBy: "account" })
  transactions = new Collection<Transaction>(this);

  @Property({ persist: false })
  token?: string;

  constructor(fullName: string, email: string, password: string, accountID: string) {
    super();
    this.fullName = fullName;
    this.email = email;
    // this.password = password; // keep plain text, will be hashed via hooks
    this.accountID = accountID;
  }
}