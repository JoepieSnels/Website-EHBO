function verifyInputs(event) {
    event.preventDefault();

    let issues = 0
    let issueMessage = 'Sommige velden zijn ongeldig ingevuld: ';

    // Check Email
    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if(!emailPattern.test(document.getElementById('email').value.trim())) {
        issues += 1;
        issueMessage += 'Email';
    }

    // Check invoiceEmail
    if(document.getElementById('billingEmail').value) {
        if(!emailPattern.test(document.getElementById('billingEmail').value.trim())) {
            issues += 1;
            if(issues > 1) {
                issueMessage += ', ';
            }
            issueMessage += 'Factuur Email';
        }
    }

    // Check postalcode
    const postalcodePattern = /^[0-9]{4} ?[a-zA-Z]{2}$/;
    if(!postalcodePattern.test(document.getElementById('postalCode').value.trim())) {
        issues += 1;
        if(issues > 1) {
            issueMessage += ', ';
        }
        issueMessage += 'Postcode';
    }

    // Check House number
    const houseNumberPattern = /^[0-9]{1,5} ?[a-zA-Z]?$/;
    if(!houseNumberPattern.test(document.getElementById('houseNumber').value.trim())) {
        issues += 1;
        if(issues > 1) {
            issueMessage += ', ';
        }
        issueMessage += 'Huisnummer'
    }

    // Check Birthday
    const date = new Date();
    const twelvePlus = date.setFullYear(date.getFullYear() - 12);
    const olderThanTwelve = new Date(twelvePlus).toISOString().split('T')[0];
    const centuryInMilliseconds = date.setFullYear(date.getFullYear() - 88);
    const centuryAgo = new Date(centuryInMilliseconds).toISOString().split('T')[0];
    
    if(!(document.getElementById('dateOfBirth').value < olderThanTwelve && !(document.getElementById('dateOfBirth').value < centuryAgo))) {
        issues += 1;
        if(issues > 1) {
            issueMessage += ', ';
        }
        issueMessage += `Geboorte datum moet voor ${olderThanTwelve} zijn na ${centuryAgo}`;
    }

    // Check phonenumber
    const phoneNumberPattern = /^(?:\+31[ -]?)?(06|6)[ -]?[1-9][0-9]{7}$/;

    if(!phoneNumberPattern.test(document.getElementById('phoneNumber').value.trim())) {
        issues += 1;
        if(issues > 1) {
            issueMessage += ', ';
        }
        issueMessage += 'Mobiel telefoon nummer';
    }

    // Check landline number
    const landlinePattern = /^(?:\+31[ -]?)?(0[0-9]{2}|[0-9]{2})[ -]?[0-9]{3} ?[0-9]{2} ?[0-9]{2}$/;
    if(document.getElementById('homePhone').value) {
        if(!landlinePattern.test(document.getElementById('homePhone').value.trim())) {
            issues += 1;
            if(issues > 1) {
                issueMessage += ', ';
            }
            issueMessage += 'Huis/Vaste telefoon nummer';   
        }
    }

    // Check billingHouseNumber
    if(document.getElementById('billingHouseNumber').value.trim()) {
        if(!houseNumberPattern.test(document.getElementById('billingHouseNumber').value.trim())) {
            issues += 1;
            if(issues > 1) {
                issueMessage += ', ';
            }
            issueMessage += 'Factuur huisnummer';
        }
    }

    // Check if all fields of the invoice are filled in IF one of them is filled in
    if(!document.getElementById('billingStreet').value.trim() || !document.getElementById('billingHouseNumber').value.trim() || !document.getElementById('billingCity').value.trim()) {
        if(!document.getElementById('billingStreet').value && !document.getElementById('billingHouseNumber').value && !document.getElementById('billingCity').value) {

        } else {
            issues += 1;
            if(issues > 1) {
                issueMessage += ', ';
            }
            issueMessage += 'Bij factuuradres, straat en nummer moeten allemaal zijn ingevuld OF leeg zijn'
        }
    }

    if(issues > 0) {
        alert(issueMessage)
    } else {
        sendMail(event);
    }
}
