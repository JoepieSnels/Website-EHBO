// Validate Email
function validateEmail(email) {
    const patern = /^[a-zA-Z]\.[a-zA-Z]{2,}\@[a-zA-Z]{2,}\.[a-zA-Z]{2,3}$/;
    if (!patern.test(email)) throw new Error(`${email} email not valid`);
}

// Validate Password
function validatePassword(password) {
    const patern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S{8,}$/;

    if (!(patern.test(password))) throw new Error(`password not strong enough`);
}

function showPassword() {
    let x = document.getElementById("currentPassword");
    let y = document.getElementById("newPassword");
    if (x.type === "password") {
        x.type = "text";
    } else if (y.type === "password") {
        y.type = "text"
    } else {
        x.type = "password";
    }
}