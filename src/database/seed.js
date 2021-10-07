import { deleteAllCollectionEntries, Person, Course, Book } from "./connector.js";

function createRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export async function seedFakeData() {
// init (delete) database
  await deleteAllCollectionEntries();

// create persons
  const numberOfPersons = 2;
  const persons = [];
  for (let p = 0; p < numberOfPersons; p++) {
    const name = "person.name_" + createRandomString(6);
    const person = await Person.create({
      name: name,
      email: name + "@example.com",
      role: Math.random() > 0.05 ? "Student" : "Teacher",
    });
    persons.push(person);
  }

// create courses
  const numberOfCourses = 2;
  const courses = [];
  for (let c = 0; c < numberOfCourses; c++) {
    const course = await Course.create({
      title: 'course.title_' + createRandomString(6),
    });
    courses.push(course);
  }

// assign persons to courses & courses to persons
  persons.forEach(person => {
    courses.forEach(course => {
      person.courses.push(course);
      course.persons.push(person);
    })
  });

// create course books, assign books to courses and vice versa
  const numberOfBooksPerCourse = 2;
  const books = [];
  for (const course of courses) {
    for (let b = 0; b < numberOfBooksPerCourse; b++) {
      const book = await Book.create({
        title: `Coursebook${b} for ${course.title}`,
      })
      book.courses.push(course);
      books.push(book);
      course.books.push(book);
    }
  }

  // persist relations
  // Note: .create already persists model data but relation information
  //is added afterwards, so model data has to be saved again
  for (let person of persons) await person.save();
  for (let course of courses) await course.save();
  for (let book of books) await book.save();

  // books.forEach(book => console.log(book));
}