
function validateFields(event, activateAlert, validateEmail, validateBillingEmail, validatePassword, validatePostalCode, validateBillingPostalCode, validateHouseNumber, validateBillingHouseNumber, validateDateOfBirth, validateMobilePhone, validateHomePhone, validateBillingAddress) {
    event.preventDefault();
    activateAlert(validateEmail, validateBillingEmail, validatePassword, validatePostalCode, validateBillingPostalCode, validateHouseNumber, validateBillingHouseNumber, validateDateOfBirth, validateMobilePhone, validateHomePhone, validateBillingAddress)
}

function activateAlert(validateEmail, validateBillingEmail, validatePassword, validatePostalCode, validateBillingPostalCode, validateHouseNumber, validateBillingHouseNumber, validateDateOfBirth, validateMobilePhone, validateHomePhone, validateBillingAddress) {
    let issues = 0;
    let alertString = 'Er zijn één of meerdere velden verkeerd ingevuld: ';

    let methodArray = [validateEmail(), validateBillingEmail(), validatePassword(), validatePostalCode(), validateBillingPostalCode(), validateHouseNumber(), validateBillingHouseNumber(), validateDateOfBirth(), validateMobilePhone(), validateHomePhone(), validateBillingAddress()]

    if (methodArray.some(isTrue)) {
        for(let i = 0; i < methodArray.length; i++) {
            if (methodArray[i] && issues > 0) {
                issues++
                alertString += (', ' + methodArray[i])
            } else if (methodArray[i]) {
                alertString += methodArray[i]
                issues++
            }
        }
        alert(alertString)
    };
}

const isTrue = (element) => {
    if (element) {
        return true
    }
}

function validatePassword() {
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S{8,}$/;

    let newPassword = document.getElementById('newPassword').value;
    let currentPassword = document.getElementById('currentPassword').value;

    if (!(pattern.test(newPassword)) || newPassword === currentPassword) {
        document.getElementById('newPassword').value = '';
        return 'wachtwoord'
    }
}

function validateEmail() {
    let pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    let input = document.getElementById('email').value.trim();

    if (!(pattern.test(input))) {
        document.getElementById('email').value = '';
        return 'email'
    }
}

function validateBillingEmail() {
    let pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    let input = document.getElementById('billingEmail').value.trim();

    if (input) {
        if (!(pattern.test(input))) {
            document.getElementById('billingEmail').value = '';
            return 'factuur-email'
        }
    }
}

function validatePostalCode() {
    const pattern = /^[0-9]{4} ?[a-zA-Z]{2}$/;

    let input = document.getElementById('postalCode').value.trim();

    if(!(pattern.test(input))) {
        document.getElementById('postalCode').value = '';
        return 'postcode'
    }
}

function validateBillingPostalCode() {
    const pattern = /^[0-9]{4} ?[a-zA-Z]{2}$/;

    let input = document.getElementById('billingPostalCode').value.trim();

    if (input) {
        if(!(pattern.test(input))) {
            document.getElementById('billingPostalCode').value = '';
            return 'factuur-postcode'
        }
    }
}

function validateHouseNumber() {
    const pattern =/^[0-9]{1,5} ?[a-zA-Z]?$/;

    let input = document.getElementById('houseNumber').value.trim();

    if(!pattern.test(input)) {
        document.getElementById('houseNumber').value = '';
        return 'huisnummer'
    }
}

function validateBillingHouseNumber() {
    const pattern =/^[0-9]{1,5} ?[a-zA-Z]?$/;

    let input = document.getElementById('billingHouseNumber').value.trim();

    if (input) {
        if(!pattern.test(input)) {
            document.getElementById('billingHouseNumber').value = '';
            return 'factuur-huisnummer'
        }
    }
}

function validateDateOfBirth() {
    const date = new Date();
    const today = date.toISOString().split('T')[0];
    let input = document.getElementById('dateOfBirth').value;

    if(!(input < today) || !input) {
        document.getElementById('dateOfBirth').value = '';
        return 'geboortedatum'
    }
}

function validateMobilePhone() {
    const pattern = /^(?:\+31[ -]?)?(06|6)[ -]?[1-9][0-9]{7}$/;

    let input = document.getElementById('mobilePhone').value.trim();

    if (!pattern.test(input)) {
        document.getElementById('mobilePhone').value = '';
        return 'mobiel telefoonnummer'
    }
}

function validateHomePhone() {
    const pattern = /^(?:\+31[ -]?)?(0[0-9]{2}|[0-9]{2})[ -]?[0-9]{3} ?[0-9]{2} ?[0-9]{2}$/;

    let input = document.getElementById('homePhone').value.trim();

    if (!pattern.test(input)) {
        document.getElementById('homePhone').value = '';
        return 'vast telefoonnummer'
    }
}

function validateBillingAddress() {
    if (!document.getElementById('billingStreet').value.trim() || !document.getElementById('billingCity').value.trim() || !document.getElementById('billingHouseNumber').value.trim() || !document.getElementById('billingPostalCode').value.trim()) {
        if (!document.getElementById('billingStreet').value.trim() && !document.getElementById('billingCity').value.trim() && !document.getElementById('billingHouseNumber').value.trim() && !document.getElementById('billingPostalCode').value.trim()) {
        } else {
            return 'bij factuurgegevens moeten postcode, huisnummer, straat en woonplaats allemaal ingevuld zijn OF allemaal leeg zijn.'
        }
    }
}

function showPassword(id) {
    let x = document.getElementById(id);
    if (x.type === 'password') {
        x.type = 'text'
    } else {
        x.type = 'password'
    }
}