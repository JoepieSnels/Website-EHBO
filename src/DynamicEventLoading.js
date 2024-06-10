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

// Load all projects from the database using the API
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
    
    const projectItem = `<div class="card project-card">
                            <div class="card-header col-12" id="projectTitle">
                                <b>Project:</b> ${projectDetails.Title} 
                                <b> Bedrijf:</b> ${projectDetails.Company}
                            </div>                            
                            <div class="card-body row project-card-body">
                                <p class="card-text col-lg-4 col-sm-6" id="projectDate"><b>Datum: </b>${projectDetails.Date.split('T')[0]}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectTime"><b>Tijd: </b>${projectDetails.StartTime.slice(0,5)} - ${projectDetails.EndTime.slice(0,5)}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="amountFirstResponders"><b>Hulpverleners nodig: </b> ${projectDetails.PeopleNeeded}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectLocation"><b>Locatie: </b>${projectDetails.Address} ${projectDetails.HouseNr}, ${projectDetails.City}</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectNeededCertificates"><b>Benodigde certificaten: </b> Geen</p>
                                <p class="card-text col-lg-4 col-sm-6" id="projectStatus"><b>Status: </b>${projectDetails.IsAccepted}</p>
                            </div>
                        </div>`
    document.getElementById('replacable').innerHTML = projectItem;
}