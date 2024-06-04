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
// Validate Date
function isDateAtLeastAWeekAway(date) {
	const inputDate = new Date(date);
	const currentDate = new Date();

	// Calculate the date one week from today
	const minDate = new Date();
	minDate.setDate(currentDate.getDate() + 7);

	return inputDate >= minDate;
}
// Validate Phone Number
function validatePhoneNumber(phoneNumber) {
	const phoneNumberPattern = /^(?:\+31\s?|0)?6[\s-]?[1-9][0-9]{7}$/;

	return phoneNumberPattern.test(phoneNumber);
}
// Validate Landline Number
function validateLandlineNumber(landlineNumber) {
	const landlinePattern = /^(?:\+31\s?|0)?[1-9][0-9]{1,2}[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
	return landlinePattern.test(landlineNumber);
}
// Validate the form
function ExtractInfo(event) {
	event.preventDefault();

	// Extract values from input elements
	let info = [document.getElementById("company").value, document.getElementById("phonenumber").value, document.getElementById("email").value, document.getElementById("date").value, document.getElementById("city").value, document.getElementById("adress").value, document.getElementById("housenumber").value, document.getElementById("title").value, document.getElementById("description").value, document.getElementById("landlinenumber").value, document.getElementById("contact").value];

	try {
		let allFilled = true;

		for (let i = 0; i < info.length; i++) {
			// Check phone number
			if (i === 1) {
				if (!validatePhoneNumber(info[i])) {
					alert("Phone number is not valid");
					allFilled = false;
					break;
				}
			}
			// Check email
			if (i === 2) {
				if (!validateEmail(info[i])) {
					allFilled = false;
					alert("Email is not valid");
					break;
				}
			}
			// Check date
			if (i === 3) {
				if (!isDateAtLeastAWeekAway(info[i])) {
					allFilled = false;
					console.error("Date is not at least a week away");
					alert("Date is not at least a week away");
					break;
				}
			}
			// Check landline number if present
			if (i === 9 && info[i].trim() !== "") {
				if (!validateLandlineNumber(info[i])) {
					allFilled = false;
					console.error("Landline number is not valid");
					alert("Landline number is not valid");
					break;
				}
			}
			// Check for empty or invalid fields
			if (info[i].trim() === "" || info[i] === null || info[i] === undefined) {
				if (info[i].required === true) {
					allFilled = false;
					console.error("Some fields are missing or incorrect");
					alert("Some fields are missing or incorrect");
					break;
				} else {
					info[i].value = null;
				}
			}
		}

		if (allFilled) {
			createProjectOnAPI(event);
			alert("Project created successfully");
		}
	} catch (error) {
		console.log(error);
	}
}
async function createProjectOnAPI(event) {
	event.preventDefault();
	try {
		const projectResult = await fetch("http://localhost:3000/api/create", {
			method: "POST",
			body: JSON.stringify({
				company: document.getElementById("company").value,
				phonenumber: document.getElementById("phonenumber").value,
				contactemail: document.getElementById("email").value,
				contactperson: document.getElementById("contact").value,
				date: document.getElementById("date").value,
				city: document.getElementById("city").value,
				adress: document.getElementById("adress").value,
				housenumber: document.getElementById("housenumber").value,
				title: document.getElementById("title").value,
				description: document.getElementById("description").value,
				landlinenumber: document.getElementById("landlinenumber").value,
				currentdate: new Date(),
			}),
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		});
		const projectData = await projectResult.json();

		console.log(projectData);
	} catch (error) {
		console.error("Error posting data:" + error);
	}
}
