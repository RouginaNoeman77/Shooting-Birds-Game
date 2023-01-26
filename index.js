window.addEventListener("load", function () {
  let select = document.querySelector(".mySelect");
  let text = document.querySelector(".myText");
  let submitButton = document.querySelector(".gobtn");
  let userEnteredData = document.querySelector(".username");
  let nameError = this.document.querySelector("#NameError");

  select.onchange = function () {
    text.value = select.value;
  };

  submitButton.onclick = function (event) {
    event.preventDefault();

    if (
      document.querySelector(".username").value == "" ||
       document.querySelector(".username").value == null
    ) {
      nameError.style.display = "block";
      submitButton.event.preventDefault();
    } else {
      nameError.style.display = "none ";
    
    localStorage.setItem("Name", userEnteredData.value);
    let date = new Date();

    let playDate = date.toLocaleString();
    localStorage.setItem("date", playDate);



    window.location.href = "http://127.0.0.1:5500/gameProject/game.html";
    } 
   
   };

});
