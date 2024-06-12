async function fetchData() {
	const jwtToken = window.sessionStorage.getItem("jwtToken"); // Haalt de token op uit de session
	try {
		const response = await fetch("https://api-ehbo.onrender.com/api/getActiveProjects", {
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: `bearer ${jwtToken}`, // Ensure the format is correct
			},
		});

		console.log("Response Status:", response.status);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log(data.data);
		return data.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

function generateCards(items) {
	const container = document.getElementById("card-container");
	container.innerHTML = "";
	items.forEach((item) => {
		console.log("item", item);
		const card = document.createElement("div");
		let neededCertificates = item.CertificatesNeeded || "-";

		card.innerHTML = `
		<div class="card project-list-card" onclick="goToDetail(${item.ProjectId})">
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

function goToDetail(projectId) {
	document.location.href = `./Openshifts.html?id=${projectId}`;
}
async function loadActiveProjects(requiredPermission) {
	if(getPermission(requiredPermission)) {
		const data = await fetchData();

		if (data && Array.isArray(data)) {
			console.log("in if init");
			generateCards(data);
		} else {
			console.log("init");
		}
	}
	
}
function loadShifts(event) {
	event.preventDefault();

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

	getShifts(event, projectId)
		.then((shifts) => {
			fillShiftPage(shifts, projectId);
		})
		.catch((error) => {
			console.log("Error loading projects:", error);
		});
}

async function getShifts(event, projectId) {
	if (event) {
		event.preventDefault();
	}
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
		alert("Inschrijving gelukt!");
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

	let projectItems = "";

	shiftDetailsArray.forEach((shiftDetails) => {
		if (!shiftDetails.StartDate) {
			console.error("No StartDate in shift details");
			return;
		}

		let endDate = shiftDetails.EndDate ? "- " + shiftDetails.EndDate.split("T")[0] : "";

		const projectItem = `<div class="card project-card">
                                <div class="card-header col-12" id="projectTitle">
                                    <b>Shift:</b> ${shiftDetails.ShiftId}
                                </div>                            
                                <div class="card-body row project-card-body">
                                    <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum: </b>${shiftDetails.StartDate.split("T")[0]} ${endDate}</p>
                                    <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd: </b>${shiftDetails.StartTime.slice(0, 5)} - ${shiftDetails.EndTime.slice(0, 5)}</p>
                                    <h5 class="col-12">Schrijf je in!</h5>
									<div class="col-12">
                                    <button class="btn btn-primary float-right" onclick="assignShift('${shiftDetails.ShiftId}', '${projectId}')">Schrijf in!</button>
									</div>
                                </div>
                            </div>`;
		projectItems += projectItem;
	});

	document.getElementById("replacable").innerHTML = projectItems;
}
