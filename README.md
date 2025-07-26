# 3D Printing Quote Generator

An AI-powered 3D printing instant quote generator with intelligent analysis and order management system.

## Features

### 🎯 AI-Powered Analysis
- **3D Model Analysis**: Automatically analyzes uploaded 3D models (STL, OBJ, 3MF)
- **Complexity Assessment**: Determines print complexity and required settings
- **Material Recommendations**: Suggests optimal materials (PLA, ABS, PETG)
- **Support Detection**: Identifies if support structures are needed
- **Print Settings**: Recommends layer height, infill density, and print speed

### 💰 Smart Pricing
- **Dynamic Pricing**: Calculates costs based on complexity, materials, and support needs
- **Transparent Breakdown**: Shows detailed cost components
- **Delivery Estimates**: Provides realistic delivery timelines

### 📋 Order Management
- **Order Tracking**: Complete order lifecycle management
- **Status Updates**: Real-time status tracking (pending, in progress, completed)
- **Special Requests**: Handles customer special requirements and notes
- **Print Shop Dashboard**: Comprehensive analytics and insights

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop and mobile devices
- **3D Model Viewer**: Interactive 3D model preview
- **Drag & Drop Upload**: Easy file upload interface
- **Real-time Updates**: Live status updates and notifications

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics library
- **React Dropzone** - File upload handling
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 3d-printing-quote-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create uploads directory**
   ```bash
   mkdir server/uploads
   ```

4. **Start the development servers**

   In one terminal (Frontend):
   ```bash
   npm run dev
   ```

   In another terminal (Backend):
   ```bash
   npm run server
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

### For Customers

1. **Upload 3D Model**
   - Drag and drop your 3D model file (STL, OBJ, 3MF)
   - Or click to browse and select a file

2. **AI Analysis**
   - The AI automatically analyzes your model
   - View complexity assessment and recommendations
   - See estimated print time and material suggestions

3. **Review Quote**
   - Check the detailed pricing breakdown
   - Review AI recommendations for print settings
   - Add any special requests or notes

4. **Submit Order**
   - Review the final quote and delivery estimate
   - Submit your order to the print shop

### For Print Shop

1. **Order Management**
   - View all incoming orders
   - Filter by status (pending, in progress, completed)
   - Update order status as work progresses

2. **Order Details**
   - View complete order information
   - See AI analysis and customer requests
   - Access pricing breakdown and delivery estimates

3. **Dashboard Analytics**
   - Monitor business performance
   - Track revenue and order statistics
   - View material usage patterns
   - Get AI-powered insights and recommendations

## API Endpoints

### Analysis & Quotes
- `POST /api/analyze` - Analyze 3D model and generate quote
- `POST /api/orders` - Submit new order

### Order Management
- `GET /api/orders` - Get all orders
- `PUT /api/orders/:id/status` - Update order status

### Analytics
- `GET /api/dashboard` - Get dashboard statistics
- `GET /api/health` - Health check

## File Structure

```
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── QuoteGenerator.jsx
│   │   ├── AIPanel.jsx
│   │   ├── PricingCalculator.jsx
│   │   ├── ModelViewer.jsx
│   │   ├── OrderManagement.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   └── index.js
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
```

### Customization

#### Pricing
Edit the pricing logic in `server/index.js`:
```javascript
const basePrice = 15
const complexityMultiplier = analysis.complexity === 'High' ? 1.5 : 1.2
const materialCost = { PLA: 5, ABS: 8, PETG: 6 }[analysis.recommendedMaterial]
```

#### AI Analysis
Modify the analysis parameters in `server/index.js`:
```javascript
const analysis = {
  complexity: Math.random() > 0.5 ? 'High' : 'Medium',
  estimatedPrintTime: Math.floor(Math.random() * 10) + 2,
  recommendedMaterial: ['PLA', 'ABS', 'PETG'][Math.floor(Math.random() * 3)],
  // ... more parameters
}
```

## Future Enhancements

- **Real AI Integration**: Connect to actual AI services for model analysis
- **Payment Processing**: Integrate payment gateways
- **Email Notifications**: Automated order status updates
- **Inventory Management**: Track material and printer availability
- **Customer Accounts**: User registration and order history
- **Advanced Analytics**: More detailed business insights
- **Mobile App**: Native mobile application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.