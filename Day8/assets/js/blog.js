let dataBlog = [];

function submitBlog(event) {
  event.preventDefault();

  let inputTitle = document.getElementById("inputTitle").value;
  let inputMessage = document.getElementById("inputMessage").value;
  let inputImage = document.getElementById("inputImage").files;
  let PostDate = new Date(document.getElementById("startDate").value);
  let EndDate = new Date(document.getElementById("endDate").value);

  function difference() {
    var time_difference = EndDate - PostDate;

    let days_difference = time_difference / (1000 * 3600 * 24);
    let Month_difference = Math.floor(
      time_difference / (1000 * 3600 * 24 * 7 * 4)
    );
    let Years_difference = Math.floor(
      time_difference / (1000 * 3600 * 24 * 7 * 4 * 12)
    );

    // console.log(`${days_difference} Hari Yang Lalu`);
    // console.log(`${Month_difference} Bulan Yang Lalu`);
    // console.log(`${Years_difference} Tahun Yang Lalu`);

    if (Years_difference > 0) {
      return `Durasi :${Years_difference} Tahun`;
    } else if (Month_difference > 0) {
      return `Durasi :${Month_difference} Bulan`;
    } else {
      return `Durasi :${days_difference} Hari`;
    }
  }

  // console.log(difference());
  //   console.log("date", inputDate);

  //   console.log("title", inputTitle);
  //   console.log("message", inputMessage);

  inputImage = URL.createObjectURL(inputImage[0]);
  //   console.log("image", inputImage);

  //   dataBlog.push(blog);
  //   console.log("dataBlog", dataBlog);

  let tech = [];
  let checkboxes = document.getElementsByName("tech[]");
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      tech.push(checkboxes[i].value);
    }
  }

  const blog = {
    title: inputTitle,
    image: inputImage,
    message: inputMessage,
    checkbox: tech,
    time: difference(),
  };

  dataBlog.push(blog);
  console.log(blog);
  console.log(dataBlog);
  renderBlog();
  // console.log(tech);

  function renderBlog() {
    document.getElementById("contents").innerHTML = "";
    for (let index = 0; index < dataBlog.length; index++) {
      document.getElementById("contents").innerHTML += `
      <div class="cards__item">
      <div class="card">
        <div class="card__image card__image--fence">
          <img src="${dataBlog[index].image}" alt="" />
        </div>
        <div class="card__content">
          <div class="card__title"><a href="././detail-blog.html">${
            dataBlog[index].title
          }</a></div>
          <div class="title__duration">${dataBlog[index].time}</div>
          <p class="card__text">
            ${dataBlog[index].message}
          </p>
          <div class="card__icon">
          ${
            dataBlog[index].checkbox[0]
              ? `<img src="./assets/image/${dataBlog[index].checkbox[0]}.png"/>`
              : ""
          }
          ${
            dataBlog[index].checkbox[1]
              ? `<img src="./assets/image/${dataBlog[index].checkbox[1]}.png"/>`
              : ""
          }
          ${
            dataBlog[index].checkbox[2]
              ? `<img src="./assets/image/${dataBlog[index].checkbox[2]}.png"/>`
              : ""
          }
          ${
            dataBlog[index].checkbox[3] == "Typescript"
              ? `<img src="./assets/image/${dataBlog[index].checkbox[3]}.png"/>`
              : ""
          }   
          </div>
          <div class="card__button">
            <button class="btn">Edit</button>
            <button class="btn">Delete</button>
          </div>
        </div>
      </div>
  </div>`;
    }
  }
}
