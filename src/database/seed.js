import { Person, Course } from "./connector.js";

function createRandomString(length) {
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result           = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export async function seedFakeData() {

  // todo: persist data by save()?!

// init (delete) database
  await Person.deleteMany();
  await Course.deleteMany();
  // await Person.deleteAll(); // call custom static function
  // await Course.deleteAll(); // call custom static function

  const numberOfPersons = 10;
  const persons = [];
  for (let p = 0; p < numberOfPersons; p++) {
    const name = "person.name_" + createRandomString(6);
    const person = await Person.create({
      name: name,
      email: name + "@example.com",
      role: Math.random() > 0.05 ? "Student" : "Teacher",
    });
    await person.save();
    persons.push(person);
  }

  const numberOfCourses = 5;
  const courses = [];
  for (let c = 0; c < numberOfCourses; c++) {
    const course = await Course.create({
      title: 'course.title_' + createRandomString(6),
    });
    await course.save();
    courses.push(course);
  }

  // assign random courses to persons and persons to courses
  const numberOfCoursesPerPerson = 2;
  for (let p = 0; p < numberOfPersons; p++) {
    for (let c = 0; c < numberOfCoursesPerPerson; c++) {
      persons[p].courses.push[courses[c]];
      courses[c].persons.push[persons[p]];
      await persons[p].save();
      await courses[c].save();
    }
  }
}