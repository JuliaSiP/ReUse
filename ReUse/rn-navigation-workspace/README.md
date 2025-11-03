# React Native Navigation Workspace

This project is a React Native application that demonstrates the use of navigation with a stack navigator and bottom tab navigator. It utilizes the following libraries:

- `react-native-safe-area-context`: Provides safe area insets for components.
- `@react-navigation/native`: Core navigation library for React Native.
- `@react-navigation/native-stack`: Stack navigator for managing a stack of screens.
- `@react-navigation/bottom-tabs`: Bottom tab navigator for switching between screens.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd rn-navigation-workspace
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Run the application:**
   For iOS:
   ```bash
   npx react-native run-ios
   ```
   For Android:
   ```bash
   npx react-native run-android
   ```

## Project Structure

The project is organized as follows:

- `src/`: Contains the main application code.
  - `App.tsx`: Main application component.
  - `index.tsx`: Entry point of the application.
  - `navigation/`: Contains navigation-related components.
    - `RootNavigator.tsx`: Sets up the main navigation structure.
    - `MainStack.tsx`: Defines the stack navigator.
    - `BottomTabs.tsx`: Sets up the bottom tab navigator.
  - `screens/`: Contains screen components.
    - `HomeScreen.tsx`: Home screen of the application.
    - `DetailsScreen.tsx`: Details screen of the application.
  - `components/`: Contains reusable components.
    - `SafeAreaWrapper.tsx`: Provides safe area insets.
  - `types/`: Contains TypeScript types and interfaces.

## License

This project is licensed under the MIT License.