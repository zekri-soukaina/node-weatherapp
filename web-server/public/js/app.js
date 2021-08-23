console.log("client side file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#message-1");
const msgTwo = document.querySelector("#message-2");

msgOne.textContent = "Loading..";
msgTwo.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  // console.log("your data:", location);

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        //   console.log(data.error);

        msgOne.textContent = data.error;
      } else {
        //   console.log(data);
        //   console.log(data.location);
        //   console.log(data.forecast);

        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecast;
      }
    });
  });
});
