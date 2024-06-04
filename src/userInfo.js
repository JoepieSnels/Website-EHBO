async function onLoadUserInfo(requiredPermission) {
	console.log('On page load');

	// HARDCODDED, WEGHALEN ZODRA LOGIN WERKT
	createSessionAndPermission('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTcxNzUwNjQ2MCwiZXhwIjoxNzE4NTQzMjYwfQ.YrckiyoGuslcp_5oiBpT6fAe8lUfQAadTwOh1HmR9ow', 'Hulpverlener!Coordinator');
	
	const jwtToken = window.sessionStorage.getItem('jwtToken'); // Haalt de token op uit de session
	const permissions = window.sessionStorage.getItem('permissions'); // Haalt de permissies op

	// Kijkt of de token een waarde heeft, zo nee is het null en stuurt hij de gebruiker naar de login page
	if (jwtToken === null) { 
		alertNoAcces();
		return;
	}

	// Kijk of in de string van permissies de benodigde permissie zit
	if (permissions === null || !permissions.match(requiredPermission)) {
		alertNoAcces();
		return;

 	} 

	// Maak verzoek naar de server om te kijken of de token geldig is
	const apiRoute = 'https://api-ehbo.onrender.com/api/validatetoken';
	const validateResult = await fetch(apiRoute, {
			headers: {
                'Content-Type': 'application/json; charset=UTF-8',
				'Authorization': `bearer ${jwtToken}`
            }
		});

	const toJson = await validateResult.json();

	if (toJson.message === 'Not authorized') {
		alertNoAcces();
		return;
	}

	document.getElementById('unBlockID').style.display = 'block'; // Even controleren welke dit moet zijn

	// HET STUK HIER NA IS ANDERS PER PAGINA
	loadInfo(jwtToken);

}

async function loadInfo(jwtToken) {
	const apiRoute = 'https://api-ehbo.onrender.com/api/member'
	const validateResult = await fetch(apiRoute, {
			headers: {
                'Content-Type': 'application/json; charset=UTF-8',
				'Authorization': `bearer ${jwtToken}`
            }
		});


	// To do validate Result
	const toJson = await validateResult.json();
	const data = toJson.data;

	const cleanBirthdate = data.DateOfBirth.split('T');

	const rolesArray = data.Role.split('!');
	let cleanRoles = '';
	for (let i = 0; i < rolesArray.length; i++) {
		if (i === rolesArray.length - 1) {
			cleanRoles +=  rolesArray[i] + '.';
		} else {
			cleanRoles +=  rolesArray[i] + ', ';
		}
	}



	document.getElementById('firstname').innerHTML = data.FirstName;
	document.getElementById('lastname').innerHTML = data.LastName;
	document.getElementById('emailaddress').innerHTML = data.Emailaddress;
	document.getElementById('phone').innerHTML = data.PhoneNumber;
	document.getElementById('sex').innerHTML = transgender(data.Gender);	
	document.getElementById('birthdate').innerHTML = cleanBirthdate[0];
	document.getElementById('street').innerHTML = data.Street;
	document.getElementById('houseNumber').innerHTML = data.HouseNr;
	document.getElementById('zipCode').innerHTML = data.PostCode;
	document.getElementById('city').innerHTML = data.City;
	document.getElementById('roles').innerHTML = cleanRoles;

	if (data.InvoiceEmail) {
		document.getElementById('facEmail').innerHTML = data.InvoiceEmail;
	}

	if (data.InvoiceCity) {
		document.getElementById('facStad').innerHTML = data.InvoiceCity;
		document.getElementById('facHuisNr').innerHTML = data.HouseNr;
		document.getElementById('facStraat').innerHTML = data.Street;
	}

}

function alertNoAcces() {
	console.log('Not the right site permissions');
	alert('You have no access to this page, redirecting to login');
	window.location.href = './login.html';

}

// TIJDELIJK -> REMOVE!!!
// Zo kan je een sessie aanmaken
function createSessionAndPermission(token, permissions) {
	window.sessionStorage.setItem('jwtToken', token);
	window.sessionStorage.setItem('permissions', permissions);

	
}
function transgender(deadGender) {
	if (deadGender === 'Male') {
		return 'Man';
	} else if (deadGender === 'Female') {
		return 'Vrouw';
	} else if (deadGender === 'Other') {
		return 'Anders';
	} else {
		return 'Zeg ik lieven niet';
	}
}