import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils';
import { ISlot } from '@/interfaces/preconf';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
  
interface Props extends ISlot {
    requestedEvents: any[];
    responseEvents: any[];
    confirmedBlock: {}
}

export default function LogsDisplay({requestedEvents}: Props ) {

    return (
        <Card className='mt-4 max-w-4xl h-full'>
            <CardHeader>
                <h2 className="max-w-5xl text-base font-semibold leading-6 text-gray-200 lg:mx-0 lg:max-w-none">
                    Preconfirmations
                </h2>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col'>
                <Table className='w-full'>
                    <TableHeader>
                        <TableRow  className='border-zinc-800'>
                        <TableHead className="w-[100px]">Timestamp</TableHead>
                        <TableHead>Txhash</TableHead>
                        <TableHead>Slot</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Included?</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requestedEvents ? requestedEvents.map((log, index) => (
                            <TableRow key={index} className='border-zinc-800'>
                            <TableCell key={index} className={cn("bg-zinc-800 p-2", {"bg-zinc-900": index % 2 === 0 })}>{log.timestamp}</TableCell>
                            <TableCell key={index} className={cn("bg-zinc-800 p-2", {"bg-zinc-900": index % 2 === 0 })}>{log.tx_hash}</TableCell>
                            <TableCell key={index} className={cn("bg-zinc-800 p-2", {"bg-zinc-900": index % 2 === 0 })}>{log.slot}</TableCell>
                            <TableCell key={index} className={cn("bg-zinc-800 p-2", {"bg-zinc-900": index % 2 === 0 })}>
                                <Badge variant="outline">{log.slot}</Badge>
                            </TableCell>
                            <TableCell key={index} className={cn("bg-zinc-800 p-2", {"bg-zinc-900": index % 2 === 0 })}>
                                <Badge variant="default">yes</Badge>
                            </TableCell>
                        </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
                </div>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}