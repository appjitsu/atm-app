import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import dotenv from 'dotenv';

import { initORM } from "./db.js";
import accountsRouter from "./modules/account/routes.js";
import transactionsRouter from "./modules/transaction/routes.js";

import { TestSeeder } from "./seeders/TestSeeder.js";

dotenv.config();

// we have a bootstrap function because also use this for testing
export async function bootstrap(port = 3000, migrate = true) {
  // init our db
  const db = await initORM();

  // drop and create the schema so we can use the database
  await db.orm.schema.dropSchema();
  await db.orm.schema.createSchema();

  // seed with test data
  await db.orm.seeder.seed(TestSeeder);

  // for orm migrations
  if (migrate) {
    // sync the schema
    await db.orm.migrator.up();
  }

  const app = express();

  // Middleware for parsing JSON and URL-encoded data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Secure headers with Helmet
  app.use(helmet());

  // Logging
  // const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });
  // app.use(morgan('combined', { stream: accessLogStream }));

  // Rate limiting to prevent abuse
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
  });
  app.use(limiter);

  // Setup Routes
  app.use("/transactions", transactionsRouter);
  app.use("/accounts", accountsRouter);

  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // start our server at the specified port
  const server = app.listen(port, () => {
    console.log("server is running...");
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    db.orm.close();
    server.close(() => {
      console.log('Server closed');
    });
  });

  return { app, server, db };
}