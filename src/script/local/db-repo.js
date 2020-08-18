import {openDB} from 'idb';

const idbPromised = openDB('fav_team', 1, {
    upgrade(db) {
        db.createObjectStore('fav_team', {
            keyPath: 'id'
        });
    }
})

export function dbGetAllFavTeam() {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("fav_team", `readonly`);
            const data = transaction.objectStore("fav_team").getAll();
            transaction.done;
            return data;
        }).then(data => {
            if (data !== undefined) {
                resolve(data)
            } else {
                reject(new Error("Favorite undefined!"))
            }
        })
    })
}

export function dbInsertFavorite(team) {
    return new Promise((resolve) => {
        idbPromised.then(db => {
            const transaction = db.transaction("fav_team", `readwrite`);
            transaction.objectStore("fav_team").add(team);
            transaction.done;
            resolve(true)
        })
    })
}

export function dbDeleteFavorite(teamId) {
    return new Promise((resolve) => {
        idbPromised.then(db => {
            const transaction = db.transaction("fav_team", `readwrite`);
            transaction.objectStore("fav_team").delete(teamId.toString());
            transaction.done;
            resolve(true)
        })
    })
}

export function dbIsFavorite(teamId) {
    return new Promise((resolve) => {
        idbPromised.then(db => {
            const transaction = db.transaction("fav_team", `readonly`);
            const data = transaction.objectStore("fav_team").get(teamId.toString());
            transaction.done;
            return data;
        }).then(data => {
            if (data) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}