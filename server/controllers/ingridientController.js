const db = require("../db/db");

class ingridientController {
    async getAll(req, res) {
        try {
            const ingridient = await db.select('*').from('ingridient')
            return res.json(ingridient)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new ingridientController()