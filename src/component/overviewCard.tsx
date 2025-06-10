import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'



interface OverviewCardProps {
    title: string
    value: string
    icon: React.ElementType
    description: string
    link?: string
    linkText?: string
    style?: string
}

function OverviewCard({ title, value, icon: Icon, description, link, linkText, style }: OverviewCardProps) {
    return (
        <section className={twMerge(`rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${style}`)}>
            <aside className="flex flex-col space-y-1.5 p-6 pb-2">
                <div className="flex items-center justify-between">
                    <button className="text-sm font-semibold text-slate-700">{title}</button>
                    <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
            </aside>
            <article className='p-6 pt-0'>
                <div className="text-3xl font-bold tracking-tight text-slate-900">{value}</div>
                <p className="text-xs font-normal text-slate-500 text-muted-foreground mt-1">{description}</p>
            </article>
            {link && linkText && (
                <div className='flex items-center p-6 pt-0'>
                    <button className="text-blue-700 hover:bg-blue-700/40 hover:rounded-lg">
                        <Link href={link} className="flex items-center justify-center
                        whitespace-nowrap text-sm font-medium ring-offset-background 
                        transition-colors focus-visible:outline-none focus-visible:ring-2 
                        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
                        disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 
                        [&_svg]:shrink-0 hover:bg-accent h-9 rounded-md px-3 text-blue-700 
                        hover:text-blue-700/80 tracking-wide">
                            {linkText} <ArrowRight className="ml-1 h-4 w-4 " />
                        </Link>
                    </button>
                </div>
            )}
        </section>
    )
}


export default OverviewCard

