/*

The code in this document is written by
the following students to complete requirements
in Computer Science 3 for the third quarter.

Chlod Aidan Alejandro

The code in this project is written under the MIT license.

*/

var txtQuestion = document.getElementById("question");
var btnChoiceA = document.getElementById("choiceA");
var btnChoiceB = document.getElementById("choiceB");
var btnChoiceC = document.getElementById("choiceC");
var btnChoiceD = document.getElementById("choiceD");
var running = false;
var questionRunning = false;
var quizStart;
var quizEnd;

var score = 0;
var totalQuestions;
var remainingQuestions = [];
var currentQuestionIndex = 0;
var options = {};
var currentQuestion = new Question(0, "Question", "A", "B", "C", "D", 'A');

function randomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function runOnButtons(callback) {
	callback(btnChoiceA);
	callback(btnChoiceB);
	callback(btnChoiceC);
	callback(btnChoiceD);
}

function resetButtons() {
	runOnButtons(function(button) {
		button.classList = "";
		button.classList.add("choice");
		button.classList.add("nofocus");
	});
	questionRunning = true;
}

function colorButton(correct, pressed, button) {
	if (correct === button.getAttribute("value") && button.getAttribute("value") === pressed.getAttribute("value")) {
		button.classList.add("chosen_correct");
		++score;
	} else if (correct !== button.getAttribute("value") && button.getAttribute("value") === pressed.getAttribute("value")) {
		button.classList.add("chosen_incorrect");
	} else if (correct === button.getAttribute("value") && button.getAttribute("value") !== pressed.getAttribute("value")) {
		button.classList.add("correct");
	} else {
		button.classList.add("incorrect");
	}
	button.classList.add("nohover");
}

function setQuestion(question) {
	txtQuestion.innerHTML = question.question;
	btnChoiceA.innerHTML = question.A;
	btnChoiceB.innerHTML = question.B;
	btnChoiceC.innerHTML = question.C;
	btnChoiceD.innerHTML = question.D;
}

function checkAnswer(event) {
	if (!questionRunning) return;
	resetButtons();
	runOnButtons(function(button) {
		colorButton(currentQuestion.correct, event.target, button);
	});
	questionRunning = false;
	document.getElementById("proceed").classList.remove("hidden");
	remainingQuestions.splice(currentQuestionIndex, 1);
	document.getElementById("proceed").innerHTML = (remainingQuestions.length === 0 ? "Finish" : "Next");
}

function changeQuestion() {
	resetButtons();
	if (remainingQuestions.length === 0) {
		finishQuiz();
		return;
	}
	currentQuestionIndex = options.shuffle ? randomInt(0, remainingQuestions.length - 1) : 0;
	currentQuestion = remainingQuestions[currentQuestionIndex];
	setQuestion(currentQuestion);
	questionRunning = true;
	document.getElementById("proceed").classList.add("hidden");
}

btnChoiceA.addEventListener("click", checkAnswer);
btnChoiceB.addEventListener("click", checkAnswer);
btnChoiceC.addEventListener("click", checkAnswer);
btnChoiceD.addEventListener("click", checkAnswer);

document.getElementById("proceed").addEventListener("click", changeQuestion);

function startQuiz(quizOptions) {
	options = quizOptions;
	running = true;
	if (quizOptions.categories.music) {
		remainingQuestions = remainingQuestions.concat(music_questions);
	}
	if (quizOptions.categories.movies) {
		remainingQuestions = remainingQuestions.concat(movie_questions);
	}
	if (quizOptions.categories.tv) {
		remainingQuestions = remainingQuestions.concat(tv_questions);
	}
	if (quizOptions.categories.games) {
		remainingQuestions = remainingQuestions.concat(game_questions);
	}
	var sortedQuestions = [];
	var initialQuestionSize = remainingQuestions.length;
	for (var i = 0; i < initialQuestionSize; i = i + 1) {
		if (remainingQuestions[i].difficulty === 0 && quizOptions.difficulty.lvl1) {
			sortedQuestions.push(remainingQuestions[i]);
		} else if (remainingQuestions[i].difficulty === 1 && quizOptions.difficulty.lvl2) {
			sortedQuestions.push(remainingQuestions[i]);
		} else if (remainingQuestions[i].difficulty === 2 && quizOptions.difficulty.lvl3) {
			sortedQuestions.push(remainingQuestions[i]);
		} else if (remainingQuestions[i].difficulty === 3 && quizOptions.difficulty.lvl4) {
			sortedQuestions.push(remainingQuestions[i]);
		}
	}
	remainingQuestions = sortedQuestions;
	totalQuestions = sortedQuestions.length;
	resetButtons();
	score = 0;
	quizStart = Date.now();
	quizEnd = Date.now() + (quizOptions["time"] * 1000);
	changeQuestion();
}

function finishQuiz() {
	document.getElementById("res-score").innerHTML = score;
	document.getElementById("res-max").innerHTML = totalQuestions;

	document.getElementById("quizzer").classList.add("hidden");
	document.getElementById("results").classList.remove("hiddenA");
}