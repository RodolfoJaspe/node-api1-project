// BUILD YOUR SERVER HERE
const express = require('express')

const User = require("./users/model")

const server = express()

server.use(express.json())

server.get("/api/users", (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

server.get("/api/users/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
})

server.post("/api/users", (req, res) => {
    const user = req.body
    if (!user.name || !user.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        User.insert(user)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error while saving the user to the database" })
            })
    }

})

server.put("/api/users/:id", (req, res) => {
    const { id } = req.params
    const updatedUser = req.body
    if (!updatedUser.name || !updatedUser.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        User.update(id, updatedUser)
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: "The user with the specified ID does not exist" })
                } else {
                    res.status(200).json(user)
                }
            })
            .catch(err => {
                res.status(500).json({ message: "The user information could not be modified" })
            })
    }
})

server.delete("/api/users/:id", (req, res) => {
    const user = req.params.id
    User.remove(user)
        .then(deletedUser => {
            if (!deletedUser) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json(deletedUser)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user could not be removed" })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}