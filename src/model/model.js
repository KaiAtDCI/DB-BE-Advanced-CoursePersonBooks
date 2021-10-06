"use strict"
import dotenv from 'dotenv'; dotenv.config();
import mongoose from "mongoose";
import { Person } from "./Person.js"; export { Person };
import { Course } from "./Course.js"; export { Course };

export async function connect() {
  try {
    const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    await mongoose.connect(connectionString);
    console.log(`Connected to DB '${process.env.DB_NAME}'.`)
  } catch (error) {
    console.log(error.message);
  }
}

export async function disconnect() {
  await mongoose.disconnect();
}

export async function deleteAllCollections() {
 await Person.deleteMany({}); // todo: delete cascade possible?
 await Course.deleteMany({});
}