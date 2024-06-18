function validateFields(validators) {
	for (let i = 0; i < validators.length; i++) {
		const result = validators[i]();
		if (result !== true) {
			return "Er zijn één of meerdere velden verkeerd ingevuld: " + result;
		}
	}
	return null;
}
// Validate Email
function validateEmail(email) {
	const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return pattern.test(email) ? true : "Email is incorrect";
}

// Validate Phone Number
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
	//return beginDate <= endDate ? true : "Einddatum moet na de begindatum zijn"
}

// // Validate Time
// function validateTime(beginTime, endTime) {
//     beginTime <= endTime ? true : 'Eindtijd moet na begintijd zijn'
// }

// Check House number
// function validateHouseNumber(houseNumber) {
// 	const houseNumberPattern = /^[0-9]{1,5} ?[a-zA-Z]?$/;
// 	houseNumberPattern.test(houseNumber) ? true : 'Huis nummer is incorrect'
// }

//Validate Time
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
	console.log(parseInt(time.split(":")[0] + time.split(":")[1]));
	return parseInt(time.split(":")[0] + time.split(":")[1]);
}

function validateShiftDate(shiftBeginDate, shiftEndDate, beginDate, endDate) {
	console.log("Project Begin Date:", beginDate);
	console.log("Project End Date:", endDate);
	console.log("Shift Begin Date:", shiftBeginDate);
	console.log("Shift End Date:", shiftEndDate);

	if (shiftBeginDate > shiftEndDate) {
		console.log("Fout datum: shift begin datum is na de shift eind datum");
		return { valid: false, alert: "Fout datum: shift begin datum is na de shift eind datum" };
	}

	if (beginDate > endDate) {
		console.log("Fout datum: project begin datum is na de project eind datum");
		return { valid: false, alert: "Fout datum: project begin datum is na de project eind datum" };
	}

	if (shiftBeginDate < beginDate || shiftEndDate > endDate) {
		console.log("Datum fout: shift datum ligt buiten de project datum bereik");
		return { valid: false, alert: "Datum fout: shift datum ligt buiten de project datum bereik" };
	}

	return true;
}
function validateShiftTime(beginTime, endTime, beginDate, endDate, shiftBeginTime, shiftEndTime) {
	if (shiftBeginTime > shiftEndTime) {
		console.log("Fout tijd: shift begin tijd is na de shift eind tijd");
		return { valid: false, alert: "Fout tijd: shift begin tijd is na de shift eind tijd" };
	}
	if (beginDate === endDate) {
		if (shiftBeginTime >= shiftEndTime) {
			console.log("Fout tijd: shift begin tijd is na de shift eind tijd");
			return { valid: false, alert: "Fout tijd: shift begin tijd is na de shift eind tijd" };
		}
	}
	if (shiftBeginTime < beginTime || shiftEndTime > endTime) {
		console.log("Tijd fout: shift tijd ligt buiten de project tijd bereik");
		return { valid: false, alert: "Tijd fout: shift tijd ligt buiten de project tijd bereik" };
	}

	return true;
}

//export {validateEmail, validatePhoneNumber, validateLandlineNumber, isDateAtLeastAWeekAway, validateTime, validatePassword, validatePostalCode, validateHouseNumber, validateDateOfBirth}
