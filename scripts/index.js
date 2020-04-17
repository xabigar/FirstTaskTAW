// Set the welcome image, if there is a favourite team saved, else set a default image
$( document ).ready( function() {
    let favouriteTeam = window.localStorage.getItem("favouriteTeam")
    let welcomeLogo = document.getElementById("welcomeLogo")
    if(favouriteTeam==undefined || favouriteTeam==null ){
        welcomeLogo.src = '../img/welcomeLogo.png'
        welcomeLogo.className = 'defaultWelcomeLogo'
    } else {
        welcomeLogo.src = '../img/teams/' + favouriteTeam + '.png'
        welcomeLogo.className = 'teamWelcomeLogo'
    }
});