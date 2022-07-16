const db = require("../db/db");
const ApiError = require('../error/ApiError')

class categoryController{
    async getAll(req, res){
        try {
            const categories = await db.select('*').from('category')
            return res.json(categories)
        }
        catch (e) {
            console.log(e)
        }
    }
}

module.exports = new categoryController()