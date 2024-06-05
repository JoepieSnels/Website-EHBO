// Validate Email
function validateEmail(email) {
    const patern = /^[a-zA-Z]\.[a-zA-Z]{2,}\@[a-zA-Z]{2,}\.[a-zA-Z]{2,3}$/;
    if (!patern.test(email)) throw new Error(`${email} email not valid`);
}

// Validate Password
function validatePassword(password) {
    const patern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S{8,}$/;

    if (!(patern.test(password))) throw new Error(`password not strong enough`);
}

function showPassword() {
    let x = document.getElementById("currentPassword");
    let y = document.getElementById("newPassword");
    if (x.type === "password") {
        x.type = "text";
    } else if (y.type === "password") {
        y.type = "text"
    } else {
        x.type = "password";
    }
}

// Check if Email and Password fields are not empty
function validateForm(event) {
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
	var passwordError = document.getElementById("passwordValidation");
	var emailError = document.getElementById("emailValidation");
	if (email.trim() === "") {
		emailError.style.display = "block";
	}

	if (password.trim() === "") {
		passwordError.style.display = "block";
	}
	if (email.trim() !== "" && password.trim() !== "") {
		emailError.style.display = "none";
		passwordError.style.display = "none";
		loginOnAPI(event, email, password);
	}
}
// Benader de API on in te loggen
async function loginOnAPI(event, email, password) {
	console.log("Trying to login");
	event.preventDefault();

	try {
		const loginResult = await fetch("https://api-ehbo.onrender.com/api/login", {
			method: "POST",
			body: JSON.stringify({
				emailaddress: email,
				password: password,
			}),
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		});

		const jsonResult = await loginResult.json();

		if (jsonResult.data.SessionToken || jsonResult.data.Permissions) {
			// Store session tokens
			createSessionAndPermission(jsonResult.data.SessionToken, jsonResult.data.Permissions);
		} else {
			if (jsonResult.message === "User not found or password invalid") {
				document.getElementById("APIResult").innerText = jsonResult.message;
			} else {
				document.getElementById("APIResult").innerText = "Something went wrong";
			}
		}
	} catch (error) {
		console.error("Error fetching data:" + error);
		var emailError = document.getElementById("emailValidation");
		var passwordError = document.getElementById("passwordValidation");
		emailError.style.display = "block";
		passwordError.style.display = "block";
	}
}

function alertNoAcces() {
	console.log("Not the right site permissions");
	alert("You have no acces to this page, redirecting to login");
	window.location.href = "./Login.html";
}

// Zo kan je een sessie aanmaken
function createSessionAndPermission(token, permissions) {
	window.sessionStorage.setItem("jwtToken", token);
	window.sessionStorage.setItem("permissions", permissions);
	window.location.href = "../StaticUserInfo.html";
}