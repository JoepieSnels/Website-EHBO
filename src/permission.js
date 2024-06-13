async function getPermission(requiredPermission) {

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

}

function alertNoAcces() {
	console.log('Not the right site permissions');
	alert('You have no access to this page, redirecting to login');
	window.location.href = './login.html';

}