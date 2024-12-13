export interface Driver {
    id: string;
    name: string;
    email: string;
    phone: string;
    rating: number;
    isOnline: boolean;
    subscriptionStatus: 'active' | 'inactive';
    nextPaymentDate: string;
}

export interface Trip {
    id: string;
    driverId: string;
    pickup: string;
    dropoff: string;
    fare: number;
    status: 'pending' | 'accepted' | 'completed' | 'cancelled';
    timestamp: string;
    distance: string;
    duration: string;
}

export interface Earnings {
    daily: number;
    weekly: number;
    monthly: number;
    trips: number;
}