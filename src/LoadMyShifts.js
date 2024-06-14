const testShift = {
	ShiftId: 1,
	Title: 'Test Titel',
	StartDate: '2024-12-12',
	EndDate: '2024-12-13',
	StartTime: '15:00:00',
	EndTime: '19:30:00',
	Company: 'Bedrijf B',
	Address: 'Test Straat 55, Breda',
	Description: 'Barbell papa dienst lekker gewichten heffen en trainen enzo en geen hartaanval krijgen, dat soort dingen ja dit komt zeker goed. Barbell papa heeft U nodig om veilig te blijven'
}

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

	shift.StartDate = shift.StartDate.split("T")[0];
	shift.EndDate = shift.EndDate.split("T")[0];

	if(shift.EndDate) {
        shift.EndDate = '- ' + shift.EndDate;
    } else {
        shift.EndDate = '';
    }

    const item = `<div class="card project-list-card" onclick="goShiftDetailPage(${shift.ShiftId})">
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
		const response = await fetch(`https://api-ehbo.onrender.com/api/getShiftById/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset-UTF-8",
				Authorization: `Bearer${jwtToken}`,
			},
		});
		const dataJson = await response.json();
		return dataJson.data;
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

	// Test loading, delete when API end-point is ready
	createDetailShiftCard(testShift);
	return;
	// End of test loading

	getShiftById(event, id)
		.then((shift) => {
			createShiftCard(shift, true);
		}

	)
}

function createDetailShiftCard(shift) {
	if(shift.EndDate) {
        shift.EndDate = '- ' + shift.EndDate;
    } else {
        shift.EndDate = '';
    }

    const item = `<div class="card project-list-card" onclick="goShiftDetailPage(${shift.ShiftId})">
                    <div class="card-header" id="projectTitle">
                        <b>Project:</b> ${shift.Title} 
                    </div>
                    <div class="card-body row project-card-body">
                        <p class="card-text col-lg-4 col-sm-6" id="shiftDate"><b>Datum:</b> ${shift.StartDate} ${shift.EndDate}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftTime"><b>Tijd:</b> ${shift.StartTime.slice(0, 5)} - ${shift.EndTime.slice(0, 5)}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftCompany"><b>Bedrijf:</b> ${shift.Company}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftLocation"><b>Locatie:</b> ${shift.Address}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="shiftNeededCertificates"><b>Benodigde certificaten:</b> Geen</p>
						<p class="card-text col-lg-12 col-sm-12" id="shiftDescription"><b>Beschrijving:</b> ${shift.Description}</p>
						<div class="col-lg-4"></div>					
						<button type="button" class="col-lg-3 sol-sm-12 btn btn-danger" onclick"checkForRemoval(event, ${shift})">Uitschrijven</button>
                    </div>
                </div>`;

	document.getElementById("myShift").innerHTML += item;
}


function checkForRemoval(event, shift) {
	const sevenDaysAway = new Date();
	if(shift.StartDate) {

	}
}


async function removeEnrollment(event, shiftId) {

}