'use client'

import React, { forwardRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import Image from "next/image"

// TODO: EXPLAIN CODE AND WHY


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText?: string;
    iconUrl: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type,
    id,
    labelText,
    iconUrl,
    ...props
}, ref) => {
    const [inputType, setInputType] = useState(type);
    const [visibilityIcon, setVisibilityIcon] = useState('/visibility_off.svg');

    const toggleVisibility = (ev: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
        ev.preventDefault();
        if (inputType === 'password') {
            setInputType('text');
            setVisibilityIcon('/visibility.svg');
        } else {
            setInputType('password');
            setVisibilityIcon('/visibility_off.svg');
        }
    }
    return (
        <>
            <label className="text-sm" htmlFor={id}>
                {labelText}
            </label>
            <span className="absolute top-1/2 left-1 pointer-events-none">
                <Image src={iconUrl} width={20} height={20} alt="icon" />
            </span>
            {(type == 'password') &&
                <span className="bg-white p-[1px] absolute top-1/2 right-0.5" onClick={toggleVisibility}>
                    <Image src={visibilityIcon} width={20} height={20} alt="icon" />
                </span>
            }
            <input type={inputType} className={twMerge(`h-[35px] w-full border-1 text-sm border-[#d3dce6] rounded-sm pl-6.5 focus:outline-[#0c7ff2] focus:outline-2 placeholder:text-xs`, className)} ref={ref} {...props} id={id} />
        </>
    )
})

Input.displayName = "input"

export default Input