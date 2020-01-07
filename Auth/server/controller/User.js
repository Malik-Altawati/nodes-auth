const User = require('../../db/model/User.js')

function createUser(userObj) {
    var username = userObj.username
    var password = userObj.password
    return User.create(username, password)
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
            throw "user not Found"
        })

}

function updateUser(user, pass) {
    return User.update(user, pass)
        .then(data => {
            return "user was updates"
        })
        .catch(err => {
            throw "USER NOT FOUND"
        })
}

function deleteUser(user) {
    return User.delete(user)
        .then(data => {
            return " user was deleted"
        })
        .catch(err => {
            throw "USER NOT FOUND"
        })
}

module.exports.create = createUser;
module.exports.find = findUser;
module.exports.delete = deleteUser;
module.exports.update = updateUser;