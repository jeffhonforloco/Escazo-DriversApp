import * as React from "react";
import { ScreenProps } from "../../navigation/types";
import { useDriver } from "../../hooks/useDriver";
import { useEarnings } from "../../hooks/useEarnings";
import { EarningsCard } from "../../components/earnings/EarningsCard";
import { JobsList } from "../../components/jobs/JobsList";
import { SubscriptionStatus } from "../../components/subscription/SubscriptionStatus";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { ErrorMessage } from "../../components/common/ErrorMessage";

export function HomeScreen({ navigation }: ScreenProps<"Home">) {
    const { driver, loading: driverLoading, error: driverError } = useDriver();
    const { earnings, loading: earningsLoading, error: earningsError } = useEarnings();

    if (driverLoading || earningsLoading) {
        return <LoadingSpinner />;
    }

    if (driverError || earningsError) {
        return <ErrorMessage message="Failed to load dashboard data" />;
    }

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-4">
                {earnings && (
                    <EarningsCard
                        daily={earnings.daily}
                        weekly={earnings.weekly}
                        monthly={earnings.monthly}
                    />
                )}
                
                <JobsList jobs={[]} /> {/* TODO: Add jobs data */}
                
                {driver && (
                    <SubscriptionStatus
                        isActive={driver.subscriptionStatus === 'active'}
                        nextPaymentDate={driver.nextPaymentDate}
                    />
                )}
            </stackLayout>
        </scrollView>
    );
}