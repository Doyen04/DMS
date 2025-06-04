'use client'

import React, { forwardRef, useState } from "react"
import { useFormStatus } from 'react-dom';

// TODO: EXPLAIN CODE AND WHY


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText?: string;
}

const Button = forwardRef<HTMLInputElement, InputProps>(({
    type,
    id,
    value,
    ...props
}, ref) => {
    const { pending } = useFormStatus();
    return (
        <input className="bg-[#0c7ff2] rounded-sm p-2 text-white text-sm" type={type} value={pending ? `${value}....` : `${value}`} ref={ref} {...props} id={id}/>
    )
})

Button.displayName = "button"

export default Button