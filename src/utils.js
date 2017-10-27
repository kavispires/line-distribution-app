// From number of members, determine the box-size class for boxes in distribution
export const boxSizeClass = (num) => {
	let className;

	if (num === 2 || num === 4) {
		className = 'box-2';
	} else if ((num >= 3 && num <= 6) || num === 9) {
		className = 'box-3';
	} else if (num === 7 || num === 8 || (num >= 10 && num <= 12) || num === 16) {
		className = 'box-4';
	} else {
		className = 'box-5';
	}

	return className;
};

export const getClosestIndex = (collection, target, key) => {
	let closestIndex = 0;
	let smallesDiff = 100;

	collection.forEach((el, i) => {
		if (key !== undefined) {
			el = el[key];
		}
		const diff = Math.abs(target - el);
		if (diff < smallesDiff) {
			smallesDiff = diff;
			closestIndex = i;
		}
	});

	return closestIndex;
};
