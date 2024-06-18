async function loadInfo(requiredPermission) {
	if (getPermission(requiredPermission)) {
		const jwtToken = window.sessionStorage.getItem("jwtToken"); 
		const apiRoute = `${config.apiURL}/api/member`;
		const validateResult = await fetch(apiRoute, {
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: `bearer ${jwtToken}`,
			},
		});

		const toJson = await validateResult.json();
		const data = toJson.data;

		const cleanBirthdate = data.DateOfBirth.split("T");

		const rolesArray = data.Role.split("!");
		let cleanRoles = "";
		for (let i = 0; i < rolesArray.length; i++) {
			if (i === rolesArray.length - 1) {
				cleanRoles += rolesArray[i];
			} else {
				cleanRoles += rolesArray[i] + ", ";
			}
		}

		document.getElementById("firstname").innerHTML = data.FirstName;
		document.getElementById("lastname").innerHTML = data.LastName;
		document.getElementById("emailaddress").innerHTML = data.Emailaddress;
		document.getElementById("phone").innerHTML = data.PhoneNumber;
		document.getElementById("sex").innerHTML = formatGender(data.Gender);
		document.getElementById("birthdate").innerHTML = cleanBirthdate[0];
		document.getElementById("street").innerHTML = data.Street;
		document.getElementById("houseNumber").innerHTML = data.HouseNr;
		document.getElementById("zipCode").innerHTML = data.PostCode;
		document.getElementById("city").innerHTML = data.City;
		document.getElementById("roles").innerHTML = cleanRoles;
		document.getElementById("certificaten").innerHTML = data.certification;

		if (data.InvoiceEmail) {
			document.getElementById("facEmail").innerHTML = data.InvoiceEmail;
		}

		if (data.InvoiceCity) {
			document.getElementById("facStad").innerHTML = data.InvoiceCity;
			document.getElementById("facHuisNr").innerHTML = data.HouseNr;
			document.getElementById("facStraat").innerHTML = data.Street;
		}
	}
	
	
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
