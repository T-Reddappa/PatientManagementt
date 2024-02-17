const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender:String,
  medicalHistory: String,
  contact: String,
  assignedWard: String,
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient

