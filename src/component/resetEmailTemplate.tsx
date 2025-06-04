import React, { JSX } from 'react';

interface EmailTemplateProps {
    firstName: string;
    resetUrl:string
}

export const ResetEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    resetUrl
}): JSX.Element => (
     <div className="font-sans max-w-[600px] mx-auto p-5">
        <div className="text-center mb-7">
            <h1 className="text-[#0c7ff2] mb-2.5 text-2xl font-bold">Password Reset Request</h1>
        </div>
        <div className="bg-gray-50 p-5 rounded-lg mb-5">
            <h2 className="text-gray-800 mt-0 text-xl font-semibold">Hello {firstName},</h2>
            <p className="text-gray-600 leading-relaxed">
                We received a request to reset your password for your DMS account. If you made this request,
                please click the button below to reset your password:
            </p>
            <div className="text-center my-7">
                <a
                    href={resetUrl}
                    className="bg-[#0c7ff2] text-white py-3 px-7 no-underline rounded inline-block font-bold hover:bg-blue-600 transition-colors"
                >
                    Reset Your Password
                </a>
            </div>
            <p className="text-gray-600 leading-relaxed">
                This link will expire in 24 hours for security reasons.
            </p>
            <p className="text-gray-600 leading-relaxed">
                If you didn&apos;t request a password reset, please ignore this email. Your password will remain unchanged.
            </p>
        </div>
        <div className="border-t border-gray-200 pt-5 text-xs text-gray-500">
            <p>
                If you&apos;re having trouble clicking the button, copy and paste the URL below into your web browser:
            </p>
            <p className="break-all">{resetUrl}</p>
            <p className="mt-5">
                Best regards,<br />
                The DMS Team
            </p>
        </div>
    </div>
);