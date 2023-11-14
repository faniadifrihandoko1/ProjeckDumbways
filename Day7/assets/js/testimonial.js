class Testimonials {
  constructor(image, review, author) {
    this.image = image;
    this.review = review;
    this.author = author;
  }

  detail() {
    return `<div class="testimonial">
        <img src="${this.image}" class="profile-testimonial" />
        <p class="quote">
          "${this.review}"
        </p>
        <p class="author">${this.author}</p>
      </div>`;
  }
}

const testi1 = new Testimonials(
  "https://media.npr.org/assets/img/2022/11/08/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66-s1100-c50.jpg",
  "Websitenya bagus, sudah responsive",
  "fani"
);
const testi2 = new Testimonials(
  "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699833600&semt=ais",
  "Bagus websitenya, pengerjaanya cepat",
  "Febri"
);
const testi3 = new Testimonials(
  "https://img.freepik.com/premium-photo/portrait-smiling-young-man-looking-camera_33839-1731.jpg",
  "Tampilan websitenya menarik dan bagus",
  "Bayu"
);

// console.log(testi1);
// console.log(testi3.detail());

const testimonial = [testi1, testi2, testi3];

let testimonialHtml = "";
for (let index = 0; index < testimonial.length; index++) {
  testimonialHtml += testimonial[index].detail();
}

document.getElementById("testimonials").innerHTML = testimonialHtml;
console.log(testimonialHtml);
