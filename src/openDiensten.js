
async function fetchData() {
	const jwtToken = window.sessionStorage.getItem("jwtToken"); // Haalt de token op uit de session
	try {
		const response = await fetch("https://api-ehbo.onrender.com/api/getActiveProjects", {
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: `bearer ${jwtToken}`, // Ensure the format is correct
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

function generateCards(items) {

	const container = document.getElementById("replacable");
	container.innerHTML = "";
	items.forEach((item) => {
		let date = ""
		if(item.endDate){
			date = `${item.Date.split("T")[0]} - ${item.EndDate.split("T")[0]}`
		} else {
			date = item.Date.split("T")[0]
		}
		const card = document.createElement("div");
		let neededCertificates = item.CertificatesNeeded || "-";
		

		card.innerHTML = `
		<div class="card project-list-card clickable-card" onclick="goToDetail(${item.ProjectId})">
			<div class="card-header col-12" id="projectTitle"><b>Project:</b> ${item.Title}</div>
		
			<div class="card-body row project-card-body">
				<div class="row col-lg-8 col-sm-12 px-0 py-2">
					<p class="card-text col-lg-6 col-sm-6" id="projectDate"><b>Datum:</b> ${date}</p>
					<p class="card-text col-lg-6 col-sm-6" id="projectTime"><b>Tijd:</b> ${item.StartTime.slice(0, 5)} - ${item.EndTime.slice(0, 5)}</p>
					<p class="card-text col-lg-6 col-sm-6" id="projectLocation"><b>Locatie:</b> ${item.Address} ${item.HouseNr}, ${item.City}</p>
					<p class="card-text col-lg-6 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten:</b> ${neededCertificates}</p>
				</div>
				
				<p class="card-text col-lg-4 col-sm-12" id="Description"><b>Beschrijving:</b></br>${item.Description}</p>
				
			</div>
		</div>`;

		container.appendChild(card);
	});
}

function generateCardsCoordinator(items) {

	const container = document.getElementById("replacable");
	container.innerHTML = "";
	items.forEach((item) => {

		const card = document.createElement("div");
		let neededCertificates = item.CertificatesNeeded || "-";
		

		card.innerHTML = `
		<div class="card project-list-card" onclick="goToDetailCoordinator(${item.ProjectId})">
			<div class="card-header col-12" id="projectTitle"><b>Project:</b> ${item.Title}</div>
		
			<div class="card-body row project-card-body">
				<div class="row col-lg-8 col-sm-12 px-0 py-2">
					<p class="card-text col-lg-6 col-sm-6" id="projectDate"><b>Datum:</b> ${item.Date.split("T")[0]}</p>
					<p class="card-text col-lg-6 col-sm-6" id="projectTime"><b>Tijd:</b> ${item.StartTime.slice(0, 5)} - ${item.EndTime.slice(0, 5)}</p>
					<p class="card-text col-lg-6 col-sm-6" id="projectLocation"><b>Locatie:</b> ${item.Address} ${item.HouseNr}, ${item.City}</p>
					<p class="card-text col-lg-6 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten:</b> ${neededCertificates}</p>
				</div>
				
				<p class="card-text col-lg-4 col-sm-12" id="Description"><b>Beschrijving:</b></br>${item.Description}</p>
				
			</div>
		</div>`;

		container.appendChild(card);
	});
}


function goToDetailCoordinator(projectId) {
	document.location.href = "OpenshiftsCoordinator.html?id=" + projectId;

}

function goToDetail(projectId) {
	document.location.href = "OpenShifts.html?id=" + projectId;

}



async function loadActiveProjects(requiredPermission) {


	if (getPermission(requiredPermission)) {

		const data = await fetchData();

		if (data && Array.isArray(data)) {
			console.log("in if init");
			generateCards(data);
		} else {
			console.log("init");
		}
	}
}

async function loadActiveProjectsCoordinator(requiredPermission) {


	if (getPermission(requiredPermission)) {
		const data = await fetchData();

		if (data && Array.isArray(data)) {
			console.log("in if init");
			generateCardsCoordinator(data);
		} else {
			console.log("init");
		}
	}
}


function loadShifts(requiredPermission) {
	if(getPermission(requiredPermission)) {

		var url = document.location.href,
		params = url.split("?")[1].split("&"),
		data = {},
		tmp;
		console.log(params);
		for (var i = 0, l = params.length; i < l; i++) {
			tmp = params[i].split("=");
			data[tmp[0]] = tmp[1];
		}

		console.log(data.id)
		getShifts(data.id)
			.then((shifts) => {
				fillShiftPage(shifts, data.Id);
			})
			.catch((error) => {
				console.log("Error loading projects:", error);
			});
	}
	
}

async function getShifts(projectId) {

	const jwtToken = window.sessionStorage.getItem("jwtToken");

	try {
		const response = await fetch(`https://api-ehbo.onrender.com/api/getshifts?projectId=${projectId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${jwtToken}`,
			},
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const dataJson = await response.json();
		return dataJson.data;
	} catch (error) {
		console.log("Error fetching data: " + error);
	}
}

async function assignShift(shiftId, projectId) {
	const jwtToken = window.sessionStorage.getItem("jwtToken");
	const userId = window.sessionStorage.getItem("userID"); // Assuming userID is stored in session storage
	console.log("Assigning shift:", shiftId, projectId, userId);
	if (!userId) {
		console.error("No userID found in session storage");
		return;
	}

	try {
		const response = await fetch(`https://api-ehbo.onrender.com/api/assignShift`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${jwtToken}`,
			},
			body: JSON.stringify({ shiftId, projectId, userId }),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const dataJson = await response.json();
		return dataJson.data;
	} catch (error) {
		if (error.status === 500) {
			return;
		} else {
			alert("Je bent al ingeschreven voor deze dienst.");
			console.log("Error assigning shift: " + error);
		}
	}
}

function fillShiftPage(shiftDetailsArray, projectId) {
	if (!Array.isArray(shiftDetailsArray) || shiftDetailsArray.length === 0) {
		console.error("No shift details provided");
		return;
	}
	console.log(shiftDetailsArray)

	let projectItems = "";
	

	shiftDetailsArray.forEach((shiftDetails) => {

		let date;
		if(shiftDetails.StartDate === shiftDetails.EndDate) {
			date = shiftDetails.StartDate.split("T")[0]
		} else if (!shiftDetails.EndDate){
			date = shiftDetails.StartDate.split("T")[0]
		} else {
			date = `${shiftDetails.StartDate.split("T")[0]} - ${shiftDetails.EndDate.split("T")[0]}`
		}
		if (!shiftDetails.StartDate) {
			console.error("No StartDate in shift details");
			return;
		}


		let endDate = shiftDetails.EndDate ? "- " + shiftDetails.EndDate.split("T")[0] : "";

		const projectItem = `<div class="card project-list-card">
                             
                                <div class="card-body row project-card-body">

                                    <p class="card-text col-12" id="projectDate"><b>Datum: </b>${date}</p>
                                    <p class="card-text col-12 col-sm-8 col-lg-10" id="projectTime"><b>Tijd: </b>${shiftDetails.StartTime.slice(0, 5)} - ${shiftDetails.EndTime.slice(0, 5)}</p>
                                    <button class="col-sm-4  col-lg-2 btn btn-blue float-right" onclick="assignShift('${shiftDetails.ShiftId}', '${projectId}')">Inschrijven</button>
                                </div>
                            </div>`;
		projectItems += projectItem;
	});

	document.getElementById("replacable").innerHTML = projectItems;
}

function loadAssignedShifts(requiredPermission) {
	console.log('loadAssignedShifts')
	if(getPermission(requiredPermission)){ 
		var url = document.location.href;
	var paramsString = url.split("?")[1];
	if (!paramsString) {
		console.error("No query parameters found in the URL");
		return;
	}
	var params = paramsString.split("&");
	var data = {},
		tmp;
	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split("=");
		data[tmp[0]] = tmp[1];
	}
	const projectId = data.id;

	getAssignedShifts(projectId)
		.then((shifts) => {
			console.log("Shifts:", shifts);
			fillAssignedShiftsPage(shifts);
		})
		.catch((error) => {
			console.log("Error loading projects:", error);
		});
	}


	
}

async function getAssignedShifts(projectId) {
	console.log('getAssignedShifts')
	const jwtToken = window.sessionStorage.getItem("jwtToken");

	try {
		const response = await fetch(`https://api-ehbo.onrender.com/api/getassignedshifts?projectId=${projectId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${jwtToken}`,
			},
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const dataJson = await response.json();
		console.log('lala', dataJson.data)
		return dataJson.data;
	} catch (error) {
		console.log("Error fetching data: " + error);
		throw error;
	}
}

function fillAssignedShiftsPage(DetailsArray) {
	if (!Array.isArray(DetailsArray) || DetailsArray.length === 0) {
		console.error("No details provided");
		alert("Er zijn geen diensten gevonden.");
		window.location.href = "./activeprojectcoordinator.html";
		return;
	}

	let projectItems = "";

	DetailsArray.forEach((data) => {
		const projectId = data.ProjectId[0]; // Assuming that the first element is the correct one
		console.log(projectId)
		const shiftId = data.ShiftId[0]; // Assuming that the first element is the correct one

		const projectItem = `<div class="card project-card">
                                <div class="card-header col-12" id="projectTitle">
                                   <p class="card-text col-sm-6" id="userName"><b>Naam:</b> ${data.FirstName} ${data.LastName}</p>
                                </div>
                                <div class="card-body row project-card-body">
                                    <p class="card-text col-sm-6" id="shiftDate"><b>Datum: </b>${data.StartDate.split("T")[0]} ${data.EndDate.split("T")[0]}</p>
                                    <p class="card-text col-sm-6" id="shiftTime"><b>Tijd: </b>${data.StartTime.slice(0, 5)} - ${data.EndTime.slice(0, 5)}</p>

                                    <div class="col-12"><h5><b>Gebruiker gegevens:</b></h5></div>
                                    <p class="card-text col-sm-6" id="userEmail"><b>Email:</b> ${data.Emailaddress}</p>
                                    <p class="card-text col-sm-6" id="userPhone"><b>Telefoonnummer:</b> ${data.PhoneNumber}</p>
                                    <div class="col-12"><h5><b>Adres gegevens:</b></h5></div>
                                    <p class="card-text col-sm-6" id="userCity"><b>Woonplaats:</b> ${data.City}</p>
                                    <p class="card-text col-sm-6" id="userStreet"><b>Straat:</b> ${data.Street}</p>
                                    <div class="col-12"><h5><b>Dienst gereed?</b></h5></div>
                                    <div class="col-12">
                                        <button class="btn btn-primary float-right" onclick="setShift(${shiftId}, ${projectId})">Dienst gereed</button>
                                    </div>
                                </div>
                            </div>`;
		console.log(`ShiftId: ${shiftId}, ProjectId: ${projectId}`);
		projectItems += projectItem;
	});

	document.getElementById("replacable").innerHTML = projectItems;
}

async function setShift(shiftId, projectId) {
	const jwtToken = window.sessionStorage.getItem("jwtToken"); // Assuming userID is stored in session storage

	try {
		console.log(`projectId: ${projectId}, shiftId: ${shiftId}`);
		const response = await fetch(`https://api-ehbo.onrender.com/api/acceptForShift`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${jwtToken}`,
			},
			body: JSON.stringify({
				shiftId: shiftId,
				projectId: projectId,
			}),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const dataJson = await response.json();
		console.log(dataJson);
		alert("Dienst gereed!");
		window.location.reload();
	} catch (error) {
		if (error.status === 500) {
			alert("Er is iets mis gegaan!");
			return;
		} else {
			alert("Dienst is al gereed.");
			console.log("Error setting shift: " + error);
		}
	}
}
function alertNoAcces() {
	console.log("Not the right site permissions");
	alert("You have no access to this page, redirecting to login");
	window.location.href = "./login.html";
}
