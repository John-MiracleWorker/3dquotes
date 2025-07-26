import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File3d, Settings, Calculator, MessageSquare } from 'lucide-react'
import ModelViewer from './ModelViewer'
import AIPanel from './AIPanel'
import PricingCalculator from './PricingCalculator'

const QuoteGenerator = () => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [pricing, setPricing] = useState(null)
  const [specialRequests, setSpecialRequests] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      setIsAnalyzing(true)
      
      // Simulate AI analysis
      setTimeout(() => {
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
        setAiAnalysis(analysis)
        setIsAnalyzing(false)
        
        // Calculate pricing
        const basePrice = 15
        const complexityMultiplier = analysis.complexity === 'High' ? 1.5 : 1.2
        const materialCost = { PLA: 5, ABS: 8, PETG: 6 }[analysis.recommendedMaterial]
        const supportCost = analysis.supportNeeded ? 10 : 0
        const totalPrice = (basePrice + materialCost + supportCost) * complexityMultiplier
        
        setPricing({
          basePrice,
          materialCost,
          supportCost,
          complexityMultiplier,
          totalPrice: Math.round(totalPrice * 100) / 100,
          estimatedDelivery: analysis.estimatedPrintTime + 2
        })
      }, 2000)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'model/stl': ['.stl'],
      'model/obj': ['.obj'],
      'model/3mf': ['.3mf']
    },
    multiple: false
  })

  const handleSubmitOrder = () => {
    const order = {
      file: uploadedFile,
      analysis: aiAnalysis,
      pricing,
      specialRequests,
      timestamp: new Date().toISOString(),
      status: 'pending'
    }
    
    // Here you would typically send to your backend
    console.log('Submitting order:', order)
    alert('Order submitted successfully!')
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Instant 3D Printing Quote
        </h1>
        <p className="text-gray-600">
          Upload your 3D model and get an AI-powered quote with printing recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* File Upload Section */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Upload className="text-primary-600" size={20} />
              <h2 className="text-lg font-semibold">Upload 3D Model</h2>
            </div>
            
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
                isDragActive
                  ? 'border-primary-400 bg-primary-50'
                  : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <File3d className="mx-auto text-gray-400 mb-4" size={48} />
              {isDragActive ? (
                <p className="text-primary-600">Drop your 3D model here...</p>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">
                    Drag & drop your 3D model here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports STL, OBJ, and 3MF files
                  </p>
                </div>
              )}
            </div>

            {uploadedFile && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium">
                  ✓ {uploadedFile.name} uploaded successfully
                </p>
              </div>
            )}
          </div>

          {/* Special Requests */}
          <div className="card mt-6">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="text-primary-600" size={20} />
              <h2 className="text-lg font-semibold">Special Requests</h2>
            </div>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any special requirements, color preferences, or notes for the print shop..."
              className="input-field h-32 resize-none"
            />
          </div>
        </div>

        {/* AI Analysis and Pricing */}
        <div className="lg:col-span-2 space-y-6">
          {isAnalyzing && (
            <div className="card">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                <p className="text-gray-600">AI is analyzing your model...</p>
              </div>
            </div>
          )}

          {aiAnalysis && (
            <AIPanel analysis={aiAnalysis} />
          )}

          {pricing && (
            <PricingCalculator pricing={pricing} />
          )}

          {uploadedFile && aiAnalysis && pricing && (
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Total Quote: ${pricing.totalPrice}
                  </h3>
                  <p className="text-gray-600">
                    Estimated delivery: {pricing.estimatedDelivery} days
                  </p>
                </div>
                <button
                  onClick={handleSubmitOrder}
                  className="btn-primary"
                >
                  Submit Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3D Model Viewer */}
      {uploadedFile && (
        <div className="mt-8">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">3D Model Preview</h2>
            <div className="h-96 bg-gray-100 rounded-lg">
              <ModelViewer file={uploadedFile} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuoteGenerator