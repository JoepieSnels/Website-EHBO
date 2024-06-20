function formatDate(date) {
	if (!date) return "";

	const d = new Date(date);
	if (isNaN(d.getTime())) return "";

	return d.toISOString().split("T")[0];
}

function ExtractInfo(event) {
	event.preventDefault();
	let info = [document.getElementById("company").value, document.getElementById("phonenumber").value, document.getElementById("email").value, document.getElementById("beginDate").value, document.getElementById("city").value, document.getElementById("adress").value, document.getElementById("housenumber").value, document.getElementById("title").value, document.getElementById("description").value, document.getElementById("landlinenumber").value, document.getElementById("contact").value, document.getElementById("beginTime").value, document.getElementById("endTime").value, document.getElementById("endDate").value];
	try {
		let allFilled = true;

		for (let i = 0; i < info.length; i++) {
			if (i === 1) {

				if (validatePhoneNumber(info[i]) != true) {
					alert("Phone number is not valid");
					allFilled = false;
					break;
				}
			}
			if (i === 2) {
				if (validateEmail(info[i]) != true) {
					allFilled = false;
					alert("Email is not valid");
					break;
				}
			}
			if (i === 3) {
				if (isDateAtLeastAWeekAway(info[i]) != true) {
					allFilled = false;
					alert("Date is not at least a week away");
					break;
				}
				if (validateDate(info[i], info[13]) != true) {
					allFilled = false;
					alert("End date must be after begin date");
					break;
				}
			}
			if (i === 6) {
				if (validateHouseNumber(info[i]) != true ) {
					allFilled = false;
					alert("House number is not valid");
					break;
				}
			}
			if (i === 9 && info[i].trim() !== "") {
				if (validateLandlineNumber(info[i]) != true) {
					allFilled = false;
					alert("Landline number is not valid");
					break;
				}
			}

			if (i === 11) {
				if (validateTime(info[i], info[12], info[3], info[13]) != true) {
					alert("End time must be after begin time");
					allFilled = false;
					break;
				}
			}

			if (i !== 9) {
				if (info[i].trim() === "" || info[i] === null || (info[i] === undefined && i)) {
					allFilled = false;
					alert("Some fields are missing or incorrect");
					break;
				}
			}
		}

		if (allFilled) {
			createProjectOnAPI(info);
			alert("Project created successfully");
		}
	} catch (error) {
		console.log(error);
	}
}

async function createProjectOnAPI(data) {
	try {
		const projectResult = await fetch(`${config.apiURL}/api/create`, {
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
				endDate: data[13],
			}),
		});

		const projectData = await projectResult.json();
	} catch (error) {
		console.error("Error posting data:" + error);
	}
}

function showPasswordLogin() {
	let x = document.getElementById("password");
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
}

function validateForm(event) {
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
	var passwordError = document.getElementById("passwordValidation");
	var emailError = document.getElementById("emailValidation");

	if (validateEmail(email)) {
		emailError.style.display = "block";
		passwordError.style.display = "none";
	}
	if (email.trim() === "") {
		emailError.innerHTML = "Vul een email in";
		emailError.style.display = "block";
		passwordError.style.display = "none";
	}

	if (email.length > 1 && password.trim() === "") {
		emailError.style.display = "none";
		passwordError.innerHTML = "Vul een wachtwoord in";
		passwordError.style.display = "block";
	}
	if (email.trim() !== "" && password.trim() !== "" && validateEmail(email)) {
		emailError.style.display = "none";
		passwordError.style.display = "none";
		loginOnAPI(event, email, password);
	}

	async function loginOnAPI(event, email, password) {
		event.preventDefault();

		try {
			const loginResult = await fetch(`${config.apiURL}/api/login`, {
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
			const userId = jsonResult.data.UserId;
			window.sessionStorage.setItem("userID", userId);

			if (jsonResult.data.SessionToken || jsonResult.data.Permissions) {
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

			var passwordError = document.getElementById("passwordValidation");
			passwordError.innerHTML = "Combinatie van email en wachtwoord is incorrect";
			passwordError.style.display = "block";
		}
	}

	function createSessionAndPermission(token, permissions) {
		window.sessionStorage.setItem("jwtToken", token);
		window.sessionStorage.setItem("permissions", permissions);
		const firstRole = permissions.split("!")[0];
		switch (firstRole) {
			case "Hulpverlener":
				window.location.href = "./ActiveProjects.html";
				break;
			case "Coordinator":
				window.location.href = "./AcceptedProjectOverview.html";
				break;
			case "Ledenadministratie":
				window.location.href = "./createCursus.html";
				break;
			default:
				window.location.href = "./index.html";
				alert("Permissions are incorrect");
		}
	}
}
