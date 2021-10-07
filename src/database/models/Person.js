"use strict"
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    trim: true,
    required: true
  },
  email: {
    type: String,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["Student", "Teacher"],
    default: "Student",
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'courses'
  }]
});

personSchema.statics.deleteAll = function deleteAll() {
  return this.deleteMany({}).exec();
}

export const Person = mongoose.model('persons', personSchema);