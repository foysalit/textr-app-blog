import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import fetch from 'node-fetch';
import {MessagesCollection} from "/imports/api/messages/collection";

function sendPushNotification(to: string[], sender: string | undefined, body: string) {
    const message = {
        to,
        body,
        sound: 'default',
        title: `New textr from ${sender}`,
    };

    return fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}


Meteor.methods({
    'messages.add'(text: string) {
        check(this.userId, String);
        const messageId = MessagesCollection.insert({
            text,
            userId: this.userId,
            createdAt: new Date(),
        });

        const sender = Meteor.users.findOne(this.userId)?.username;
        const notificationReceipients = Meteor.users.find({
            _id: {$ne: this.userId},
            'profile.enablePushNotification': true,
        }).fetch().map(({profile}) => profile.pushNotificationToken);
        sendPushNotification(notificationReceipients, sender, text);
        return messageId;
    },
    'messages.notifications.disable'() {
        check(this.userId, String);

        Meteor.users.update(this.userId, {
            $unset: { profile: 1 }
        });
    },
    'messages.notifications.register'(pushNotificationToken: string) {
        check(pushNotificationToken, String);
        check(this.userId, String);

        Meteor.users.update(this.userId, {
            $set: {
                profile: {pushNotificationToken, enablePushNotification: true}
            }
        });
    }
});