const bycrypt = require('bcryptjs')
//change this constat to change the salt
const passwordHasher = (plainPassword = '', saltRounds = 0, callback) => {
    if (!plainPassword.length) {
        return '';
    }

    bycrypt.genSalt(saltRounds, (err, salt) => {
        bycrypt.hash(plainPassword, salt, (err, hash) => {
            if (err) {
                callback(err, null)
            }
            callback(null, hash)
        })
    })
}
const passwordCompare = (plainTextPassword = '', hash = '', callback) => {
    if (!plainTextPassword.length || !hash.length) {
        return '';
    }
    bycrypt.compare(plainTextPassword, hash, (err, match) => {
        if (err) {
            callback(err, null)
        }
        callback(null, match)
    })
}
module.exports = { passwordHasher, passwordCompare }