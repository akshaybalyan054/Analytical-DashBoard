import express from 'express'
import cors from 'cors'
import { connect } from 'mongoose'
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
import { Schema, model } from 'mongoose'

// Connect to MongoDB
connect(
  'mongodb+srv://Akshay:akshay@cluster0.yuswahy.mongodb.net/blackcoffer?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err)
  })

// Define a schema for the data
const akshayAssignmentSchema = new Schema({
  end_year: Number,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: Number,
  impact: String,
  added: Date,
  published: Date,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
})

// Create a model from the schema
const blackcoffer = model('akshayAssignment', akshayAssignmentSchema)

app.get('/akshayAssignment', async (req, res) => {
  try {
    const akshayAssignment = await blackcoffer.find()
    res.json(akshayAssignment)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from MongoDB' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
