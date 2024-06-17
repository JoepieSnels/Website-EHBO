function submitUpdateForm(){
    event.preventDefault()
    const validators = [validateUpdateEmail, validateUpdatePassword, validateNewPassword, validateUpdatePostalCode, validateUpdateHouseNumber, validateUpdateDateOfBirth, validateUpdatePhoneNumber, validateUpdateLandLineNumber, validateBillingAddress]
    const error = validateFields(validators);
    if(error){
        alert(error)
    } else {
        updateMemberOnAPI();
    }  
    
}


function validateUpdateEmail() {
    let email = document.getElementById('email').value.trim();
    return email ? validateEmail(email) : 'Email mist';


}
//check of input leeg is
function validateUpdatePassword() {
    let currentPassword = document.getElementById('currentPassword').value;
    return currentPassword ? true : 'Huidig wachtwoord mist'
}

//check of wachtwoord leeg is, en of het pattroon klopt
function validateNewPassword() {
    let newPassword = document.getElementById('newPassword').value;
    return newPassword ? validatePassword(newPassword) : true;
}

function validateUpdatePostalCode() {
    let postalCode = document.getElementById('postalCode').value;
    return postalCode ? validatePostalCode(postalCode) : 'Postcode mist'
}

function validateUpdateHouseNumber() {
    let houseNumber = document.getElementById('houseNumber').value;
    return houseNumber ? validateHouseNumber(houseNumber) : 'Huisnummer mist'

}

function validateUpdateDateOfBirth() {
    let dateOfBirth = document.getElementById('dateOfBirth').value;
    return dateOfBirth ? validateDateOfBirth(dateOfBirth) : 'Geboortedatum mist'
}

function validateUpdatePhoneNumber() {
    let mobilePhone = document.getElementById('mobilePhone').value;
    return mobilePhone ? validatePhoneNumber(mobilePhone) : 'Mobiel nummer mist'
}

function validateUpdateLandLineNumber() {
    let landLine = document.getElementById('homePhone').value;
    return landLine ? validateLandlineNumber(landLine) : true;
}

// function validateFields(event, activateAlert, validateEmail, validateBillingEmail, validatePassword, validateNewPassword, validatePostalCode, validateHouseNumber, validateBillingHouseNumber, validateDateOfBirth, validateMobilePhone, validateHomePhone, validateBillingAddress) {
//     event.preventDefault();
//     activateAlert(validateEmail(), validateBillingEmail(), validatePassword(), validateNewPassword(), validatePostalCode(), validateHouseNumber(), validateBillingHouseNumber(), validateDateOfBirth(), validateMobilePhone(), validateHomePhone(), validateBillingAddress())
// }

// function activateAlert(validateEmail, validateBillingEmail, validatePassword, validateNewPassword, validatePostalCode, validateHouseNumber, validateBillingHouseNumber, validateDateOfBirth, validateMobilePhone, validateHomePhone, validateBillingAddress) {
//     let issues = 0;
//     let alertString = 'Er zijn één of meerdere velden verkeerd ingevuld: ';

//     let methodArray = [validateEmail(), validateBillingEmail(), validatePassword(), validateNewPassword(), validatePostalCode(), validateHouseNumber(), validateBillingHouseNumber(), validateDateOfBirth(), validateMobilePhone(), validateHomePhone(), validateBillingAddress()]

//     if (methodArray.some(isTrue)) {
//         for(let i = 0; i < methodArray.length; i++) {
//             if (methodArray[i] && issues > 0) {
//                 issues++
//                 alertString += (', ' + methodArray[i])
//             } else if (methodArray[i]) {
//                 alertString += methodArray[i]
//                 issues++
//             }
//         }
//         alert(alertString)
//     };
// }

// const isTrue = (element) => {
//     if (element) {
//         return true
//     }
// }




// function validateEmail() {
//     let pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

//     let input = document.getElementById('email').value.trim();

//     if (!(pattern.test(input))) {
//         document.getElementById('email').value = '';
//         return 'email'
//     }
// }

// function validateBillingEmail() {
//     let pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

//     let input = document.getElementById('billingEmail').value.trim();

//     if (input) {
//         if (!(pattern.test(input))) {
//             document.getElementById('billingEmail').value = '';
//             return 'factuur-email'
//         }
//     }
// }

// function validatePostalCode() {
//     const pattern = /^[0-9]{4} ?[a-zA-Z]{2}$/;

//     let input = document.getElementById('postalCode').value.trim();

