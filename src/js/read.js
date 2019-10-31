"Use strict";

// Variables for urls
const urlUser = 'http://studenter.miun.se/~maed1801/dt173g/projekt-REST/cv.php/api/users?id=1';
const urlPortfolio = 'http://studenter.miun.se/~maed1801/dt173g/projekt-REST/cv.php/api/portfolio';
const urlStudies = 'http://studenter.miun.se/~maed1801/dt173g/projekt-REST/cv.php/api/studies';
const urlWork = 'http://studenter.miun.se/~maed1801/dt173g/projekt-REST/cv.php/api/work';

// Fetch function User
fetch(urlUser)
    .then(resp => resp.json())
    .then(json => {
        // Call function with parameter json response
        getUser(json);
    });

// Fetch function Portfolio
fetch(urlPortfolio)
    .then(resp => resp.json())
    .then(json => {
        // Call function with parameter json response
        getPortfolio(json);
    });

// Fetch function Studies
fetch(urlStudies)
    .then(resp => resp.json())
    .then(json => {
        // Save studies json to global variabel
        window.studiesJson = json;
    });

// Fetch function Work
fetch(urlWork)
    .then(resp => resp.json())
    .then(json => {
        // Call function with parameter json response
        getWS(json);
    });

// Variables for sections
const portfolio = document.getElementById('portfolio');
const studies = document.getElementById('studies');
const work = document.getElementById('work');
const timeline = document.getElementById('timeline-div');

// Variables for user info output
const headerName = document.getElementById('name');
const profileName = document.getElementById('profile-name');
const profileDesc = document.getElementById('profile-desc');
const profileEmail = document.getElementById('profile-email');
const profileSocials = document.getElementById('profile-socials');

// Functions to handle json answer
function getUser(json) {
    // Set this user in variable
    const thisUser = json[0];
    // Global variable for id
    window.UserID = thisUser.Uid;
    // Variables for users
    let firstname = thisUser.UfirstName;
    let lastname = thisUser.UlastName;
    let email = thisUser.Uemail;
    let desc = thisUser.Udesc;
    let facebook = thisUser.facebook;
    let instagram = thisUser.instagram;
    let linkedin = thisUser.linkedin;

    // Profile name
    profileName.innerHTML = `${firstname} <span>${lastname}</span>`;
    // Profile desc
    profileDesc.innerHTML = desc;
    // Profile email
    profileEmail.innerHTML = `<a href="mailto:${email}">${email}</a>`;
    // Profile socials
    // Output socials if the value is not equal to null
    if (facebook != 'null' && facebook != null) profileSocials.innerHTML += `<li id="fb"><a href="${facebook}">${firstname} ${lastname}</a></li>`;
    if (instagram != 'null' && instagram != null) profileSocials.innerHTML += `<li id="ig"><a href="instagram.com/${instagram}">${instagram}</a></li>`;
    if (linkedin != 'null' && linkedin != null) {
        // For linkedin href
        // To lower case
        let linkedToLower = linkedin.toLowerCase();
        // Replace å/ä with a
        let linkedToReplaceOne = linkedToLower.replace(/å|ä/g, 'a');
        // Replace ö with o
        let linkedToReplaceTwo = linkedToReplaceOne.replace(/ö/g, 'o');
        // Replace space with -
        let linkedUrl = linkedToReplaceTwo.replace(/ /g, '-');
        // Output linkedin
        profileSocials.innerHTML += `<li id="ldi"><a href="https://sg.linkedin.com/in/${linkedUrl}">${linkedin}</a></li>`;
    }
}

// Variable for carousel
const carouselDiv = document.getElementById('main-carousel');
// Function for output portfolio
function getPortfolio(json) {
    // init Flickity with jQuery
    var $carousel = $('.main-carousel').flickity();
    // get instance
    var flkty = $carousel.data('flickity');
    // access selectedIndex
    var selected = flkty.selectedIndex;
    // Adding images to each project
    json[0]['image'] = 'kunggosta.png';
    json[1]['image'] = 'julfeeling.png';
    json[2]['image'] = 'fardtjanst.png';
    json[3]['image'] = 'bollsparken.png';
    json[4]['image'] = 'admin-rest.png';
    // Separate each object
    for (const i in json) {
        // If object is it own
        if (json.hasOwnProperty(i)) {
            // Save json[i] in variable for easy handle
            const output = json[i];
            // If object foreign key (UserID) is the same as UserID from global variable, output div
            if (output.UserID == window.UserID) {
                // insert cell
                var $cellElems = $('<div class="carousel-cell"><img src="images/' + output.image + '" alt=""><div><h3>' + output.Ptitle + '</h3><a href="' + output.Purl + '" alt="">' + output.Purl + '</a><p>' + output.Pdesc + '</p><em>' + output.Pcreated + '</em></div></div>');
                $carousel.flickity('insert', $cellElems, selected);
            }
        }
    }
}

// Function for handling work and studies
function getWS(json) {
    // Empty array
    let arrWS = [];
    // Separate object in studies array, from global variable
    for (const i in window.studiesJson) {
        // Push objects to array
        arrWS.push(window.studiesJson[i]);
    }
    // Separate object in work array, parameter in this function
    for (const i in json) {
        // Push objects to array
        arrWS.push(json[i]);
    }

    // Separate objects in new array
    for (const i in arrWS) {
        // Set values to variables
        let newValW = arrWS[i]['WstartDate'];
        let newValS = arrWS[i]['SstartDate'];
        // Add new key value with values from either work or studies
        arrWS[i]['compare'] = newValW || newValS;
    }

    // Function for comparing values
    function compare(a, b) {
        if (a.compare < b.compare) {
            return -1;
        }
        if (a.compare > b.compare) {
            return 1;
        }
        return 0;
    }

    // Sort and compare array
    arrWS.sort(compare);

    // Separate objects in array
    for (const i in arrWS) {
        // Output if arrays foreign key (UserID) is same as UserID saved in global variable
        if (arrWS[i].UserID == window.UserID) {
            // Work variables
            let Wname = arrWS[i].Wname;
            let Wtitle = arrWS[i].Wtitle;
            let Wdesc = arrWS[i].Wdesc;
            let Wstart = arrWS[i].WstartDate;
            let Wend = arrWS[i].WendDate;
            // Studies variables
            let Sname = arrWS[i].Sname;
            let Scity = arrWS[i].Scity;
            let Sstart = arrWS[i].SstartDate;
            let Send = arrWS[i].SendDate;
            // Output this html if object are from Work
            if (arrWS[i].Wid) {
                // Left container
                timeline.innerHTML += `
            <div class="container left">
                <div class="content">
                    <h3><i class="fas fa-briefcase"></i> ${Wstart}</h3>
                    <h4>${Wname}</h4>
                    <em>${Wtitle}</em>
                    <p>${Wdesc}</p>
                    <p>Slut: ${Wend}</p>
                </div>
            </div>
            `;
                // Output this html if object are from Studies
            } else if (arrWS[i].Sid) {
                // Right container
                timeline.innerHTML += `
                <div class="container right">
                    <div class="content">
                        <h3><i class="fas fa-graduation-cap"></i> ${Sstart}</h3>
                        <h4>${Sname}</h4>
                        <em>${Scity}</em>
                        <p>Slut: ${Send}</p>
                    </div>
                </div>
            `;
            }
        }
    }
}