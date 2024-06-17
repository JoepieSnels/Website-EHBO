async function onLoadUserInfo(requiredPermission) {
	console.log("On page load");

	// HARDCODDED, WEGHALEN ZODRA LOGIN WERKT
	// createSessionAndPermission('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTcxNzUwNjQ2MCwiZXhwIjoxNzE4NTQzMjYwfQ.YrckiyoGuslcp_5oiBpT6fAe8lUfQAadTwOh1HmR9ow', 'Hulpverlener!Coordinator');

	const jwtToken = window.sessionStorage.getItem("jwtToken"); // Haalt de token op uit de session
	const permissions = window.sessionStorage.getItem("permissions"); // Haalt de permissies op

	// Kijkt of de token een waarde heeft, zo nee is het null en stuurt hij de gebruiker naar de login page
	if (jwtToken === null) {
		alertNoAcces();
		return;
	}

	// Kijk of in de string van permissies de benodigde permissie zit
	if (permissions === null || !permissions.match(requiredPermission)) {
		alertNoAcces();
		return;
	}

	// Maak verzoek naar de server om te kijken of de token geldig is
	const apiRoute = "https://api-ehbo.onrender.com/api/validatetoken";
	const validateResult = await fetch(apiRoute, {
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: `bearer ${jwtToken}`,
		},
	});

	const toJson = await validateResult.json();

	if (toJson.message === "Not authorized") {
		alertNoAcces();
		return;
	}

	document.getElementById("unBlockID").style.display = "block"; // Even controleren welke dit moet zijn
}

// function fillAcceptedDetailPage(projectDetails) {
// 	console.log(projectDetails);

// 	if (!projectDetails.EndDate) {
// 		projectDetails.EndDate = "";
// 	} else {
// 		projectDetails.EndDate = "- " + projectDetails.EndDate.split("T")[0];
// 	}

// 	const projectItem = `<div class="card project-card">
//                             <div class="card-header col-12" id="projectTitle">
//                                 <b>Project:</b> ${projectDetails.Title}
//                                 <b> Bedrijf:</b> ${projectDetails.Company}
//                             </div>
//                             <div class="card-body row project-card-body">
//                                 <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum: </b>${projectDetails.Date.split("T")[0]} ${projectDetails.EndDate}</p>
//                                 <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd: </b>${projectDetails.StartTime.slice(0, 5)} - ${projectDetails.EndTime.slice(0, 5)}</p>
//                                 <p class="card-text col-lg-4 col-sm-6" id="amountFirstResponders"><b>Hulpverleners nodig: </b> ${projectDetails.PeopleNeeded}</p>
//                                 <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie: </b>${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}</p>
//                                 <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten: </b> Geen</p>
//                                 <p class="card-text col-lg-4 col
//                         <p class="card-text col-lg-4 col-sm-6" id="projectStatus"><b>Status:</b> ${projectDetails.IsAccepted}</p>
//                     </div>
//                 </div>`;

// 	document.getElementById("eventCards").innerHTML += projectItem;

// 	console.log(projectDetails.Id);
// }
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

// function fillAcceptedDetailPage(projectDetails) {
// 	console.log(projectDetails);

// 	if (!projectDetails.EndDate) {
// 		projectDetails.EndDate = "";
// 	} else {
// 		projectDetails.EndDate = "- " + projectDetails.EndDate.split("T")[0];
// 	}

