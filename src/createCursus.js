
async function loadCreateCursus(requiredPermission) {
    console.log('On page load');

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

    // Load certificates

    try {

        const apiRoute = 'https://api-ehbo.onrender.com/api/getCertificates';
	    const validateResult = await fetch(apiRoute, {
			headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
		});

	    const toJson = await validateResult.json();
        const arrayCertificates = toJson.data;

        let netteString = '';

        arrayCertificates.forEach(element => {
            netteString += `<option>${element.Title}</option>`
        });

        document.getElementById('cursus-certificate').innerHTML += netteString;
        
    } catch (error) {
        
    }

    
}

function alertNoAcces() {
	console.log('Not the right site permissions');
	alert('You have no access to this page, redirecting to login');
	window.location.href = './login.html';

}


async function createCursus() {
    console.clear();
    console.log('Started the create process');

    const titleElement = document.getElementById('cursus-title');
    const descriptionElement = document.getElementById('cursus-description');
    const locationElement = document.getElementById('cursus-location');
    const datetimeElement = document.getElementById('cursus-datetime');
    const certificateElement = document.getElementById('cursus-certificate');
    const participantsElement = document.getElementById('cursus-deelnemers');
    const costElement = document.getElementById('cursus-cost');

    const validationResult = validateFieldValues(titleElement.value.trim(), descriptionElement.value.trim(), locationElement.value.trim(), 
                                    datetimeElement.value.trim(), certificateElement.value.trim(), participantsElement.value.trim(), costElement.value.trim());

    if (validationResult === 1) {
        // The fields are correct, make the API call
        console.log('De velden zijn correct ingevuld. Cursus wordt aangemaakt...');

        // Roep de API aan en controleer het resultaat
        try {

            const projectResult = await fetch("https://api-ehbo.onrender.com/api/addCourse", {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
                'Authorization': `bearer ${window.sessionStorage.getItem('jwtToken')}`

			},
			body: JSON.stringify({
                title: titleElement.value.trim(),
                description: descriptionElement.value.trim(),
                datetime: datetimeElement.value.trim(),
                cost: costElement.value.trim(),
                maxParticipants: participantsElement.value.trim(),
                location: locationElement.value.trim(),
                certificatieTitle: certificateElement.value.trim() 
			}),
		});

		const projectData = await projectResult.json();

		console.log(projectData);
            
        } catch (error) {
            console.error('Error: \n' + error);
            alert('Er is iets fout gegaan, probeer het later opnieuw, onze excusses...');
            return;
        }

        // Fields will reset when the API cal has been succesfull
        titleElement.value = '';
        descriptionElement.value = '';
        locationElement.value = '';
        datetimeElement.value = '';
        certificateElement.value = '';

        alert('Er is een nieuwe cursus aangemaakt!');
    } else {
        // Fields are not correct
        console.log('Een aantal velden zijn niet goed ingevuld')
        document.getElementById('p-errormessage').innerText = validationResult;
        return;
    }

}


/**
 * Deze functie controleerd of de waardes correct genoeg zijn. Zoja returnt het 1, anders returnt het een error message...
 * @param {string} title 
 * @param {string} description 
 * @param {string} location 
 * @param {datetime} datetime 
 * @param {string} certificate 
 */
function validateFieldValues(title, description, location, datetime, certificate, deelnemers, cost) {
    
    if (title === '') {
        return 'Er is geen titel opgegeven, geef alstublieft een titel op';
    }
    
    if (description === '') {
        return 'Er is geen beschrijving opgegeven, geef alstublieft een beschrijving op';
    } else if (description.length > 320) {
        return 'De beschrijving die u door heeft gegeven is te lang, probeer het opnieuw met een kortere beschrijving!';
    }

    if (location === '') {
        return 'Er is geen locatie opgegeven, geef alstublieft een locatie op';
    } 

    if (datetime === '') {
        return 'Er is geen datum en tijd opgegeven, geef alstublief een datum en tijd op';
    } else {
        // Controleer of de datum tenmiste 3 dagen vanaf vandaag is
        const dateTimeSplit = datetime.split('T');
	    
        const currentDate = new Date();
	    const minDate = new Date();
	    minDate.setDate(currentDate.getDate() + 3);
	    if (!(new Date(dateTimeSplit[0]) > minDate)) {
            return `De opgegeven datum is niet minstens 3 dagen vanaf vandaag, vul dit alstublief opnieuw in en probeer het dan opnieuw!`
        } else { 
            console.log('PANIEEEK')
        }
    }

    if (certificate === '') {
        return 'Er is geen certificaat opgegeven, geef alstublief een certificaat op';
    }

    if (deelnemers === '') {
        return 'Er is geen maximaal aantal deelnemers opgegeven, geef alstublief een maximaal aantal deelnemers op';
    }

    if (cost === '') {
        return 'Er is geen of een foutief bedrag voor de kosten opgegeven, geef alstublief een bedrag voor de kosten op';
    } else if (cost.startsWith('-')) {
        return 'U kunt geen negatief bedrag opgeven!';
        
    } 
    
    
    // Alles is correct, dus return 1!
    return 1;
}