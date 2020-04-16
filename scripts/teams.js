$( document ).ready( function() {
    initTeams()
    document.getElementById("teamList").addEventListener("change", changeTeam);
    document.getElementById("btnFavourite").addEventListener("click", saveAsFavourite);
});

function changeTeam() {
    let select = document.getElementById("teamList")
    let selected = select.options[select.selectedIndex].value;
    getTeamInfo(selected)
}

function saveAsFavourite() {
    let select = document.getElementById("teamList")
    let selected = select.options[select.selectedIndex].value;
    window.localStorage.setItem("favouriteTeam",selected)
    document.getElementById("btnFavourite").blur()
}

function initTeams () {
    let teams
    let localStorageTeams = window.localStorage.getItem("teams")
    if(localStorageTeams==undefined || localStorageTeams==null ){
        // Search teams and create them
        getTeamsFromXML((teams) => {
            populateDropdownList(teams)
            window.localStorage.setItem("teams",JSON.stringify(teams))
        })
    }else{
        teams = JSON.parse(localStorageTeams)
        populateDropdownList(teams)
    }
}

function populateDropdownList (teams) {
    let select = document.getElementById("teamList");
    for (let i=0;i<teams.length;i++) {
        let team = teams[i]
        let element = document.createElement("option")
        element.textContent = team.name
        element.value = team.id
        select.appendChild(element)
    }
    let favouriteTeam = window.localStorage.getItem("favouriteTeam")
    if(favouriteTeam==undefined || favouriteTeam==null ){
        let selected = select.options[select.selectedIndex].value;
        getTeamInfo(selected)
    } else {
        document.getElementById("teamList").value = favouriteTeam
        getTeamInfo(favouriteTeam)
    }
}

function getTeamInfo (id) {
    var settings = {
        "url": "https://api.football-data.org/v2/teams/"+id,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "X-Auth-Token": "6933c774bc4040d397b6ac7fbf2e854a"
        },
    };

    $.ajax(settings).done(function (response) {
        setTeam(response)
    });
}

function setTeam (teamInfo) {
    let selectedTeamImg = document.getElementById("selectedTeamPhoto");
    selectedTeamImg.src = '../img/teams/' + teamInfo.id + '.png'
    console.log(teamInfo)
    document.getElementById("teamName").innerText = teamInfo.name
    document.getElementById("shortName").innerText = teamInfo.shortName
    document.getElementById("founded").innerText = teamInfo.founded
    document.getElementById("stadium").innerText = teamInfo.venue
    document.getElementById("website").innerText = teamInfo.website
}