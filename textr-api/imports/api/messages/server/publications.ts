import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import {MessagesCollection} from "/imports/api/messages/collection";

Meteor.publish('messages', function() {
    check(this.userId, String);

    return [
        MessagesCollection.find(),
        Meteor.users.find({}, {fields: {username: 1}}),
    ];
});