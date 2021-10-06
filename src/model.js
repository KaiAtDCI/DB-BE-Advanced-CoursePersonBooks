"use strict"
import mongoose from "mongoose";
import dotenv from 'dotenv'; dotenv.config();

const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    trim: true,
    required: true
  },
  email: {
    type: String
  },
  role: {
    type: String,
    enum: ["Student", "Teacher"],
    default: "Student",
  },
  courses: [{ type: Schema.Types.ObjectId, ref: 'courses' }]
});

const courseSchema = new Schema({
  title: String,
  person: { type: Schema.Types.ObjectId, ref: 'test-persons' }
});

export const Person = mongoose.model('persons', personSchema);
export const Course = mongoose.model('courses', courseSchema);

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

export async function deleteCollections() {
 await Person.deleteMany({}); // todo: delete cascade possible?
 await Course.deleteMany({});
}




// // ----------------------------------------------------------------------------
// // Let's query the data
// // Load the Course and also it's associated person
// // console.log(await Course.findOne({}).populate("person"));
//
// // Load the Person and also it's associated courses
// // console.log(await Person.findOne({}).populate("courses", ["title"]));
//
// // Advanced query
// const query = Person.findOne({});
// query.select("-email"); // Select which fields to get from the persons data; here we get all data EXCEPT the email one!
// query.populate("courses", ["content"]);
//
// console.log(await query.exec());

// db.createUser({ user: "khushal", pwd: "totakhail", roles: [{ role: "readWrite", db: "coursePersonBook" }] });
