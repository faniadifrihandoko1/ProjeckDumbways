// let Fullname = "fani adi frihandoko";
// let Address = "Kp. Belimbing Sawah";

// function Hello(name, alamat) {
//   console.log(`Perkenalkan nama saya ${name}, Alamat Saya di ${alamat}`);
// }

// Hello(Fullname, Address);

function submitData() {
  const inputName = document.getElementById("inputName").value;
  const inputEmail = document.getElementById("inputEmail").value;
  const inputPhone = document.getElementById("inputPhone").value;
  const inputSubject = document.getElementById("inputSubject").value;
  const inputMessage = document.getElementById("inputMessage").value;
  // console.log(inputSubject);

  // -- Validasi -- //
  if (inputName == 0) {
    alert("please fill in Name");
  } else if (inputEmail == 0) {
    alert("please fill in Email");
  } else if (inputPhone == 0) {
    alert("please fill in Number Phone");
  } else if (inputSubject == 0) {
    alert("please choose a Subject");
  } else if (inputMessage == 0) {
    alert("please fill in Subject");
  } else {
    let a = document.createElement("a");
    a.href = `mailto:${inputEmail}?subject=${inputSubject}&body=${inputMessage}`;
    a.click();
  }
}
