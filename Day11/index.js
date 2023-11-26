const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

// app.set = buat setting variabel global, configuration dll
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// menampung midlleware
app.use("/assets", express.static("src/assets"));
app.use(express.urlencoded({ extended: false }));

app.get("/home", home);
app.get("/project", project);
app.post("/project", addProject);
app.get("/project/:id", detailProject);
app.get("/contact-me", contactMe);
app.get("/testimonials", testimonials);

function home(req, res) {
  res.render("index");
}

function project(req, res) {
  res.render("add-project");
}

function addProject(req, res) {
  const name = req.body.inputTitle;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const message = req.body.inputMessage;
  const tech = req.body.tech;
  const image = req.body.inputImage;
  console.log(`name : ${name}`);
  console.log(`Start Project: ${startDate}`);
  console.log(`Finish Project: ${endDate}`);
  console.log(`Technologies: ${tech}`);
  console.log(`Message: ${message}`);
  console.log(`Image: ${image}`);

  res.redirect("home");
}

function detailProject(req, res) {
  res.render("detail-project");
}
function contactMe(req, res) {
  res.render("contact");
}

function testimonials(req, res) {
  res.render("testimonials");
}

app.listen(port, () => {
  console.log(`Server Berjalan di port${port}`);
});
