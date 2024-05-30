
function validateEmail() {
    let pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    // if (!pattern.test(email)) throw new Error(`${email} email not valid`);

    let input = document.getElementById('email').value;

    if (!(pattern.test(input))) {
        // alert('Geef een valide emailadres op');
        document.getElementById('email').value = '';
        return true;
    }

    // pattern =

}

function validateFields(event, activateAlert, validateEmail, validatePassword) {
    event.preventDefault();
    activateAlert(validateEmail, validatePassword)
}

function activateAlert(email, password) {
    let alertString = 'Geef een valide';

    if (!password() && email()) {
        alertString += ' email op.';
        alert(alertString);
    } else if (password() && !email()) {
        alertString += ' wachtwoord op.';
        alert(alertString);
    } else if (password() && email()) {
        alertString += ' email en wachtwoord op.';
        alert(alertString);
    }
}

// Validate Password
function validatePassword() {
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S{8,}$/;

    let input = document.getElementById('newPassword').value;

    if (!(pattern.test(input))) {
        // alert('Geef een valide wachtwoord op');
        document.getElementById('newPassword').value = '';
        return true
    }
}

function showPassword() {
    let x = document.getElementById('currentPassword');
    let y = document.getElementById('newPassword');
    if (x.type === 'password') {
        x.type = 'text';
    } else if (y.type === 'password') {
        y.type = 'text'
    } else {
        x.type = 'password';
    }
}