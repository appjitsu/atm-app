import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';

import { bootstrap } from "../app.js";
import { TestSeeder } from "../seeders/TestSeeder.js";

export async function initTestApp(port: number) {
  const { server, db } = await bootstrap(port, false);

  // drop and create the schema so we can use the database
  // await db.orm.schema.dropSchema();
  // await db.orm.schema.createSchema();

  // seed with test data
  // await db.orm.seeder.seed(TestSeeder);

  return server;
}
