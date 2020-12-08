import { Meteor } from 'meteor/meteor';
import {MessagesCollection} from "/imports/api/messages/collection";

Meteor.publish('messages', function() {
    if (!this.userId)
        throw new Meteor.Error('Only logged in users can see messages');

    return [
        MessagesCollection.find(),
        Meteor.users.find({}, {fields: {username: 1}}),
    ];
});