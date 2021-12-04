class Utils {

	static capitalize(text) {
		const lowerText = text.toLowerCase();
		return text.charAt(0).toUpperCase() + lowerText.slice(1);
	}

	static convertToPath(file) {
		return ('/').concat(file.replace(/\.[^/.]+$/, ""));
	}
	
}

module.exports = Utils;