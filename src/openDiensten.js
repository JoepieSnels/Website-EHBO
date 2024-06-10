async function fetchData() {
	const jwtToken = window.sessionStorage.getItem("jwtToken");
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzQ5NDY4MiwiZXhwIjoxNzE4NTMxNDgyfQ.6d_LkUK4VWQcYxWpoRycQlJGfnSbWQ__raMiTurIkFw";
	try {
		const response = await fetch("https://api-ehbo.onrender.com/api/openshifts", {
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		console.log(data.data);
		return data.data;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

//     fetch('https://api-ehbo.onrender.com/api/openshifts', {
//         headers: {
//             "Content-Type": "application/json; charset=UTF-8",
//             Authorization: `Bearer ${token}`,
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         const body = data.data[0]
//         return body

//         // document.getElementById('projectTitle').innerHTML = body.Title;
//         // document.getElementById("projectDate").innerText = body.DateTime.split('T')[0]
//         // document.getElementById("projectTime").innerText = body.DateTime.split('T')[1]
//         // document.getElementById("projectLocation").innerText = `${body.Address} ${body.HouseNr}, ${body.City}`;
//         // document.getElementById('amountFirstResponders').innerText = `${body.PeopleNeeded}/${body.PeopleAssigned}`
//         // document.getElementById('projectNeededCertificates').innerHTML = body.NeededCertificates

//     }
// )
//     .catch(error => console.error('Error:', error));

function generateCards(items) {
	const container = document.getElementById("card-container");
	container.innerHTML = "";
	items.forEach((item) => {
		console.log("item", item);
		const card = document.createElement("div");
		card.className = "card project-card";
		const cardLink = document.createElement("a");
		cardLink.href = "./opendienstenDetail.html";
		const cardBody = document.createElement("div");
		cardBody.className = "card-body row project-card-body";
		let neededCertificates = "";
		if (!item.NeededCertificates) {
			neededCertificates = "-";
		} else {
			neededCertificates = item.NeededCertificates;
		}

		card.innerHTML = `<div class="card-header col-12" id="projectTitle"><b>Project:</b> ${item.Title}</div>`;
		cardBody.innerHTML = `
        
        <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum:</b> ${item.Date.split("T")[0]}</p>
        <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd:</b> ${item.StartTime.slice(0, 5)} - ${item.EndTime.slice(0, 5)}</p>
        <p class="card-text col-lg-4 col-sm-6" id="amountFirstResponders"><b>Hulpverleners nodig:</b> ${item.PeopleAssigned}/${item.PeopleNeeded}</p>
        <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie:</b> ${item.Address} ${item.HouseNr}, ${item.City}</p>
        <p class="card-text col-lg-8 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten:</b> ${neededCertificates}</p>`;

		container.appendChild(card);
		card.appendChild(cardLink);
		cardLink.appendChild(cardBody);
	});
}

async function init() {
	const data = await fetchData();

	if (data && Array.isArray(data)) {
		console.log("in if init");
		generateCards(data);
	} else {
		console.log("init");
	}
}

document.addEventListener("DOMContentLoaded", init);
