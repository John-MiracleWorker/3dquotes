require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const OpenAI = require('openai')

const app = express()
const PORT = process.env.PORT || 5000

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key-here'
})

// Middleware
app.use(cors())
app.use(express.json())

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /stl|obj|3mf/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Only 3D model files are allowed!'))
    }
  }
})

// In-memory storage for demo
let orders = []
let orderId = 1

// AI Analysis function using ChatGPT
async function analyzeModelWithAI(fileInfo, specialRequests = '') {
  try {
    const prompt = `
You are an expert 3D printing technician and engineer. Analyze this 3D model file and provide detailed recommendations.

File Information:
- Filename: ${fileInfo.originalname}
- File Size: ${(fileInfo.size / 1024 / 1024).toFixed(2)} MB
- File Type: ${path.extname(fileInfo.originalname).toUpperCase()}

Customer Special Requests: ${specialRequests || 'None specified'}

Please provide a detailed analysis in the following JSON format:

{
  "complexity": "Low/Medium/High",
  "estimatedPrintTime": number_in_hours,
  "recommendedMaterial": "PLA/ABS/PETG/TPU/Resin",
  "supportNeeded": true/false,
  "layerHeight": number_in_mm,
  "infillDensity": number_percentage,
  "printSpeed": number_mm_per_second,
  "temperature": number_celsius,
  "bedTemperature": number_celsius,
  "notes": [
    "Detailed note 1",
    "Detailed note 2",
    "Detailed note 3"
  ],
  "materialReasoning": "Detailed explanation of material choice",
  "supportReasoning": "Detailed explanation of support requirements",
  "qualityRecommendations": "Specific quality and finish recommendations",
  "potentialIssues": "Any potential printing issues to watch for",
  "postProcessing": "Recommended post-processing steps"
}

Consider:
1. File size and complexity
2. Customer's special requests
3. Best practices for the recommended material
4. Optimal settings for quality vs speed
5. Common issues with similar models
6. Cost-effective material choices
7. Print reliability factors

Provide realistic, practical recommendations that a professional 3D printing service would use.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert 3D printing technician with 10+ years of experience. Provide accurate, practical recommendations for 3D printing services."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    })

    const response = completion.choices[0].message.content
    const analysis = JSON.parse(response)

    // Calculate pricing based on AI analysis
    const basePrice = 15
    const complexityMultiplier = {
      'Low': 1.0,
      'Medium': 1.3,
      'High': 1.6
    }[analysis.complexity] || 1.2

    const materialCost = {
      'PLA': 5,
      'ABS': 8,
      'PETG': 6,
      'TPU': 12,
      'Resin': 15
    }[analysis.recommendedMaterial] || 5

    const supportCost = analysis.supportNeeded ? 10 : 0
    const totalPrice = (basePrice + materialCost + supportCost) * complexityMultiplier

    const pricing = {
      basePrice,
      materialCost,
      supportCost,
      complexityMultiplier,
      totalPrice: Math.round(totalPrice * 100) / 100,
      estimatedDelivery: Math.ceil(analysis.estimatedPrintTime / 8) + 1 // Assuming 8 hours per day
    }

    return {
      analysis,
      pricing,
      fileName: fileInfo.originalname,
      fileSize: fileInfo.size
    }

  } catch (error) {
    console.error('AI Analysis error:', error)
    
    // Fallback to basic analysis if AI fails
    const fallbackAnalysis = {
      complexity: 'Medium',
      estimatedPrintTime: 4,
      recommendedMaterial: 'PLA',
      supportNeeded: false,
      layerHeight: 0.2,
      infillDensity: 20,
      printSpeed: 60,
      temperature: 200,
      bedTemperature: 60,
      notes: [
        'AI analysis temporarily unavailable',
        'Using standard print settings',
        'Contact support for detailed analysis'
      ],
      materialReasoning: 'PLA is a good general-purpose material',
      supportReasoning: 'No supports required for this model',
      qualityRecommendations: 'Standard quality settings recommended',
      potentialIssues: 'Monitor first few layers for adhesion',
      postProcessing: 'Remove supports and clean as needed'
    }

    const basePrice = 15
    const complexityMultiplier = 1.2
    const materialCost = 5
    const supportCost = 0
    const totalPrice = (basePrice + materialCost + supportCost) * complexityMultiplier

    const pricing = {
      basePrice,
      materialCost,
      supportCost,
      complexityMultiplier,
      totalPrice: Math.round(totalPrice * 100) / 100,
      estimatedDelivery: 3
    }

    return {
      analysis: fallbackAnalysis,
      pricing,
      fileName: fileInfo.originalname,
      fileSize: fileInfo.size
    }
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: '3D Printing Quote Generator API' })
})

// Analyze 3D model and generate quote
app.post('/api/analyze', upload.single('model'), async (req, res) => {
  try {
    const file = req.file
    const { specialRequests } = req.body

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Use real AI analysis
    const result = await analyzeModelWithAI(file, specialRequests)

    res.json(result)

  } catch (error) {
    console.error('Analysis error:', error)
    res.status(500).json({ error: 'Failed to analyze model' })
  }
})

// Submit order
app.post('/api/orders', async (req, res) => {
  try {
    const order = {
      id: orderId++,
      ...req.body,
      timestamp: new Date().toISOString(),
      status: 'pending'
    }

    orders.push(order)

    res.json({
      success: true,
      orderId: order.id,
      message: 'Order submitted successfully'
    })

  } catch (error) {
    console.error('Order submission error:', error)
    res.status(500).json({ error: 'Failed to submit order' })
  }
})

// Get all orders
app.get('/api/orders', (req, res) => {
  res.json(orders)
})

// Update order status
app.put('/api/orders/:id/status', (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const order = orders.find(o => o.id == id)
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    order.status = status
    res.json({ success: true, order })

  } catch (error) {
    console.error('Status update error:', error)
    res.status(500).json({ error: 'Failed to update order status' })
  }
})

// Get dashboard stats
app.get('/api/dashboard', (req, res) => {
  const totalOrders = orders.length
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const completedOrders = orders.filter(o => o.status === 'completed').length
  const totalRevenue = orders.reduce((sum, order) => sum + (order.pricing?.totalPrice || 0), 0)

  res.json({
    stats: {
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue: Math.round(totalRevenue * 100) / 100
    },
    recentOrders: orders.slice(-5).reverse()
  })
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`OpenAI API Key: ${process.env.OPENAI_API_KEY ? 'Configured' : 'Not configured'}`)
})