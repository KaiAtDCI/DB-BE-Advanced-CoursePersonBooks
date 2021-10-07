"use strict"
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    unique: true,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'courses'
  }],
});

bookSchema.statics.deleteAll = function deleteAll() {
  return this.deleteMany({}).exec();
}

export const Book = mongoose.model('Book', bookSchema);