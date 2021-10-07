"use strict"
import { connect, disconnect, Person, Course } from "./database/connector.js";
import { seedFakeData } from "./database/seed.js";

await connect();
await seedFakeData(); // todo: why is data persisted without saving?!

// query and log
// console.log(await Person.find({}).populate("courses", ["title"]));
// const query = await Person
//   .findOne({})
//   .select("-email")
//   .populate("courses", ["title"]);
// console.log(query);

// console.log(await Course
//   .find({})
//   .populate("persons", ["name"]));

await disconnect();