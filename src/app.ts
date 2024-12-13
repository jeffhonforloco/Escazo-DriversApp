import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { BaseNavigationContainer } from '@react-navigation/core';
import { RootNavigator } from './navigation/RootNavigator';
import { SplashScreen } from './components/splash/SplashScreen';

Object.defineProperty(global, '__DEV__', { value: false });

function App() {
    const [isLoading, setIsLoading] = React.useState(true);

    return isLoading ? (
        <SplashScreen onComplete={() => setIsLoading(false)} />
    ) : (
        <BaseNavigationContainer>
            <RootNavigator />
        </BaseNavigationContainer>
    );
}

ReactNativeScript.start(React.createElement(App, {}, null));