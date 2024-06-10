



async function createCursus() {
    console.clear();
    console.log('Started the create process');

    const titleElement = document.getElementById('cursus-title');
    const descriptionElement = document.getElementById('cursus-description');
    const locationElement = document.getElementById('cursus-location');
    const datetimeElement = document.getElementById('cursus-datetime');
    const certificateElement = document.getElementById('cursus-certificate');

    const validationResult = validateFieldValues(titleElement.value.trim(), descriptionElement.value.trim(), locationElement.value.trim(), datetimeElement.value.trim(), certificateElement.value.trim());

    if (validationResult === 1) {
        // The fields are correct, make the API call
        console.log('De velden zijn correct ingevuld. Cursus wordt aangemaakt...');

        // TODO: Roep de API aan en controleer het resultaat

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
function validateFieldValues(title, description, location, datetime, certificate) {
    
    if (title === '') {
        return 'Er is geen titel opgegeven, geef alstublieft een titel op';
    }
    
    if (description === '') {
        return 'Er is geen beschrijving opgegeven, geef alstublieft een beschrijving op';
    }

    if (location === '') {
        return 'Er is geen locatie opgegeven, geef alstublieft een locatie op';
    }

    if (datetime === '') {
        return 'Er is geen datum en tijd opgegeven, geef alstublief een datum en tijd op';
    }

    if (certificate === '') {
        return 'Er is geen certificaat opgegeven, geef alstublief een certificaat op';
    }
    
    
    // Alles is correct!
    return 1;
}