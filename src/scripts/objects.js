/*

The code in this document is written by
the following students to complete requirements
in Computer Science 3 for the third quarter.

Chlod Aidan Alejandro

The code in this project is written under the MIT license.

*/

/*
*  Constructing questions:
*
*  new Question(int : difficulty, string : question,
*  		string: choiceA
*  		string: choiceB
*  		string: choiceC
*  		string: choiceD, char: correctLetter);
*/

function Question(difficulty, question, A, B, C, D, correct) {
	this.question = question;
	this.A = A;
	this.B = B;
	this.C = C;
	this.D = D;
	this.correct = correct;
	this.difficulty = difficulty;
}