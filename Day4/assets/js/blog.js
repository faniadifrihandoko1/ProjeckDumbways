let dataBlog = [];

function submitBlog(event) {
  event.preventDefault();

  let inputTitle = document.getElementById("inputTitle").value;
  let inputMessage = document.getElementById("inputMessage").value;
  let inputImage = document.getElementById("inputImage").files;

  inputImage = URL.createObjectURL(inputImage[0]);

  // Check checkboxes
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
          <div class="title__duration">1 Bulan yang lalu</div>
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
