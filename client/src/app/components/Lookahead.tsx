import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

export default function LookAheadToolTip(proposer) {
    return (
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger><div className='rounded-full w-3 h-3 bg-yellow-200'></div></TooltipTrigger>
            <TooltipContent>
            <p>Proposer: {proposer} </p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
    )
}