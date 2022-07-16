const uuid = require("uuid")
const path = require("path");
const db = require("../db/db");
const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt");

class messagesController {
    async create(req, res, next) {
        try {
            let {
                user_id,
                dish_id,
                content,
            } = req.body
            const hashContent = await bcrypt.hash(content, 5)
            const dish = await db.insert({
                user_id: user_id,
                dish_id: dish_id,
                content: hashContent,
            }).into('comments')
            return res.json(dish)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getDishComments(req, res) {
        let {dish_id} = req.params
        const comments = await db.select('*').from('comments').where({
            dish_id: dish_id,
        })
        return res.json(comments)
    }
}

module.exports = new messagesController()