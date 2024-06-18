function createCard(projectDetails) {
	projectDetails.RequestDate = projectDetails.RequestDate.split("T")[0];
	projectDetails.Date = projectDetails.Date.split("T")[0];
	if (projectDetails.IsAccepted === undefined || projectDetails.IsAccepted === null) {
		projectDetails.IsAccepted = "No Reply";
	}

	var item = `<div class="card project-list-card clickable-card" onclick="goDetailPage(${projectDetails.ProjectId})">
                    <div class="card-header" id="projectTitle">
                        <b>Project:</b> ${projectDetails.Title}
                    </div>
                    <div class="card-body row project-card-body">
                        <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum:</b> ${projectDetails.Date}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd:</b> ${projectDetails.StartTime.slice(0, 5)} - ${projectDetails.EndTime.slice(0, 5)}</p>
                        <p class="card-text col-lg-4 col-sm-6"><b>Bedrijf:</b> ${projectDetails.Company}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie:</b> ${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten:</b> Geen</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectStatus"><b>Status:</b> ${projectDetails.IsAccepted}</p>
                    </div>
                </div>`;

	document.getElementById("eventCards").innerHTML += item;
}

function createAcceptedCard(projectDetails) {
	projectDetails.RequestDate = projectDetails.RequestDate.split("T")[0];
	projectDetails.Date = projectDetails.Date.split("T")[0];
	if (projectDetails.IsAccepted === undefined || projectDetails.IsAccepted === null) {
		projectDetails.IsAccepted = "No Reply";
	}
	const status = setStatus(projectDetails.IsAccepted);

	var item = `<div class="clickable-card card project-list-card " onclick="goAcceptedDetailPage(${projectDetails.ProjectId})">
                    <div class="card-header" id="projectTitle">
                        <b>Project:</b> ${projectDetails.Title} 
                    </div>
                    <div class="card-body row project-card-body">
                        <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum:</b> ${projectDetails.Date}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd:</b> ${projectDetails.StartTime.slice(0, 5)} - ${projectDetails.EndTime.slice(0, 5)}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectCompany"><b>Bedrijf:</b> ${projectDetails.Company}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie:</b> ${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten:</b> Geen</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectStatus"><b>Status:</b> ${status}</p>
                    </div>
                </div>`;

	document.getElementById("replacable").innerHTML += item;
}

function loadAcceptedProjects(requiredPermission) {
	if (getPermission(requiredPermission)) {
		getAcceptedProjectsFromDB()
			.then((projects) => {
				for (let i = 0; i < projects.length; i++) {
					createAcceptedCard(projects[i]);
				}
			})
			.catch((error) => {
				console.log("Error loading projects:", error);
			});
	}
}

async function getAcceptedProjectsFromDB() {
	const jwtToken = window.sessionStorage.getItem("jwtToken");

	try {
		const response = await fetch(`${config.apiURL}/api/getAcceptedProjects`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset-UTF-8",
				Authorization: `Bearer${jwtToken}`,
			},
		});
		const dataJson = await response.json();
		return dataJson.data;
	} catch (error) {
		console.log("Error fetching data: " + error);
	}
}

async function getProjectsFromDB() {
	const jwtToken = window.sessionStorage.getItem("jwtToken");

	try {
		const response = await fetch(`${config.apiURL}/api/getAllUndecidedProjects`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset-UTF-8",
				Authorization: `Bearer${jwtToken}`,
			},
		});
		const dataJson = await response.json();
		return dataJson.data;
	} catch (error) {
		console.log("Error fetching data: " + error);
	}
}

function loadAllProjects(requiredPermission) {
	if (getPermission(requiredPermission)) {
		getProjectsFromDB()
			.then((projects) => {
				for (let i = 0; i < projects.length; i++) {
					createCard(projects[i]);
				}
			})
			.catch((error) => {
				console.log("Error loading projects:", error);
			});
	}
}

async function getProjectsFromDBWithId(id) {
	const jwtToken = window.sessionStorage.getItem("jwtToken");

	try {
		const response = await fetch(`${config.apiURL}/api/getProject?projectId=${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${jwtToken}`,
			},
		});

		const dataJson = await response.json();
		return dataJson.data;
	} catch (error) {
		console.log("Error fetching data: " + error);
	}
}

