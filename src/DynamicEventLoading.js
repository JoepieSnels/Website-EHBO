const testProjectDetails = {
    title: 'Frans Bauer Concert',
    startDateTime: '12-12-2024 13:00',
    endDateTime: '12-12-2024 17:00',
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
    description: 'This is test data',
    id: 1
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

var item = `<div class="eventCard" onclick="nextPage('${projectDetails.id}')">
                <div class="row">
                    <div class="card-header col-lg-12 col-12">
                        <div class="col-lg-12 col-12 eventItem">
                            <h3 class="card-title" id="title">${projectDetails.title}</h3>
                            <h5 class="card-title" id="businessName">${projectDetails.company}</h5>
                        </div>
                    </div>
                    <div class="card-body row">
                        <div class="col-lg-12 col-12 eventItem">
                            <p class="card-text">Datum & Tijd van evenement: ${projectDetails.startDateTime} tot ${projectDetails.endDateTime}</p>
                            <p class="card-text">Aanvraag datum: ${projectDetails.requestDate}</p>
                        </div>
                        <div class="col-lg-12 col-12 eventItem">
                            <div class="d-none d-lg-flex">
                                <br />
                            </div>
                            <p>Status: ${projectDetails.isAccepted}</p>
                        </div>
                    </div>
                </div>
            </div>`

    document.getElementById('eventCards').innerHTML += item;
    console.log(projectDetails.id);
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

async function getProjectsFromDBWithId(event, id) {
    console.log('Loading project with ID Number: ' + id);
    event.preventDefault();

    // Item loaded from database based on ID
    let projectItem = testProjectDetails;
    loadDetailPage(projectItem);
    try {

    } catch(error) {
        console.log('Error fetching data: ' + error);
    }
}

function nextPage(projectItemId) {
    var url = '/testpage.html?id=' + encodeURIComponent(projectItemId);

    document.location.href = url;
}

function loadProjectDetails(event) {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
        console.log(params);
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    console.log(data);
    document.getElementById('test').innerHTML = data.id;

    getProjectsFromDBWithId(event, data.id);
}

function loadDetailPage(projectItem) {
    document.getElementById('test2').innerHTML = projectItem.id;
}