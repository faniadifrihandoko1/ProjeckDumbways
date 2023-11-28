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
      <div class="col-12 col-md-6 col-lg-4">
          <div class="card h-100">
            <div class="card-img p-2">
              <img src="${
                dataBlog[index].image
              }" alt="" class="card-img-top img-size" />
            </div>
            <div class="d-flex flex-column mt-auto card-body">
              <h5>${dataBlog[index].title}</h5>
              <p>${dataBlog[index].time}</p>
              <p>
              ${dataBlog[index].message}
              </p>
              <ul class="d-flex flex-row list-inline">
                <li class="list-inline-item">
                ${
                  dataBlog[index].checkbox[0]
                    ? `<img src="./assets/image/${dataBlog[index].checkbox[0]}.png"/>`
                    : ""
                }
                </li>
                <li class="list-inline-item">
                ${
                  dataBlog[index].checkbox[1]
                    ? `<img src="./assets/image/${dataBlog[index].checkbox[1]}.png"/>`
                    : ""
                }
                </li>
                <li class="list-inline-item">
                ${
                  dataBlog[index].checkbox[2]
                    ? `<img src="./assets/image/${dataBlog[index].checkbox[2]}.png"/>`
                    : ""
                }
                </li>
                <li class="list-inline-item">
                ${
                  dataBlog[index].checkbox[3]
                    ? `<img src="./assets/image/${dataBlog[index].checkbox[3]}.png"/>`
                    : ""
                }   
                </li>
              </ul>
              <div class="d-flex mt-auto gap-1">
                <button class="btn rounded btn-dark w-50">Edit</button>
                <button class="btn rounded btn-dark w-50">Delete</button>
              </div>
            </div>
          </div>
        </div>
     `;
    }
  }
}
