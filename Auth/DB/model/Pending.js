var conn = require('../db');

//User Schema
const pendingSchema = `CREATE TABLE IF NOT EXISTS pending (
    id serial primary key,
    requester VARCHAR(255)  NOT NULL,
    target VARCHAR(255) NOT NULL
    );`

conn.query(pendingSchema, (err, data) => {
    if (err) console.error(err);
    else console.log("pending table is working")
})

//User functionality

function showPendingRequests(username) {
    return conn.query(`SELECT * FROM pending WHERE target = '${username}'`)
}

function addFriendRequest(requester, target) {
    return conn.query(`insert into pending (requester,target) values ('${requester}','${target}')`)
}

function acceptFriendRequest(requester, target) {
    return conn.query(`delete from pending where requester = '${requester}' and target = '${target}'`)
}




module.exports.showPendingRequests = showPendingRequests;
module.exports.addFriendRequest = addFriendRequest;
module.exports.acceptFriendRequest = acceptFriendRequest;
