import React from 'react'
import { BarChart3, TrendingUp, DollarSign, Package, Clock, CheckCircle } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Orders',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: Package
    },
    {
      title: 'Revenue',
      value: '$1,247',
      change: '+8%',
      changeType: 'positive',
      icon: DollarSign
    },
    {
      title: 'Pending Orders',
      value: '7',
      change: '-2',
      changeType: 'negative',
      icon: Clock
    },
    {
      title: 'Completed',
      value: '17',
      change: '+5',
      changeType: 'positive',
      icon: CheckCircle
    }
  ]

  const recentActivity = [
    {
      type: 'order',
      message: 'New order from John Doe - gear.stl',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      type: 'completion',
      message: 'Completed order for Jane Smith - bracket.obj',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      type: 'order',
      message: 'New order from Mike Johnson - prototype.3mf',
      time: '6 hours ago',
      status: 'in_progress'
    }
  ]

  const materialUsage = [
    { material: 'PLA', percentage: 45, color: 'bg-green-500' },
    { material: 'ABS', percentage: 30, color: 'bg-blue-500' },
    { material: 'PETG', percentage: 15, color: 'bg-purple-500' },
    { material: 'Other', percentage: 10, color: 'bg-gray-500' }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Overview of your 3D printing business performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${
                  stat.changeType === 'positive' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Icon className={`${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`} size={20} />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 ml-1">from last month</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 className="text-primary-600" size={20} />
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'completed' ? 'bg-green-500' :
                  activity.status === 'in_progress' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Material Usage */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="text-primary-600" size={20} />
            <h2 className="text-lg font-semibold">Material Usage</h2>
          </div>
          
          <div className="space-y-4">
            {materialUsage.map((material) => (
              <div key={material.material} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{material.material}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${material.color}`}
                      style={{ width: `${material.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{material.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-8">
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 className="text-primary-600" size={20} />
            <h2 className="text-lg font-semibold">AI Insights</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Popular Print Settings</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Layer Height: 0.2mm</span>
                  <span className="font-medium">65% of orders</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Infill: 20%</span>
                  <span className="font-medium">45% of orders</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Support Required</span>
                  <span className="font-medium">30% of orders</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Recommendations</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Consider stocking more PLA material - high demand</p>
                <p>• Complex prints are trending - consider premium pricing</p>
                <p>• Weekend orders are 40% higher than weekdays</p>
                <p>• Average order value increased by 15% this month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard