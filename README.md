# DevBarber - React Native Barber Booking App

A modern and intuitive React Native application for booking barber appointments. DevBarber connects customers with local barbers, allowing users to browse services, view barber profiles, schedule appointments, and manage their bookings seamlessly.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure sign-in and sign-up with token-based authentication
- **Location-Based Search**: Find barbers near your location using GPS
- **Barber Profiles**: View detailed barber information, services, and ratings
- **Service Booking**: Schedule appointments with preferred time slots
- **Favorites System**: Save and manage favorite barbers
- **Appointment Management**: View upcoming and past appointments
- **User Profile**: Manage personal information and avatar
- **Search Functionality**: Search for specific barbers or services

### User Interface
- **Modern Design**: Clean and intuitive interface with custom styling
- **Responsive Layout**: Optimized for various screen sizes
- **Interactive Components**: Smooth animations and transitions
- **Custom Tab Navigation**: Easy navigation between main sections
- **Modal Dialogs**: Elegant booking and information modals

## 📱 Screenshots

*Screenshots will be added here to showcase the app's interface*

## 🛠️ Tech Stack

- **Framework**: React Native 0.63.4
- **Navigation**: React Navigation 5.x
- **State Management**: React Context API with useReducer
- **Styling**: Styled Components
- **Icons**: React Native SVG
- **Storage**: AsyncStorage
- **Location Services**: React Native Geolocation
- **Permissions**: React Native Permissions
- **HTTP Client**: Fetch API

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (>= 12.x)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Java Development Kit (JDK 8 or higher)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/reactnative-devbarber.git
   cd reactnative-devbarber
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Configure API endpoint**
   - Update the `BASE_API` constant in `src/Api.js` with your backend server URL

## 🏃‍♂️ Running the App

### Android
```bash
npm run android
# or
yarn android
```

### iOS
```bash
npm run ios
# or
yarn ios
```

### Start Metro Bundler
```bash
npm start
# or
yarn start
```

## 📁 Project Structure

```
src/
├── Api.js                 # API service functions
├── assets/                # SVG icons and images
├── components/            # Reusable UI components
│   ├── AppointmentItem.js
│   ├── BarberItem.js
│   ├── BarberModal.js
│   ├── CustomTabBar.js
│   ├── SignInput.js
│   └── Stars.js
├── contexts/              # React Context providers
│   └── UserContext.js
├── reducers/              # State management reducers
│   └── UserReducer.js
├── screens/               # Application screens
│   ├── Account/
│   ├── Appointments/
│   ├── Barber/
│   ├── Favorites/
│   ├── Home/
│   ├── Preload/
│   ├── Profile/
│   ├── Search/
│   ├── SignIn/
│   └── SignUp/
└── stacks/                # Navigation configuration
    ├── MainStack.js
    └── MainTab.js
```

## 🔧 Configuration

### Environment Setup
1. Ensure your development environment is set up according to the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup)
2. Configure your Android/iOS emulator or connect a physical device

### API Configuration
Update the API base URL in `src/Api.js`:
```javascript
const BASE_API = 'https://your-api-endpoint.com';
```

## 📚 Available Scripts

- `npm start` - Start the Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Native community for excellent documentation and support
- Contributors and testers who helped improve the application
- Design inspiration from modern mobile app interfaces

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/yourusername/reactnative-devbarber/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the issue

---

**Built with ❤️ using React Native**