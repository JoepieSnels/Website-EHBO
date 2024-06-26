function loadShifts(requiredPermission) {
	if (getPermission(requiredPermission)) {
		getShiftsFromDB()
			.then((shifts) => {
				for (let i = 0; i < shifts.length; i++) {
					createDetailShiftCard(shifts[i]);
				}
			})
			.catch((error) => {
				console.log("Error loading projects:", error);
			});
	}
}

function createShiftCard(shift) {
	shift.StartDate = shift.StartDate.split("T")[0];
	shift.EndDate = shift.EndDate.split("T")[0];

	if (shift.EndDate === shift.StartDate) {
		shift.StartDate = "- " + shift.EndDate;
	} else {
		shift.EndDate = "";
	}

	const item = `<div class="card project-list-card clickable-card" onclick="goShiftDetailPage(${shift.ShiftId})">
                    <div class="card-header" id="projectTitle">
                        <b>Project:</b> ${shift.Title} 
                    </div>
                    <div class="card-body row project-card-body">
                        <p class="card-text col-lg-4 col-sm-6" id="shiftDate"><b>Datum:</b> ${shift.StartDate} ${shift.EndDate}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftTime"><b>Tijd:</b> ${shift.StartTime.slice(0, 5)} - ${shift.EndTime.slice(0, 5)}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftCompany"><b>Bedrijf:</b> ${shift.Company}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftLocation"><b>Locatie:</b> ${shift.Address}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftNeededCertificates"><b>Benodigde certificaten:</b> Geen</p>
						<p class="card-text text-truncate col-lg-12 col-sm-12" id="shiftDescription"><b>Beschrijving:</b> ${shift.Description}</p>
                    </div>
                </div>`;

	document.getElementById("myShift").innerHTML += item;
}

async function getShiftsFromDB() {
	const jwtToken = window.sessionStorage.getItem("jwtToken");
	try {
		const response = await fetch(`${config.apiURL}/api/getMyShifts`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset-UTF-8",
				Authorization: `Bearer ${jwtToken}`,
			},
		});
		const dataJson = await response.json();
		return dataJson.data;
	} catch (error) {
		console.log("Error fetching data: " + error);
	}
}

async function getShiftById(id) {
	const jwtToken = window.sessionStorage.getItem("jwtToken");
	try {
		const response = await fetch(`${config.apiURL}/api/getShiftById?shiftId=${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset-UTF-8",
				Authorization: `Bearer ${jwtToken}`,
			},
		});
		const dataJson = await response.json();
		return dataJson.data[0];
	} catch (error) {
		console.log("Error fetching data: " + error);
	}
}

function goShiftDetailPage(id) {
	document.location.href = `./MyShiftDetail.html?id=${id}`;
}

function loadShiftDetailPage(requiredPermission) {
	if (getPermission(requiredPermission)) {
		var url = document.location.href,
			params = url.split("?")[1].split("&"),
			data = {},
			tmp;

		for (var i = 0, l = params.length; i < l; i++) {
			tmp = params[i].split("=");
			data[tmp[0]] = tmp[1];
		}

		getShiftById(data.id).then((shift) => {
			createDetailShiftCard(shift);
		});
	}
}

function createDetailShiftCard(shift) {
	const startDate = shift.StartDate.split("T")[0];
	const endDate = shift.EndDate.split("T")[0];
	let date = "";

	if (shift.StartDate === shift.EndDate) {
		date = startDate;
	} else {
		date = `${startDate} - ${endDate}`;
	}

	const item = `<div class="card project-list-card">
                    <div class="card-header row" id="projectTitle">
                        <div class="col-lg-10 col-sm-8"><b>Project:</b> ${shift.Title} </div>
						<button type="button" class="col-lg-2 col-sm-4 btn-danger btn d-none d-md-block" onclick="checkForRemoval(${shift.ShiftId}, '${shift.StartDate}')">Uitschrijven</button>
                    </div>
                    <div class="card-body row project-card-body">
                        <p class="card-text col-lg-4 col-sm-6" id="shiftDate"><b>Datum:</b> ${date}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftTime"><b>Tijd:</b> ${shift.StartTime.slice(0, 5)} - ${shift.EndTime.slice(0, 5)}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftCompany"><b>Bedrijf:</b> ${shift.Company}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftLocation"><b>Locatie:</b> ${shift.Address}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftNeededCertificates"><b>Benodigde certificaten:</b> Geen</p>
						<p class="card-text col-lg-12 col-sm-12" id="shiftDescription"><b>Beschrijving:</b> ${shift.Description}</p>
						<button type="button" class="col-12 btn btn-danger d-block d-sm-none" onclick="checkForRemoval(${shift.ShiftId}, '${shift.StartDate}')">Uitschrijven</button>
                    </div>
					
                </div>`;

	document.getElementById("myShift").innerHTML += item;
}

function checkForRemoval(shiftId, shiftStartDate) {
	const shiftDate = new Date(shiftStartDate);
	const date = new Date();
	const sevenDaysFromNow = new Date(date.setDate(date.getDate() + 7));

	if (shiftDate > sevenDaysFromNow) {
		removeEnrollment(shiftId).then((response) => {
			if (response.status === 200) {
				alert("Dienst verwijderd");
				document.location.href = `./MyShifts.html`;
			} else {
				alert("Dienst kon niet worden verwijderd");
			}
		});
	} else {
		alert("Shift mag niet worden verwijderd omdat deze binnen 7 dagen plaatsvindt");
	}
}

async function removeEnrollment(shiftId) {
	const jwtToken = window.sessionStorage.getItem("jwtToken");
	console.log("Deleting assigned shift with ID: " + shiftId);

	try {
		const response = await fetch(`${config.apiURL}/api/deleteAssignedShift`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${jwtToken}`,
			},
			body: JSON.stringify({
				shiftId: shiftId,
			}),
		});
		return await response.json();
	} catch (error) {
		console.log("Error fetching data: " + error);
	}
}
