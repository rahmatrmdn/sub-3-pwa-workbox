import {dbDeleteFavorite, dbInsertFavorite} from "./local/db-repo"
import {loadPage} from "./nav";

export function favoriteCondition() {

    let favoriteButtons = document.querySelectorAll(".favoriteButton");

    for (let button of favoriteButtons) {

        button.addEventListener("click", () => {
            const team = {
                id: button.getAttribute('data-team-id'),
                name: button.getAttribute('data-team-name'),
                shortName: button.getAttribute('data-team-shortName'),
                crestUrl: button.getAttribute('data-team-crestUrl'),
                address: button.getAttribute('data-team-address'),
                founded: button.getAttribute('data-team-founded'),
                venue: button.getAttribute('data-team-venue'),
                website: button.getAttribute('data-team-website')
            };

            const isFav = button.getAttribute('data-team-isFav')

            if (isFav === "true") {
                dbDeleteFavorite(team.id).then(() => {
                    refreshPage()
                })
            } else {
                dbInsertFavorite(team).then(() => {
                    refreshPage()
                })
            }

        })
    }
}

const refreshPage = () => {
    let page = window.location.hash.substr(1);
    if (page === "") page = "welcome";
    loadPage(page)
}
