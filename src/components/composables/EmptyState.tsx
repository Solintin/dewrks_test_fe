import React from 'react';
import { FileIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
    label?: string;
    icon?: React.ReactNode;
    description?: string;
    actionButton?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    label = 'No items found',
    icon = <FileIcon className="w-16 h-16 text-gray-400" />,
    description = 'There are currently no items to display.',
    actionButton
}) => {
    return (
        <Card className="w-full mx-auto my-5">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-4">
                    {icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {label}
                </h2>
                <p className="text-gray-500 mb-4">
                    {description}
                </p>
                {actionButton && (
                    <div className="mt-4">
                        {actionButton}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default EmptyState;