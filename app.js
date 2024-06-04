const express = require("express");
const app = express();
const courses = require("./courses.json");
const port = 3003;
const cors = require("cors");

app.use(cors());
app.get("/courses", (req, res) => {
  const { query, university, term, ects, degree } = req.query;
  let filteredCourses = courses;

  // handling query
  if (query) {
    filteredCourses = filteredCourses.filter((course) => {
      return course.title.toLowerCase().includes(query.toLowerCase());
    });
  }

  // handling university
  if (university) {
    if (Array.isArray(university)) {
      filteredCourses = filteredCourses.filter((course) =>
        university.includes(course.university.toLowerCase())
      );
    } else {
      filteredCourses = filteredCourses.filter(
        (course) => course.university.toLowerCase() === university
      );
    }
  }

  // handling term
  if (term) {
    if (Array.isArray(term)) {
      filteredCourses = filteredCourses.filter((course) =>
        term.includes(course.term.toLowerCase())
      );
    } else {
      filteredCourses = filteredCourses.filter(
        (course) => course.term.toLowerCase() === term
      );
    }
  }

  // handling ects
  if (ects) {
    if (Array.isArray(ects)) {
      filteredCourses = filteredCourses.filter((course) =>
        ects.includes(course.ects.toString())
      );
    } else {
      filteredCourses = filteredCourses.filter(
        (course) => course.ects === parseInt(ects)
      );
    }
  }

  // handling degree
  if (degree) {
    if (Array.isArray(degree)) {
      filteredCourses = filteredCourses.filter((course) =>
        degree.includes(course.degree.toLowerCase())
      );
    } else {
      filteredCourses = filteredCourses.filter(
        (course) => course.degree.toLowerCase() === degree
      );
    }
  }

  res.send(filteredCourses);
});

app.get("/courses/:id", (req, res) => {
  const savedCourse = req.params.id;
  res.send(courses.filter((course) => course.id === savedCourse)[0]);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
