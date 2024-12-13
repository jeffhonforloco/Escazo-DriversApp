import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";

export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
    Onboarding: undefined;
};

export type MainStackParamList = {
    Home: undefined;
    Trip: { tripId: string };
    Earnings: undefined;
    Profile: undefined;
};

export type ScreenProps<T extends keyof MainStackParamList> = {
    route: RouteProp<MainStackParamList, T>;
    navigation: FrameNavigationProp<MainStackParamList, T>;
};