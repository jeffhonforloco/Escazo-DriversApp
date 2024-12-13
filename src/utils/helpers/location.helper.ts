import { Location } from '@nativescript/core';

export const LocationHelper = {
    formatCoordinates: (location: Location): string => {
        return `${location.latitude},${location.longitude}`;
    },

    calculateDistance: (start: Location, end: Location): number => {
        const R = 6371; // Earth's radius in km
        const dLat = toRad(end.latitude - start.latitude);
        const dLon = toRad(end.longitude - start.longitude);
        const lat1 = toRad(start.latitude);
        const lat2 = toRad(end.latitude);

        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
};

function toRad(value: number): number {
    return value * Math.PI / 180;
}