// 	const projectItem = `<div class="card project-card">
//                             <div class="card-header col-12" id="projectTitle">
//                                 <b>Project:</b> ${projectDetails.Title}
//                                 <b> Bedrijf:</b> ${projectDetails.Company}
//                             </div>
//                             <div class="card-body row project-card-body">
//                                 <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum: </b>${projectDetails.Date.split("T")[0]} ${projectDetails.EndDate}</p>
//                                 <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd: </b>${projectDetails.StartTime.slice(0, 5)} - ${projectDetails.EndTime.slice(0, 5)}</p>
//                                 <p class="card-text col-lg-4 col-sm-6" id="amountFirstResponders"><b>Hulpverleners nodig: </b> ${projectDetails.PeopleNeeded}</p>
//                                 <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie: </b>${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}</p>
//                                 <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten: </b> Geen</p>
//                                 <p class="card-text col-lg-4 col
//                         <p class="card-text col-lg-4 col-sm-6" id="projectStatus"><b>Status:</b> ${projectDetails.IsAccepted}</p>
//                     </div>
//                 </div>`;

// 	document.getElementById("eventCards").innerHTML += projectItem;

// 	console.log(projectDetails.Id);
// }
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
	const status = setStatus(projectDetails.IsAccepted);

	var item = `<div class="card project-list-card" onclick="goAcceptedDetailPage(${projectDetails.ProjectId})">
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
	console.log(projectDetails.Id);
}

//gebruikt
function goAcceptedDetailPage(id) {
	document.location.href = `./CreateShift.html?id=${id}`;
}

//gebruikt
function loadAcceptedProjects(requiredPermission) {
	if(getPermission(requiredPermission)) {
		getAcceptedProjectsFromDB()
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
	
}

//gebruikt
async function getAcceptedProjectsFromDB() {
	const jwtToken = window.sessionStorage.getItem("jwtToken");
	console.log("Loading projects from Database");
	

	try {
		const response = await fetch("https://api-ehbo.onrender.com/api/getAcceptedProjects", {
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

async function getProjectsFromDB() {
	const jwtToken = window.sessionStorage.getItem("jwtToken");
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzQ5NDY4MiwiZXhwIjoxNzE4NTMxNDgyfQ.6d_LkUK4VWQcYxWpoRycQlJGfnSbWQ__raMiTurIkFw";
	console.log("Loading projects from Database");


	try {
		const response = await fetch("https://api-ehbo.onrender.com/api/getAllUndecidedProjects", {
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

function loadAllProjects(requiredPermission) {
	if(getPermission(requiredPermission)) {
		getProjectsFromDB()
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
	
}

//gebruikt
// Load project based on ID

async function getProjectsFromDBWithId(id) {
	console.log(id);
	const jwtToken = window.sessionStorage.getItem("jwtToken");
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzQ5NDY4MiwiZXhwIjoxNzE4NTMxNDgyfQ.6d_LkUK4VWQcYxWpoRycQlJGfnSbWQ__raMiTurIkFw";
	console.log("Loading project with Id: " + id);


	try {
		const response = await fetch(`https://api-ehbo.onrender.com/api/getProject?projectId=${id}`, {
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

