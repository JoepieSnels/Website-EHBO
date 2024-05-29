function showPassword() {
    var x = document.getElementById("password")
    if (x.type === "password") {
        x.type = "text"
    } else {
        x.type = "password"
    }
}

function validateForm() {
    var x = document.forms["requestAccount"]["fname"].value;
    if (x == "" || x == null) {
      alert("Name must be filled out")
      return false
    } else {
        sendMail()
    }
  }