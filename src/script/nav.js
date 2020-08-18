import {getAllStandings, getAllTeams} from "./api/api-repo"
import {dbGetAllFavTeam} from "./local/db-repo";
import {showNoFav, showTeams} from "./api/dom";

const nav = () => {
    document.addEventListener("DOMContentLoaded", function () {
        let page;
        // Activate sidebar nav
        const elems = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elems);
        loadNav();

        function loadNav() {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status !== 200) return;

                    // Muat daftar tautan menu
                    document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                        elm.innerHTML = xhttp.responseText;
                    });

                    // Daftarkan event listener untuk setiap tautan menu
                    document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                        elm.addEventListener("click", function (event) {
                            // Tutup sidenav
                            var sidenav = document.querySelector(".sidenav");
                            M.Sidenav.getInstance(sidenav).close();

                            // Muat konten halaman yang dipanggil
                            page = event.target.getAttribute("href").substr(1);
                            loadPage(page);
                        });
                    });
                }
            };
            xhttp.open("GET", "nav.html", true);
            xhttp.send();
        }

        // Load pages content
        page = window.location.hash.substr(1);
        if (page === "") page = "welcome";
        loadPage(page);

    });
}

export function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            const content = document.querySelector("#body-content");
            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;
                if (page === "standing") {
                    getAllStandings()
                } else if (page === "teams") {
                    getAllTeams()
                } else if (page === "welcome") {
                    dbGetAllFavTeam().then(teams => {
                        const data = {
                            teams: teams
                        }
                        if (data.teams.length === 0) showNoFav()
                        else showTeams(data)
                    })
                }

            } else if (this.status === 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
}

export default nav