function loadProjectDetails() {
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

	getProjectsFromDBWithId(data.id)
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
	console.log(params);
	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split("=");
		data[tmp[0]] = tmp[1];
	}
	console.log(data.id);

	getProjectsFromDBWithId( data.id)
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

	fetch("https://api-ehbo.onrender.com/api/acceptproject", {
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

	fetch("https://api-ehbo.onrender.com/api/rejectproject", {
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
//gebruikt
function loadAcceptedProjectDetails(requiredPermission) {
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
	console.log(data.id);

	getProjectsFromDBWithId(data.id)
		.then((project) => {
			console.log(project);
			fillAcceptedDetailPage(project);
		})
		.catch((error) => {
			console.log("Error loading projects:", error);
		});
	}
	
}

//gebruikt
function fillAcceptedDetailPage(projectDetails) {
	console.log(projectDetails);

	if (!projectDetails.EndDate) {
		projectDetails.EndDate = "";
	} else {
		projectDetails.EndDate = "- " + projectDetails.EndDate.split("T")[0];
	}

	const status = setStatus(projectDetails.IsAccepted);

	const projectItem = `<div class="card project-card">
                            <div class="card-header col-12" id="projectTitle">
                                <b>Project:</b> ${projectDetails.Title} 

                            </div>                            
                            <div class="card-body row project-card-body">
                                <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum: </b>${projectDetails.Date.split("T")[0]} ${projectDetails.EndDate}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd: </b>${projectDetails.StartTime.slice(0, 5)} - ${projectDetails.EndTime.slice(0, 5)}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectCompany"><b>Bedrijf: </b> ${projectDetails.Company}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie: </b>${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten: </b> Geen</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectStatus"><b>Status: </b>${status}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="ContactPersonName"><b>Contact Persoon: </b>${projectDetails.ContactPerson}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="ContactPersonEmail"><b>Contact Email: </b>${projectDetails.ContactEmailAddress}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="CompanyPhoneNumber"><b>Telefoon Nummer: </b>${projectDetails.PhoneNumber}</p>
                                <p class="card-text col-lg-7 col-sm-7" id="Description"><b>Beschrijving: </b>${projectDetails.Description}</p>
								<br>
							
                                <h5 class="col-12">Maak diensten aan</h5>
                                <div class="container" id="shiftCreator">
									<div class="shift0" id="shift0">
										<div class="row">
											<label for="shiftBeginTime" class="col-3">Begin Tijd</label>          
											<input type="time" id="shiftBeginTime0" class="col-3"></input>
											<label for="shiftEndTime" class="col-3">Eind Tijd</label>
											<input type="time" id="shiftEndTime0" class="col-3"></input>
										</div>
										<div class="row">
											<label for="shiftBeginDate" class="col-3">Begin datum</label>
											<input type="date" id="shiftBeginDate0" class="col-3"></input>
											<label for="shiftEndDate" class="col-3">Eind datum</label>
											<input type="date" id="shiftEndDate0" class="col-3"></input>
										</div>
									</div>
								</div>
								<div class="container" id="knop">
									<div class="row">
										<div class="col-12" style="padding-top: 20px">
											<button class="btn btn-primary float-left" onclick="addShift(${projectDetails.ProjectId})" >Add Shift</button>
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
function checkInput() {
	const beginTime = document.getElementById(`shiftBeginTime${count}`).value;
	const endTime = document.getElementById(`shiftEndTime${count}`).value;
	const beginDate = document.getElementById(`shiftBeginDate${count}`).value;
	const endDate = document.getElementById(`shiftEndDate${count}`).value;
	let alert = "";
	if (!beginTime || !endTime || !beginDate || !endDate) {
		console.log("leeg veld");
		alert = "Een veld mist";
		return false;
	}
	// if(validateDate(beginDate, endDate) && validateTime(beginTime, endTime, beginDate, endDate)) {
	// 	return true
	// }
	// return false

	// if(!validateDate(beginDate, endDate)) {
	// 	console.log('datum')
	// 	alert = 'Einddatum moet voor begindatum zijn'
	// 	return false;
	// }
	// if (!validateTime(beginTime, endTime, beginDate, endDate)) {
	// 	console.log('tijd')
	// 	alert = 'Eindtijd moet na begintijd zijn'
	// 	return false;
	// }
	// return 'hoi'
}
function addShift(projectId) {
	// if(!checkInput()) {
	// 	alert("NEEE")
	// } else {
	// alert(checkInput())
	appendShiftForm(count + 1);

	const beginTime = document.getElementById(`shiftBeginTime${count}`).value;
	const endTime = document.getElementById(`shiftEndTime${count}`).value;
	const beginDate = document.getElementById(`shiftBeginDate${count}`).value;
	const endDate = document.getElementById(`shiftEndDate${count}`).value;

	shifts.push({
		beginTime: beginTime,
		endTime: endTime,
		beginDate: beginDate,
		endDate: endDate,
		projectId: projectId,
	});

	hideLastShift(count);
	count++;

	//}
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

	fetch("https://api-ehbo.onrender.com/api/setProjectActive", {
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

		fetch("https://api-ehbo.onrender.com/api/createshift", {
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
