function verifyInputs(event) {
    event.preventDefault();
    let issues = 0
    let issueMessage = 'Sommige velden zijn ongeldig ingevuld: ';
    // Check Email
    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if(emailPattern.test(document.getElementById('email').value)) {
        // Valid input
    } else {
        issues += 1;
        issueMessage += 'Email';
    }

    // Check invoiceEmail
    if(document.getElementById('invoiceEmail').value) {
        if(emailPattern.test(document.getElementById('invoiceEmail').value)) {
            // Valid input
        } else {
            issues += 1;
            if(issues > 1) {
                issueMessage += ', ';
            }
            issueMessage += 'Factuur Email';
        }
    }

    // Check postalcode
    const postalcodePattern = /[0-9{4,4}]+[a-zA-Z{2,2}]/;
    if(postalcodePattern.test(document.getElementById('postalCode').value)) {
        // Valid input
    } else {
        issues += 1;
        if(issues > 1) {
            issueMessage += ', ';
        }
        issueMessage += 'Postcode'
    }

    // Check Birthday
    const date = new Date();
    const today = date.toISOString().split('T')[0];
    if(document.getElementById('dateOfBirth').value < today) {
        // Valid input
    } else {
        issues += 1;
        if(issues > 1) {
            issueMessage += ', ';
        }
        issueMessage += 'Geboorte datum moet voor vandaag zijn';
    }

    // Check phonenumber
    const phoneNumberPattern = /^(?:\+31[ -]?)?(06|6)[ -]?[1-9][0-9]{7}$/;

    if(phoneNumberPattern.test(document.getElementById('phoneNumber').value)) {

    } else {
    }

    const landlinePattern = /^(?:\+31[ -]?)?[0-9]{2}[ -][0-9]{3} [0-9]{2} [0-9]{2}$/;

    if(document.getElementById('landLine').value) {
        if(landlinePattern.test(document.getElementById('landLine').value)) {
            // Valid input
        } else {
            if(issues > 1) {
                issueMessage += ', ';
            }
            issueMessage += 'huistelefoon/vaste telefoon nummer'
        }
    }

    if(issues > 0) {
        alert(issueMessage)
    } else {
        sendMail(event);
    }
}