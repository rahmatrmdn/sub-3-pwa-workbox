var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BIMSub_ga0ZgUP_aI3aCoz8vuIIWUTtqb7EHBqhrNTNb_2dXY4bWNNrngKFXai3EpZ-70rn-K4iX90xDd07Oumk",
    "privateKey": "nt-7u2il1wwPEyHTrAnX3gEoGZCha_p_J-al3r_iOHU"
};


webPush.setVapidDetails(
    'mailto:rahmat.rama98@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dgcTYPLsSkI:APA91bFIKJHG_USSOe1sXyaN0Tu0IKIGDnpsKiy7MNFZ7P2dbB2-z7STiodO61abFoTaNPBnqKFluu9eYKH8SXmjsum6zmfbsdEaRrBPfAWfvMHgRxKqt0ny_RQieaSl3onwsVtaHAb4",
    "keys": {
        "p256dh": "BAW1uX14ZrYbhBTfo1v2dBm3Km8OldilQ6pDCkTEPcnZ8ntzAd6Cd2hbKn34P6wGr9lWiD3uhASABGxpLHGeFjI=",
        "auth": "YGpSDZXaunipjY6sj7CCkA=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '403108446847',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);