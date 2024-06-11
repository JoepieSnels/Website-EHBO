function createCard(projectDetails) {
    console.log(projectDetails);
    // projectDetails = testProjectDetails;

    projectDetails.RequestDate = projectDetails.RequestDate.split('T')[0];
    projectDetails.Date = projectDetails.Date.split('T')[0];
    if(projectDetails.IsAccepted === undefined || projectDetails.IsAccepted === null) {
        projectDetails.IsAccepted = 'No Reply';
    }

    var item = `<div class="card project-card" onclick="goDetailPage(${projectDetails.ProjectId})">
                    <div class="card-header" id="projectTitle">
                        <b>Project:</b> ${projectDetails.Title} 
                        <b> Bedrijf:</b> ${projectDetails.Company}
                    </div>
                    <div class="card-body row project-card-body">
                        <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum:</b> ${projectDetails.Date}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd:</b> ${projectDetails.StartTime.slice(0,5)} - ${projectDetails.EndTime.slice(0,5)}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="amountFirstResponders"><b>Hulpverleners nodig:</b> ${projectDetails.PeopleNeeded}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie:</b> ${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten:</b> Geen</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectStatus"><b>Status:</b> ${projectDetails.IsAccepted}</p>
                    </div>
                </div>`

    document.getElementById('eventCards').innerHTML += item;
    console.log(projectDetails.Id);
}

// Load all undecided projects from the database using the API
async function getProjectsFromDB(event) {
    const jwtToken = window.sessionStorage.getItem('jwtToken')
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzQ5NDY4MiwiZXhwIjoxNzE4NTMxNDgyfQ.6d_LkUK4VWQcYxWpoRycQlJGfnSbWQ__raMiTurIkFw'
    console.log('Loading projects from Database');
    event.preventDefault();

    try {
            const response = await fetch('http://localhost:3000/api/getAllUndecidedProjects', {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json; charset-UTF-8',
                    Authorization: `Bearer${token}`
                }

            });
            const dataJson = await response.json();
            console.log(dataJson);
            return dataJson.data;
    } catch(error) {
        console.log('Error fetching data: ' + error);
    }

}

function loadAllProjects(event) {
    getProjectsFromDB(event).then(projects => {
        console.log(projects[0].Title)
        for(let i = 0; i < projects.length; i++) {
            createCard(projects[i]);
        }
    }).catch(error => {
        console.log('Error loading projects:', error);
    });
}


// Load project based on ID
async function getProjectsFromDBWithId(event, id) {
    console.log(id);
    const jwtToken = window.sessionStorage.getItem('jwtToken');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzQ5NDY4MiwiZXhwIjoxNzE4NTMxNDgyfQ.6d_LkUK4VWQcYxWpoRycQlJGfnSbWQ__raMiTurIkFw';
    console.log('Loading project with Id: ' + id);
    event.preventDefault();

    try {
        const response = await fetch(`http://localhost:3000/api/getProject?projectId=${id}`, {
            method: 'GET', // Use GET method
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        });

        const dataJson = await response.json();
        return dataJson.data;

    } catch (error) {
        console.log('Error fetching data: ' + error);
    }
}

// Load all projects with IsActive === 1 (true)
async function getActiveProjectsFromDB(event) {
    event.preventDefault();
    const jwtToken = window.sessionStorage.getItem('jwtToken');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzQ5NDY4MiwiZXhwIjoxNzE4NTMxNDgyfQ.6d_LkUK4VWQcYxWpoRycQlJGfnSbWQ__raMiTurIkFw';
    console.log('Loading all active projects');

    try {
        const response = await fetch('https://api-ehbo.onrender.com/api/getActiveProjects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
            }
        });

        const dataJson = await response.json();
        return dataJson.data;
    } catch(error) {
        console.log('Error fetching data: ' + error);
    }
}

// Begin of loading details of a project

function goDetailPage(id) {
    document.location.href = `./EventDetail.html?id=${id}`
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
    console.log(data.id);

    getProjectsFromDBWithId(event, data.id).then(project => {
        console.log(project)
        fillDetailPage(project);
    }).catch(error => {
        console.log('Error loading projects:', error);
    });
}

function fillDetailPage(projectDetails) {
    console.log(projectDetails);

    if(!projectDetails.EndDate) {
        projectDetails.EndDate = ''
    } else {
        projectDetails.EndDate = '- ' + projectDetails.EndDate.split('T')[0];
    }
    
    const projectItem = `<div class="card project-card">
                            <div class="card-header col-12" id="projectTitle">
                                <b>Project:</b> ${projectDetails.Title} 
                                <b> Bedrijf:</b> ${projectDetails.Company}
                            </div>                            
                            <div class="card-body row project-card-body">
                                <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum: </b>${projectDetails.Date.split('T')[0]} ${projectDetails.EndDate}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd: </b>${projectDetails.StartTime.slice(0,5)} - ${projectDetails.EndTime.slice(0,5)}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="amountFirstResponders"><b>Hulpverleners nodig: </b> ${projectDetails.PeopleNeeded}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie: </b>${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten: </b> Geen</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectStatus"><b>Status: </b>${projectDetails.IsAccepted}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="ContactPersonName"><b>Contact Persoon: </b>${projectDetails.ContactPerson}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="ContactPersonEmail"><b>Contact Email: </b>${projectDetails.ContactEmailAddress}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="CompanyPhoneNumber"><b>Telefoon Nummer: </b>${projectDetails.PhoneNumber}</p>
                                <p class="card-text col-lg-6 col-sm-6" id="Description"><b>Beschrijving: </b>${projectDetails.Description}</p>
                            </div>
                        </div>`
    document.getElementById('replacable').innerHTML = projectItem;
}

// End of load project details

// Start of load all active projects

function loadActiveProjects(event) {
    getActiveProjectsFromDB(event).then(projects => {
        console.log(projects[0].Title)
        for(let i = 0; i < projects.length; i++) {
            createActiveProjectCard(projects[i]);
        }
    }).catch(error => {
        console.log('Error loading projects:', error);
    });
}

function createActiveProjectCard(projectDetails) {
    console.log(projectDetails);

    projectDetails.RequestDate = projectDetails.RequestDate.split('T')[0];
    projectDetails.Date = projectDetails.Date.split('T')[0];
    if(projectDetails.IsActive === true) {
        projectDetails.IsActive = 'Actief';
    }

    var item = `<div class="card project-card" onclick="goDetailPage(${projectDetails.ProjectId})">
                    <div class="card-header" id="projectTitle">
                        <b>Project:</b> ${projectDetails.Title} 
                        <b> Bedrijf:</b> ${projectDetails.Company}
                    </div>
                    <div class="card-body row project-card-body">
                        <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum:</b> ${projectDetails.Date}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd:</b> ${projectDetails.StartTime.slice(0,5)} - ${projectDetails.EndTime.slice(0,5)}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="amountFirstResponders"><b>Email:</b> ${projectDetails.ContactEmailAddress}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie:</b> ${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten:</b> Geen</p>
                        <p class="card-text col-lg-4 col-sm-6" id="projectStatus"><b>Status:</b> ${projectDetails.IsActive}</p>
                    </div>
                </div>`

    document.getElementById('activeEvent').innerHTML += item;
    console.log(projectDetails.Id);
}

// End of load all active projects