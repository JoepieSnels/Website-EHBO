function validateFields(validators) {
	for (let i = 0; i < validators.length; i++) {
		const result = validators[i]();
		if (result !== true) {
			return "Er zijn één of meerdere velden verkeerd ingevuld: " + result;
		}
	}
	return null;
}

function validateEmail(email) {
	const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return pattern.test(email) ? true : "Email is incorrect";
}


function validatePhoneNumber(phoneNumber) {
	const phoneNumberPattern = /^(?:\+31\s?|0)?6[\s-]?[1-9][0-9]{7}$/;
	return phoneNumberPattern.test(phoneNumber) ? true : "Mobiel nummer is incorrect";
}

function validateLandlineNumber(landlineNumber) {
	const landlinePattern = /^(?:\+31\s?|0)?[1-9][0-9]{1,2}[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
	return landlinePattern.test(landlineNumber) ? true : "Vast nummer is incorrect";
}

function isDateAtLeastAWeekAway(date) {
	const inputDate = new Date(date);
	const currentDate = new Date();
	const minDate = new Date();
	minDate.setDate(currentDate.getDate() + 7);
	return inputDate >= minDate ? true : "Datum moet minimaal een week weg zijn";
}

function validateDate(beginDate, endDate) {
	if (beginDate > endDate) {
		return false;
	}

	return true;
}

function validateTime(beginTime, endTime, beginDate, endDate) {
	if (beginDate === endDate) {
		if (beginTime >= endTime) {
			console.error("End time must be after begin time");
			return false;
		}
	}
	return true;
}

function validatePassword(password) {
	const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	return pattern.test(password) ? true : "Wachtwoord voldoet niet aan de eisen";
}

function validatePostalCode(postalCode) {
	const pattern = /^[0-9]{4} ?[a-zA-Z]{2}$/;
	return pattern.test(postalCode) ? true : "Postcode is incorrect";
}

function validateHouseNumber(houseNumber) {
	return houseNumber.length < 11 ? true : "Huisnummer is te lang";
}

function validateDateOfBirth(dateOfBirth) {
	const date = new Date();
	const today = date.toISOString().split("T")[0];
	return dateOfBirth < today ? true : "Geboortedatum kan niet in de toekomst zijn";
}

function setStatus(status) {
	return status === true ? "Geaccepteerd" : status === false ? "Afgewezen" : "Open";
}

function timeToInt(time) {
	return parseInt(time.split(":")[0] + time.split(":")[1]);
}

function validateShiftDate(shiftBeginDate, shiftEndDate, beginDate, endDate) {


	if (shiftBeginDate > shiftEndDate) {
		return { valid: false, alert: "Fout datum: shift begin datum is na de shift eind datum" };
	}

	if (beginDate > endDate) {
		return { valid: false, alert: "Fout datum: project begin datum is na de project eind datum" };
	}

	if (shiftBeginDate < beginDate || shiftEndDate > endDate) {
		return { valid: false, alert: "Datum fout: shift datum ligt buiten de project datum bereik" };
	}

	return { valid: true, alert: "" };
}
function validateShiftTime(beginTime, endTime, beginDate, endDate, shiftBeginTime, shiftEndTime) {
	if (shiftBeginTime > shiftEndTime) {
		return { valid: false, alert: "Fout tijd: shift begin tijd is na de shift eind tijd" };
	}
	if (beginDate === endDate) {
		if (shiftBeginTime >= shiftEndTime) {
			return { valid: false, alert: "Fout tijd: shift begin tijd is na de shift eind tijd" };
		}
	}
	if (shiftBeginTime < beginTime || shiftEndTime > endTime) {
		return { valid: false, alert: "Tijd fout: shift tijd ligt buiten de project tijd bereik" };
	}

	return { valid: true, alert: "" };
}

function formatGender(gender) {
	const lowercaseGender = gender.toLowerCase();
	if (lowercaseGender === "male" || lowercaseGender === "m" || lowercaseGender === "Male" || lowercaseGender === "M") {
		return "Man";
	} else if (lowercaseGender === "female" || lowercaseGender === "f" || lowercaseGender === "Female" || lowercaseGender === "F") {
		return "Vrouw";
	} else if (lowercaseGender === "other" || lowercaseGender === "o" || lowercaseGender === "Other" || lowercaseGender === "O") {
		return "Anders";
	} else {
		return "Zeg ik liever niet";
	}
}
