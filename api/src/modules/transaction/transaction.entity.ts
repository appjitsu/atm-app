import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  ref,
  Ref,
  Property,
  Enum,
} from "@mikro-orm/postgresql";

import { BaseEntity } from "../common/base.entity.js";
import { Account } from "../account/account.entity.js";
import { TransactionRepository } from "./transaction.repository.js";

export enum TransactionType {
  Withdrawal = 'withdrawal',
  Deposit = 'deposit'
}

@Entity({ repository: () => TransactionRepository })
export class Transaction extends BaseEntity {
  [EntityRepositoryType]?: TransactionRepository;

  @ManyToOne()
  account: Ref<Account>;

  @Property()
  amount: number;

  @Enum(() => TransactionType)
  type!: TransactionType;

  constructor(account: Account, amount: number, type: TransactionType) {
    super();
    this.account = ref(account);
    this.amount = amount;
    this.type = type;
  }
}
