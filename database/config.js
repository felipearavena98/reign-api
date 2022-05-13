const mongoose = require('mongoose')

const dbConnection = async () => {

    try {
        mongoose.connect(process.env.MONGODB_CNN)
        console.log('Database is Online')
    } catch (error) {
        throw new Error('Connection Refused, database is not Found')
    }

}

module.exports = {
    dbConnection
}