//     if(!(pattern.test(input))) {
//         document.getElementById('postalCode').value = '';
//         return 'postcode'
//     }
// }

// function validateBillingPostalCode() {
//     const pattern = /^[0-9]{4} ?[a-zA-Z]{2}$/;
//
//     let input = document.getElementById('billingPostalCode').value.trim();
//
//     if (input) {
//         if(!(pattern.test(input))) {
//             document.getElementById('billingPostalCode').value = '';
//             return 'factuur-postcode'
//         }
//     }
// }

// function validateHouseNumber() {
//     const pattern =/^[0-9]{1,5} ?[a-zA-Z]?$/;

//     let input = document.getElementById('houseNumber').value.trim();

//     if(!pattern.test(input)) {
//         document.getElementById('houseNumber').value = '';
//         return 'huisnummer'
//     }
// }

// function validateBillingHouseNumber() {
//     const pattern =/^[0-9]{1,5} ?[a-zA-Z]?$/;

//     let input = document.getElementById('billingHouseNumber').value.trim();

//     if (input) {
//         if(!pattern.test(input)) {
//             document.getElementById('billingHouseNumber').value = '';
//             return 'factuur-huisnummer'
//         }
//     }
// }

// function validateDateOfBirth() {
//     const date = new Date();
//     const today = date.toISOString().split('T')[0];
//     let input = document.getElementById('dateOfBirth').value;

//     if(!(input < today) || !input) {
//         document.getElementById('dateOfBirth').value = '';
//         return 'geboortedatum'
//     }
// }

// function validateMobilePhone() {
//     const pattern = /^(?:\+31[ -]?)?(06|6)[ -]?[1-9][0-9]{7}$/;

//     let input = document.getElementById('mobilePhone').value.trim();

//     if (!pattern.test(input)) {
//         document.getElementById('mobilePhone').value = '';
//         return 'mobiel telefoonnummer'
//     }
// }

// function validateHomePhone() {
//     const pattern = /^(?:\+31[ -]?)?(0[0-9]{2}|[0-9]{2})[ -]?[0-9]{3} ?[0-9]{2} ?[0-9]{2}$/;

//     let input = document.getElementById('homePhone').value.trim();

//     if (input) {
//         if (!pattern.test(input)) {
//             document.getElementById('homePhone').value = '';
//             return 'vast telefoonnummer'
//         }
//     }
// }

function validateBillingAddress() {
    const billingStreet = document.getElementById('billingStreet').value.trim();
    const billingCity = document.getElementById('billingCity').value.trim();
    const billingHouseNumber = document.getElementById('billingHouseNumber').value.trim();
    if(billingStreet || billingCity || billingHouseNumber) {
        if(!billingStreet || !billingCity || !billingHouseNumber) {
            return 'Alle factuur adres gegevens moeten ingevuld worden'
        }
        
    }
    return true;
}

function showPassword(id) {
    let x = document.getElementById(id);
    if (x.type === 'password') {
        x.type = 'text'
    } else {
        x.type = 'password'
    }
}


function formatDate(date) {
    if (!date) return ""; // Handle null or undefined date values

    const d = new Date(date);
    if (isNaN(d.getTime())) return ""; // Handle invalid date values

    return d.toISOString().split("T")[0];
}


// Extract values from input elements

async function updateMemberOnAPI() {

    let data = [document.getElementById("firstname").value, document.getElementById("lastname").value, document.getElementById("mobilePhone").value, document.getElementById("homePhone").value, document.getElementById("email").value, document.getElementById("dateOfBirth").value, document.getElementById("gender").value, document.getElementById("street").value, document.getElementById("houseNumber").value, document.getElementById("postalCode").value, document.getElementById("city").value, document.getElementById("billingStreet").value, document.getElementById("billingHouseNumber").value, document.getElementById("billingCity").value, document.getElementById("billingEmail").value, document.getElementById("currentPassword").value, document.getElementById("newPassword").value];
    const jwtToken = window.sessionStorage.getItem('jwtToken'); // Haalt de token op uit de session
    // const userId = loadInfo(jwtToken)
    event.preventDefault();
    try {
        data[5] = formatDate(data[5]); // Format date to "YYYY-MM-DD" format

        const projectResult = await fetch("https://api-ehbo.onrender.com/api/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": `bearer ${jwtToken}`

            },
            body: JSON.stringify({
                firstName: data[0],
                lastName: data[1],
                phoneNumber: data[2],
                landLine: data[3],
                emailaddress: data[4],
                dateOfBirth: data[5],
                gender: data[6],
                street: data[7],
                houseNumber: data[8],
                postCode: data[9],
                city: data[10] ,
                invoiceStreet: data[11],
                invoiceHouseNr: data[12],
                invoiceCity: data[13],
                invoiceEmail: data[14],
                password: data[15],
                newPassword: data[16],
            }),
        });
        for (let i = 0; i < data.length; i++){
            console.log(data[i])
        }

        const projectData = await projectResult.json();

        console.log(projectData);
        if(projectData.status === 404) {
            alert('Gebruiker niet gevonden, de combinatie van wachtwoord en emailadres is incorrect')
        } else if (projectData.status === 200) {
            alert('Gebruiker succesvol veranderd')
        }
    } catch (error) {
        console.error("Error putting data:" + error);
    }
}

