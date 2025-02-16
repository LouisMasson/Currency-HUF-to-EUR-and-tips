# HUF-EUR Converter & Tip Calculator

A comprehensive currency converter and tip calculator application supporting both web and native mobile platforms, focused on Hungarian Forint (HUF) to Euro (EUR) conversions. The application provides real-time exchange rates and an intuitive interface for both currency conversion and tip calculations.

## 🌟 Features

### Currency Converter
- Real-time HUF to EUR conversion
- Bidirectional conversion support
- Live exchange rate updates
- Clean, intuitive interface
- Mobile-responsive design

### Tip Calculator
- Calculate tips in both HUF and EUR
- Multiple tip percentage presets (10%, 15%, 20%)
- Automatic currency conversion for tips
- Total amount calculation with tip included
- Dual currency display

## 🛠️ Technologies

### Web Application
- React with TypeScript
- TanStack Query for API calls
- Tailwind CSS for styling
- Framer Motion for animations
- Shadcn UI components
- Wouter for routing

### Mobile Application
- React Native
- React Navigation
- Native platform-specific components
- Gesture handling
- Safe area management

### Backend
- Express.js server
- Real-time currency rate API integration
- In-memory storage for rate caching
- RESTful API endpoints

## 💻 Installation

### Web Application
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Mobile Application (iOS)
```bash
# Install dependencies
npm install

# Install iOS dependencies
cd ios && pod install && cd ..

# Start the application
npm run ios
```

## 🚀 Usage

### Currency Converter
1. Enter the amount in either HUF or EUR
2. View the converted amount instantly
3. Use the switch button to change conversion direction
4. Exchange rates update automatically

### Tip Calculator
1. Enter the bill amount in HUF
2. Select your desired tip percentage
3. View the tip amount in both HUF and EUR
4. See the total amount including tip in both currencies

## 📱 Mobile Features

- Native iOS user interface
- Dark mode support
- Gesture-based interactions
- Offline capability
- Responsive layouts for different screen sizes

## ⚙️ Environment Setup

### Required Environment Variables
```
DATABASE_URL=your_database_url (if using database)
```

### Development Environment
- Node.js 18+
- iOS development tools (for mobile)
- Xcode 12+ (for iOS development)
- CocoaPods (for iOS dependencies)

## 🌐 API Integration

The application integrates with the Frankfurter API for real-time exchange rates between HUF and EUR, with rates updating hourly to ensure accuracy.

## 📱 Mobile Screenshots

[Coming Soon]

## 💻 Web Screenshots

[Coming Soon]

## 🔒 Security

- Secure API calls with rate limiting
- Data validation and sanitization
- Protected environment variables
- Secure mobile storage handling

## ⚡ Performance

- Optimized bundle size
- Efficient state management
- Minimal re-renders
- Responsive animations
- Cached exchange rates

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
