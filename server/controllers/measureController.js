const db = require("../db/db");
const ApiError = require('../error/ApiError')

class measureController{
    async getAll(req, res){
        try {
            const categories = await db.select('*').from('measure')
            return res.json(categories)
        }
        catch (e) {
            console.log(e)
        }
    }
}

module.exports = new measureController()