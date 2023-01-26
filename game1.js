window.addEventListener("load", function () {
  let score = 0;
  let count = 0;

  let startButton = this.document.querySelector("#startbtn");
  let messagebox = this.document.querySelector(".msgbox");
  let winmsg = this.document.querySelector(".win");
  let losemsg = this.document.querySelector(".lose");
  let winbird = this.document.querySelector(".winbird");
  let losebird = this.document.querySelector(".losebird");
  let playagainbtn = this.document.querySelector(".playagain");
  let quacksound = this.document.querySelector(".quack");
  let bluequack = this.document.querySelector(".bluequack");
  let blackcrow = this.document.querySelector(".crow");

  document.querySelector(".userStoredData").innerHTML =
    "Welcome, " + localStorage.getItem("Name");

  document.querySelector(".welcomemsg").innerHTML =
    localStorage.getItem("Name");

  this.document.querySelector(".name2").innerHTML =
    localStorage.getItem("Name");

  startButton.onclick = function () {
    messagebox.style.display = "none";

    GenerateBirdsToLeft();

    setTimeout(countDown, 1000);

    movingDown();

    bombFunction();
  };

  playagainbtn.onclick = function () {
    location.href = "http://127.0.0.1:5500/gameProject/game.html";
  };

  let container;
  const GenerateBirdsToLeft = function () {
    id = setInterval(function () {
      container = document.createElement("div"); //new

      //container.classList.add("AllBirds"); //new

      document.body.appendChild(container); //new

      let gifs = [
        "images/whiteBird.gif",
        "images/blueBird.gif",
        "images/Zhug.gif",
      ];

      let randomNum = Math.floor(Math.random() * 3);

      let birdobject = document.createElement("img");

      this.document.body.appendChild(birdobject);

      //let birdsInContainer = document.createElement("div"); //new

      container.appendChild(birdobject); //new

      birdobject.src = gifs[randomNum];

      birdobject.classList.add("Bird");

      if (randomNum == 0) {
        birdobject.classList.add("white");
      }

      if (randomNum == 1) {
        birdobject.classList.add("blue");
      }

      if (randomNum == 2) {
        birdobject.classList.add("black");
      }

      let randomHeight = Math.floor(Math.random() * 422);

      birdobject.style.bottom = randomHeight + "px";

      // flying the birds

      let flyleft = 0;

      id2 = setInterval(function () {
        if (flyleft < window.innerWidth - birdobject.width - 50) {
          flyleft += 30;
          birdobject.style.left = flyleft + "px";
        } else {
          birdobject.remove();
        }

        birdobject.onclick = function (event) {
          event.target.style.display = "none";

          if (birdobject.classList.contains("white")) {
            quacksound.play();
          }
          if (birdobject.classList.contains("blue")) {
            bluequack.play();
          }

          if (birdobject.classList.contains("black")) {
            blackcrow.play();
          }
        };
      }, 200);

      //clearInterval(id2);

      setTimeout(function () {
        clearInterval(id);
      }, 50000);

      setTimeout(() => {
        let messgbox = document.querySelector(".message-box");

        messgbox.style.display = "block";
      }, 60000);
    }, 1500);

    //score and count of killed birds

    window.addEventListener("click", function (event) {
      if (event.target.classList.contains("Bird")) {
        count++;
        this.document.querySelector(".birdsinfo").innerHTML = count;

        if (event.target.classList.contains("white")) {
          score += 5;
        }

        if (event.target.classList.contains("blue")) {
          score -= 10;
        }

        if (event.target.classList.contains("black")) {
          score += 10;
        }
        if (score > 50) {
          winbird.style.display = "block";
          losebird.style.display = "none";
          winmsg.style.display = "block";
          losemsg.style.display = "none";
        }
        if (score < 50) {
          winbird.style.display = "none";
          losebird.style.display = "block";
          winmsg.style.display = "none";
          losemsg.style.display = "block";
        }

        document.querySelector(".scoreinfo").innerHTML = score;
        this.document.querySelector(".score2").innerHTML = score;
      }
    });
  };

  //Timer Function
  let time = 60;

  function countDown() {
    time--;
    document.querySelector(".timerinfo").innerHTML = "Timer: " + time;
    if (time > 0) {
      setTimeout(countDown, 1000);
    } else {
      document.querySelector(".timerinfo").innerHTML = "00:00";
    }
  }

  //Bomb Creation

  let bomb;

  const movingDown = function () {
    let id = setInterval(function () {
      bomb = this.document.createElement("img");
      bomb.src = "images/bomb.png";
      this.document.body.append(bomb);
      bomb.classList.add("bomb");
      let left = Math.ceil(Math.random() * 1000);
      bomb.style.left = left + "px";

      let down = 0;
      let id2 = setInterval(function () {
        down += 20;
        if (window.innerHeight - bomb.height > down) {
          bomb.style.top = down + "px";
        } else {
          clearInterval(id2);
          bomb.style.display = "none";
        }
      }, 200);

      setTimeout(function () {
        clearInterval(id);
      }, 40000);
    }, 10000);
  };

  const getDistance = function (bomb, birdobject) {
    let indistance = false;

    //bomb dimensions

    let bombleft = parseInt(bomb.style.left);

    let bombRight = bombleft + bomb.width + 100;

    let bombTop = parseInt(bomb.style.top);

    let bombBottom = bombTop + bomb.height + 100;

    //birds dimension

    let birdsLeft = parseInt(birdobject.style.left);

    let birdsRight = birdsLeft + birdobject.width;

    let bridsTop = parseInt(birdobject.offsetTop);

    let birdsBottom = bridsTop + birdobject.height;

    //conditions to remove birds

    if (
      birdsLeft < bombRight &&
      birdsRight > bombleft &&
      bridsTop < bombBottom &&
      birdsBottom > bombTop
    ) {
      indistance = true;
    }

    return indistance;
  };

  const bombFunction = function () {
    window.addEventListener("click", function (event) {
      let insideBirds = document.querySelectorAll("img");
      if (event.target.classList.contains("bomb")) event.target.remove();
      for (let i = 0; i < insideBirds.length; i++) {
        if (getDistance(event.target, insideBirds[i]) == true) {
          if (insideBirds[i].classList.contains("Bird")) {
            insideBirds[i].remove();
            count++;
          }

          if (insideBirds[i].classList.contains("blue")) {
            score -= 10;
          }

          if (insideBirds[i].classList.contains("black")) {
            score += 10;
          }
          if (insideBirds[i].classList.contains("white")) {
            score += 5;
          }

          document.querySelector(".birdsinfo").innerHTML = count;

          document.querySelector(".scoreinfo").innerHTML = score;
        }
      }
    });
  };
});
