import * as React from "react";
import { useState } from "react";
import { DocumentService } from "../../services/api/document.service";
import { ErrorMessage } from "../../components/common/ErrorMessage";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";

interface DocumentUploadScreenProps {
    driverId: string;
    onComplete: () => void;
}

export function DocumentUploadScreen({ driverId, onComplete }: DocumentUploadScreenProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [documents, setDocuments] = useState({
        license: null as File | null,
        insurance: null as File | null,
        vehicle: null as File | null
    });

    const handleFileSelect = async (type: keyof typeof documents, file: File) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await DocumentService.uploadDocument(driverId, file, type);
            
            setDocuments(prev => ({
                ...prev,
                [type]: file
            }));

            // Check if all documents are uploaded
            if (Object.values(documents).every(doc => doc !== null)) {
                onComplete();
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-6">
                <label className="text-3xl font-bold mb-4 text-center">
                    Upload Documents
                </label>
                
                <label className="text-gray-600 mb-6 text-center">
                    Please upload the required documents to complete your registration
                </label>

                {error && (
                    <ErrorMessage message={error} />
                )}

                {loading && (
                    <LoadingSpinner />
                )}

                <stackLayout className="mb-6">
                    <label className="text-lg font-medium mb-2">Driver's License</label>
                    <button
                        className="p-4 rounded-lg bg-white border border-gray-300"
                        onTap={() => {/* Handle file selection */}}
                    >
                        {documents.license ? 'License Uploaded' : 'Upload License'}
                    </button>
                </stackLayout>

                <stackLayout className="mb-6">
                    <label className="text-lg font-medium mb-2">Insurance Document</label>
                    <button
                        className="p-4 rounded-lg bg-white border border-gray-300"
                        onTap={() => {/* Handle file selection */}}
                    >
                        {documents.insurance ? 'Insurance Uploaded' : 'Upload Insurance'}
                    </button>
                </stackLayout>

                <stackLayout className="mb-6">
                    <label className="text-lg font-medium mb-2">Vehicle Registration</label>
                    <button
                        className="p-4 rounded-lg bg-white border border-gray-300"
                        onTap={() => {/* Handle file selection */}}
                    >
                        {documents.vehicle ? 'Registration Uploaded' : 'Upload Registration'}
                    </button>
                </stackLayout>
            </stackLayout>
        </scrollView>
    );
}