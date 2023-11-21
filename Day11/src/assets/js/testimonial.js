// class Testimonials {
//   constructor(image, review, author) {
//     this.image = image;
//     this.review = review;
//     this.author = author;
//   }

//   detail() {
//     return `<div class="testimonial">
//         <img src="${this.image}" class="profile-testimonial" />
//         <p class="quote">
//           "${this.review}"
//         </p>
//         <p class="author">${this.author}</p>
//       </div>`;
//   }
// }

// const testi1 = new Testimonials(
//   "https://media.npr.org/assets/img/2022/11/08/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66-s1100-c50.jpg",
//   "Websitenya bagus, sudah responsive",
//   "fani"
// );
// const testi2 = new Testimonials(
//   "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699833600&semt=ais",
//   "Bagus websitenya, pengerjaanya cepat",
//   "Febri"
// );
// const testi3 = new Testimonials(
//   "https://img.freepik.com/premium-photo/portrait-smiling-young-man-looking-camera_33839-1731.jpg",
//   "Tampilan websitenya menarik dan bagus",
//   "Bayu"
// );

// // console.log(testi1);
// // console.log(testi3.detail());

// const testimonial = [testi1, testi2, testi3];

// let testimonialHtml = "";
// for (let index = 0; index < testimonial.length; index++) {
//   testimonialHtml += testimonial[index].detail();
// }

// document.getElementById("testimonials").innerHTML = testimonialHtml;
// console.log(testimonialHtml);

// const AllTesti = [
//   {
//     author: "Fani",
//     review: "Mantap Websitenya ",
//     image:
//       "https://media.npr.org/assets/img/2022/11/08/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66-s1100-c50.jpg",
//     rating: 5,
//   },
//   {
//     author: "Farhan",
//     review: "Tidak Ramah Pelayannya",
//     image:
//       "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699833600&semt=ais",
//     rating: 2,
//   },
//   {
//     author: "Hisyam",
//     review: "Pengerjaannya lama",
//     image:
//       "https://img.freepik.com/premium-photo/portrait-smiling-young-man-looking-camera_33839-1731.jpg",
//     rating: 1,
//   },
//   {
//     author: "Bayu",
//     review: "Bagus dan Cepat Responnya",
//     image:
//       "https://img.freepik.com/free-photo/happy-excited-asian-surprised-guy-receive-awesome-news-raising-hands-sideways-smiling-amazed-praising-great-job-saying-congrats-rejoicing-white-background_1258-55335.jpg?w=996&t=st=1700068703~exp=1700069303~hmac=a370dc0ac728d9eedcc5cb172acb6f811a3790be3b5d0e6392974bbc2be44689",
//     rating: 4,
//   },
//   {
//     author: "Putri",
//     review: "Pokoknya Rekomenden buat website disini",
//     image:
//       "https://img.freepik.com/free-photo/thoughtful-asian-woman-looking-aside-pondering-making-assumption-thinking-choosing-smth-standing-white-background_1258-89213.jpg?w=996&t=st=1700068780~exp=1700069380~hmac=4109b708e78806a1cd2944b94f2cf67717fcb9b2e14a0270e6a388a9253f4a1b9",
//     rating: 4,
//   },
//   {
//     author: "Veny",
//     review: "josss mantap",
//     image:
//       "https://img.freepik.com/free-photo/young-chinese-woman-standing-white-background-showing-palm-hand-doing-ok-gesture-with-thumbs-up-smiling-happy-cheerful_839833-2152.jpg?w=996&t=st=1700068824~exp=1700069424~hmac=10c627a840e137393534447392c355aa35f3cbfcdf211c9aa0770eb4743a8657",
//     rating: 4,
//   },
// ];

const promiseData = new Promise((resolve, reject) => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://api.npoint.io/a709cbb09da425e9ecc2", true);
  xhttp.onload = () => {
    if (xhttp.status == 200) {
      // console.log("berhasil", xhttp.response);
      resolve(JSON.parse(xhttp.response));
    } else {
      reject("Internal server Error");
    }
  };
  xhttp.onerror = () => { 
    //Kesalahan Client / Jaringan
    reject("Check Conection, Network Error");
  };
  xhttp.send();
});

function detail(item) {
  return `<div class="testimonial">
    <img src="${item.image}" class="profile-testimonial" />
    <p class="quote">"${item.review}"</p>
    <p class="author">- ${item.author}</p>
    <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
</div>`;
}

async function allTestimonials() {
  let testimonialHTML = ``;
  const AllTesti = await promiseData;
  AllTesti.forEach((item) => {
    testimonialHTML += detail(item);
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML;
}

allTestimonials();

async function filterTestimonials(rating) {
  let testimonialHTML = ``;
  const AllTesti = await promiseData;
  const testimonialFiltered = AllTesti.filter((item) => {
    return item.rating === rating;
  });
  testimonialFiltered.forEach((item) => {
    testimonialHTML += detail(item);
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML;
}