function alertNoAccess() {
    console.log('Not the right site permissions');
    alert('You have no access to this page, redirecting to login');
    window.location.href = './login.html';

}

// async function onLoadUserInfo(requiredPermission) {
//     console.log('On page load');

//     // HARDCODDED, WEGHALEN ZODRA LOGIN WERKT
//     // createSessionAndPermission('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTcxNzUwNjQ2MCwiZXhwIjoxNzE4NTQzMjYwfQ.YrckiyoGuslcp_5oiBpT6fAe8lUfQAadTwOh1HmR9ow', 'Hulpverlener!Coordinator');
//     const jwtToken = window.sessionStorage.getItem('jwtToken'); // Haalt de token op uit de session
//     const permissions = window.sessionStorage.getItem('permissions'); // Haalt de permissies op

//     // Kijkt of de token een waarde heeft, zo nee is het null en stuurt hij de gebruiker naar de login page
//     if (jwtToken === null) {
//         alertNoAccess();
//         return;
//     }

//     // Kijk of in de string van permissies de benodigde permissie zit
//     if (permissions === null || !permissions.match(requiredPermission)) {
//         alertNoAccess();
//         return;

//     }

//     // Maak verzoek naar de server om te kijken of de token geldig is
//     const apiRoute = 'https://api-ehbo.onrender.com/api/validatetoken';
//     const validateResult = await fetch(apiRoute, {
//         headers: {
//             'Content-Type': 'application/json; charset=UTF-8',
//             'Authorization': `bearer ${jwtToken}`
//         }
//     });

//     const toJson = await validateResult.json();

//     if (toJson.message === 'Not authorized') {
//         alertNoAccess();
//         return;
//     }

//     document.getElementById('unBlockID').style.display = 'block'; // Even controleren welke dit moet zijn


//     // HET STUK HIER NA IS ANDERS PER PAGINA
//     loadInfo(jwtToken);


// }

async function loadInfo(jwtToken) {
    const jwtToken = window.sessionStorage.getItem('jwtToken');
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


    document.getElementById('firstname').value = data.FirstName;
    document.getElementById('lastname').value = data.LastName;
    document.getElementById('mobilePhone').value = data.PhoneNumber;
    document.getElementById('email').value = data.Emailaddress;

    document.getElementById('dateOfBirth').value = cleanBirthdate[0];
    document.getElementById('street').value = data.Street;
    document.getElementById('houseNumber').value = data.HouseNr;
    document.getElementById('postalCode').value = data.PostCode;
    document.getElementById('city').value = data.City;
    document.getElementById('gender').value = transgender(data.Gender);

    if (data.LandLine) {
        document.getElementById('homePhone').value = data.LandLine;
    }

    if (data.InvoiceEmail) {
        document.getElementById('billingEmail').value = data.InvoiceEmail;
    }

    if (data.InvoiceCity) {
        document.getElementById('billingCity').value = data.InvoiceCity;
        document.getElementById('billingHouseNumber').value = data.InvoiceHouseNr;
        document.getElementById('billingStreet').value = data.InvoiceStreet;
    }
    return data.UserId;
}
function transgender(deadGender) {
    const lowercaseGender = deadGender.toLowerCase();
    if (lowercaseGender === 'male' || lowercaseGender === 'm' || lowercaseGender ===  'Male' || lowercaseGender ===  'M') {
        return 'Male';
    } else if (lowercaseGender === 'female' || lowercaseGender === 'f' || lowercaseGender === 'Female' || lowercaseGender ===  'F') {
        return 'Female';
    } else if (lowercaseGender === 'other' || lowercaseGender === 'o' || lowercaseGender === 'Other' || lowercaseGender === 'O') {
        return 'Other';
    } else {
        return "Won't say";
    }
}

