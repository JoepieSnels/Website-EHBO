function loadShifts(event) {

    getShiftsFromDB(event)
		.then((shift) => {
			for (let i = 0; i < shift.length; i++) {
				createShiftCard(shift[i]);
			}
		})
		.catch((error) => {
			console.log("Error loading projects:", error);
		});
}

function createShiftCard(shift) {
	console.log(shift);

	if(shift.EndDate) {
		const date = new Date().toISOString();
		if(shift.EndDate < date || shift.EndDate === date) {
			return;
		} else {
			shift.EndDate = '- ' + shift.EndDate;
		}
    } else {
        shift.EndDate = '';
    }

    const item = `<div class="card project-list-card" onclick="goShiftDetailPage(${shift.ShiftId})">
                    <div class="card-header" id="projectTitle">
                        <b>Project:</b> ${shift.Title} 
                    </div>
                    <div class="card-body row project-card-body">
                        <p class="card-text col-lg-4 col-sm-6" id="shiftDate"><b>Datum:</b> ${shift.StartDate.split("T")[0]} ${shift.EndDate.split("T")[0]}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftTime"><b>Tijd:</b> ${shift.StartTime.slice(0, 5)} - ${shift.EndTime.slice(0, 5)}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftCompany"><b>Bedrijf:</b> ${shift.Company}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftLocation"><b>Locatie:</b> ${shift.Address}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftNeededCertificates"><b>Benodigde certificaten:</b> Geen</p>
						<p class="card-text text-truncate col-lg-12 col-sm-12" id="shiftDescription"><b>Beschrijving:</b> ${shift.Description}</p>
                    </div>
                </div>`;

	document.getElementById("myShift").innerHTML += item;
}

// Get an array of shifts from the database from this user
async function getShiftsFromDB(event) {
    event.preventDefault();
    const jwtToken = window.sessionStorage.getItem("jwtToken");
	console.log("Loading shifts from DB");

    try {
		const response = await fetch("https://api-ehbo.onrender.com/api/getMyShifts", {
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

async function getShiftById(event, id) {
	event.preventDefault();
	const jwtToken = window.sessionStorage.getItem("jwtToken");
	console.log('Loading shift with ID: ' + id);

	try {
		const response = await fetch(`https://api-ehbo.onrender.com/api/getShiftById?shiftId=${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${jwtToken}`,
			}
		});
		const dataJson = await response.json();
		console.log(dataJson.data);
		return dataJson.data[0];
	} catch(error) {
		console.log('Error fetching data: ' + error);
	}
}

function goShiftDetailPage(id) {
	document.location.href = `./MyShiftDetail.html?id=${id}`;
}

function loadShiftDetailPage(event) {
	var url = document.location.href,
		params = url.split("?")[1].split("&"),
		data = {},
		tmp;
	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split("=");
		data[tmp[0]] = tmp[1];
	}

	getShiftById(event, data.id)
		.then((shift) => {
			createDetailShiftCard(shift);
		});
}

function createDetailShiftCard(shift) {
	console.log(shift);
	console.log(shift.UserId);
	if(shift.EndDate) {
        shift.EndDate = '- ' + shift.EndDate;
    } else {
        shift.EndDate = '';
    }

    const item = `<div class="card project-list-card">
                    <div class="card-header row" id="projectTitle">
                        <p class=col-lg-10><b>Project:</b> ${shift.Title} </p>
						<button type="button" class="col-lg-2 sol-sm-4 btn btn-danger" onclick="checkForRemoval(event, '${shift.StartDate}', ${shift.ShiftId})" >Uitschrijven</button>
                    </div>
                    <div class="card-body row project-card-body">
                        <p class="card-text col-lg-4 col-sm-6" id="shiftDate"><b>Datum:</b> ${shift.StartDate.split("T")[0]} ${shift.EndDate.split("T")[0]}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftTime"><b>Tijd:</b> ${shift.StartTime.slice(0, 5)} - ${shift.EndTime.slice(0, 5)}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftCompany"><b>Bedrijf:</b> ${shift.Company}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftLocation"><b>Locatie:</b> ${shift.Address}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftNeededCertificates"><b>Benodigde certificaten:</b> Geen</p>
						<p class="card-text col-lg-12 col-sm-12" id="shiftDescription"><b>Beschrijving:</b> ${shift.Description}</p>
                    </div>
                </div>`;

	document.getElementById("myShift").innerHTML += item;
}

function checkForRemoval(event, shiftStartDate, shiftId) {
	event.preventDefault(); // This is redundant for a button of type "button"
	console.log(shiftId)
	
	const date = new Date();
	const sevenDaysFromNow = new Date(date.setDate(date.getDate() + 7)).toISOString(); // Fix to get correct date
	console.log(shiftStartDate);
	console.log(sevenDaysFromNow);
	
	if (shiftStartDate > sevenDaysFromNow) {
		// Add removal
		removeEnrollment(event, shiftId)
			.then((response) => {
				if(response.status === 200) {
					alert('Dienst verwijderd');
					document.location.href = `./MyShifts.html`;
				} else {
					alert('Dienst kon niet worden verwijderd');
				}
			})
	} else {
		alert('Shift mag niet worden verwijderd omdat deze binnen 7 dagen plaatsvindt');
	}
}

async function removeEnrollment(event, id) {
	event.preventDefault();
	const jwtToken = window.sessionStorage.getItem("jwtToken");
	console.log('Deleting assigned shift with ID: ' + id);

	try {

		const response = await fetch('https://api-ehbo.onrender.com/api/deleteAssignedShift', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${jwtToken}`
			},
			body: JSON.stringify({shiftId: id})
		});
	
		const jsonResponse = await response.json();
		console.log(jsonResponse);
		return jsonResponse;
	
		} catch (error) {
			console.error('error', error);
		}
}