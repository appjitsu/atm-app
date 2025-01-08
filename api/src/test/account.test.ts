import { afterAll, beforeAll, expect, test, it } from 'vitest';
import request from "supertest";

import { initTestApp } from "./uitls.js";

let server: any;

beforeAll(async () => {
  server = await initTestApp(3002);
});

// afterAll(async () => {
//   await server.close();
// });

// sanity check - there is no index route
test('GET /accounts/ responds with 404', async () => {
  const res = await request(server).get('/accounts');
  expect(res.statusCode).toEqual(404);
});

// check an account that we know exists
test('GET /accounts/1234 - an account that exists should repsond with the account info', async () => {
  const res = await request(server).get('/accounts/1234');
  expect(res.statusCode).toEqual(200);
  expect(res.body.fullName).toEqual('John Doe');
  expect(res.body.transactions).toHaveLength(3)
});

// check an account that we know exists
test('GET /accounts/5678 - an account that exists should repsond with the account info', async () => {
  const res = await request(server).get('/accounts/5678');
  expect(res.statusCode).toEqual(200);
  expect(res.body.fullName).toEqual('Jane Doe');
  expect(res.body.transactions).toHaveLength(5)
});

// check an account we know does not exist
test('GET /accounts/0000 - an account responsds with 404', async () => {
  const res = await request(server).get('/accounts/0000');
  expect(res.statusCode).toEqual(404);
});
