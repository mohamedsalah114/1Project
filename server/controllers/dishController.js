const uuid = require("uuid")
const path = require("path");
const db = require("../db/db");
const ApiError = require("../error/ApiError")

class dishController {
    async create(req, res, next) {
        let {
            category_id,
            user_id,
            nationality_id,
            special_group_id,
            info,
            cooking_time,
            title,
            description
        } = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        try {
           await db.transaction( async trx => {

                const ids = await db('dish')
                    .insert({
                        category_id: category_id,
                        user_id: user_id,
                        nationality_id: nationality_id,
                        special_group_id: special_group_id,
                        cooking_time: cooking_time,
                        title: title,
                        description: description,
                        img: fileName,
                    }, 'id')
                    .transacting(trx)

                info = JSON.parse(info)
                info.forEach(i => i.dish_id = ids[0].id)
                await db('composition')
                    .insert(info,
                        ['id'])
                    .transacting(trx)
               return ids
            })
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
        return null
    }

    async getAll(req, res) {
        let {category_id, nationality_id, special_group_id, ingridientsArray, limit, page} = req.query
        let dish
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        if (category_id && nationality_id && special_group_id) {
            dish = await db('dish').where({
                category_id: category_id,
                nationality_id: nationality_id,
                special_group_id: special_group_id,
            }).limit(limit).offset(offset)
        }
        if (!category_id && !nationality_id && !special_group_id && !ingridientsArray) {
            dish = await db('dish').limit(limit).offset(offset)
        }
        if (!category_id && nationality_id && special_group_id) {
            dish = await db('dish').where({
                nationality_id: nationality_id,
                special_group_id: special_group_id
            }).limit(limit).offset(offset)
        }
        if (category_id && !nationality_id && special_group_id) {
            dish = await db('dish').where({
                category_id: category_id,
                special_group_id: special_group_id
            }).limit(limit).offset(offset)
        }
        if (category_id && nationality_id && !special_group_id) {
            dish = await db('dish').where({
                category_id: category_id,
                nationality_id: nationality_id
            }).limit(limit).offset(offset)
        }
        if (!category_id && !nationality_id && special_group_id) {
            dish = await db('dish').where({
                special_group_id: special_group_id
            }).limit(limit).offset(offset)
        }
        if (category_id && !nationality_id && !special_group_id) {
            dish = await db('dish').where({
                category_id: category_id
            }).limit(limit).offset(offset)
        }
        if (!category_id && nationality_id && !special_group_id) {
            dish = await db('dish').where({
                nationality_id: nationality_id
            }).limit(limit).offset(offset)
        }
        if (ingridientsArray){
            const array = ingridientsArray.split(',');
            const count = array.length
            dish = await db.raw('select dish_id from composition where ingridient_id in (' + array.map(_ => '?').join(',') + ') GROUP BY dish_id having count(*) = ?',[...array, count])
            dish = dish.rows
            let selectedDish = []
            dish.forEach(i =>
                selectedDish.push(
                        i.dish_id
                )
            )
            if (dish){
                dish = await db.raw('select * from dish where id in (' + selectedDish.map(_ => '?').join(',') + ')',[...selectedDish])
            }
            dish = dish.rows
        }
        return res.json(dish)
    }

    async getOne(req, res) {
        const {id} = req.params
        let dishInfo = await db('dish')
            .join('user', 'dish.user_id', '=', 'user.id').where('dish.id', id)
            .select('*')
        return res.json(dishInfo)
    }


}

module.exports = new dishController()