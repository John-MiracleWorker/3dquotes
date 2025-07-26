import React from 'react'
import { Brain, Clock, Settings, AlertTriangle, CheckCircle } from 'lucide-react'

const AIPanel = ({ analysis }) => {
  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'High': return 'text-red-600 bg-red-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getMaterialColor = (material) => {
    switch (material) {
      case 'PLA': return 'text-green-600'
      case 'ABS': return 'text-blue-600'
      case 'PETG': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="text-primary-600" size={20} />
        <h2 className="text-lg font-semibold">AI Analysis & Recommendations</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Model Analysis */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Model Analysis</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Complexity:</span>
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${getComplexityColor(analysis.complexity)}`}>
                {analysis.complexity}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Estimated Print Time:</span>
              <div className="flex items-center space-x-1">
                <Clock size={16} className="text-gray-400" />
                <span className="font-medium">{analysis.estimatedPrintTime} hours</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Recommended Material:</span>
              <span className={`font-medium ${getMaterialColor(analysis.recommendedMaterial)}`}>
                {analysis.recommendedMaterial}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Support Required:</span>
              <div className="flex items-center space-x-1">
                {analysis.supportNeeded ? (
                  <>
                    <AlertTriangle size={16} className="text-yellow-500" />
                    <span className="text-yellow-600 font-medium">Yes</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-green-600 font-medium">No</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Print Settings */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Recommended Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Layer Height:</span>
              <span className="font-medium">{analysis.layerHeight}mm</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Infill Density:</span>
              <span className="font-medium">{analysis.infillDensity}%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Print Speed:</span>
              <span className="font-medium">60mm/s</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Temperature:</span>
              <span className="font-medium">
                {analysis.recommendedMaterial === 'PLA' ? '200°C' : 
                 analysis.recommendedMaterial === 'ABS' ? '240°C' : '230°C'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Notes */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">AI Recommendations</h3>
        <div className="space-y-2">
          {analysis.notes.map((note, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Settings size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700 text-sm">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AIPanel