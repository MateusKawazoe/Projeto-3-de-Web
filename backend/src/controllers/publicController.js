const public = require("../model/public")
const {
    cloudinary
} = require('../services/cloudinary')

module.exports = {
    async store(req, res) {
        const {
            title,
            owner,
            data,
            type
        } = req.body
        var content = data

        const exists = await public.findOne({
            title,
            owner,
            data
        })

        if (exists) {
            return res.json(1)
        }

        if (type > 1 && data) {
            const photo = await cloudinary.uploader.upload(data, {
                upload_preset: 'ml_default'
            })
            content = photo
        }

        const aux = await public.create({
            title: title,
            owner: owner,
            data: content,
            type: type
        })

        return res.json(aux)
    },

    async searchPosts(req, res) {
        const {
            owner,
            type
        } = req.body

        if (owner) {
            if (type) {
                const aux = await public.find({
                    owner: owner,
                    type: { $in: type }
                })

                if(aux) {
                    return res.json(aux)
                } else {
                    return res.json(1)
                }
            }

            const aux = await public.find({
                owner: owner
            })

            if (aux) {
                return res.json(aux)
            } else {
                return res.json(1)
            }
        }else if (type) {
            const aux = await public.find({
                type: { $in: type }
            })

            if(aux) {
                return res.json(aux)
            } else {
                return res.json(1)
            }
        } else {
            const aux = await public.find()

            if(aux) {
                return res.json(aux)
            } else {
                return res.json(1)
            }
        }
    }
}