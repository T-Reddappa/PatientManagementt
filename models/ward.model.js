//Healthcare administrators can add a new ward by providing information such as ward number, capacity, and specializations (e.g., pediatrics, surgery, ICU).

const mongoose = require('mongoose')

const wardSchema = new mongoose.Schema({
  wardNumber: {
    type: Number,
  },
  capacity: Number,
  specialization: String
})

const Ward = mongoose.model('Ward', wardSchema)

module.exports = Ward;