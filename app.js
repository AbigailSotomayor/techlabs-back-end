const express = require("express");
const app = express();
const courses = require("./courses.json");
const port = 3003;
const cors = require("cors");

app.use(cors());
app.get("/courses", (req, res) => {
  res.send(courses);
});

app.get("/courses/:university", (req, res) => {
  const filters = req.query;
  console.log(filters);
  const university = req.params.university;
  const filteredCourses = courses.filter(
    (course) => course.university.toLowerCase() === university.toLowerCase()
  );
  res.send(filteredCourses);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
