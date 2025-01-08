import { Migration } from '@mikro-orm/migrations';

export class Migration20250107185311 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "account" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "full_name" varchar(255) not null, "account_id" varchar(255) not null, "email" varchar(255) not null);`);

    this.addSql(`create table "transaction" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "account_id" int not null, "amount" int not null, "type" text check ("type" in ('withdrawal', 'deposit')) not null);`);

    this.addSql(`alter table "transaction" add constraint "transaction_account_id_foreign" foreign key ("account_id") references "account" ("id") on update cascade;`);

    this.addSql(`drop table if exists "accounts" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "transaction" drop constraint "transaction_account_id_foreign";`);

    this.addSql(`create table "accounts" ("account_number" int4 not null, "name" varchar not null, "amount" int4 not null, "type" text check ("type" in ('checking', 'savings', 'credit')) not null, "credit_limit" int4 null, constraint "accounts_pkey" primary key ("account_number"));`);

    this.addSql(`drop table if exists "account" cascade;`);

    this.addSql(`drop table if exists "transaction" cascade;`);
  }

}
