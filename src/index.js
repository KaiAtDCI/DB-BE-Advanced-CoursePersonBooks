"use strict"
import {
  connect,
  disconnect,
  deleteAllCollections,
  Person, Course
} from "./model/model.js";

await connect();

await deleteAllCollections();

const course1 = await Course.create({ title: 'Nauran for Foreigners' });
course1.save();
const course2 = await Course.create({ title: 'Japanese for Insiders' });
course2.save();
const person = await Person.create({ name: "Gonzo", email: "gonzo@example.org" });
person.courses.push(course1);
person.courses.push(course2);
await person.save();

// console.log(await Person.findOne({}).populate("courses", ["title"]));

const query = await Person
  .findOne({})
  .select("-email")
  .populate("courses", ["title"]);
console.log(query);

await disconnect();

