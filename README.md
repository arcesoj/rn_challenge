# RN Challenge - Product Catalog with Calendar Integration

A modern React Native application that showcases a product catalog with integrated calendar functionality. Users can browse products from DummyJSON API and add purchase reminders directly to their device's calendar using a custom native module.

## 🚀 Features

### Core Functionality

- 📱 **Cross-platform compatibility** - Runs on both iOS and Android
- 🛍️ **Product catalog** - Browse and view detailed product information
- 📅 **Calendar integration** - Add product purchase reminders to device calendar
- 🔍 **Advanced filtering** - Sort by price, rating, title with category filtering
- ♾️ **Infinite scrolling** - Smooth pagination for large product lists
- 🔄 **Optimized data fetching** - React Query with caching and background updates

### Technical Features

- 🏗️ **Clean architecture** - Feature-based folder structure with separation of concerns
- 🔧 **Native modules** - Custom TurboModule for calendar integration
- 🎯 **TypeScript** - Full type safety across the application
- 🎨 **Modern navigation** - React Navigation v7 with native stack
- 🛡️ **Permission handling** - Robust calendar permission management
- ⚡ **Performance optimized** - Gesture handling and screen optimization

## 🛠️ Tech Stack

- **React Native** 0.81.1
- **TypeScript** ~5.6.3
- **React Navigation** v7 (Native Stack)
- **TanStack Query** (React Query) v5
- **React Native Permissions** v5
- **Custom Native Modules** (TurboModule)

## 📋 Prerequisites

- **Node.js** ≥20 (as specified in package.json engines)
- **React Native CLI** or **Expo CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **Ruby** (for iOS CocoaPods management)

## 🚀 Getting Started

### 1. Environment Setup

Ensure your React Native development environment is properly configured:

```bash
# Check React Native environment
npx @react-native-community/cli doctor
```

### 2. Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone <repository-url>
cd rn_challenge

# Install Node.js dependencies
npm install

# Install iOS dependencies (macOS only)
npm run pod-install
```

### 3. Running the App

#### For Android:

```bash
# Start Metro bundler
npm start

# In another terminal, run Android app
npm run android
```

#### For iOS (macOS only):

```bash
# Start Metro bundler
npm start

# In another terminal, run iOS app
npm run ios
```

## 📱 App Architecture

### Project Structure

```
src/
├── api/                 # API client configuration
├── context/            # React Context providers (React Query)
├── features/           # Feature-based modules
│   └── products/       # Product-related functionality
│       ├── ProductList/     # Product listing components
│       ├── ProductDetails/  # Product detail components
│       ├── ProductApi.ts    # API calls
│       ├── ProductService.ts # React Query hooks
│       ├── mappers.ts       # Data transformation
│       └── types.ts         # TypeScript definitions
├── hooks/              # Reusable custom hooks
├── navigation/         # Navigation configuration
└── utils/              # Utility functions

specs/                  # Native module specifications
android/                # Android-specific code
ios/                    # iOS-specific code
```

### Data Flow

1. **API Layer**: HTTP client with DummyJSON API integration
2. **Service Layer**: React Query hooks for data fetching and caching
3. **UI Layer**: React components with TypeScript
4. **Native Layer**: Custom TurboModule for calendar integration

## 🔧 Native Calendar Integration

This app includes a custom native module for calendar integration:

### Android Implementation

- **File**: `android/app/src/main/java/com/rn_challenge/NativeCalendarEventModule.kt`
- **Functionality**: Creates calendar intents using Android's CalendarContract
- **Permissions**: Requires calendar permissions handled by react-native-permissions

### iOS Implementation

- **Note**: iOS implementation would follow similar pattern using EventKit framework
- **TurboModule Spec**: Defined in `specs/NativeCalendarEvent.ts`

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run TypeScript type checking
npm run typecheck

# Run linting
npm run lint
```

## 🔧 Available Scripts

```bash
npm run android          # Run on Android device/emulator
npm run ios             # Run on iOS device/simulator
npm run start           # Start Metro bundler
npm run pod-install     # Install iOS CocoaPods dependencies
npm run clean-android   # Clean Android build
npm run clean-ios       # Clean iOS build
npm run codegen-android # Generate Android codegen artifacts
npm test               # Run tests
npm run typecheck      # TypeScript type checking
npm run lint           # ESLint code linting
```

## 🚧 Development Notes

### API Configuration

- **Base URL**: `https://dummyjson.com`
- **Products endpoint**: `/products`
- **Categories endpoint**: `/products/categories`
- **Pagination**: Supports limit/skip parameters
- **Sorting**: By price, rating, or title with asc/desc order

### State Management

- **React Query**: Handles server state, caching, and background updates
- **Local State**: React hooks for component state
- **Navigation State**: React Navigation handles route state

### Permission Handling

The app includes robust permission handling for calendar access:

- Automatic permission checking on component mount
- Permission request flow with user feedback
- Graceful handling of denied/blocked permissions

## 🐛 Troubleshooting

### Common Issues

#### Metro bundler issues:

```bash
# Reset Metro cache
npx react-native start --reset-cache
```

#### Android build issues:

```bash
# Clean and rebuild
npm run clean-android
cd android && ./gradlew clean && cd ..
npm run android
```

#### iOS build issues:

```bash
# Clean iOS build
npm run clean-ios
npm run pod-install
npm run ios
```

#### Node modules issues:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is part of a React Native coding challenge.

---

**Note**: This app uses DummyJSON API for demo purposes. In a production environment, you would replace this with your actual API endpoints and implement proper authentication and error handling.
