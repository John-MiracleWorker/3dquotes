import React, { useState } from 'react'
import { Package, Clock, CheckCircle, XCircle, AlertTriangle, Eye } from 'lucide-react'

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: '1',
      customerName: 'John Doe',
      fileName: 'gear.stl',
      fileSize: '2.4 MB',
      totalPrice: 45.99,
      status: 'pending',
      timestamp: '2024-01-15T10:30:00Z',
      specialRequests: 'Please print in blue PLA if available',
      analysis: {
        complexity: 'Medium',
        estimatedPrintTime: 4,
        recommendedMaterial: 'PLA',
        supportNeeded: false
      },
      pricing: {
        basePrice: 15,
        materialCost: 5,
        supportCost: 0,
        totalPrice: 45.99
      }
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      fileName: 'bracket.obj',
      fileSize: '1.8 MB',
      totalPrice: 67.50,
      status: 'in_progress',
      timestamp: '2024-01-14T15:45:00Z',
      specialRequests: 'High precision required for mechanical part',
      analysis: {
        complexity: 'High',
        estimatedPrintTime: 8,
        recommendedMaterial: 'ABS',
        supportNeeded: true
      },
      pricing: {
        basePrice: 15,
        materialCost: 8,
        supportCost: 10,
        totalPrice: 67.50
      }
    },
    {
      id: '3',
      customerName: 'Mike Johnson',
      fileName: 'prototype.3mf',
      fileSize: '3.2 MB',
      totalPrice: 32.25,
      status: 'completed',
      timestamp: '2024-01-13T09:15:00Z',
      specialRequests: '',
      analysis: {
        complexity: 'Low',
        estimatedPrintTime: 2,
        recommendedMaterial: 'PLA',
        supportNeeded: false
      },
      pricing: {
        basePrice: 15,
        materialCost: 5,
        supportCost: 0,
        totalPrice: 32.25
      }
    }
  ])

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filter, setFilter] = useState('all')

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'in_progress': return 'text-blue-600 bg-blue-100'
      case 'completed': return 'text-green-600 bg-green-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return Clock
      case 'in_progress': return AlertTriangle
      case 'completed': return CheckCircle
      case 'cancelled': return XCircle
      default: return Package
    }
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    return order.status === filter
  })

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Management
        </h1>
        <p className="text-gray-600">
          Manage incoming 3D printing orders and track their progress
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'pending', label: 'Pending' },
            { key: 'in_progress', label: 'In Progress' },
            { key: 'completed', label: 'Completed' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                filter === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders List */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Orders ({filteredOrders.length})</h2>
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status)
                return (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <StatusIcon size={20} className="text-gray-400" />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {order.customerName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(order.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${order.totalPrice}
                        </p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{order.fileName}</span>
                      <span>{order.fileSize}</span>
                    </div>
                    
                    {order.specialRequests && (
                      <div className="mt-3 p-2 bg-blue-50 rounded text-sm text-blue-800">
                        <strong>Special Request:</strong> {order.specialRequests}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="lg:col-span-1">
          {selectedOrder ? (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Customer</h3>
                  <p className="text-gray-600">{selectedOrder.customerName}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">File</h3>
                  <p className="text-gray-600">{selectedOrder.fileName}</p>
                  <p className="text-sm text-gray-500">{selectedOrder.fileSize}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">AI Analysis</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Complexity:</span> {selectedOrder.analysis.complexity}</p>
                    <p><span className="text-gray-600">Print Time:</span> {selectedOrder.analysis.estimatedPrintTime}h</p>
                    <p><span className="text-gray-600">Material:</span> {selectedOrder.analysis.recommendedMaterial}</p>
                    <p><span className="text-gray-600">Support:</span> {selectedOrder.analysis.supportNeeded ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Pricing</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Base:</span> ${selectedOrder.pricing.basePrice}</p>
                    <p><span className="text-gray-600">Material:</span> ${selectedOrder.pricing.materialCost}</p>
                    {selectedOrder.pricing.supportCost > 0 && (
                      <p><span className="text-gray-600">Support:</span> ${selectedOrder.pricing.supportCost}</p>
                    )}
                    <p className="font-medium"><span className="text-gray-600">Total:</span> ${selectedOrder.pricing.totalPrice}</p>
                  </div>
                </div>

                {selectedOrder.specialRequests && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Special Requests</h3>
                    <p className="text-gray-600 text-sm">{selectedOrder.specialRequests}</p>
                  </div>
                )}

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Status</h3>
                  <div className="flex space-x-2">
                    {['pending', 'in_progress', 'completed'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus(selectedOrder.id, status)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                          selectedOrder.status === status
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {status.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="text-center text-gray-500 py-8">
                <Package size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Select an order to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderManagement