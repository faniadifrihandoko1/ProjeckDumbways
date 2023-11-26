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

app.get("/update-project/:id", updateProjectView);
app.post("/update-project", updateProject);

app.post("/project/:id", deleteProject);
app.get("/project/:id", detailProject);
app.get("/contact-me", contactMe);
app.get("/testimonials", testimonials);

const data = [];

function home(req, res) {
  res.render("index", { data });
}

function project(req, res) {
  res.render("add-project");
}

function addProject(req, res) {
  const {
    name,
    startDate,
    endDate,
    message,
    nodejs,
    reactjs,
    vuejs,
    javascript,
    image,
  } = req.body;

  function difference() {
    var time_difference = new Date(endDate) - new Date(startDate);

    let days_difference = time_difference / (1000 * 3600 * 24);
    let Month_difference = Math.floor(
      time_difference / (1000 * 3600 * 24 * 7 * 4)
    );
    let Years_difference = Math.floor(
      time_difference / (1000 * 3600 * 24 * 7 * 4 * 12)
    );

    if (Years_difference > 0) {
      return ` ${Years_difference} Tahun`;
    } else if (Month_difference > 0) {
      return ` ${Month_difference} Bulan`;
    } else {
      return ` ${days_difference} Hari`;
    }
  }

  const duration = difference();
  const dataProject = {
    name,
    startDate,
    endDate,
    duration,
    message,
    nodejs,
    reactjs,
    vuejs,
    javascript,
    image,
  };

  // menambahkan data dari atas atau yg baru ada diatas
  data.unshift(dataProject);

  console.log(data);
  res.redirect("home");
}

function updateProjectView(req, res) {
  const { id } = req.params;
  const dataFilter = data[parseInt(id)];
  dataFilter.id = parseInt(id);

  // render dan lempar datanya
  res.render("update-project", { data: dataFilter });
}

function updateProject(req, res) {
  const {
    id,
    name,
    startDate,
    endDate,
    message,
    nodejs,
    reactjs,
    vuejs,
    javascript,
    image,
  } = req.body;
  // const id = req.body.id;
  // const name = req.body.inputTitle;
  // const startDate = req.body.startDate;
  // const endDate = req.body.endDate;
  // const message = req.body.inputMessage;
  // const tech = req.body.tech;
  // const image = req.body.inputImage;

  function difference() {
    var time_difference = new Date(endDate) - new Date(startDate);

    let days_difference = time_difference / (1000 * 3600 * 24);
    let Month_difference = Math.floor(
      time_difference / (1000 * 3600 * 24 * 7 * 4)
    );
    let Years_difference = Math.floor(
      time_difference / (1000 * 3600 * 24 * 7 * 4 * 12)
    );

    if (Years_difference > 0) {
      return ` ${Years_difference} Tahun`;
    } else if (Month_difference > 0) {
      return ` ${Month_difference} Bulan`;
    } else {
      return ` ${days_difference} Hari`;
    }
  }

  const duration = difference();
  data[parseInt(id)] = {
    name,
    startDate,
    endDate,
    message,
    nodejs,
    reactjs,
    vuejs,
    javascript,
    image,
    duration,
  };

  console.log(data); //   const dataProject = { name, startDate, endDate, message, tech, image };
  // data.unshift(dataProject);
  res.redirect("home");
}

function deleteProject(req, res) {
  const { id } = req.params;
  data.splice(id, 1);
  res.redirect("/home");
}

function detailProject(req, res) {
  const id = req.params.id;

  console.log(data);
  console.log(data.name);
  // console.log(id);
  // console.log("test", dataDetail.id);
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
