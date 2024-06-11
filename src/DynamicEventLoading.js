function fillAcceptedDetailPage(projectDetails) {
	console.log(projectDetails);

	if (!projectDetails.EndDate) {
		projectDetails.EndDate = "";
	} else {
		projectDetails.EndDate = "- " + projectDetails.EndDate.split("T")[0];
	}

	const projectItem = `<div class="card project-card">
                            <div class="card-header col-12" id="projectTitle">
                                <b>Project:</b> ${projectDetails.Title} 
                                <b> Bedrijf:</b> ${projectDetails.Company}
                            </div>                            
                            <div class="card-body row project-card-body">
                                <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum: </b>${projectDetails.Date.split("T")[0]} ${projectDetails.EndDate}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd: </b>${projectDetails.StartTime.slice(0, 5)} - ${projectDetails.EndTime.slice(0, 5)}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="amountFirstResponders"><b>Hulpverleners nodig: </b> ${projectDetails.PeopleNeeded}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie: </b>${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten: </b> Geen</p>
                                <p class="card-text col-lg-4 col
                        <p class="card-text col-lg-4 col-sm-6" id="projectStatus"><b>Status:</b> ${projectDetails.IsAccepted}</p>
                    </div>
                </div>`;

	document.getElementById("eventCards").innerHTML += projectItem;

	console.log(projectDetails.Id);
}
function createCard(projectDetails) {
	console.log(projectDetails);
	// projectDetails = testProjectDetails;

	projectDetails.RequestDate = projectDetails.RequestDate.split("T")[0];
	projectDetails.Date = projectDetails.Date.split("T")[0];
	if (projectDetails.IsAccepted === undefined || projectDetails.IsAccepted === null) {
		projectDetails.IsAccepted = "No Reply";
	}

	var item = `<div class="card project-card" onclick="goDetailPage(${projectDetails.ProjectId})">
                    <div class="card-header" id="projectTitle">
                        <b>Project:</b> ${projectDetails.Title} 
                        <b> Bedrijf:</b> ${projectDetails.Company}
                    </div>
                    <div class="card-body row project-card-body">
                        <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum:</b> ${projectDetails.Date}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd:</b> ${projectDetails.StartTime.slice(0, 5)} - ${projectDetails.EndTime.slice(0, 5)}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="amountFirstResponders"><b>Hulpverleners nodig:</b> ${projectDetails.PeopleNeeded}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie:</b> ${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten:</b> Geen</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectStatus"><b>Status:</b> ${projectDetails.IsAccepted}</p>
                    </div>
                </div>`;

	document.getElementById("eventCards").innerHTML += item;
	console.log(projectDetails.Id);
}
function createAcceptedCard(projectDetails) {
	console.log(projectDetails);
	// projectDetails = testProjectDetails;

	projectDetails.RequestDate = projectDetails.RequestDate.split("T")[0];
	projectDetails.Date = projectDetails.Date.split("T")[0];
	if (projectDetails.IsAccepted === undefined || projectDetails.IsAccepted === null) {
		projectDetails.IsAccepted = "No Reply";
	}

	var item = `<div class="card project-card" onclick="goAcceptedDetailPage(${projectDetails.ProjectId})">
                    <div class="card-header" id="projectTitle">
                        <b>Project:</b> ${projectDetails.Title} 
                        <b> Bedrijf:</b> ${projectDetails.Company}
                    </div>
                    <div class="card-body row project-card-body">
                        <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum:</b> ${projectDetails.Date}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd:</b> ${projectDetails.StartTime.slice(0, 5)} - ${projectDetails.EndTime.slice(0, 5)}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="amountFirstResponders"><b>Hulpverleners nodig:</b> ${projectDetails.PeopleNeeded}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie:</b> ${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten:</b> Geen</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectStatus"><b>Status:</b> ${projectDetails.IsAccepted}</p>
                    </div>
                </div>`;

	document.getElementById("eventCards").innerHTML += item;
	console.log(projectDetails.Id);
}
function goAcceptedDetailPage(id) {
	document.location.href = `./CreateShift.html?id=${id}`;
}
function loadAcceptedProjects(event) {
	getAcceptedProjectsFromDB(event)
		.then((projects) => {
			console.log(projects[0].Title);
			for (let i = 0; i < projects.length; i++) {
				createAcceptedCard(projects[i]);
			}
		})
		.catch((error) => {
			console.log("Error loading projects:", error);
		});
}
async function getAcceptedProjectsFromDB(event) {
	const jwtToken = window.sessionStorage.getItem("jwtToken");
	console.log("Loading projects from Database");
	event.preventDefault();

	try {
		const response = await fetch("http://localhost:3000/api/getAcceptedProjects", {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset-UTF-8",
				Authorization: `Bearer${jwtToken}`,
			},
		});
		const dataJson = await response.json();
		console.log(dataJson);
		return dataJson.data;
	} catch (error) {
		console.log("Error fetching data: " + error);
	}
}

