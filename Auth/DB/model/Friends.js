var conn = require('../db');

//User Schema
const friendsSchema = `CREATE TABLE IF NOT EXISTS friends (
    id serial primary key,
    requester VARCHAR(255)  NOT NULL,
    target VARCHAR(255) NOT NULL
    );`

conn.query(friendsSchema, (err, data) => {
    if (err) console.error(err);
    else console.log("friends table is working")
})

//User functionality

function bringFriends(username) {
    return conn.query(`SELECT * FROM friends WHERE requester = '${username}' OR target = '${username}'`)
}


module.exports.bringFriends = bringFriends;
