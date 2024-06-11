/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function assetIcon(uri: string) {
    return (
        <img src={uri} alt={uri}
        className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
        aria-hidden="true"
        />
)
}