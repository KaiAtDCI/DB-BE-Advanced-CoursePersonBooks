"use strict"
import { connect, disconnect, deleteCollections, Person, Course, } from "./model.js";

await connect();
await deleteCollections();

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


// const query = await Person.findOne({});
// query.select('-email');
// query.populate('courses', ['title']);
// const result = query.exec();

