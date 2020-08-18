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
    "endpoint": "https://fcm.googleapis.com/fcm/send/e5JFWkvmHfs:APA91bEmS4wuAMU7mMbdc9JZ39N6gc5ocf9PRYZ5PTzskIPuyXA_yPWEmd0jVv1GZ4dTW5H3BXWHWb88rjoLTSQmyMqY3CtkYeeW2By3CCAl-XWDkyEhFv7ZASq9YnfzHotvm_KoAk6f",
    "keys": {
        "p256dh": "BEbGmaGMKpi6IOz14p6p9ZcNOkn8F+3zmCNFEBxHCkoUdDG4LaSz6Bm4Go+JW1IwQkxQTwKsGjHEH5x84QDlMOQ=",
        "auth": "+YTDTbDJ7ULcV6T2+ELv0A=="
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