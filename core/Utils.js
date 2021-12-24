class Utils {

	static capitalize(text) {
		const lowerText = text.toLowerCase();
		return text.charAt(0).toUpperCase() + lowerText.slice(1);
	}

	static convertToPath(file) {
		return ('/').concat(file.replace(/\.[^/.]+$/, ""));
	}
	
	static genConfirmCode() {
		const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let code = '';
		for (let i = 0; i < 25; i++) {
		    code += characters[Math.floor(Math.random() * characters.length)];
		}

		return code;
	}
}

module.exports = Utils;