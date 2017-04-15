//STATE OBJECT

var state = {
	//setting the initial currentPage to the 0th item in the pages array
	currentPage: 0,
	userInput: '',
	quizCount: {
		completed: 0,
		successful: 0,
		unsuccessful: 0
	},
	pages: [
		{
			title: 'Instructions',
			instructions: 'On each of the following pages, select the correct spell for the task at hand. While we generally advise all challengers to have at least seven years of Hogwarts training, we think students with schooling at Durmstrang or Beauxbatons will have a reasonable chance of surviving.',
			choices: [],
			correctChoiceIndex: '',
			button: 'Enter'
		},
		{
			title: 'Task 1',
			instructions: 'You are fleeing from Filch the caretaker after his dastard cat, Mrs. Norris, alerted him that you are wandering around the castle after bedtime. You reach for the last door in a dead-end hallway and turn its handle, but it’s locked! What spell do you cast to unlock the door?',
			choices: ['Expelliarmus!', 'Alohomora!', 'Ventus!',	'Impedimenta!'],
			correctChoiceIndex: 1,
			button: 'Cast the Spell!'
		},
		{
			title: 'Task 2',
			instructions: 'You are flying high in the stormy sky on your Nimbus 2000 and searching desperately for the Snitch. You start to feel hopeless. The rain is causing your glasses to fog up, and you can hardly see a thing. What spell do you cast to repel the rain from your eyeglasses?',
			choices: ['Imperio!', 'Expelliarmus!', 'Engorgio!', 'Impervius!'],
			correctChoiceIndex: 3,
			button: 'Cast the Spell!'
		},
		{
			title: 'Task 3',
			instructions: 'Breathing hard you bend over, put your hands on your knees, and take a moment’s respite. The Hungarian Horntail dragon is unable to see you while you are hidden behind the rocks, but she will find you sooner or later. Somehow you’ve got to figure out how to reach her golden egg! If only you had your Firebolt broomstick. Then you could reach the egg through flight. What spell do you cast to summon your broomstick?',
			choices: ['Imperio Firebolt!', 'Expelliarmus Firebolt!', 'Accio Firebolt!', 'Crucio Firebolt!'],
			correctChoiceIndex: 2,
			button: 'Cast the Spell!'
		},
		{
			title: 'Task 4',
			instructions: 'Voldemort is out to get you, and you have decided you must go into hiding. However, he’s most likely to begin looking for you by reaching out to your loved ones. In order to protect them and yourself, you’ve decided to make your loved ones forget about you. What spell do you cast to erase their memories of you?',
			choices: ['Obliviate!', 'Confundo!', 'Confundus!', 'Expelliarmus!'],
			correctChoiceIndex: 0,
			button: 'Cast the Spell!'
		},
		{
			title: 'Task 5',
			instructions: 'Dementors are swarming in on all sides, and you are rapidly losing sight of all hope and happiness. What spell do you cast to drive away the dementors?',
			choices: ['Obliviate!', 'Expecto Patronum!', 'Avada Kedavra!', 'Expelliarmus!'],
			correctChoiceIndex: 1,
			button: 'Cast the Spell!'
		},
		//these are all nested objects.
		//JS will run through all of the objects and grabs their keys but does not apply the value to the key until it has gone through every key within the enclosing object.
		//since we still want to access the variable successfulAnswers we figure out a way to access it after everything has been parsed. To do this, we call a function after it has been parsed.
		{
			successfulAnswers: 17,
			//by making this a function we tell the code when to check this.successfulAnswers. So long as we run it outside of the object everything will be filled in at that point.
			//the function below -title())-will only be run when we call it. it is called in the boxInputUpdates function which gets run in the DOM.
			title: function() {
				return 'You successfully completed ' + this.successfulAnswers + ' tasks out of 5!'},
			instructions: '',
			choices: [],
			correctChoiceIndex: '',
			button: 'Play Again'
		
		}
	]
	
};


//STATE FUNCTIONS

// var completedTasks = state.quizCount.completed
//function to update pageview
function nextPage() {
	
	//if the state.currentPage index is greater than 0 and less than 6 then run the checkAnswers function
	//including state.pages.length - 1 ensures that I do not need to hard code the number of pages in the array
	if (state.currentPage > 0 && state.currentPage < state.pages.length - 1) {
		checkAnswers();
	}
	if (state.currentPage >= state.pages.length - 1) {
		resetGame();
	}
	else {
	//update the currentPage to the next item in the array each time a user clicks the button
	//add reset currentPage to 0 functionality
	state.currentPage ++;
	}
//calls DOM function boxInputUpdates()
	boxInputUpdates();
};

//function that updates userInput
function updateUserGuess(input) {
	state.userInput = parseInt(input);
	console.log(state.userInput);
}

//function that resets the game, setting all page, successful, unsuccessful, and completed tasks back to 0
function resetGame() {
	state.currentPage = 0;
	state.quizCount.completed = 0;
	state.quizCount.successful = 0;
	state.quizCount.unsuccessful = 0; 
};

//function that checks a user's answers, increases completed, successful, and unsuccessful counts
var successfulTasks = state.quizCount.successful;
function checkAnswers() {
	state.quizCount.completed ++;
	if (state.userInput === state.pages[state.currentPage].correctChoiceIndex) {
		state.quizCount.successful ++;
	} else {
		state.quizCount.unsuccessful ++;
	};
	state.pages[state.pages.length - 1].successfulAnswers = state.quizCount.successful;
	state.userInput = '';
};

//DOM FUNCTIONS

//function to update boxInput
function boxInputUpdates() {
		var currentTitle = state.pages[state.currentPage].title;
		//typeof is a native JS function that tells you what type of object whatever argument you pass in is.
		if (typeof(currentTitle) !== 'string') {
			currentTitle = state.pages[state.currentPage].title();
		};

		console.log(typeof(currentTitle));
		$('button').html(state.pages[state.currentPage].button);
		$('.title').html(currentTitle);
		$('.instructions').html(state.pages[state.currentPage].instructions);
		$('.completed').html(state.quizCount.completed);
		$('.successful').html(state.quizCount.successful);
		$('.unsuccessful').html(state.quizCount.unsuccessful);

			if (state.pages[state.currentPage].choices.length) {
				$('.options').css('display', 'block');
				$('.scoreCount').css('display', 'block');
				} else {
					$('.options').css('display', 'none');
					$('.scoreCount').css('display', 'none');
				};
				console.log(state.pages[state.currentPage].choices.length);

		for (var i=0; i<state.pages[state.currentPage].choices.length; i++)
			{ $('.label-' + i).html(state.pages[state.currentPage].choices[i]);
			}
};

//function to update quizCount

//function to reset game at end

$(function(){
	//EVENT LISTENERS
	$('button').on('click', function() {
		nextPage();
		$("input:radio").prop('checked', false);
		console.log(successfulTasks);
	});
	$('input').on('click', function() {
		userChoice = this.className;
		updateUserGuess(userChoice.replace('answer-' , ''));
	});
});