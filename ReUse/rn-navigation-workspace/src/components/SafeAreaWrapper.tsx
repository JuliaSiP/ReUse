import React from 'react';
import { SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const SafeAreaWrapper: React.FC = ({ children }) => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default SafeAreaWrapper;