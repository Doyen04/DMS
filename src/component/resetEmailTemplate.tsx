import React, { JSX } from 'react';

interface EmailTemplateProps {
    firstName: string;
    resetUrl: string;
}

export const ResetEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    resetUrl
}): JSX.Element => (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h1 style={{ color: '#0c7ff2', marginBottom: '10px', fontSize: '24px', fontWeight: 'bold' }}>
                Password Reset Request
            </h1>
        </div>
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h2 style={{ color: '#333', marginTop: '0', fontSize: '20px', fontWeight: '600' }}>
                Hello {firstName},
            </h2>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '16px' }}>
                We received a request to reset your password for your DMS account. If you made this request,
                please click the button below to reset your password:
            </p>
            <div style={{ textAlign: 'center', margin: '28px 0' }}>
                <a
                    href={resetUrl}
                    style={{
                        backgroundColor: '#0c7ff2',
                        color: 'white',
                        padding: '12px 28px',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        display: 'inline-block',
                        fontWeight: 'bold',
                    }}
                >
                    Reset Your Password
                </a>
            </div>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '16px' }}>
                This link will expire in 24 hours for security reasons.
            </p>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '16px' }}>
                If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
            </p>
        </div>
        <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '20px', fontSize: '12px', color: '#888' }}>
            <p style={{ marginBottom: '12px' }}>
                If you're having trouble clicking the button, copy and paste the URL below into your web browser:
            </p>
            <p style={{ wordBreak: 'break-all', marginBottom: '20px' }}>{resetUrl}</p>
            <p style={{ marginTop: '20px' }}>
                Best regards,<br />
                The DMS Team
            </p>
        </div>
    </div>
);