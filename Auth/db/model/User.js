var conn = require('../db');

//User Schema
const userSchema = `CREATE TABLE IF NOT EXISTS users (
    id serial primary key,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
    );`

conn.query(userSchema, (err, data) => {
    if (err) console.error(err);
    else console.log("users table is working")
})

//User functionality

function getUser(username) {
    return conn.query(`SELECT * FROM users WHERE username = $1`, [username])
}


function createUser(username, password) {
    return conn.query(`INSERT into users(username, password) VALUES($1, $2)`, [username, password])
}


function deleteUser(username) {
    return conn.query(`DELETE FROM users WHERE username =  '${username}'`)
}

function updateUser(username, password) {
    return conn.query(`UPDATE users SET password ='${password}' WHERE username = '${username}'`)
}
module.exports.find = getUser;
module.exports.create = createUser;
module.exports.delete = deleteUser;
module.exports.update = updateUser;