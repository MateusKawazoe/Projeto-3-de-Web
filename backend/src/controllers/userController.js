const user = require("../model/user")
const auth_token = require('../services/auth')
const md5 = require("md5");
const {
	cloudinary
} = require('../services/cloudinary')

module.exports = {
	async signup(req, res) {
		const {
			foto,
			usuario,
			email,
			senha,
			admin
		} = req.body;
		var profilePhoto = ''

		const userExists = await user.findOne({
			usuario
		})

		if (userExists) {
			return res.json(1)
		}

		const emailExists = await user.findOne({
			email: email
		})

		if (emailExists) {
			return res.json(2)
		}

		const token = await auth_token.generateToken({
			usuario: usuario,
			senha: md5(senha + global.SALT_KEY)
		})

		if (foto) {
			const photo = await cloudinary.uploader.upload(foto, {
				upload_preset: 'ml_default'
			})
			profilePhoto = photo.url
		}

		await user.create({
			foto: profilePhoto,
			usuario: usuario,
			email: email,
			senha: md5(senha + global.SALT_KEY),
			token: token,
			admin: admin
		})

		return res.json(token)
	},

	async signin(req, res) {
		const {
			usuario,
			senha,
			token
		} = req.body

		const userExists = await user.findOne({
			usuario
		})

		if (!userExists) {
			return res.json(1)
		}

		if (userExists.token) {
			if (userExists.token == token) {
				return res.json(token)
			} else {
				if (userExists.senha == md5(senha + global.SALT_KEY)) {
					var auxToken

					if (token) {
						auxToken = token
					} else {
						auxToken = await auth_token.generateToken({
							usuario: userExists.usuario,
							senha: md5(userExists.senha + global.SALT_KEY)
						})
					}

					await user.updateOne({
						usuario
					}, {
						$set: {
							token: auxToken
						}
					})

					return res.status(201).json(auxToken)
				} else {
					return res.json(2)
				}
			}
		}
	},

	async showAll(req, res) {
		return res.json(await user.find())
	},

	async showOne(req, res) {
		const {
			username
		} = req.body

		console.log(username)

		const exists = await user.findOne({
			usuario: username
		})
		console.log(exists)
		if(!exists) {
			return res.json(1)
		}

		return res.json(exists)
	},

	async delete(req, res) {
		const {
			usuario
		} = req.body

		return res.json(await user.deleteOne({
			usuario
		}))
	}
}