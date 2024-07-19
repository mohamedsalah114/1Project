const db = require("../db/db");

class ticketsController {
    async getAll(req, res) {
        try {
            const tickets = await db.select('*').from('tickets')
            return res.json(tickets)
        } catch (e) {
            console.log(e)
        }
    }

    async checkTicket(req, res) {
        try {
            let { student_id, course_id } = req.query
            let course = await db('tickets').where({
                student_id: student_id,
                course_id: course_id,
            })
            course.length > 0 ? res.status(200).json(true) : res.status(200).json(false);
        }
        catch (e) {
            console.log(e)
        }
    }

    async signIn(req, res) {
        try {
            const { studentId, courseId, teacherId } = req.body
            const ticket = await db.insert({
                student_id: studentId,
                course_id: courseId,
                teacher_id: teacherId,
            }).into('tickets')
            return res.status(200).json(ticket);
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new ticketsController()