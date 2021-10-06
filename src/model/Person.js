"use strict"
import mongoose from "mongoose";

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

export const Person = mongoose.model('persons', personSchema);