const pending = require('../../db/model/Pending.js')



function showRequests(user) {
    return pending.showPendingRequests(user)
        .then(data => {
            return data;
        })
        .catch(err => {
            throw "no requests"
        })
}

function sendRequest(requester, target) {
    return pending.addFriendRequest(requester, target)
        .then(data => {
            return data;
        })
        .catch(err => {
            throw "not sent"
        })
}

function acceptRequest(requester, target) {
    return pending.acceptFriendRequest(requester, target)
        .then(data => {
            return data;
        })
        .catch(err => {
            throw "not accepted"
        })

}


module.exports.showRequests = showRequests;
module.exports.sendRequest = sendRequest;
module.exports.acceptRequest = acceptRequest;