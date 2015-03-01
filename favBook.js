var favBook = {
	author: {}
};

function openUserInput() {
	process.stdin.setEncoding('utf-8');
	process.stdin.resume();
	process.stdin.on('data', bookWorm);
};

function printBanner() {
	console.log("=========================");
	console.log("= WELCOME TO BOOK WORM =");
	console.log("=========================");
	console.log("(input 'q' anytime to quit)");
	console.log("\n\nEnter a title of your favorite book");
};

var state = 1;
	

function isNumber(n) {
	if (n == 0) {
		console.log('Book with no pages? Come on!');
		state--;
	} else if (n < 0) {
		console.log('Please, enter positive number');
		state--;
	} else if (!!isNaN(parseFloat(n)) && !isFinite(n)) {
		console.log('Error: [' + n + '] is not a number');
		state--;
	} else return n;
}

function bookWorm(input) {
	input = validateUserInput(input);

	if (state == 2) {
		if (input) {
			favBook.name = input;
		}
		console.log('\nWhat\'s the genre of the book?');
	} if (state == 3) {
		if (input) {
			favBook.genre = input;
		}
		console.log('\nHow many pages does the book have?');
	} if (state == 4) {
		if (input && isNumber(input)) {
			favBook.pages = input;
			console.log('\nWho wrote the book?');
		}
	} if (state == 5) {
		if (input) {
			favBook.author.name = input;
		}
		console.log('\nWhere did author live?');
	} if (state == 6) {
		if (input) {
			favBook.author.country = input;
			printBook(favBook);
			console.log('\nType "q" to quit or "again" to enter the data again.');
		}
	}
};

function validateUserInput(input) {
	input = input.trim();
	if (input == 'q') {
		process.exit();
	} else if (input == '') {
		console.log('Error, you did not enter anything!');
	} else if (state == 6 && input == 'again') {
		state = 1;
		printBanner();
	} else {
		state++;
		return input;
	} 
}

function printBook(book) {
	console.log('\nYour favorite book is "' + favBook.name + '" by ' + favBook.author.name + ' (' + favBook.author.country + ').' + ' The book has ' + favBook.pages + ' pages.')
}

printBanner();
openUserInput();