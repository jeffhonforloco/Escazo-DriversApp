import * as React from "react";
import { useEffect } from "react";
import { Image } from "@nativescript/core";

interface SplashScreenProps {
    onComplete: () => void;
    duration?: number;
}

export function SplashScreen({ onComplete, duration = 2000 }: SplashScreenProps) {
    useEffect(() => {
        const timer = setTimeout(onComplete, duration);
        return () => clearTimeout(timer);
    }, [onComplete, duration]);

    return (
        <gridLayout className="bg-[#5D3FD3]">
            <stackLayout className="items-center justify-center">
                <image
                    src="~/assets/images/escazo-logo.png"
                    className="w-48 h-48"
                    stretch="aspectFit"
                />
                <label className="text-white text-2xl font-bold mt-4">
                    Escazo Driver
                </label>
                <activityIndicator
                    busy={true}
                    className="text-white mt-8"
                />
            </stackLayout>
        </gridLayout>
    );
}