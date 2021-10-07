"use strict"
import { connect, disconnect, Person, Course } from "./database/connector.js";

await connect();

// init (delete) database
// await Person.deleteAll(); // call custom static function
// await Course.deleteAll(); // call custom static function
await Person.deleteMany();
await Course.deleteMany();


// create model data
const person = await Person.create({ name: "Gonzo", email: "gonzo@example.org" });
const course1 = await Course.create({ title: 'Nauran for Foreigners' });
const course2 = await Course.create({ title: 'Japanese for Insiders' });
person.courses.push(course1);
person.courses.push(course2);
course1.persons.push(person);
course2.persons.push(person);

// persist model data
await person.save();
await course1.save();
await course2.save();

// query and log
console.log(await Person.findOne({}).populate("courses", ["title"]));
// const query = await Person
//   .findOne({})
//   .select("-email")
//   .populate("courses", ["title"]);
// console.log(query);

console.log(await Course
  .findOne({})
  .populate("persons", ["name"]));

await disconnect();