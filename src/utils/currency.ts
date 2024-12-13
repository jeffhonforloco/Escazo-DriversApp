export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
};

export const calculateEarnings = (trips: Array<{ fare: number }>): number => {
    return trips.reduce((total, trip) => total + trip.fare, 0);
};