const db = require("../db/db");

class productController{
    async getAll(req, res){
        try {
            const product = await db.select('*').from('product')
            console.log(product)
            return res.json(product)
        }
        catch (e) {
            console.log(e)
        }
    }
}

module.exports = new productController()