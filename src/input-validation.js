// Validate Email
function validateEmail(email) {
	// Define a more comprehensive regex pattern for validating email addresses
	const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	// Test the email against the regex pattern
	if (!pattern.test(email)) {
		alert("Email not valid");
		console.error("Email not valid");
		return false;
	}
	return true;
}

// Validate Password
function validatePassword(password) {
	const patern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S{8,}$/;

	if (!patern.test(password)) throw new Error(`password not strong enough`);
}
function isDateAtLeastAWeekAway(date) {
	const inputDate = new Date(date);
	const currentDate = new Date();

	// Calculate the date one week from today
	const minDate = new Date();
	minDate.setDate(currentDate.getDate() + 7);

	return inputDate >= minDate;
}
function ExtractInfo() {
	let info = [document.getElementById("company").value, document.getElementById("phonenumber").value, document.getElementById("email").value, document.getElementById("date").value, document.getElementById("city").value, document.getElementById("adress").value, document.getElementById("housenumber").value, document.getElementById("title").value, document.getElementById("description").value];

	try {
		let allFilled = true;

		for (let i = 0; i < info.length; i++) {
			if (i === 2) {
				if (!validateEmail(info[i])) {
					allFilled = false;
					break;
				}
			}
			if (i === 3) {
				if (!isDateAtLeastAWeekAway(info[i])) {
					allFilled = false;
					console.error("Date is not at least a week away");
					alert("Date is not at least a week away");
					break;
				}
			}
			if (info[i].trim() === "" || info[i] === null || info[i] === undefined) {
				allFilled = false;
				console.error("Some fields are missing or incorrect");
				alert("Some fields are missing or incorrect");
				break;
			}
		}

		if (allFilled) {
			console.log(info);
		}
	} catch (error) {
		console.log(error);
	}
}
