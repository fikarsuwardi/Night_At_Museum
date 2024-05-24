"use strict"

const { Art } = require("../models/index")
const { Op } = require("sequelize") // untuk search
const art = require("../models/art")

class Controller {
    static home(req, res) {
        const options = {
            order: [["date", "DESC"]],
            where: {}
        }

        if(req.query.name) {
            options.where = {
                name: {
                    [Op.iLike]: `%${req.query.name}%`
                }
            }   
        }

        if(req.query.artist) {
            options.where = {
                artist: {
                    [Op.iLike]: `%${req.query.artist}%`
                }   
            }   
        }

        if(req.query.name && req.query.artist) {
            options.where = {
                name: {
                    [Op.iLike]: `%${req.query.name}%`
                },
                artist: {
                    [Op.iLike]: `%${req.query.artist}%`
                }
            }   
        }

        let dataArts
        let totalArt
        let oldDate
        let newDate

        Art.findAll(options)
            .then((arts) => {
                dataArts = arts
                return Art.notifications() // jangan lupa es nya :(
            })
            .then((data) => {
                totalArt = data.dataValues.totalArt
                oldDate = data.dataValues.oldDate
                newDate = data.dataValues.newDate
                // console.log(totalArt, oldDate, newDate);
                res.render('home', {dataArts, totalArt, oldDate, newDate})
            })
            .catch((err) => {
                res.send(err)
            })

    }

    static addArtGet(req, res) {
        res.render("addArtForm")
    }

    static addArtPost(req, res) {
        const { name, artist, date, description, photo} = req.body
        const newArt = {
            name,
            artist,
            date,
            description,
            photo
        }

        Art.create(newArt)
        .then(() => {
            res.redirect("/")
        })
        .catch((err) => {
            console.log("tes", err);
            res.send(err)
        })
    }

    static idDetail(req, res) {
        const { id } = req.params
        Art.findByPk(id)
        .then((arts) => {
            res.render("idDetail", { arts })
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static idEdit(req, res) {
        const id = +req.params.id
        const { name, artist, date, description, photo, placeOfOrigin } = req.body
        const editArt = {
            name,
            artist,
            date,
            description,
            photo,
            placeOfOrigin
        }
        Art.update(editArt , {
            where: {
                id: id
            }
        })
        .then(() => {
            res.redirect("/")
        })
        .catch((err) => {
            res.send(err)
        })
        
    }

    // https://sequelize.org/api/v6/class/src/model.js~model#static-method-destroy
    static delete(req, res) {
        const id = +req.params.id
        Art.destroy({
            where: {
                id: +id
            }
        })
        .then(() => {
            res.redirect("/")
        })
        .catch((err) => {
            res.send(err)
        })  
    }
}

module.exports = Controller