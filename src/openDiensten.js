async function fetchData() {
	const jwtToken = window.sessionStorage.getItem("jwtToken"); // Haalt de token op uit de session
	try {
		const response = await fetch("http://localhost:3000/api/getActiveProjects", {
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
		card.className = "card project-card";
		const cardLink = document.createElement("div");

		cardLink.onclick = () => loadDetail(item.Id); // Corrected to use a function
		const cardBody = document.createElement("div");
		cardBody.className = "card-body row project-card-body";
		let neededCertificates = item.CertificatesNeeded || "-";

		card.innerHTML = `<div class="card-header col-12" id="projectTitle"><b>Project:</b> ${item.Title}</div>`;
		cardBody.innerHTML = `
			<p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum:</b> ${item.Date.split("T")[0]}</p>
			<p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd:</b> ${item.StartTime.slice(0, 5)} - ${item.EndTime.slice(0, 5)}</p>
			<p class="card-text col-lg-4 col-sm-6" id="Description"><b>Beschrijving:</b></br>${item.Description}</p>
			<p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie:</b> ${item.Address} ${item.HouseNr}, ${item.City}</p>
			<p class="card-text col-lg-8 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten:</b> ${neededCertificates}</p>
			<p class="card-text col-lg-8 col-sm-6" id="Contact"><b>Contactgegevens:</b> ${item.ContactPerson}, ${item.ContactEmail}, ${item.Phonenumber}, ${item.LandLineNumber}</p>`;

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
