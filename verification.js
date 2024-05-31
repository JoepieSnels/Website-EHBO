function verifyInputs() {
    let issues = 0
    // Check Email
    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if(emailPattern.test(document.getElementById('email').value)) {
        // Do nothing, email is correct
    } else {
        issues += 1;
        alert('invalide email');
    }

    // Check invoiceEmail
    if(document.getElementById('invoiceEmail').value) {
        if(emailPattern.test(document.getElementById('invoiceEmail').value)) {
            // alert('Factuur email is goed');
        } else {
            issues += 1;
            alert('invalide factuur email');
            return;
        }
    }

    // Check postalcode
    const postalcodePattern = /[0-9{4,4}]+[a-zA-Z{2,2}]/;
    if(postalcodePattern.test(document.getElementById('postalCode').value)) {
        // alert('GOED');
    } else {
        issues += 1;
        alert('invalide postcode');
        return;
    }

    // Check Birthday
    const date = new Date();
    const today = date.toISOString().split('T')[0];
    if(document.getElementById('dateOfBirth').value < today) {
        alert('Je geboortedag is voor vandaag');
    } else {
        issue += 1;
        alert('Je geboortedag is vandaag of in de toekomst, wat?');
        return;
    }

    // Check phonenumber
    const phoneNumberPattern = /^(?:\+31[ -]?)?(06|6)[ -]?[1-9][0-9]{7}$/;

    if(phoneNumberPattern.test(document.getElementById('phoneNumber').value)) {
        alert('geldig telefoon nummer')
        return;
    } else {
        alert('ongeldig telefoon nummer')
    }

    const landlinePattern = /^(?:\+31[ -]?)?[0-9]{2}[ -][0-9]{3} [0-9]{2} [0-9]{2}$/;

    if(document.getElementById('landLine').value) {
        if(landlinePattern.test(document.getElementById('landLine').value)) {
            alert('geldig huistelefoon nummer');
        } else {
            alert('ongeldig huistelefoon nummer');
        }
    }
}