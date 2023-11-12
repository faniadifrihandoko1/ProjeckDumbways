let dataBlog = [];

function submitBlog(event) {
  event.preventDefault();

  let inputTitle = document.getElementById("inputTitle").value;
  let inputMessage = document.getElementById("inputMessage").value;
  let inputImage = document.getElementById("inputImage").files;
  let inputDate = document.getElementById("startDate").value;
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
    postAt: inputDate,
    image: inputImage,
    message: inputMessage,
    checkbox: tech,
  };

  dataBlog.push(blog);
  console.log(dataBlog);
  renderBlog();
  console.log(tech);

  function renderBlog() {
    document.getElementById("contents").innerHTML = "";
    for (let index = 0; index < dataBlog.length; index++) {
      document.getElementById("contents").innerHTML += `
          <div class="card-blog">
          <img class="img-blog" src="${dataBlog[index].image}" alt="" />
          <h3 class="title-blog">${dataBlog[index].title}</h3>
          <p class="date-blog">${dataBlog[index].postAt}</p>
          <p class="description-blog">
          ${dataBlog[index].message}
          </p>
          <div class="icon-blog">
          ${
            dataBlog[index].checkbox[index] == "NodeJS"
              ? `<img src="./assets/image/node.png"/>`
              : ""
          }
          ${
            dataBlog[index].checkbox[index] == "ReactJS"
              ? `<img src="./assets/image/react.png"/>`
              : ""
          }
          ${
            dataBlog[index].checkbox[index] == "NextJS"
              ? `<img src="./assets/image/next.png"/>`
              : ""
          }
          ${
            dataBlog[index].checkbox[index] == "Typescript"
              ? `<img src="./assets/image/typescript.png"/>`
              : ""
          }   
          </div>
          <div class="button-blog">
            <a href=""><button>Edit</button></a>
            <a href=""><button>Delete</button></a>
          </div>
        </div>`;
    }
  }
}
