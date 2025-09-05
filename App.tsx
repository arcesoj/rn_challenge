import 'react-native-gesture-handler'; // harmless even if not strictly required

import { AppQueryProvider } from './src/context/ReactQueryProvider';
import { AppNavigator } from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <AppQueryProvider>
      <AppContent />
    </AppQueryProvider>
  </SafeAreaProvider>
);


function AppContent() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}

export default App;
