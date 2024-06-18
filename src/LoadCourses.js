function createCard(courseDetail) {

    let courseDate = courseDetail.DateTime.split('T')[0];
    let courseTime = courseDetail.DateTime.split('T')[1].slice(0, -8);
    let courseCost = '€' + courseDetail.Cost.replace('.', ',')

    var item = `<div class="card project-list-card">
                    <div class="card-header" id="courseTitle">
                        <div class="row">
                            <div class="col-10">
                                <b class="align-middle">Titel:</b> <span class="align-middle">${courseDetail.Title}</span>
                            </div>
                            <div class="col-2">
                                <button class="btn btn-blue float-right" onclick="enrollInCourse(${courseDetail.CourseId})"> Inschrijven </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body row project-card-body">
                        <p class="card-text col-lg-4 col-sm-6" id="courseDateTime"><b>Datum: </b>${courseDate}</p>
                        <p class="card-text col-lg-4 col-sm-6" id=""><b>Tijd: </b>${courseTime}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="courseLocation"><b>Locatie: </b>${courseDetail.Location}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="courseCost"><b>Prijs: </b>${courseCost}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="courseMaxParticipants"><b>Max. aantal deelnemers: </b>${courseDetail.MaxParticipants}</p>
                        <p class="card-text col-lg-4 col-sm-6"><b>Voor certificaat: </b>${courseDetail.CertificateTitel}</p>
                        <p class="card-text col-12" id="courseDescription"><b>Beschrijving: </b>${courseDetail.Description}</p>
                    </div>
                </div>`

    document.getElementById('course').innerHTML += item;
}

function createCourseCard(courseDetail) {

    let courseDate = courseDetail.DateTime.split('T')[0];
    let courseTime = courseDetail.DateTime.split('T')[1].slice(0, -8);
    let courseCost = '€' + courseDetail.Cost.replace('.', ',')

    var item = `<div class="card project-list-card">
                    <div class="card-header" id="courseTitle">
                    <span class="align-middle"><b >Titel: </b>${courseDetail.Title}</span>
                        
                        <button class=" btn-danger btn float-right align-middle" onclick="deleteCourse(${courseDetail.CourseId})">Verwijderen</button>
                    </div>
                    <div class="card-body row project-list-body">
                        <p class="card-text col-lg-4 col-sm-6"><b>Datum: </b>${courseDate}</p>
                        <p class="card-text col-lg-4 col-sm-6"><b>Tijd: </b>${courseTime}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="courseLocation"><b>Locatie: </b> ${courseDetail.Location}</p>
                        <p class="card-text col-lg-4 col-sm-6"><b>Docent: </b>${courseDetail.Teacher}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="courseCost"><b>Kosten: </b> ${courseCost}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="courseMaxParticipants"><b>Deelnemers: </b>${courseDetail.EnrolledCount} / ${courseDetail.MaxParticipants}</p>
                        <p class="card-text col-12" id="courseDescription"><b>Beschrijving: </b> ${courseDetail.Description}</p>
                    </div>
                </div>`

    document.getElementById('course').innerHTML += item;

}

async function getAllCoursesFromDB() {
    const jwtToken = window.sessionStorage.getItem('jwtToken')
    try {
        const response = await fetch(`${config.apiURL}/api/getCourses`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${jwtToken}`
            }
        });
        const dataJson = await response.json();

        if(!dataJson.status === 200) {
            alert('Er zijn geen cursussen gevonden');
        }
        return dataJson.data;
    } catch(error) {
        console.error("Error getting all courses:", error);
    }
}

async function getCoursesFromDB() {
    const jwtToken = window.sessionStorage.getItem('jwtToken')


    try {
        const response = await fetch(`${config.apiURL}/api/getAvailableCourses`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json; charset-UTF-8',
                'Authorization': `bearer ${jwtToken}`
            }

        });
        const dataJson = await response.json();

        if (dataJson.message === 'No Courses found') {
            alert('Er zijn geen beschikbare cursussen gevonden');
        }

        return dataJson.data;
    } catch(error) {
        console.log('Error fetching data: ' + error);
    }
}

function loadAllCourses(requiredPermission) {
    if(getPermission(requiredPermission)) {
        getAllCoursesFromDB().then(courses => {
            if(courses.length === undefined) {
                document.getElementById('course').innerHTML = 'Er zijn geen cursussen gevonden'
            }
    
            for(let i = 0; i < courses.length; i++) {
                createCourseCard(courses[i])
            }
        }).catch(error => {
            console.log('Error loading projects:', error);
        });
    }
    
}



function loadAvailableCourses(requiredPermission) {
    if(getPermission(requiredPermission)) {
        getCoursesFromDB().then(courses => {

            if (courses.length === undefined) {
                document.getElementById('course').innerHTML = 'Er zijn geen beschikbare cursussen gevonden'
            }
    
    
            for(let i = 0; i < courses.length; i++) {
                createCard(courses[i]);
            }
        }).catch(error => {
            console.log('Error loading projects:', error);
        });
    }

}

async function enrollInCourse(courseId) {
    const jwtToken = window.sessionStorage.getItem('jwtToken')
    try {
        const loginResult = await fetch(`${config.apiURL}/api/enrollCourse`, {
            method: "POST",
            body: JSON.stringify({
                courseId: courseId
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                'Authorization': `bearer ${jwtToken}`
            }
        });

        const jsonResult = await loginResult.json();

        if (jsonResult.message === 'enrollment created') {
            alert('Aangemeld voor de cursus!');
            location.reload();
        } else if (jsonResult.message === 'De gebruiker is al aangemeld bij deze cursus') {
            alert('U bent al aangemeld voor deze cursus!');
            location.reload();
        }

        return jsonResult.data;
    } catch (error) {
        console.log('Error posting data: ' + error);
    }
}

async function deleteCourse(courseId) {
    const jwtToken = window.sessionStorage.getItem('jwtToken')
    try {
        const response = await fetch(`${config.apiURL}/api/deleteCourse`, {
            method: "DELETE",
            body: JSON.stringify({
                courseId: courseId
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                'Authorization': `bearer ${jwtToken}`
            }
        })
        
        const jsonResult = await response.json();

        if (jsonResult.message === 'Course deleted') {
            alert('Cursus verwijderd');
            location.reload();
        } else if (jsonResult.message === 'Course not found') {
            alert('Cursus niet gevonden');
            location.reload();
        }

        return jsonResult.data;
    } catch (error) {
        console.log('Error deleting data: ' + error);
    }
    
}