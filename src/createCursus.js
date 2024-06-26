async function loadCreateCursus(requiredPermission) {
    const jwtToken = window.sessionStorage.getItem("jwtToken");
    if (getPermission(requiredPermission)){
        try {

            const apiRoute = `${config.apiURL}/api/getCertificates`;
            const validateResult = await fetch(apiRoute, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    Authorization: `Bearer ${jwtToken}`,
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
}



async function createCursus() {

    const titleElement = document.getElementById('cursus-title');
    const descriptionElement = document.getElementById('cursus-description');
    const locationElement = document.getElementById('cursus-location');
    const datetimeElement = document.getElementById('cursus-datetime');
    const certificateElement = document.getElementById('cursus-certificate');
    const costElement = document.getElementById('cursus-cost');

    const validationResult = validateFieldValues(titleElement.value.trim(), descriptionElement.value.trim(), locationElement.value.trim(), 
                                    datetimeElement.value.trim(), certificateElement.value.trim(), costElement.value.trim());

    if (validationResult === 1) {
        console.log('De velden zijn correct ingevuld. Cursus wordt aangemaakt...');

        try {

            const projectResult = await fetch(`${config.apiURL}/api/addCourse`, {
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
                location: locationElement.value.trim(),
                certificatieTitle: certificateElement.value.trim() 
			}),
		});

		const projectData = await projectResult.json();
            
        } catch (error) {
            alert('Er is iets fout gegaan, probeer het later opnieuw, onze excusses...');
            return;
        }

        titleElement.value = '';
        descriptionElement.value = '';
        locationElement.value = '';
        datetimeElement.value = '';
        certificateElement.value = '';

        alert('Er is een nieuwe cursus aangemaakt!');
    } else {

        document.getElementById('p-errormessage').innerText = validationResult;
        return;
    }

}


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
        const dateTimeSplit = datetime.split('T');
	    
        const currentDate = new Date();
	    const minDate = new Date();
	    minDate.setDate(currentDate.getDate() + 3);
	    if (!(new Date(dateTimeSplit[0]) > minDate)) {
            return `De opgegeven datum is niet minstens 3 dagen vanaf vandaag, vul dit alstublief opnieuw in en probeer het dan opnieuw!`
        }
    }

    if (certificate === '') {
        return 'Er is geen certificaat opgegeven, geef alstublief een certificaat op';
    }


    if (cost === '') {
        return 'Er is geen of een foutief bedrag voor de kosten opgegeven, geef alstublief een bedrag voor de kosten op';
    } else if (cost.startsWith('-')) {
        return 'U kunt geen negatief bedrag opgeven!';
        
    } 
    

    return 1;
}