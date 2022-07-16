const db = require("../db/db");
const ApiError = require('../error/ApiError')

class compoundController {
    async getCompound(req, res) {
        const {id} = req.params
        let dishComposition = await db('composition').where({
            dish_id: id,
        }).join('ingridient', 'composition.ingridient_id', '=', 'ingridient.id').join('measure', 'composition.measure_id', '=', 'measure.id')
            .select(db.raw('ingridient.title as ingridient, amount, measure.title as measure, additionally, composition.id'))
        return res.json(dishComposition)
    }
}

module.exports = new compoundController()