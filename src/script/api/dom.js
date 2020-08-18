import {dbIsFavorite} from "../local/db-repo";
import {favoriteCondition} from "../favorite";

export function showStanding(data) {
    let standings = "";
    let standingElement = document.getElementById("homeStandings");

    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
    });

    standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                
                </div>
    `;
}

export function showTeams(data) {

    let favBtnColor, teams = "";
    let teamElement = document.getElementById("teams");

    data.teams.forEach(function (team) {

        dbIsFavorite(team.id).then(fav => {

            if (fav) favBtnColor = "red"
            else favBtnColor = "grey"

            teams += `
                 <div class="col s12 m6 l4"> 
                    <div class="card">
                        <div class="card-image">
                            <a class="btn-floating halfway-fab waves-effect waves-light ${favBtnColor} favoriteButton" 
                               data-team-isFav="${fav}"
                               data-team-id="${team.id}"
                               data-team-name="${team.name}"
                               data-team-shortName="${team.shortName}"
                               data-team-crestUrl="${team.crestUrl}"
                               data-team-address="${team.address}"
                               data-team-founded="${team.founded}"
                               data-team-venue="${team.venue}"
                               data-team-website="${team.website}">
                               <i class="material-icons">favorite</i>
                            </a>
                            <img class="center-block responsive-img" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="Team Badge" 
                                    style="width: 300px; height: 300px"> 
                            <span class="card-title grey lighten-2 black-text" style="opacity:0.95">${team.name}</span>
                        </div>
                        <div class="card-content" style="height: 115px">
                            <p>Located in ${team.address}, ${team.shortName} was founded on ${team.founded}. ${venueCondition(team.address, team.shortName, team.venue)}</p>
                        </div>
                        <div class="card-action">
                            <a href="${team.website}" target="_blank">Website</a>
                        </div>
                    </div>
                </div>
            `;

            teamElement.innerHTML = teams;

            favoriteCondition();
        })
    })
}

export function showNoFav() {

    document.getElementById("teams").innerHTML = `
        <h6 class="center header col s12 light">You haven't chosen your favorite team</h6>      
    `;
}

const venueCondition = (address, sName, venue) => {

    if (address.length + sName.length + venue.length > 60) return ""
    else return `The venue name is ${venue}.`
}