function goDetailPage(id) {
	document.location.href = `./EventDetail.html?id=${id}`;
}
function goAcceptedDetailPage(id) {
	document.location.href = `./CreateShift.html?id=${id}`;
}

function loadProjectDetails() {
	var url = document.location.href,
		params = url.split("?")[1].split("&"),
		data = {},
		tmp;

	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split("=");
		data[tmp[0]] = tmp[1];
	}

	getProjectsFromDBWithId(data.id)
		.then((project) => {
			fillDetailPage(project);
		})
		.catch((error) => {
			console.log("Error loading projects:", error);
		});
}

function fillDetailPage(projectDetails) {
	if (!projectDetails.EndDate) {
		projectDetails.EndDate = "";
	} else {
		projectDetails.EndDate = "- " + projectDetails.EndDate.split("T")[0];
	}
	if (projectDetails.IsAccepted === undefined || projectDetails.IsAccepted === null) {
		projectDetails.IsAccepted = "No Reply";
	}

	const projectItem = `<div class="card project-list-card">
                            <div class="card-header col-12" id="projectTitle">
                                <b>Project:</b> ${projectDetails.Title}
                            </div>
                            <div class="card-body row project-card-body">
                                <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum: </b>${projectDetails.Date.split("T")[0]} ${projectDetails.EndDate}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd: </b>${projectDetails.StartTime.slice(0, 5)} - ${projectDetails.EndTime.slice(0, 5)}</p>
                                <p class="card-text col-lg-4 col-sm-6"><b>Bedrijf: </b> ${projectDetails.Company}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie: </b>${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten: </b> Geen</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectStatus"><b>Status: </b>${projectDetails.IsAccepted}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="ContactPersonName"><b>Contact Persoon: </b>${projectDetails.ContactPerson}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="ContactPersonEmail"><b>Contact Email: </b>${projectDetails.ContactEmailAddress}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="CompanyPhoneNumber"><b>Telefoon Nummer: </b>${projectDetails.PhoneNumber}</p>
                                <p class="card-text col-12" id="Description"><b>Beschrijving: </b>${projectDetails.Description}</p>
                                <div class="col-12" id="buttons">
									<button class="btn btn-success float-right m-2" onclick="acceptProject(${projectDetails.ProjectId})">Accepteren</button>
									<button class="btn btn-danger float-right m-2" onclick="rejectProject(${projectDetails.ProjectId})">Weigeren</button>
                                </div>
                            </div>
                        </div>`;

	document.getElementById("replacable").innerHTML = projectItem;
}

function acceptProject(id) {
	const jwtToken = window.sessionStorage.getItem("jwtToken");

	fetch(`${config.apiURL}/api/acceptproject`, {
		method: "PUT",
		body: JSON.stringify({ projectId: id }),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: `bearer ${jwtToken}`,
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			alert("Project geaccepteerd");
			window.location.href = "./EventOverview.html";
		})
		.catch((error) => {
			console.error("Error accepting project:", error);
		});
}
function rejectProject(id) {
	const jwtToken = window.sessionStorage.getItem("jwtToken");

	fetch(`${config.apiURL}/api/rejectproject`, {
		method: "PUT",
		body: JSON.stringify({ projectId: id }),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: `bearer ${jwtToken}`,
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			alert("Project geweigerd");
			window.location.href = "./EventOverview.html";
		})
		.catch((error) => {
			console.error("Error rejecting project:", error);
		});
}

function loadAcceptedProjectDetails(requiredPermission) {
	if (getPermission(requiredPermission)) {
		var url = document.location.href,
			params = url.split("?")[1].split("&"),
			data = {};

		for (var i = 0, l = params.length; i < l; i++) {
			tmp = params[i].split("=");
			data[tmp[0]] = tmp[1];
		}

		getProjectsFromDBWithId(data.id)
			.then((project) => {
				fillAcceptedDetailPage(project);
			})
			.catch((error) => {
				console.log("Error loading projects:", error);
			});
	}
}

