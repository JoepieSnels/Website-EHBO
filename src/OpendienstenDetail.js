async function init() {
	const data = await fetchData();
	if (data && Array.isArray(data)) {
		console.log("in if init");
		generateCards(data);
	} else {
		console.log("init");
	}
}
async function fetchData() {
	try {
		const response = await fetch("https://api-ehbo.onrender.com/api/openshiftsdetail", {
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}
function generateCards(data) {
	console.log("in generateCards");
	const cardContainer = document.getElementById("cardContainer");
	data.forEach((item) => {
		const card = document.createElement("div");
		card.classList.add("card");
		card.innerHTML = `
		<div class="card-header">
		<h3 class="float-left"> ${item.title}</h3>
		<h3 class="float-right"> ${item.company}</h3>
		</div>

        <div class="card-body">
            <h5 class="card-title"></h5>

            <p class="card-text">${item.description}</p>
            
        </div>
        `;
		cardContainer.appendChild(card);
	});
}
