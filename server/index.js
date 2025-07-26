const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

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

    // Simulate AI analysis
    const analysis = {
      complexity: Math.random() > 0.5 ? 'High' : 'Medium',
      estimatedPrintTime: Math.floor(Math.random() * 10) + 2,
      recommendedMaterial: ['PLA', 'ABS', 'PETG'][Math.floor(Math.random() * 3)],
      supportNeeded: Math.random() > 0.7,
      layerHeight: Math.random() > 0.5 ? 0.2 : 0.1,
      infillDensity: Math.floor(Math.random() * 40) + 20,
      notes: [
        'Model appears to have overhangs requiring support',
        'Consider printing with 20% infill for strength',
        'Recommended layer height: 0.2mm for good detail'
      ]
    }

    // Calculate pricing
    const basePrice = 15
    const complexityMultiplier = analysis.complexity === 'High' ? 1.5 : 1.2
    const materialCost = { PLA: 5, ABS: 8, PETG: 6 }[analysis.recommendedMaterial]
    const supportCost = analysis.supportNeeded ? 10 : 0
    const totalPrice = (basePrice + materialCost + supportCost) * complexityMultiplier

    const pricing = {
      basePrice,
      materialCost,
      supportCost,
      complexityMultiplier,
      totalPrice: Math.round(totalPrice * 100) / 100,
      estimatedDelivery: analysis.estimatedPrintTime + 2
    }

    res.json({
      analysis,
      pricing,
      fileName: file.originalname,
      fileSize: file.size
    })

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
})