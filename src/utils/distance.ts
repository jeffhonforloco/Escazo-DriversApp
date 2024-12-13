export const formatDistance = (miles: number): string => {
    return `${miles.toFixed(1)} mi`;
};

export const calculateETA = (distance: number, avgSpeed: number = 30): number => {
    // Returns estimated minutes based on distance and average speed
    return Math.round((distance / avgSpeed) * 60);
};