async function fetchData() {
	const jwtToken = window.sessionStorage.getItem("jwtToken");
	try {
		const response = await fetch(`${config.apiURL}/api/getActiveProjects`, {
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: `bearer ${jwtToken}`,
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
		<div class="card project-list-card clickable-card" onclick="goToDetailCoordinator(${item.ProjectId})">
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
	document.location.href = "OpenshiftsCoordinator.html?projectId=" + projectId;

}

function goToDetail(projectId) {
	document.location.href = "OpenShifts.html?projectId=" + projectId;

}



async function loadActiveProjects(requiredPermission) {


	if (getPermission(requiredPermission)) {

		const data = await fetchData();

		if (data && Array.isArray(data)) {
			generateCards(data);
		}
	}
}

async function loadActiveProjectsCoordinator(requiredPermission) {


	if (getPermission(requiredPermission)) {
		const data = await fetchData();

		if (data && Array.isArray(data)) {
			generateCardsCoordinator(data);
		} 
	}
	
}


function loadShifts(requiredPermission) {
	if(getPermission(requiredPermission)) {

		var url = document.location.href,
		params = url.split("?")[1].split("="),
		data = {},
		tmp;

		getShifts(params[1])
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
		const response = await fetch(`${config.apiURL}/api/getshifts?projectId=${projectId}`, {
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
	const userId = window.sessionStorage.getItem("userID");
	if (!userId) {
		console.error("No userID found in session storage");
		return;
	}

	try {
		const response = await fetch(`${config.apiURL}/api/assignShift`, {
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
		alert("Je bent ingeschreven")
		window.location.href = "./ActiveProjects.html";

		const dataJson = await response.json();
		return dataJson.data;
	} catch (error) {
		if (error.status === 500) {
			return;
		} else {
			alert("Je bent al ingeschreven voor deze dienst.");
		}
	}
}

function fillShiftPage(shiftDetailsArray) {
	if (!Array.isArray(shiftDetailsArray) || shiftDetailsArray.length === 0) {
		alert("Er bestaan nog geen shifts voor dit project")
		return;
	}

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
                                    <button class="col-sm-4  col-lg-2 btn btn-blue float-right" onclick="assignShift('${shiftDetails.ShiftId}', '${shiftDetails.ProjectId}')">Inschrijven</button>
                                </div>
                            </div>`;
		projectItems += projectItem;
	});

	document.getElementById("replacable").innerHTML = projectItems;
}

function loadAssignedShifts(requiredPermission) {
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
	const projectId = data.projectId;

	getAssignedShifts(projectId)
		.then((shifts) => {
			fillAssignedShiftsPage(shifts);
		})
		.catch((error) => {
			console.log("Error loading projects:", error);
		});
	}


	
}

async function getAssignedShifts(projectId) {
	const jwtToken = window.sessionStorage.getItem("jwtToken");

	try {
		const response = await fetch(`${config.apiURL}/api/getassignedshifts?projectId=${projectId}`, {
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
		throw error;
	}
}

function fillAssignedShiftsPage(DetailsArray) {
	if (!Array.isArray(DetailsArray) || DetailsArray.length === 0) {
		alert("Er zijn geen diensten gevonden.");
		window.location.href = "./ActiveProjectCoordinator.html";
		return;
	}

	let projectItems = "";

	DetailsArray.forEach((data) => {
		const projectId = data.ProjectId[0]; 
		const shiftId = data.ShiftId[0]; 

		const projectItem = `<div class="card project-list-card">
								
                                <div class="card-body row project-card-body">
									<p class="card-text col-9"><b>Naam: </b>${data.FirstName} ${data.LastName}</p>
                                    <p class="card-text col-sm-6" id="shiftDate"><b>Start: </b>${data.StartDate.split("T")[0]} ${data.StartTime.slice(0, 5)}</p>
                                    <p class="card-text col-sm-6" id="shiftTime"><b>Eind: </b>${data.EndDate.split("T")[0]}  ${data.EndTime.slice(0, 5)}</p>
                                    <p class="card-text col-sm-6" id="userEmail"><b>Email:</b> ${data.Emailaddress}</p>
                                    <p class="card-text col-sm-6" id="userPhone"><b>Telefoonnummer:</b> ${data.PhoneNumber}</p>
                                    <button class="col-12 btn btn-primary float-right" onclick="setShift(${shiftId}, ${projectId})">Dienst Accepteren</button>
                                </div>
                            </div>`;
		projectItems += projectItem;
	});

	document.getElementById("replacable").innerHTML = projectItems;
}

async function setShift(shiftId, projectId) {
	const jwtToken = window.sessionStorage.getItem("jwtToken");

	try {
		const response = await fetch(`${config.apiURL}/api/acceptForShift`, {
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
		alert("Dienst gereed!");
		window.location.reload();
	} catch (error) {
		if (error.status === 500) {
			alert("Er is iets mis gegaan!");
			return;
		} else {
			alert("Dienst is al gereed.");
		}
	}
}
function alertNoAcces() {
	alert("You have no access to this page, redirecting to login");
	window.location.href = "./Login.html";
}
