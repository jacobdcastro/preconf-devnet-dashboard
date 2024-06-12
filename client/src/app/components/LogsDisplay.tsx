import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils';

export default function LogsDisplay() {

    const logs = [{content: `#"--execution-endpoints=http://172.16.0.10:8551",
          "--checkpoint-sync-url=http://10.1.0.22:32999",
          "--execution-endpoints=http://127.0.0.1:8551",
          "--suggested-fee-recipient=0x8943545177806ED17B9F23F0a21ee5948eCaa776`}, {content: `  "--enr-address=10.1.0.22",
          "--enr-udp-port=50050",
          "--enr-tcp-port=50050",
          "--listen-address=0.0.0.0",
          "--port=50050",
          "--http",
          "--http-address=0.0.0.0",
`}];

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
            <CardFooter>
                {/* place outcome here with preconfs included or not */}
            </CardFooter>
        </Card>
    )
}