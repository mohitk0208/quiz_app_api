const shuffle = (array) => {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

	//while there are elements to shuffle
	while (0 !== currentIndex) {
		//pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		//and swap it with current element
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

exports.shuffle = shuffle;