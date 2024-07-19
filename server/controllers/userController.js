const ApiError = require('../error/ApiError')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require("../db/db")
const uuid = require("uuid")
const path = require("path");

const generateJWT = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class userController {
    async registration(req, res, next) {
        let {
            email,
            password, username
        } = req.body
        // const {avatar} = req.files
        // let fileName = uuid.v4() + ".jpg"
        // avatar.mv(path.resolve(__dirname, '..', 'static', fileName))
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await db('account').where('email', email)
        if (Object.keys(candidate).length > 0) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcryptjs.hash(password, 5)
        const user = await db.insert({
            email: email,
            username: username,
            password: hashPassword,
            // avatar: fileName
        }).into('account')
        const token = generateJWT(user.id, user.email)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await db('account').where('email', email)
        if (Object.keys(user).length === 0) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcryptjs.compareSync(password, user[0].password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJWT(user[0].id, user[0].email)
        return res.json({ token })
    }

    async name(req, res, next) {
        const { id } = req.params
        const user = await db('account').where('id', id)
        if (Object.keys(user).length === 0) {
            return next(ApiError.internal('Авторизируйтесь, чтобы оставлять комментарии'))
        }
        return res.json(user[0].username)
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email)
        return res.json({ token })
    }
}

module.exports = new userController()