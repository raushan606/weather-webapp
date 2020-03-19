console.log("Client Side javascript fille is loaded");

// fetch("http://puzzle.mead.io/puzzle").then(response => {
//   response.json().then((data) => {
//     console.log(data)
//   });
// });

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//messageOne.textContent = 'From Javascript'

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = searchElement.value;
  messageOne.textContent = "loading..";
  messageTwo.textContent = "";
  fetch("http://localhost:3000/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        console.log(data.error);
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        console.log(data.location);
        console.log(data.forecast);
      }
    });
  });
});
