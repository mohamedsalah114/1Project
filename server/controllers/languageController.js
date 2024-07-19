const db = require("../db/db");

class languageController {
    async getAll(req, res) {
        try {
            const language = await db.select('*').from('language')
            return res.json(language)
        }
        catch (e) {
            console.log(e)
        }
    }
}

module.exports = new languageController()