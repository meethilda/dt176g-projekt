"Use strict";

// Variables for urls
const urlUser = 'http://studenter.miun.se/~maed1801/dt173g/projekt-REST/cv.php/api/users?id=1';
const urlPortfolio = 'http://studenter.miun.se/~maed1801/dt173g/projekt-REST/cv.php/api/portfolio';
const urlStudies = 'http://studenter.miun.se/~maed1801/dt173g/projekt-REST/cv.php/api/studies';
const urlWork = 'http://studenter.miun.se/~maed1801/dt173g/projekt-REST/cv.php/api/work';

let urls = [urlUser, urlPortfolio, urlStudies, urlWork];

// Fetch function
/*function fetchUrl(url) {
    fetch(url)
        .then(resp => resp.json())
        .then(json => {
            if (url.includes('users')) getUser(json);
            if (url.includes('portfolio')) getPortfolio(json);
            if (url.includes('studies')) getStudies(json);
            if (url.includes('work')) getWork(json);
        });
}*/




async function fetchAll() {
    let results = await Promise.all(urls.map((urls) => fetch(url).then((resp) => resp.json())));
    console.log(JSON.stringify(results, null, 2));
}

console.log(fetchAll());

// Call fetch function
/*fetchUrl(urlUser);
fetchUrl(urlPortfolio);
fetchUrl(urlStudies);
fetchUrl(urlWork);*/

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
    if (facebook != 'null' && facebook != null) profileSocials.innerHTML += `<li id="fb"><a href="${facebook}">${firstname} ${lastname}</a></li>`;
    if (instagram != 'null' && instagram != null) profileSocials.innerHTML += `<li id="ig"><a href="instagram.com/${instagram}">${instagram}</a></li>`;
    if (linkedin != 'null' && linkedin != null) {
        let linkedToLower = linkedin.toLowerCase();
        let linkedToReplaceOne = linkedToLower.replace(/å|ä/g, 'a');
        let linkedToReplaceTwo = linkedToReplaceOne.replace(/ö/g, 'o');
        let linkedUrl = linkedToReplaceTwo.replace(/ /g, '-');
        profileSocials.innerHTML += `<li id="ldi"><a href="https://sg.linkedin.com/in/${linkedUrl}">${linkedin}</a></li>`;
    }
}

// Output portfolio
function getPortfolio(json) {
    for (const i in json) {
        if (json.hasOwnProperty(i)) {
            const output = json[i];
            if (output.UserID == window.UserID) {
                portfolio.innerHTML += `
                <div id="item-${output.Pid}" class="items">
                <h3>${output.Ptitle}</h3>
                <a href="${output.Purl}" target="_blank">${output.Purl}</a>
                <p><span>Beskrivning:</span> ${output.Pdesc}</p>
                <p><span>Skapad:</span> ${output.Pcreated}</p></div>
                `;
            }
        }
    }
}

// Output studies
function getStudies(json) {
    window.testar = json;
}

// Output work
function getWork(json) {
    let arrTest = [];
    for (const i in window.testar) {
        arrTest.push(window.testar[i]);
    }
    for (const i in json) {
        arrTest.push(json[i]);
    }

    for (const i in arrTest) {
        let newValW = arrTest[i]['WstartDate'];
        let newValS = arrTest[i]['SstartDate'];
        arrTest[i]['compare'] = newValW || newValS;
    }

    function compare(a, b) {
        if (a.compare < b.compare) {
            return -1;
        }
        if (a.compare > b.compare) {
            return 1;
        }
        return 0;
    }

    arrTest.sort(compare);

    for (const i in arrTest) {
        if (arrTest[i].UserID == window.UserID) {
            // Work
            let Wname = arrTest[i].Wname;
            let Wtitle = arrTest[i].Wtitle;
            let Wdesc = arrTest[i].Wdesc;
            let Wstart = arrTest[i].WstartDate;
            let Wend = arrTest[i].WendDate;
            // Studies
            let Sname = arrTest[i].Sname;
            let Scity = arrTest[i].Scity;
            let Sstart = arrTest[i].SstartDate;
            let Send = arrTest[i].SendDate;
            if (arrTest[i].Wid) {
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
            } else if (arrTest[i].Sid) {
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
            console.log(arrTest[i]);
        }
    }
}