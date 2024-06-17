function createCard(courseDetail) {
    console.log(courseDetail);

    let courseDate = courseDetail.DateTime.split('T')[0];
    let courseTime = courseDetail.DateTime.split('T')[1].slice(0, -8);
    let courseCost = '€' + courseDetail.Cost.replace('.', ',')

    var item = `<div class="card project-card">
                    <div class="card-header" id="courseTitle">
                        <div class="row">
                            <div class="col-12 col-sm-10">
                                <b class="align-middle">Titel:</b> <span class="align-middle">${courseDetail.Title}</span>
                                <b class="align-middle">Voor certificaat:</b> <span class="align-middle">${courseDetail.CertificateTitel}</span>
                            </div>
                            <div class="col-12 col-sm-2">
                                <button class="btn btn-primary float-right" onclick="enrollInCourse(${courseDetail.CourseId})"> Inschrijven </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body row project-card-body">
                        <p class="card-text col-12" id="courseDescription"><b>Beschrijving:</b> ${courseDetail.Description}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="courseDateTime"><b>Datum en tijd:</b> ${courseDate} - ${courseTime}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="courseCost"><b>Prijs:</b> ${courseCost}</p>
                        <p class="card-text col-lg-4 col-sm-6" id="courseMaxParticipants"><b>Max. aantal deelnemers:</b> ${courseDetail.MaxParticipants}</p>
                        <p class="card-text col-12" id="courseLocation"><b>Locatie:</b> ${courseDetail.Location}</p>
                    </div>
                </div>`

    document.getElementById('course').innerHTML += item;
    console.log(courseDetail);
}

function createCourseCard(courseDetail) {

    let courseDate = courseDetail.DateTime.split('T')[0];
    let courseTime = courseDetail.DateTime.split('T')[1].slice(0, -8);
    let courseCost = '€' + courseDetail.Cost.replace('.', ',')

    var item = `<div class="card project-card">
                    <div class="card-header" id="courseTitle">
                    <span class="align-middle"><b >Titel: </b>${courseDetail.Title}</span>
                        
                        <button class="btn btn-primary float-right align-middle" onclick="deleteCourse(${courseDetail.CourseId})">Verwijderen</button>
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
        const response = await fetch('https://api-ehbo.onrender.com/api/getCourses', {
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

async function getCoursesFromDB(event) {
    const jwtToken = window.sessionStorage.getItem('jwtToken')
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcxODE4MDA0MiwiZXhwIjoxNzE5MjE2ODQyfQ.HN5VjPipJBHM1x48DRW5o6wwLKpCHs1kJI9keOjONSw'
    console.log('Loading courses from Database');
    event.preventDefault();

    try {
        const response = await fetch('https://api-ehbo.onrender.com/api/getAvailableCourses', {
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


        console.log(dataJson);
        return dataJson.data;
    } catch(error) {
        console.log('Error fetching data: ' + error);
    }
}

function loadAllCourses(requiredPermission) {
    if(getPermission(requiredPermission)) {
        getAllCoursesFromDB().then(courses => {
            if(courses.length === undefined) {
                console.log('Er zijn geen cursussen gevonden')
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
        getCoursesFromDB(event).then(courses => {

            if (courses.length === undefined) {
                console.log('Er zijn geen cursussen gevonden')
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
        const loginResult = await fetch("https://api-ehbo.onrender.com/api/enrollCourse", {
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
        console.log(jsonResult);

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
        const response = await fetch('https://api-ehbo.onrender.com/api/deleteCourse', {
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
        console.log(jsonResult);

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