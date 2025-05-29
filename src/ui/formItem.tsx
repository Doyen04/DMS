import React from "react";



interface FormItemProps {
    children: React.ReactNode;
}

const FormItem: React.FC<FormItemProps> = ({ children }) => {
    return (
        <div className="flex flex-col relative">
            {children}
        </div>
    );
};

export default FormItem