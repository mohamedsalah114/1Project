const db = require("../db/db");

class specialGroupController{
    async getAll(req, res){
        try {
            const specialGroup = await db.select('*').from('special_group')
            return res.json(specialGroup)
        }
        catch (e) {
            console.log(e)
        }
    }
}

module.exports = new specialGroupController()