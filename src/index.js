"use strict"
import { connect, disconnect, Person, Course, Book } from "./database/connector.js";
import { seedFakeData } from "./database/seed.js";

await connect();
await seedFakeData(); // todo: why is data persisted without saving?!

// queries

// console.log(await Person.find().populate("courses", ["title"]));
const personQuery = Person
  .findOne()
  // .select("-email") // exclude email
  .populate("courses", ["title"]);

const courseQuery = Course
  .find({})
  .select("title")
  .populate("books", ["title"]);

const bookQuery = Book
  .find({})
  // .select("title")
  .populate("courses", ["title"]);


// execute and log queries
console.log(await personQuery.exec());
console.log(await courseQuery.exec());
console.log(await bookQuery.exec());


await disconnect();