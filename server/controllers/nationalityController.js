const db = require("../db/db");

class nationalityController{
    async getAll(req, res){
        try {
            const nationality = await db.select('*').from('nationality')
            return res.json(nationality)
        }
        catch (e) {
            console.log(e)
        }
    }
}

module.exports = new nationalityController()