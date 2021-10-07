"use strict"
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    unique: true,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  persons: [{
    type: Schema.Types.ObjectId,
    ref: 'persons'
  }],
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'books'
  }],

});

courseSchema.statics.deleteAll = function deleteAll() {
  return this.deleteMany({}).exec();
}

export const Course = mongoose.model('courses', courseSchema);