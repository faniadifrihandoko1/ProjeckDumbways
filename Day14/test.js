const express = require("express");
const path = require("path");
const { Query } = require("pg");
const { config } = require("process");
const app = express();
const port = 5000;
const hbs = require("hbs");
hbs.registerHelper("ifCond", function (v1, operator, v2, options) {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return options.inverse(this);
  }
});
// Import Sequelize
const { Sequelize, QueryTypes } = require("sequelize");
// const sequelize = new Sequelize(config.development);
const sequelize = new Sequelize("personal_web", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
});

// app.set = buat setting variabel global, configuration dll
app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "src/views"));

// menampung midlleware
app.use("/assets", express.static("src/assets"));
app.use(express.urlencoded({ extended: false }));

app.get("/home", home);

app.get("/project", project);
app.get("/add-project", addProjectView);
app.post("/project", addProject);

app.get("/update-project/:id", updateProjectView);
app.post("/update-project", updateProject);

app.post("/project/:id", deleteProject);
app.get("/detail-project/:id", detailProject);
app.get("/contact-me", contactMe);
app.get("/testimonials", testimonials);

const data = [];

async function home(req, res) {
  const query = "SELECT * FROM projects";
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
  obj.forEach(function (data) {
    data.duration = difference(data.start_date, data.end_date);
    data.techo = technologies(data.tech);
  });
  // console.log("ini data dari database", obj);
  // console.log("ini data dari database", obj);
  res.render("index", { data: obj });
}

async function project(req, res) {
  res.render("project");
}

function addProjectView(req, res) {
  res.render("add-project");
}

async function addProject(req, res) {
  const {
    name,
    startDate,
    endDate,
    description,
    html5,
    css3,
    js,
    react,
    image,
  } = req.body;

  const tech = [];
  if (html5 == "true") {
    tech.push("'html5'");
  }
  if (css3 == "true") {
    tech.push("'css3'");
  }
  if (js == "true") {
    tech.push("'js'");
  }
  if (react == "true") {
    tech.push("'react'");
  }
  // html1 = technologies(html5);
  // css1 = technologies(css3);
  // java = technologies(js);
  // react1 = technologies(react);
  const query = `INSERT INTO projects(name,"start_date","end_date",description,tech,image) VALUES ('${name}','${startDate}','${endDate}','${description}',ARRAY [${tech}],'${image}')`;
  const obj = await sequelize.query(query, { type: QueryTypes.INSERT });
  obj.forEach(function (data) {
    data.duration = difference(data.start_date, data.end_date);
  });
  console.log("data berhasil di insert", obj[0]);
  res.redirect("home");
}

async function updateProjectView(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM projects WHERE id=${id}`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  obj.forEach(function (data) {
    data.duration = difference(data.start_date, data.end_date);
  });
  console.log("test", obj);
  res.render("update-project", { data: obj[0] });
}

async function updateProject(req, res) {
  const {
    id,
    name,
    startDate,
    endDate,
    description,
    html5,
    css3,
    js,
    react,
    image,
  } = req.body;
  const tech = [];
  if (html5 == "true") {
    tech.push("'html5'");
  }
  if (css3 == "true") {
    tech.push("'css3'");
  }
  if (js == "true") {
    tech.push("'js'");
  }
  if (react == "true") {
    tech.push("'react'");
  }

  const query = `UPDATE projects SET name='${name}',"start_date"='${startDate}',"end_date"='${endDate}',description='${description}', tech=ARRAY [${tech}],image='${image}' WHERE id=${id}`;
  const obj = await sequelize.query(query, { type: QueryTypes.UPDATE });
  console.log(data);
  res.redirect("home");
}

async function deleteProject(req, res) {
  const { id } = req.params;

  // data.splice(id, 1)
  const query = `DELETE FROM projects WHERE id=${id}`;
  const obj = await sequelize.query(query, { type: QueryTypes.DELETE });
  res.redirect("/home");
}

async function detailProject(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM projects WHERE id=${id}`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  obj[0].forEach((item) => {
    item.duration = difference(item.start_date, item.end_date);
    if (item.tech.includes("html5")) {
      // Jika ya, set nilai properti html menjadi true
      item.html5 = true;
    } else if (item.tech[index] == "css3") {
      item.css3 = true;
    } else if (item.tech[index] == "js") {
      item.js = true;
    } else if (item.tech[index] == "react") {
      item.react == true;
    }
  });
  // const waktu = difference(obj[0].start_date, obj[0].end_date);
  // Object.assign(obj[0], { duration: waktu });

  console.log("detail :", obj);
  // console.log("test", dataDetail.id);
  res.render("detail-project", { data: obj[0] });
}
function contactMe(req, res) {
  res.render("contact");
}

function testimonials(req, res) {
  res.render("testimonials");
}

function difference(start, end) {
  var time_difference = new Date(end) - new Date(start);

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

function technologies(item) {
  if (item == undefined) {
    item.value = "false";
  }
}

console.log(difference("2023-10-26", "2023-11-15"));

app.listen(port, () => {
  console.log(`Server Berjalan di port${port}`);
});
