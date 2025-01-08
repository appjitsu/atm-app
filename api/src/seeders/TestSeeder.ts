import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Account } from '../modules/account/account.entity.js';
import { TransactionType } from '../modules/transaction/transaction.entity.js';

export class TestSeeder extends Seeder {
  generateID() {
    return Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  }

  async run(em: EntityManager): Promise<void> {
    em.create(Account, {
      fullName: 'John Doe',
      email: 'doe@org.com',
      accountID: '1234',
      transactions: [
        {
          amount: 1000,
          type: TransactionType.Deposit
        },
        {
          amount: 100,
          type: TransactionType.Withdrawal
        },
        {
          amount: 500,
          type: TransactionType.Deposit
        },
      ],
    });
    em.create(Account, {
      fullName: 'Jane Doe',
      email: 'jane@org.com',
      accountID: '5678',
      transactions: [
        {
          amount: 2000,
          type: TransactionType.Deposit
        },
        {
          amount: 600,
          type: TransactionType.Withdrawal
        },
        {
          amount: 300,
          type: TransactionType.Deposit
        },
        {
          amount: 100,
          type: TransactionType.Deposit
        },
        {
          amount: 700,
          type: TransactionType.Withdrawal
        },
      ],
    });
  }

}