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
    "endpoint": "https://fcm.googleapis.com/fcm/send/ccwLi09aknU:APA91bETCLklP9dX-ikxIb-3iMOqYLF-XLlCutQ9IS2zDDDOgb-t_01ugik4TDlbBxBuXcuv7NwfsJbWYKLRCHBQ9FV3ci0rDUiB5uVY15W0ADp1tO3atJZxLYtJn9EH72Qh6FxMQYnu",
    "keys": {
        "p256dh": "BPu3HECRBossJJ+d9FTkdx3nsrIUmZmIwKNjlMoNFNQnkBX2KmpWTF+82ta/G6anQUk3o4aR6/LYkpmx25mQ9Yc=",
        "auth": "DPLMwZ+UGDgoCw4IEKUgPA=="
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