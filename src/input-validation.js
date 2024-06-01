// Validate Email
function validateEmail(email) {
	const patern = /^[a-zA-Z]\.[a-zA-Z]{2,}\@[a-zA-Z]{2,}\.[a-zA-Z]{2,3}$/;
	if (!patern.test(email)) throw new Error(`${email} email not valid`);
}

// Validate Password
function validatePassword(password) {
	const patern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S{8,}$/;

	if (!patern.test(password)) throw new Error(`password not strong enough`);
}

function ExtractInfo() {
	let info = [document.getElementById("company").value, document.getElementById("phonenumber").value, document.getElementById("email").value, document.getElementById("date").value, document.getElementById("city").value, document.getElementById("adress").value, document.getElementById("housenumber").value, document.getElementById("title").value, document.getElementById("description").value];

	try {
		let allFilled = true;
		for (let i = 0; i < info.length; i++) {
			if (info[i].trim() === "" || info[i] === null || info[i] === undefined) {
				allFilled = false;
				console.error("Some fields are missing or incorrect");
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
