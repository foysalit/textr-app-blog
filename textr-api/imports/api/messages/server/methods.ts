import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import {MessagesCollection} from "/imports/api/messages/collection";

Meteor.methods({
    'messages.add'(text: string) {
        check(this.userId, String);
        return MessagesCollection.insert({
            text,
            userId: this.userId,
            createdAt: new Date(),
        });
    }
});