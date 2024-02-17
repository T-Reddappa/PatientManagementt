const mongoose = require('mongoose')
const { MongoClient } = require('mongodb')
const express = require('express')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(cors())
require('./db.js')

const Patient = require("./models/patient.model.js")
const Ward = require('./models/ward.model.js')

app.get('/', (req, res) => {
  res.send('Assignment-21')
})

//to create a patient 
app.post('/patients', async (req, res) => {
  const patient = new Patient(req.body)
  try {
    const savedPatient = await patient.save()
    res.status(201).json(savedPatient)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }

})

app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find({})
    res.status(200).json(patients)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


app.get('/patients/:patiendId', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patiendId)
    res.status(200).json(patient)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }

})

app.delete('/patients/:patientId', async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.patientId)
    res.status(200).json({ message: 'Patient deleted successfully', deletedPatient })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.put('/patients/:patientId', async (req, res) => {
  const patientId = req.params.patientId;
  const updatedInfo = req.body;
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(patientId, updatedInfo, { new: true })
    res.status(200).json(updatedPatient)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//add a ward
app.post('/wards', async (req, res) => {
  const wardInfo = req.body
  try {
    const newWard = await Ward.create(wardInfo)
    res.status(201).json(newWard)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//read all wards
app.get('/wards', async (req, res) => {
  try {
    const wards = await Ward.find({})
    res.status(200).json(wards)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//read a ward
app.get('/wards/:wardId', async (req, res) => {
  try {
    const ward = await Ward.findById(req.params.wardId)
    res.status(200).json(ward)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//deletes ward
app.delete('/wards/:wardId', async (req, res) => {
  try {
    const deletedWard = await Ward.findByIdAndDelete(req.params.wardId)
    res.status(200).json({ message: 'Ward deleted successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//edit ward
app.put('/wards/:wardId', async (req, res) => {
  const wardId = req.params.wardId;
  const updatedInfo = req.body;
  try {
    const updatedWard = await Ward.findByIdAndUpdate(wardId, updatedInfo, { new: true })
    res.status(200).json(updatedWard)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})