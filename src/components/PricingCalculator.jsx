import React from 'react'
import { Calculator, DollarSign, Package, Clock } from 'lucide-react'

const PricingCalculator = ({ pricing }) => {
  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="text-primary-600" size={20} />
        <h2 className="text-lg font-semibold">Pricing Breakdown</h2>
      </div>

      <div className="space-y-4">
        {/* Base Price */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <Package size={16} className="text-gray-400" />
            <span className="text-gray-600">Base Service Fee</span>
          </div>
          <span className="font-medium">${pricing.basePrice}</span>
        </div>

        {/* Material Cost */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <Package size={16} className="text-gray-400" />
            <span className="text-gray-600">Material Cost</span>
          </div>
          <span className="font-medium">${pricing.materialCost}</span>
        </div>

        {/* Support Cost */}
        {pricing.supportCost > 0 && (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <Package size={16} className="text-gray-400" />
              <span className="text-gray-600">Support Structures</span>
            </div>
            <span className="font-medium">${pricing.supportCost}</span>
          </div>
        )}

        {/* Complexity Multiplier */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <Package size={16} className="text-gray-400" />
            <span className="text-gray-600">Complexity Multiplier</span>
          </div>
          <span className="font-medium">×{pricing.complexityMultiplier}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Total */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <DollarSign size={16} className="text-primary-600" />
            <span className="text-lg font-semibold text-gray-900">Total Price</span>
          </div>
          <span className="text-2xl font-bold text-primary-600">${pricing.totalPrice}</span>
        </div>

        {/* Delivery Estimate */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-blue-600" />
            <span className="text-blue-800 font-medium">
              Estimated Delivery: {pricing.estimatedDelivery} days
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingCalculator