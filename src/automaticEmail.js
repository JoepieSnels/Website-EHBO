function isOn() {
    let items = []
    let i = 0;
    if(document.getElementById('eenheidsdiploma').checked) {
        items[i] = 'Eenheidsdiploma'
        console.log(items)
        i++
    }
    if(document.getElementById('reanimatie').checked) {
        items[i] = 'Reanimate'
        console.log(items)
        i++
    }
    if(document.getElementById('ehak').checked) {
        items[i] = 'Eerste hulp aan kinderen'
        i++
    }
    if(document.getElementById('brandwondletsels').checked) {
        items[i] = 'Brandwondletsels'
        i++
    }
    if(document.getElementById('ehv').checked) {
        items[i] = 'Evenement hulpverlening'
        i++
    }
    if(i===0) {
        items[i] = 'Geen certificaten ingevuld'
    }
    return items
}

function sendMail(event) {
	event.preventDefault();
	let items = isOn();
	console.log(items);

    var params = {
        email: document.getElementById('email').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        gender: document.getElementById('gender').value,
        city: document.getElementById('city').value,
        postalcode: document.getElementById('postalCode').value,
        street: document.getElementById('street').value,
        houseNumber: document.getElementById('houseNumber').value,
        certificates: items,
        invoiceEmail: null,
        invoiceAdres: null,
        landLine: null
    }

    if(document.getElementById('homePhone').value) {
        params.landLine = document.getElementById('homePhone').value
    } else {
        params.landLine = 'Niet ingevuld'
    }

    if(document.getElementById('billingEmail').value) {
        params.invoiceEmail = document.getElementById('billingEmail').value
    } else {
        params.invoiceEmail = 'Niet ingevuld'
    }

    if(document.getElementById('billingCity').value && document.getElementById('billingStreet').value && document.getElementById('billingHouseNumber').value) {
        params.invoiceAdres =  `${document.getElementById('billingStreet').value} ${document.getElementById('billingHouseNumber').value}, ${document.getElementById('billingCity').value}`
    } else {
        params.invoiceAdres = 'Niet ingevuld'
    }

    console.log(params)

    const serviceID = 'service_hxe2zge'
    const templateID = 'template_jrylr0f'

    emailjs.send(serviceID, templateID, params).then(
        res => {
            document.getElementById('email').value = ''
            document.getElementById('firstName').value = ''
            document.getElementById('lastName').value = ''
            document.getElementById('phoneNumber').value = ''
            document.getElementById('homePhone').value = ''
            document.getElementById('dateOfBirth').value = ''
            document.getElementById('gender').value = ''
            document.getElementById('city').value = ''
            document.getElementById('postalCode').value = ''
            document.getElementById('street').value = ''
            document.getElementById('houseNumber').value = ''
            document.getElementById('billingEmail').value = ''
            document.getElementById('billingCity').value = ''
            document.getElementById('billingStreet').value = ''
            document.getElementById('billingHouseNumber').value = ''

            console.log(res)
            alert('Aanvraag is ingezonden')
    }).catch(err=>console.log(err))
}