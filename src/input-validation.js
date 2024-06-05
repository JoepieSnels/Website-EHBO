// Validate Email
function validateEmail(email) {
	const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!pattern.test(email)) {
		alert("Email not valid");
		console.error("Email not valid");
		return false;
	}
	return true;
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

// Validate Date
function isDateAtLeastAWeekAway(date) {
	const inputDate = new Date(date);
	const currentDate = new Date();
	const minDate = new Date();
	minDate.setDate(currentDate.getDate() + 7);
	return inputDate >= minDate;
}

// Validate Time
function validateTime(beginTime, endTime) {
	if (beginTime >= endTime) {
		alert("End time must be after begin time");
		console.error("End time must be after begin time");
		return false;
	}
	return true;
}

function formatDate(date) {
	if (!date) return ""; // Handle null or undefined date values

	const d = new Date(date);
	if (isNaN(d.getTime())) return ""; // Handle invalid date values

	return d.toISOString().split("T")[0];
}

// Validate the form and extract info
function ExtractInfo(event) {
	event.preventDefault();

	// Extract values from input elements
	let info = [document.getElementById("company").value, document.getElementById("phonenumber").value, document.getElementById("email").value, document.getElementById("date").value, document.getElementById("city").value, document.getElementById("adress").value, document.getElementById("housenumber").value, document.getElementById("title").value, document.getElementById("description").value, document.getElementById("landlinenumber").value, document.getElementById("contact").value, document.getElementById("beginTime").value, document.getElementById("endTime").value];

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
			// Check time
			if (i === 11) {
				if (!validateTime(info[i], info[i + 1])) {
					allFilled = false;
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
			createProjectOnAPI(info); // Pass info array to createProjectOnAPI function
			alert("Project created successfully");
			document.getElementById("form").reset();
		}
	} catch (error) {
		console.log(error);
	}
}

async function createProjectOnAPI(data) {
	try {
		const projectResult = await fetch("https://api-ehbo.onrender.com/api/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
			body: JSON.stringify({
				company: data[0],
				phonenumber: data[1],
				contactemail: data[2],
				date: data[3],
				city: data[4],
				adress: data[5],
				housenumber: data[6],
				title: data[7],
				description: data[8],
				landlinenumber: data[9],
				contactperson: data[10],
				beginTime: data[11] + ":00",
				endTime: data[12] + ":00",
				currentdate: Date.now(),
			}),
		});

		const projectData = await projectResult.json();

		console.log(projectData);
	} catch (error) {
		console.error("Error posting data:" + error);
	}
}
