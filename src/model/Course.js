"use strict"
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: String,
  person: { type: Schema.Types.ObjectId, ref: 'test-persons' }
});

export const Course = mongoose.model('courses', courseSchema);