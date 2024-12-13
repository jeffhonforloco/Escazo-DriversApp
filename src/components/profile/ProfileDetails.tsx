import * as React from "react";
import { TextField } from "../common/TextField";
import { Button } from "../common/Button";
import type { Driver } from "../../services/api/types";

interface ProfileDetailsProps {
    driver: Driver;
    isEditing: boolean;
    onEdit: () => void;
    onSave: () => void;
}

export function ProfileDetails({ driver, isEditing, onEdit, onSave }: ProfileDetailsProps) {
    const [formData, setFormData] = useState({
        name: driver.name,
        email: driver.email,
        phone: driver.phone
    });

    const handleSave = async () => {
        try {
            // Update driver profile
            onSave();
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    return (
        <stackLayout className="bg-white p-4 rounded-lg mb-4">
            <gridLayout columns="*, auto" className="mb-4">
                <label className="text-lg font-bold">Profile Details</label>
                {!isEditing && (
                    <button
                        col="1"
                        className="text-blue-600"
                        onTap={onEdit}
                    >
                        Edit
                    </button>
                )}
            </gridLayout>

            {isEditing ? (
                <>
                    <TextField
                        label="Name"
                        value={formData.name}
                        onTextChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                    />
                    <TextField
                        label="Email"
                        value={formData.email}
                        onTextChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                        keyboardType="email"
                    />
                    <TextField
                        label="Phone"
                        value={formData.phone}
                        onTextChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                        keyboardType="phone"
                    />
                    <Button
                        text="Save Changes"
                        onTap={handleSave}
                        variant="primary"
                    />
                </>
            ) : (
                <gridLayout rows="auto, auto, auto" columns="auto, *" className="mt-2">
                    <label row="0" col="0" className="text-gray-500">Name:</label>
                    <label row="0" col="1" className="ml-2">{driver.name}</label>
                    
                    <label row="1" col="0" className="text-gray-500">Email:</label>
                    <label row="1" col="1" className="ml-2">{driver.email}</label>
                    
                    <label row="2" col="0" className="text-gray-500">Phone:</label>
                    <label row="2" col="1" className="ml-2">{driver.phone}</label>
                </gridLayout>
            )}
        </stackLayout>
    );
}