function fillAcceptedDetailPage(projectDetails) {
	if (!projectDetails.EndDate) {
		projectDetails.EndDate = "";
	} else {
		projectDetails.EndDate = projectDetails.EndDate.split("T")[0];
	}
	projectDetails.Date = projectDetails.Date.split("T")[0];
	const status = setStatus(projectDetails.IsAccepted);
	const beginDate = projectDetails.Date;
	const endDate = projectDetails.EndDate;

	const projectItem = `
    <div class="card project-list-card">
        <div class="card-header col-12" id="projectTitle">
            <b>Project:</b> ${projectDetails.Title}
        </div>
        <div class="card-body row project-card-body">
            <div class="card-text col-lg-4 col-sm-6" id="projectDate">
                <b>Begin datum: </b>
                <label id="beginDate" class="col-6">${beginDate}</label>
            </div>
            <div class="card-text col-lg-4 col-sm-6" id="projectDate">
                <b>Eind datum: </b>
                <label id="endDate" class="col-6">${endDate}</label>
            </div>
			 <p class="card-text col-lg-4 col-sm-6" id="projectCompany">
                <b>Bedrijf: </b>${projectDetails.Company}
            </p>
            <div class="card-text col-lg-4 col-sm-6" id="projectTime">
				<b>Begin tijd: </b>
                <label id="beginTime class="col-6">${projectDetails.StartTime.slice(0, 5)}</label> 
            </div>
			<div class="card-text col-lg-4 col-sm-6" id="projectTime">
				<b>Eind tijd: </b>
				<label id="endTime" class="col-6">${projectDetails.EndTime.slice(0, 5)}</label> 
			</div>
           
            <p class="card-text col-lg-4 col-sm-6" id="projectLocation">
                <b>Locatie: </b>${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}
            </p>
            <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates">
                <b>Benodigde certificaten: </b> Geen
            </p>
            <p class="card-text col-lg-4 col-sm-6" id="projectStatus">
                <b>Status: </b>${status}
            </p>
            <p class="card-text col-lg-4 col-sm-6" id="ContactPersonName">
                <b>Contact Persoon: </b>${projectDetails.ContactPerson}
            </p>
            <p class="card-text col-lg-4 col-sm-6" id="ContactPersonEmail">
                <b>Contact Email: </b>${projectDetails.ContactEmailAddress}
            </p>
            <p class="card-text col-lg-4 col-sm-6" id="CompanyPhoneNumber">
                <b>Telefoon Nummer: </b>${projectDetails.PhoneNumber}
            </p>
            <p class="card-text col-lg-7 col-sm-7" id="Description">
                <b>Beschrijving: </b>${projectDetails.Description}
            </p>
            <br>
            <h5 class="col-12">Maak diensten aan</h5>
            <div class="container" id="shiftCreator">
                <div class="shift0" id="shift0">
                    <div class="row">
                        <label for="shiftBeginTime" class="col-6 col-sm-3">Begin Tijd</label>
                        <input type="time" id="shiftBeginTime0" class="col-6 col-sm-3"></input>
                        <label for="shiftEndTime" class="col-6 col-sm-3">Eind Tijd</label>
                        <input type="time" id="shiftEndTime0" class="col-6 col-sm-3"></input>
                    </div>
                    <div class="row">
                        <label for="shiftBeginDate" class="col-6 col-sm-3">Begin datum</label>
                        <input type="date" id="shiftBeginDate0" class="col-6 col-sm-3"></input>
                        <label for="shiftEndDate" class="col-6 col-sm-3">Eind datum</label>
                        <input type="date" id="shiftEndDate0" class="col-6 col-sm-3"></input>
                    </div>
                </div>
            </div>
            <div class="container" id="knop">
                <div class="row">
                    <div class="col-12" style="padding-top: 20px">
                        <button class="btn btn-primary float-left" onclick="addShift(${projectDetails.ProjectId})">Bevestig dienst</button>
                        <button class="btn btn-success float-right" onclick="setActive(${projectDetails.ProjectId})">Zet actief</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
	document.getElementById("replacable").innerHTML = projectItem;
}

let shifts = [];
let count = 0;

function checkInput(count) {
	const shiftBeginTime = document.getElementById(`shiftBeginTime${count}`).value;
	const shiftEndTime = document.getElementById(`shiftEndTime${count}`).value;
	const shiftBeginDate = document.getElementById(`shiftBeginDate${count}`).value;
	const shiftEndDate = document.getElementById(`shiftEndDate${count}`).value;
	const beginDate = document.getElementById("beginDate").textContent.trim();
	const endDate = document.getElementById("endDate").textContent.trim();
	const beginTime = document.getElementById("beginTime").textContent;
	const endTime = document.getElementById("endTime").textContent;

	console.log(beginDate, endDate, beginTime, endTime);


	let alert = "";

	if (!beginTime || !endTime || !shiftBeginDate || !shiftEndDate) {
		alert = "Een veld mist";
		return { valid: false, alert: alert };
	}

	if (!validateShiftDate(shiftBeginDate, shiftEndDate, beginDate, endDate)) {
		alert = result.alert;
		return { valid: false, alert: alert };
	}
	if (!validateTime(beginTime, endTime, beginDate, endDate, shiftBeginTime, shiftEndTime)) {
		alert = result.alert;
		return { valid: false, alert: alert };
	}

	return { valid: true, alert: alert };
}

function addShift(projectId) {
	const result = checkInput(count);

	if (!result.valid) {
		alert(result.alert);
		return;
	}

	appendShiftForm(count + 1);

	const beginTime = document.getElementById(`shiftBeginTime${count}`).value;
	const endTime = document.getElementById(`shiftEndTime${count}`).value;
	const shiftBeginDate = document.getElementById(`shiftBeginDate${count}`).value;
	const shiftEndDate = document.getElementById(`shiftEndDate${count}`).value;

	shifts.push({
		beginTime: beginTime,
		endTime: endTime,
		beginDate: shiftBeginDate,
		endDate: shiftEndDate,
		projectId: projectId,
	});

	hideLastShift(count);
	count++;
}

function hideLastShift(teller) {
	document.getElementById(`shift${teller}`).innerHTML = `
										<div class="row">
										<label for="shiftBeginTime" class="col-3">Begin Tijd</label>          
										<p class="col-3">${shifts[teller].beginTime}</p>
										<label for="shiftEndTime" class="col-3">Eind Tijd</label>
										<p class="col-3">${shifts[teller].endTime}</p>
									</div>
									<div class="row">
										<label for="shiftBeginDate" class="col-3">Begin datum</label>
										<p class="col-3">${shifts[teller].beginDate}</p>
										<label for="shiftEndDate" class="col-3">Eind datum</label>
										<p class="col-3">${shifts[teller].endDate}</p>
									</div>`;
}

function appendShiftForm(teller) {
	const shiftForm = document.createElement("div");
	shiftForm.innerHTML = `
				<div id="shift${teller}">
					<div class="row">
						<label for="shiftBeginTime" class="col-3">Begin Tijd</label>          
						<input type="time" id="shiftBeginTime${teller}" class="col-3"></input>
						<label for="shiftEndTime" class="col-3">Eind Tijd</label>
						<input type="time" id="shiftEndTime${teller}" class="col-3"></input>
					</div>
					<div class="row">
						<label for="shiftBeginDate" class="col-3">Begin datum</label>
						<input type="date" id="shiftBeginDate${teller}" class="col-3"></input>
						<label for="shiftEndDate" class="col-3">Eind datum</label>
						<input type="date" id="shiftEndDate${teller}" class="col-3"></input>
					</div>
				</div>
										`;
	document.getElementById("shiftCreator").appendChild(shiftForm);
}
function setActive(id) {
	if (shifts.length === 0) {
		alert("Voeg eerst diensten toe");
		return;
	}
	const jwtToken = window.sessionStorage.getItem("jwtToken");

	fetch(`${config.apiURL}/api/setProjectActive`, {
		method: "PUT",
		body: JSON.stringify({ projectId: id }),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: `bearer ${jwtToken}`,
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			createShifts();
			alert("project geaccepteerd");
		})
		.catch((error) => {
			console.error("Error rejecting project:", error);
		});
}

function createShifts() {
	for (let i = 0; i < shifts.length; i++) {
		fetch(`${config.apiURL}/api/createshift`, {
			method: "POST",
			body: JSON.stringify({
				projectId: shifts[i].projectId,
				beginTime: shifts[i].beginTime,
				endTime: shifts[i].endTime,
				beginDate: shifts[i].beginDate,
				endDate: shifts[i].endDate,
			}),

			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				alert("Diensten aangemaakt");
			})
			.catch((error) => {
				console.error("Error creating shift:", error);
			});
	}
}
