const uuid = require("uuid")
const path = require("path");
const db = require("../db/db");
const ApiError = require("../error/ApiError")

class courseController {
    async create(req, res, next) {
        let {
            category_id,
            teacher_id,
            language_id,
            price,
            title,
            description
        } = req.body
        const { img } = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        try {
            await db.transaction(async trx => {

                const ids = await db('course')
                    .insert({
                        category_id: category_id,
                        teacher_id: teacher_id,
                        language_id: language_id,
                        price: price,
                        title: title,
                        description: description,
                        img: fileName,
                    }, 'id')
                    .transacting(trx)

                return ids
            })
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
        return null
    }

    async getAll(req, res) {
        let { category_id, language_id, limit, page } = req.query
        let course
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        if (category_id && language_id) {
            course = await db('course').where({
                category_id: category_id,
                language_id: language_id,
            }).limit(limit).offset(offset)
        }
        if (!category_id && !language_id) {
            course = await db('course').limit(limit).offset(offset)
        }
        if (!category_id && language_id) {
            course = await db('course').where({
                language_id: language_id,
            }).limit(limit).offset(offset)
        }
        if (category_id && !language_id) {
            course = await db('course').where({
                category_id: category_id,

            }).limit(limit).offset(offset)
        }
        return res.json(course)
    }

    async getOne(req, res) {
        const { id } = req.params
        let courseInfo = await db('course')
            .join('account', 'course.teacher_id', '=', 'account.id').where('course.id', id)
            .select('*')
        return res.json(courseInfo)
    }


}

module.exports = new courseController()