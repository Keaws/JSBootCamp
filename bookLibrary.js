var readline = require('readline'),
	rl = readline.createInterface({
  	input: process.stdin,
  	output: process.stdout
	});

var favBook = {
	author: {}
};

var state = '0';

//add book states
var AB_NAME = '1',
	AB_GENRE = '2',
	AB_NUM_OF_PAGES = '3',
	AB_AUTHOR_NAME = '4',
	AB_AUTHOR_COUNTRY = '5';

//main menu states
var MM_ADD_BOOK = '1',
	MM_EDIT_BOOK = '2',
	MM_DELETE_BOOK = '3',
	MM_PRINT_LIBRARY = '4',
	MM_EXIT = '5';

function mainMenu() {
    //readMainMenu.resume();

	console.log("\n===========================");
    console.log("= WELCOME TO BOOK LIBRARY =");
    console.log("===========================");
    console.log("\nAvailable Options:");
    console.log("\n1. Add new book");
    console.log("2. Edit existing book");
    console.log("3. Delete a book");
    console.log("4. Take a look at library");
    console.log("5. Exit");

    rl.on('line', function (input) {
  		mainMenuProcess(input);
	});
};

function mainMenuProcess(input) {
	input = input.trim();

	switch(input) {
		case MM_ADD_BOOK:
			console.log('\n===========================');
			console.log('\nTo add a new book, please answer the following questions');
			addBook();
			break;
		case MM_EXIT:
			console.log('Have a lovely day!');
			process.exit();
			break;
		default:
			//console.log('[' + input + ']');
			//console.log('input: [' + input + '] MM_ADD_BOOK ' + '[' + MM_ADD_BOOK + ']')
			console.log('default');
	}
};

function addBook() {
	console.log('\nEnter a title of your favorite book');

	rl.on('line', function (input) {
    	input = validateUserInputAddBook(input);

	if (state == AB_NAME) {
		if (input) {
			favBook.name = input;
		}
		console.log('\nWhat\'s the genre of the book?');
	} if (state == AB_GENRE) {
		if (input) {
			favBook.genre = input;
		}
		console.log('\nHow many pages does the book have?');
	} if (state == AB_NUM_OF_PAGES) {
		if (input && isNumber(input)) {
			favBook.pages = input;
			console.log('\nWho wrote the book?');
		}
	} if (state == AB_AUTHOR_NAME) {
		if (input) {
			favBook.author.name = input;
		}
		console.log('\nWhere did author live?');
	} if (state == AB_AUTHOR_COUNTRY) {
		if (input) {
			favBook.author.country = input;
			printBook(favBook);
			console.log('\nType "q" to quit or "again" to enter the data again.');
		}
	}
	});
};

function validateUserInputAddBook(input) {
	input = input.trim();
	if (input == 'q') {
		console.log('Have a lovely day!');
		process.exit();
	} else if (input == '') {
		console.log('Error, you did not enter anything!');
	} else if (state == AB_AUTHOR_COUNTRY && input == 'again') {
		state = '0';
		addBook();
	} else {
		state++;
		return input;
	} 
}

function isNumber(n) {
	if (n == 0) {
		console.log('Book with no pages? Come on!');
		state--;
	} else if (n < 0) {
		console.log('Please, enter positive number');
		state--;
	} else if (!!isNaN(parseInt(n)) && !isFinite(n)) {
		console.log('Error: [' + n + '] is not a number');
		state--;
	} else return parseInt(n);
}

function printBook(book) {
	console.log('\nThank you!\nIt seems that you like reading ' + favBook.genre + ' and your favorite book is "' + favBook.name + '" by ' + favBook.author.name + ' (' + favBook.author.country + ').' + ' The book has ' + favBook.pages + ' pages.')
}

mainMenu();