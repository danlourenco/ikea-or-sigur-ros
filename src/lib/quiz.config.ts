// Quiz configuration for the SvelteKit quiz app
// Each question presents a word, and the user must guess if it's an IKEA item or a Sigur Ros/Jonsi song.
// The answer is either 'IKEA' or 'SIGUR_ROS'.
// Each question can specify a sound to play for correct/incorrect answers.

export const quizConfig = {
	sounds: {
		correct: 'sounds/correct.mp3',
		incorrect: 'sounds/incorrect.mp3'
	},
	questions: [
		{ word: 'BILLY', answer: 'IKEA' },
		{ word: 'VON', answer: 'SIGUR_ROS' },
		{ word: 'POÄNG', answer: 'IKEA' },
		{ word: 'SVEFN-G-ENGLAR', answer: 'SIGUR_ROS' },
		{ word: 'KALLAX', answer: 'IKEA' },
		{ word: 'HOPPÍPOLA', answer: 'SIGUR_ROS' },
		{ word: 'LACK', answer: 'IKEA' },
		{ word: 'STARÁFLUR', answer: 'SIGUR_ROS' },
		{ word: 'MALM', answer: 'IKEA' },
		{ word: 'GOÐAN DAGINN', answer: 'SIGUR_ROS' }
	]
};
