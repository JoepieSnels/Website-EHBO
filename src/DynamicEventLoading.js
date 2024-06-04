const testProjectDetails = {
    title: 'Frans Bauer Concert',
    dateTime: '12-12-2024 13:00',
    address: 'TestStraat',
    houseNumber: '14A',
    city: 'Breda',
    company: 'BredaConcerten',
    landLineNumber: null,
    phoneNumber: '06 12345678',
    isAccepted: false,
    isActive: false,
    requestDate: '4-6-2024',
    coordinatorId: null,
    contactPerson: 'Jan Montizaan',
    contactEmail: 'j.montizaan@bredaconcerten.nl',
    description: 'This is test data'
}

function addItem(allProjects) {
    if(allProjects === false) {
        let item = getProjectDetails();
        createCard(item);
    } else {
        allProjects.foreach(createCard);
    }
    
}

function getProjectDetails() {
    // Get event details
    return testProjectDetails;
}

function createCard(projectDetails) {
    projectDetails = testProjectDetails;
    if(projectDetails.isAccepted === true) {
        projectDetails.isAccepted = 'Accepted';
    } else {
        projectDetails.isAccepted = 'Denied';
    }

var item = `<div class="eventCard" onclick="location.href = 'index.html';   ">
                <div class="row">
                    <div class="col-lg-3 col-12 eventItem">
                        <h3 id="title">${projectDetails.title}</h3>
                        <h5 id="businessName">${projectDetails.company}</h5>
                    </div>
                    <div class="col-lg-2 col-5">
                        <p>Datum & Tijd:</p>
                        <p>Aanvraag datum:</p>
                    </div>
                    <div class="col-lg-2 col-7">
                        <p id="dateOfEvent">${projectDetails.dateTime}</p>
                        <p id="dateOfRequest">${projectDetails.requestDate}</p>
                    </div>
                    <div class="col-lg-5 col-12 eventItem">
                        <p>Status: ${projectDetails.isAccepted}</p>
                    </div>
                </div>
            </div>`

    document.getElementById('eventCards').innerHTML += item;
}

// Load all projects from the database using the API
async function getProjectsFromDB(event) {
    console.log('Loading projects from Database');
    event.preventDefault();

    try {

            //list of items will be named allProjects
            let allProjects = false;
            addItem(allProjects);
    } catch(error) {
        console.log('Error fetching data: ' + error);
    }

}