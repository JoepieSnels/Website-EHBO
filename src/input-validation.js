const e = require("express");

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

function showPassword() {
	let x = document.getElementById("password");
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
}
// Check if Email and Password fields are not empty
function validateForm() {
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;

	if (email.trim() === "") {
		var error = document.getElementById("emailValidation");

		error.style.display = "block";
	}

	if (password.trim() === "") {
		var error = document.getElementById("passwordValidation");

		error.style.display = "block";
	}
	if (email.trim() !== "" && password.trim() !== "") {
		window.location.href = "index.html";
	}
}