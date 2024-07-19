require('dotenv').config()
const express = require('express');
const PORT = process.env.PORT || 5000;
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')


const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});