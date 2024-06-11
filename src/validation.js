function validateFields(validators) {
    for(let i = 0; i < validators.length; i++){
        const result = validators[i]();
        if(result !== true){
            return 'Er zijn één of meerdere velden verkeerd ingevuld: ' + result;
        }
    }
    return null;
}
// Validate Email
function validateEmail(email) {
	const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email) ? true : 'Email is incorrect';
}

// Validate Phone Number
function validatePhoneNumber(phoneNumber) {
	const phoneNumberPattern = /^(?:\+31\s?|0)?6[\s-]?[1-9][0-9]{7}$/;
	return phoneNumberPattern.test(phoneNumber) ? true : 'Mobiel nummer is incorrect';
}

function validateLandlineNumber(landlineNumber) {
	const landlinePattern = /^(?:\+31\s?|0)?[1-9][0-9]{1,2}[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
	return landlinePattern.test(landlineNumber) ? true : 'Vast nummer is incorrect';
}

function isDateAtLeastAWeekAway(date) {
	const inputDate = new Date(date);
	const currentDate = new Date();
	const minDate = new Date();
	minDate.setDate(currentDate.getDate() + 7);
	return inputDate >= minDate ? true : 'Datum moet minimaal een week weg zijn';
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
        return beginTime < endTime ? true : 'Eindtijd moet na begintijd zijn';
	}
}

function validatePassword(password) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return pattern.test(password) ? true : 'Wachtwoord voldoet niet aan de eisen';
}

function validatePostalCode(postalCode) {
    const pattern = /^[0-9]{4} ?[a-zA-Z]{2}$/;
    return pattern.test(postalCode) ? true : 'Postcode is incorrect';
}

function validateHouseNumber(houseNumber) {
    return houseNumber.length < 11 ? true : 'Huisnummer is te lang'
}

function validateDateOfBirth(dateOfBirth) {
    const date = new Date();
    const today = date.toISOString().split('T')[0];
    return dateOfBirth < today ? true : 'Geboortedatum kan niet in de toekomst zijn'
}

//export {validateEmail, validatePhoneNumber, validateLandlineNumber, isDateAtLeastAWeekAway, validateTime, validatePassword, validatePostalCode, validateHouseNumber, validateDateOfBirth}