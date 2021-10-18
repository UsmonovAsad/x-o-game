function $(a) {
	return document.querySelector(a);
}

function $All(a) {
	return document.querySelectorAll(a);
}

const selectBox = $(".select-box"),
	selectBtnX = $(".playerX"),
	selectBtnO = $(".playerO"),
	playBoard = $(".play-board"),
	players = $(".players"),
	allBox = $All("section span"),
	resultBox = $('.result-box'),
	wonText = $(".won-text"),
	replayBtn = $(".result-box button");

window.addEventListener("load", () => {
	for (let i = 0; i < allBox.length; i++) {
		allBox[i].setAttribute("onclick","clickedBox(this)");
	}
});

selectBtnX.addEventListener("click", () => {
	selectBox.classList.add("hide");
	playBoard.classList.add("show");
});

selectBtnO.addEventListener("click", () => {
	selectBox.classList.add("hide");
	playBoard.classList.add("show");

	players.setAttribute("class","players active player");
});

let playerXIcon = "<i class='fas fa-times'></i>",
	playerOIcon = "<i class='far fa-circle'></i>",
	playerSign = "X",
	runBot = true;

function clickedBox(element) {
	if (players.matches(".player")) {
		playerSign = "O";
		element.innerHTML = playerOIcon;
		players.classList.remove("active");
		element.setAttribute("id",playerSign);
	} else {
		element.innerHTML = playerXIcon;
		element.setAttribute("id",playerSign);
		players.classList.add("active");
	}
	selectWinner();
	element.style.pointerEvents = "none";
	playBoard.style.pointerEvents = "none";
	let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
	setTimeout(() => {
		bot(runBot);
	}, randomTimeDelay);
}

function bot() {
	let array = [];
	if (runBot) {
		playerSign = "O";
		for(let i = 0; i < allBox.length; i++) {
			if(allBox[i].childElementCount == 0) {
				array.push(i);
			}
		}

		let randomBox = array[Math.floor(Math.random() * array.length)];
		if (array.length > 0) {
			if (players.matches(".player")) {
				playerSign = "X";
				allBox[randomBox].innerHTML = playerXIcon;
				allBox[randomBox].setAttribute("id",playerSign);
				players.classList.add("active");
			} else {
				allBox[randomBox].innerHTML = playerOIcon;
				players.classList.remove("active");
				allBox[randomBox].setAttribute("id",playerSign);
			}
			selectWinner();
		}

		allBox[randomBox].style.pointerEvents = "none";
		playBoard.style.pointerEvents = "auto";
		playerSign = "X";
	}
}

function getIdValu(className) {
	return document.querySelector(".box" + className).id;
}

function checkIdSign(val1,val2,val3,sign) {
	if (getIdValu(val1) == sign && getIdValu(val2) == sign && getIdValu(val3) == sign) {
		return true;
	}
}

function selectWinner() {
	if (checkIdSign(1,2,3,playerSign) ||
		checkIdSign(4,5,6,playerSign) ||
		checkIdSign(7,8,9,playerSign) ||
		checkIdSign(1,4,7,playerSign) ||
		checkIdSign(2,5,8,playerSign) ||
		checkIdSign(3,6,9,playerSign) ||
		checkIdSign(1,5,9,playerSign) ||
	 	checkIdSign(3,5,7,playerSign)) {
		runBot = false;
		bot(runBot);
		setTimeout(() => {
			resultBox.classList.add("show");
			playBoard.classList.remove("show");
		},700);

		wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
	} else {
		if (getIdValu(1) != "" && getIdValu(2) != "" && getIdValu(3) != "" &&
			getIdValu(4) != "" && getIdValu(5) != "" && getIdValu(6) != "" &&
			getIdValu(7) != "" && getIdValu(8) != "" && getIdValu(9) != ""
		) {
			runBot = false;
			bot(runBot);
			setTimeout(() => {
				resultBox.classList.add("show");
				playBoard.classList.remove("show");
			},700);
			wonText.textContent = "Match has been draw!";
		}
	}
}

replayBtn.addEventListener("click", () => {
	window.location.reload();
});

