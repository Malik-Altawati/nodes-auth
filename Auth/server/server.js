const express = require('express')
const Token = require('../token_manager/tokenManger')
const bodyParser = require('body-parser')
var app = express();
const { passwordHasher, passwordCompare } = require('../encryption/crypto')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const User = require('./controller/User');
////////////////////////////////////////////////// by malik
const Friend = require('./controller/Friend');
const Pending = require('./controller/Pending');
//


//changed the port to avoid conflicts
var port = process.env.PORT || 3001
app.use(express.json());
var server = app.listen(port, () => {
    console.log('server is running on port', server.address().port);
})


//abstract 
// var userFinder = (req, res, callback) => {
//     const { username } = req.body
//     User.find(username)
//         .then((data) => {
//             console.log(data, "user is found")
//             if (data.rows && data.rows.length > 0) {
//                 callback(null, data.rows)
//             }
//             else callback(Error("aaa"), null)
//         })
//         .catch(() => {
//             res.status(404).send("user not found")
//         })
// }
/////////////////////////////////////////////////////////////////////// changes by malik
app.post('/get', (req, res) => {
    var username = req.body.username
    User.find(username)
        .then(() => {
            console.log("user found")
            res.status(200).send("created user");
        })
        .catch(() => {
            console.log("user not found")
            res.status(403).send("user not found");
        })
})

app.post('/create', (req, res) => {
    User.create(req.body)
        .then(() => {
            console.log("created user")
            res.status(200).send("created user");
        })
        .catch(() => {
            console.log("duplicate")
            res.status(403).send("duplicate user");
        })
})

app.post('/update', (req, res) => {
    var username = req.body.username
    var password = req.body.password
    User.update(username, password)
        .then(() => {
            console.log("password updated")
            res.status(200).send("password updated");
        })
        .catch(() => {
            console.log("password was not updated")
            res.status(403).send("password was not updated");
        })
})

app.post('/delete', (req, res) => {
    var username = req.body.username
    User.delete(username)
        .then(() => {
            console.log("user was deleted")
            res.status(200).send("user was deleted");
        })
        .catch(() => {
            console.log("error happened")
            res.status(403).send("error happened");
        })
})
/////////////////////////////////////////////////////////////////////////////////

app.post('/bringFriends', (req, res) => {
    var username = req.body.username
    Friend.FriendsFinder(username)
        .then((data) => {
            console.log(data)
            res.status(200).send(data);
        })
        .catch(() => {
            console.log("error happened")
            res.status(403).send("error happened");
        })
})
////////////////////////////////////////////////////////////////////////////////////
app.post('/showFriendRequests', (req, res) => {
    var username = req.body.username
    Pending.showRequests(username)
        .then((data) => {
            console.log(data)
            res.status(200).send(data);
        })
        .catch(() => {
            console.log("error ")
            res.status(403).send("err at show friend requests");
        })
})
app.post('/sendFriendRequest', (req, res) => {
    var requester = req.body.requester
    var target = req.body.target
    Pending.sendFriendRequest(requester, target)
        .then((data) => {
            console.log("SENT")
            res.status(200).send("sent");
        })
        .catch(() => {
            console.log("error ")
            res.status(403).send("err at sending friend requests");
        })
})

app.post('/acceptFriendRequest', (req, res) => {
    var requester = req.body.requester
    var target = req.body.target
    Pending.acceptRequest(requester, target)
        .then((data) => {
            console.log("accepted")
            res.status(200).send("accepted");
        })
        .catch(() => {
            console.log("error ")
            res.status(403).send("err at accepting friend requests");
        })
})
/////////////////////////////////////////////////////////////////////////////////// malik stopped here
app.post('/signup', (req, res) => {
    //1   take username
    //2   password

    // check if the user aleady signed up
    let { username, password } = req.body
    userFinder(req, res, (err, result) => {
        if (err) res.sendStatus(300)
        if (result) {
            //redirect to login
            res.redirect('/login')
        }
    })

    //3   hash the password 
    passwordHasher(password, (err, hash) => {
        if (err) return;
        var hashedPass = hash
    })
    //4   store user and  password in the DB
    User.create({ username: username, password: hashedPass })
        .then(result => {
            if (result) {
                // stord successfly? 
                // redirect to login
                res.redirect('/login')
            }
        })
        .catch(err => {
            // else ? 
            //send 403 resonse
            if (err) {
                res.sendStatus(403)
            }
        })
})

app.post('/login', (req, res) => {
    //check if the user has a valid token
    // mot ?
    let { username, password } = req.body
    //check if user exists in DB?
    userFinder(req, res, (err, result) => {
        if (err) res.sendStatus(401)
        if (result) {
            //get his hashedPass
            var hash = result.password
        }
    })
    //compare it with the hashing function
    passwordCompare(password, hash, (err, match) => {
        // matched?
        if (match) {
            // generate new Token
            const token = Token.generateAccessToken({ username })

            // store it in DB

            //send the token back to the user
            res.authorization = `bearer ${token}`

            //redirect to main page 
            res.redirect('/main')

        } else {
            //else ?
            //send message telling PW not correct
            res.json({
                message: "incorrect Password"
            })
        }
    }
    )

})
// console.log(Token.generateAccessToken())

