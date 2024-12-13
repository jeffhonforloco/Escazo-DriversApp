import * as React from "react";

interface Setting {
    key: string;
    label: string;
    type: "toggle" | "select";
    value: any;
    options?: string[];
    onChange: (value: any) => void;
}

interface SettingsSectionProps {
    title: string;
    settings: Setting[];
}

export function SettingsSection({ title, settings }: SettingsSectionProps) {
    return (
        <stackLayout className="bg-white p-4 rounded-lg mb-4">
            <label className="text-lg font-bold mb-4">{title}</label>

            {settings.map((setting) => (
                <gridLayout
                    key={setting.key}
                    columns="*, auto"
                    className="mb-4 last:mb-0"
                >
                    <label className="text-gray-700">{setting.label}</label>
                    
                    {setting.type === "toggle" ? (
                        <switch
                            col="1"
                            checked={setting.value}
                            onCheckedChange={(e) => setting.onChange(e.value)}
                        />
                    ) : (
                        <dropDown
                            col="1"
                            items={setting.options || []}
                            selectedIndex={setting.options?.indexOf(setting.value) || 0}
                            onSelectedIndexChanged={(e) => {
                                const value = setting.options?.[e.newIndex];
                                if (value) setting.onChange(value);
                            }}
                        />
                    )}
                </gridLayout>
            ))}
        </stackLayout>
    );
}