// Load all projects from the database using the API
async function getProjectsFromDB(event) {
	const jwtToken = window.sessionStorage.getItem("jwtToken");
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzQ5NDY4MiwiZXhwIjoxNzE4NTMxNDgyfQ.6d_LkUK4VWQcYxWpoRycQlJGfnSbWQ__raMiTurIkFw";
	console.log("Loading projects from Database");
	event.preventDefault();

	try {
		const response = await fetch("http://localhost:3000/api/getAllUndecidedProjects", {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset-UTF-8",
				Authorization: `Bearer${token}`,
			},
		});
		const dataJson = await response.json();
		console.log(dataJson);
		return dataJson.data;
	} catch (error) {
		console.log("Error fetching data: " + error);
	}
}

function loadAllProjects(event) {
	getProjectsFromDB(event)
		.then((projects) => {
			console.log(projects[0].Title);
			for (let i = 0; i < projects.length; i++) {
				createCard(projects[i]);
			}
		})
		.catch((error) => {
			console.log("Error loading projects:", error);
		});
}

// Load project based on ID
async function getProjectsFromDBWithId(event, id) {
	console.log(id);
	const jwtToken = window.sessionStorage.getItem("jwtToken");
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzQ5NDY4MiwiZXhwIjoxNzE4NTMxNDgyfQ.6d_LkUK4VWQcYxWpoRycQlJGfnSbWQ__raMiTurIkFw";
	console.log("Loading project with Id: " + id);
	event.preventDefault();

	try {
		const response = await fetch(`http://localhost:3000/api/getProject?projectId=${id}`, {
			method: "GET", // Use GET method
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${token}`,
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

function loadProjectDetails(event) {
	var url = document.location.href,
		params = url.split("?")[1].split("&"),
		data = {},
		tmp;
	console.log(params);
	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split("=");
		data[tmp[0]] = tmp[1];
	}
	console.log(data.id);

	getProjectsFromDBWithId(event, data.id)
		.then((project) => {
			console.log(project);
			fillDetailPage(project);
		})
		.catch((error) => {
			console.log("Error loading projects:", error);
		});
}

function fillDetailPage(projectDetails) {
	console.log(projectDetails);

	if (!projectDetails.EndDate) {
		projectDetails.EndDate = "";
	} else {
		projectDetails.EndDate = "- " + projectDetails.EndDate.split("T")[0];
	}

	const projectItem = `<div class="card project-card">
                            <div class="card-header col-12" id="projectTitle">
                                <b>Project:</b> ${projectDetails.Title} 
                                <b> Bedrijf:</b> ${projectDetails.Company}
                            </div>                            
                            <div class="card-body row project-card-body">
                                <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum: </b>${projectDetails.Date.split("T")[0]} ${projectDetails.EndDate}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd: </b>${projectDetails.StartTime.slice(0, 5)} - ${projectDetails.EndTime.slice(0, 5)}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="amountFirstResponders"><b>Hulpverleners nodig: </b> ${projectDetails.PeopleNeeded}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie: </b>${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten: </b> Geen</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectStatus"><b>Status: </b>${projectDetails.IsAccepted}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="ContactPersonName"><b>Contact Persoon: </b>${projectDetails.ContactPerson}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="ContactPersonEmail"><b>Contact Email: </b>${projectDetails.ContactEmailAddress}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="CompanyPhoneNumber"><b>Telefoon Nummer: </b>${projectDetails.PhoneNumber}</p>
                                <p class="card-text col-lg-6 col-sm-6" id="Description"><b>Beschrijving: </b>${projectDetails.Description}</p>
                                <div class="col-12" id="buttons">
                                <button class="btn btn-success float-right" onclick="acceptProject(${projectDetails.ProjectId})">Accepteren</button>
                                <button class="btn btn-danger float-right" onclick="rejectProject(${projectDetails.ProjectId})">Weigeren</button>
                                </div>
                            </div>
                        </div>`;

	document.getElementById("replacable").innerHTML = projectItem;
}
function acceptProject(id) {
	const jwtToken = window.sessionStorage.getItem("jwtToken");

	fetch("http://localhost:3000/api/acceptproject", {
		method: "PUT",
		body: JSON.stringify({ projectId: id }),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: `bearer ${jwtToken}`,
		},
	})
		.then((response) => {
			console.log("Response Status:", response.status);
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

	fetch("http://localhost:3000/api/rejectproject", {
		method: "PUT",
		body: JSON.stringify({ projectId: id }),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: `bearer ${jwtToken}`,
		},
	})
		.then((response) => {
			console.log("Response Status:", response.status);
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
function loadAcceptedProjectDetails(event) {
	var url = document.location.href,
		params = url.split("?")[1].split("&"),
		data = {},
		tmp;
	console.log(params);
	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split("=");
		data[tmp[0]] = tmp[1];
	}
	console.log(data.id);

	getProjectsFromDBWithId(event, data.id)
		.then((project) => {
			console.log(project);
			fillAcceptedDetailPage(project);
		})
		.catch((error) => {
			console.log("Error loading projects:", error);
		});
}
function fillAcceptedDetailPage(projectDetails) {
	console.log(projectDetails);

	if (!projectDetails.EndDate) {
		projectDetails.EndDate = "";
	} else {
		projectDetails.EndDate = "- " + projectDetails.EndDate.split("T")[0];
	}

	const projectItem = `<div class="card project-card">
                            <div class="card-header col-12" id="projectTitle">
                                <b>Project:</b> ${projectDetails.Title} 
                                <b> Bedrijf:</b> ${projectDetails.Company}
                            </div>                            
                            <div class="card-body row project-card-body">
                                <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum: </b>${projectDetails.Date.split("T")[0]} ${projectDetails.EndDate}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd: </b>${projectDetails.StartTime.slice(0, 5)} - ${projectDetails.EndTime.slice(0, 5)}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="amountFirstResponders"><b>Hulpverleners nodig: </b> ${projectDetails.PeopleNeeded}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie: </b>${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten: </b> Geen</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectStatus"><b>Status: </b>${projectDetails.IsAccepted}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="ContactPersonName"><b>Contact Persoon: </b>${projectDetails.ContactPerson}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="ContactPersonEmail"><b>Contact Email: </b>${projectDetails.ContactEmailAddress}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="CompanyPhoneNumber"><b>Telefoon Nummer: </b>${projectDetails.PhoneNumber}</p>
                                <p class="card-text col-lg-6 col-sm-6" id="Description"><b>Beschrijving: </b>${projectDetails.Description}</p>
                                <h5 class="col-12">Maak diensten aan</h5>
                                <div class="col-12 " id="shiftCreator">
                                    <label for="shiftBeginTime">Begin Tijd</label>          
                                    <input type="time" id="shiftBeginTime"></input>
                                    <label for="shiftEndTime">Eind Tijd</label>
                                    <input type="time" id="shiftEndTime"></input>
                                    <label for="shiftBeginDate">Begin datum</label>
                                    <input type="date" id="shiftBeginDate"></input>
                                    <label for="shiftEndDate">Eind datum</label>
                                    <input type="date" id="shiftEndDate"></input>
                                    <button class="btn btn-primary float-right " onclick="addShift(${projectDetails.ProjectId})">Add Shift</button>
                                    </br>
                                    </div>
                                    <div class="col-12" id="buttons" >
                                    <button class="btn btn-success float-right "  onclick="setActive(${projectDetails.ProjectId})">Zet actief</button>
                                    </div>
                            </div>
                        </div>`;
	document.getElementById("replacable").innerHTML = projectItem;
}

let shifts = [];

function addShift(projectId) {
	const beginTime = document.getElementById("shiftBeginTime").value;
	const endTime = document.getElementById("shiftEndTime").value;
	const beginDate = document.getElementById("shiftBeginDate").value;
	const endDate = document.getElementById("shiftEndDate").value;

	console.log(projectId);
	console.log(beginTime);
	console.log(endTime);
	console.log(beginDate);
	console.log(endDate);

	shifts.push({
		beginTime: beginTime,
		endTime: endTime,
		beginDate: beginDate,
		endDate: endDate,
		projectId: projectId,
	});
	console.log(shifts);
}
function setActive(id) {
	if (shifts.length === 0) {
		alert("Voeg eerst diensten toe");
		return;
	}
	const jwtToken = window.sessionStorage.getItem("jwtToken");

	fetch("http://localhost:3000/api/setProjectActive", {
		method: "PUT",
		body: JSON.stringify({ projectId: id }),
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: `bearer ${jwtToken}`,
		},
	})
		.then((response) => {
			console.log("Response Status:", response.status);
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
		console.log(shifts[i].projectId);
		console.log(shifts[i].beginTime);
		console.log(shifts[i].endTime);
		console.log(shifts[i].beginDate);
		console.log(shifts[i].endDate);

		fetch("http://localhost:3000/api/createshift", {
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
				console.log("Response Status:", response.status);
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
