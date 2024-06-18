
async function getPermission(requiredPermission) {
	const jwtToken = window.sessionStorage.getItem("jwtToken");
	const permissions = window.sessionStorage.getItem("permissions");

	if (jwtToken === null) {
		alertNoAcces();
		return;
	}

	if (permissions === null || !permissions.match(requiredPermission)) {
		alertNoAcces();
		return;
	}

	const apiRoute = `${config.apiURL}/api/validatetoken`;
	const validateResult = await fetch(apiRoute, {
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: `bearer ${jwtToken}`,
		},
	});

	const toJson = await validateResult.json();

	if (toJson.message === "Not authorized") {
		alertNoAcces();
		return;
	}

    document.getElementById('unBlockID').style.display = 'block';

    if (!permissions.match('Hulpverlener')) {
        console.log('No permission for the hulpverlener');
        document.getElementById('toggle-btn-hulp-1').classList.remove('d-sm-block');
        document.getElementById('toggle-btn-hulp-1').classList.add('d-sm-none');

        document.getElementById('toggle-btn-hulp-2').classList.remove('d-block');
        document.getElementById('toggle-btn-hulp-2').classList.add('d-none');

    }

    if (!permissions.match('Coordinator')) {
        console.log('No permission for the coordinator');
        document.getElementById('toggle-btn-coordinator-1').classList.remove('d-sm-block');
        document.getElementById('toggle-btn-coordinator-1').classList.add('d-sm-none');

        document.getElementById('toggle-btn-coordinator-2').classList.remove('d-block');
        document.getElementById('toggle-btn-coordinator-2').classList.add('d-none');
    }
    
    if (!permissions.match('LedenAdministrator')) {
        console.log('No permission for the Ledenadministratie');
        document.getElementById('toggle-btn-ledenadministratie-1').classList.remove('d-sm-block');
        document.getElementById('toggle-btn-ledenadministratie-1').classList.add('d-sm-none');

        document.getElementById('toggle-btn-ledenadministratie-2').classList.remove('d-block');
        document.getElementById('toggle-btn-ledenadministratie-2').classList.add('d-none');

    }
	if(!permissions.match('!')) {
		if(permissions.match('Hulpverlener')) {
			document.getElementById('toggle-btn-hulp-1').setAttribute('aria-expanded', 'true')
			document.getElementById('hulpverlener').classList.add('show')
			document.getElementById('toggle-btn-hulp-2').setAttribute('aria-expanded', 'true')
			document.getElementById('hulpverlener2').classList.add('show')
		}
		if(permissions.match('Coordinator')) {
			document.getElementById('toggle-btn-coordinator-1').setAttribute('aria-expanded', 'true')
			document.getElementById('coordinator').classList.add('show')
			document.getElementById('toggle-btn-coordinator-2').setAttribute('aria-expanded', 'true')
			document.getElementById('coordinator2').classList.add('show')
		
		}
		if(permissions.match('LedenAdministrator')) {
		document.getElementById('toggle-btn-ledenadministratie-1').setAttribute('aria-expanded', 'true')
		document.getElementById('ledenadministratie').classList.add('show')
		document.getElementById('toggle-btn-ledenadministratie-2').setAttribute('aria-expanded', 'true')
		document.getElementById('ledenadministratie2').classList.add('show')
		}
	}
}

function alertNoAcces() {
	console.log("Not the right site permissions");
	alert("You have no access to this page, redirecting to login");
	window.location.href = "./login.html";
}
