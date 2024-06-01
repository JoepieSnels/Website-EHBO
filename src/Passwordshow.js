function showPassword() {
	let x = document.getElementById("password");

	if (x.type === "password") {
		x.type = "text";
	} else if (y.type === "password") {
		y.type = "text";
	} else {
		x.type = "password";
	}
}
function showControlePassword() {
	var x = document.getElementById("controlePassword");
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
}
