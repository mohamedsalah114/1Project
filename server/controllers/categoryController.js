const db = require("../db/db");

class categoryController {
    async getAll(req, res) {
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