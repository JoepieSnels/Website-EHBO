function verifyInputs(event){
    event.preventDefault()
    const validators = [validateRequestEmail, validateRequestPostalCode, validateRequestHouseNumber, validateRequestDateOfBirth, validateRequestPhoneNumber, validateRequestLandLineNumber, validateRequestBillingAddress]
    const error = validateFields(validators);
    if(error){
        alert(error)
    } else {
        sendMail(event);
    }  
    
}


function validateRequestEmail() {
    let email = document.getElementById('email').value.trim();
    return email ? validateEmail(email) : 'Email mist';
}

function validateRequestPostalCode() {
    let postalCode = document.getElementById('postalCode').value;
    return postalCode ? validatePostalCode(postalCode) : 'Postcode mist'
}

function validateRequesteHouseNumber() {
    let houseNumber = document.getElementById('houseNumber').value;
    return houseNumber ? validateHouseNumber(houseNumber) : 'Huisnummer mist'
}

function validateRequestDateOfBirth() {
    let dateOfBirth = document.getElementById('dateOfBirth').value;
    return dateOfBirth ? validateDateOfBirth(dateOfBirth) : 'Geboortedatum mist'
}

function validateRequestPhoneNumber() {
    let mobilePhone = document.getElementById('phoneNumber').value;
    return mobilePhone ? validatePhoneNumber(mobilePhone) : 'Mobiel nummer mist'
}

function validateRequestLandLineNumber() {
    let landLine = document.getElementById('homePhone').value;
    return landLine ? validateLandlineNumber(landLine) : true;
}
// function verifyInputs(event, origin) {
//     event.preventDefault();

//     if(origin === 2) {
//         document.getElementById('email').value = document.getElementById('email2').value;
//         document.getElementById('firstName').value = document.getElementById('firstName2').value;
//         document.getElementById('lastName').value = document.getElementById('lastName2').value;
//         document.getElementById('phoneNumber').value = document.getElementById('phoneNumber2').value;
//         document.getElementById('landLine').value = document.getElementById('landLine2').value;
//         document.getElementById('dateOfBirth').value = document.getElementById('dateOfBirth2').value;
//         document.getElementById('gender').value = document.getElementById('gender2').value;
//         document.getElementById('city').value = document.getElementById('city2').value;
//         document.getElementById('postalCode').value = document.getElementById('postalCode2').value;
//         document.getElementById('street').value = document.getElementById('street2').value;
//         document.getElementById('houseNumber').value = document.getElementById('houseNumber2').value;
//         document.getElementById('invoiceEmail').value = document.getElementById('invoiceEmail2').value;
//         document.getElementById('invoiceAdres').value = document.getElementById('invoiceAdres2').value;
//         document.getElementById('invoiceStreet').value = document.getElementById('invoiceStreet2').value;
//         document.getElementById('invoiceNumber').value = document.getElementById('invoiceNumber2').value;
//     }

//     let issues = 0
//     let issueMessage = 'Sommige velden zijn ongeldig ingevuld: ';

//     // Check Email
//     const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//     if(!emailPattern.test(document.getElementById('email').value.trim())) {
//         issues += 1;
//         issueMessage += 'Email';
//     }

//     // Check invoiceEmail
//     if(document.getElementById('invoiceEmail').value) {
//         if(!emailPattern.test(document.getElementById('invoiceEmail').value.trim())) {
//             issues += 1;
//             if(issues > 1) {
//                 issueMessage += ', ';
//             }
//             issueMessage += 'Factuur Email';
//         }
//     }

//     // Check postalcode
//     const postalcodePattern = /^[0-9]{4} ?[a-zA-Z]{2}$/;
//     if(!postalcodePattern.test(document.getElementById('postalCode').value.trim())) {
//         issues += 1;
//         if(issues > 1) {
//             issueMessage += ', ';
//         }
//         issueMessage += 'Postcode';
//     }

//     // Check House number
//     const houseNumberPattern = /^[0-9]{1,5} ?[a-zA-Z]?$/;
//     if(!houseNumberPattern.test(document.getElementById('houseNumber').value.trim())) {
//         issues += 1;
//         if(issues > 1) {
//             issueMessage += ', ';
//         }
//         issueMessage += 'Huisnummer'
//     }

//     // Check Birthday
//     const date = new Date();
//     const twelvePlus = date.setFullYear(date.getFullYear() - 12);
//     const olderThanTwelve = new Date(twelvePlus).toISOString().split('T')[0];
//     const centuryInMilliseconds = date.setFullYear(date.getFullYear() - 101);
//     const centuryAgo = new Date(centuryInMilliseconds).toISOString().split('T')[0];
    
//     if(!(document.getElementById('dateOfBirth').value < olderThanTwelve && !(document.getElementById('dateOfBirth').value < centuryAgo))) {
//         issues += 1;
//         if(issues > 1) {
//             issueMessage += ', ';
//         }
//         issueMessage += `Geboorte datum moet voor ${olderThanTwelve} zijn na ${centuryAgo}`;
//     }

//     // Check phonenumber
//     const phoneNumberPattern = /^(?:\+31[ -]?)?(06|6)[ -]?[1-9][0-9]{7}$/;

//     if(!phoneNumberPattern.test(document.getElementById('phoneNumber').value.trim())) {
//         issues += 1;
//         if(issues > 1) {
//             issueMessage += ', ';
//         }
//         issueMessage += 'Mobiel telefoon nummer';
//     }

//     // Check landline number
//     const landlinePattern = /^(?:\+31[ -]?)?(0[0-9]{2}|[0-9]{2})[ -]?[0-9]{3} ?[0-9]{2} ?[0-9]{2}$/;
//     if(document.getElementById('landLine').value) {
//         if(!landlinePattern.test(document.getElementById('landLine').value.trim())) {
//             issues += 1;
//             if(issues > 1) {
//                 issueMessage += ', ';
//             }
//             issueMessage += 'Huis/Vaste telefoon nummer';   
//         }
//     }

//     // Check invoice house number
//     if(document.getElementById('invoiceNumber').value.trim()) {
//         if(!houseNumberPattern.test(document.getElementById('invoiceNumber').value.trim())) {
//             issues += 1;
//             if(issues > 1) {
//                 issueMessage += ', ';
//             }
//             issueMessage += 'Factuur huisnummer';
//         }
//     }

//     // Check if all fields of the invoice are filled in IF one of them is filled in
//     if(!document.getElementById('invoiceAdres').value.trim() || !document.getElementById('invoiceStreet').value.trim() || !document.getElementById('invoiceNumber').value.trim()) {
//         if(!document.getElementById('invoiceAdres').value && !document.getElementById('invoiceStreet').value && !document.getElementById('invoiceNumber').value) {

//         } else {
//             issues += 1;
//             if(issues > 1) {
//                 issueMessage += ', ';
//             }
//             issueMessage += 'Bij factuuradres, straat en nummer moeten allemaal zijn ingevuld OF leeg zijn'
//         }
//     }

//     if(issues > 0) {
//         alert(issueMessage)
//     } else {
//         sendMail(event);
//     }
// }

// function showPassword() {
// 	var x = document.getElementById("password");
// 	if (x.type === "password") {
// 		x.type = "text";
// 	} else {
// 		x.type = "password";
// 	}
// }

// function showControlePassword() {
// 	var x = document.getElementById("controlePassword");
// 	if (x.type === "password") {
// 		x.type = "text";
// 	} else {
// 		x.type = "password";
// 	}
// }
