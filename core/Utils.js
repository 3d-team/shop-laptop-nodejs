class Utils {

	static capitalize(text) {
		const lowerText = text.toLowerCase();
		return text.charAt(0).toUpperCase() + lowerText.slice(1);
	}
}

module.exports = Utils;