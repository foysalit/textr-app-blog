import { Meteor } from 'meteor/meteor';
import {MessagesCollection} from "/imports/api/messages/collection";


Meteor.methods({
    'messages.add'(text: string) {
        return MessagesCollection.insert({
            text,
            userId: <string>this.userId,
            createdAt: new Date(),
        });
    }
});