const Friend = require('../../db/model/Friends.js')



function FriendsFinder(user) {
    return Friend.bringFriends(user)
        .then(data => {
            return data;
        })
        .catch(err => {
            throw "no friends"
        })

}

module.exports.FriendsFinder = FriendsFinder;