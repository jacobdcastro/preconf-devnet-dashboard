import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils';

export default function LogsDisplay() {

    const logs = [{content: 'hello'}, {content: 'hi'}];
    return (
        <Card className='mt-4 max-w-4xl h-full'>
            <CardHeader>
                <h2 className="max-w-5xl text-base font-semibold leading-6 text-gray-200 lg:mx-0 lg:max-w-none">
                    Logs
                </h2>
            </CardHeader>
            <CardContent>
                {logs.map((log, index) => (
                    <div key={index} className={cn("bg-zinc-800 p-2", {"bg-zinc-900": index % 2 === 0 })}><p>{log.content}</p></div>
                ))}
            </CardContent>
        </Card>
    )
}