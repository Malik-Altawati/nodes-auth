const User = require('../../db/model/User.js')

function createUser(userObj) {
    return User.create(userObj.username, userObj.password)
        .then(data => {
            return "user created successfully"
        })
        .catch(err => {
            throw "user exists";
        })

}

function findUser(user) {
    return User.find(user)
        .then(data => {
            if (data.rows && data.rows.length > 0)
                return data.rows[0]
            else
                return error("unexpected error happened")
        })
        .catch(err => {
            throw "used not Found"
        })

}

function updateUser(user, userObj) {

}

function deleteUser(user) {

}

module.exports.create = createUser;
module.exports.find = findUser;