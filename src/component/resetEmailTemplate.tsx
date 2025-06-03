import React, { JSX } from 'react';

interface EmailTemplateProps {
    firstName: string;
}

export const ResetEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
}): JSX.Element => (
    <div>
        <h1>Welcome, {firstName}!</h1>
    </div>
);