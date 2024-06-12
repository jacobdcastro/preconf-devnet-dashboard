/* eslint-disable @next/next/no-img-element */
import { IRelayerInfo, Relayers, ISlot } from "@/models/preconf"

const stats = [
    { name: 'Gateway', stat: 'gatewayName', },
    { name: 'Relayer', stat: 'Titan', },
  ]

const RelayerDisplay = (relayer: IRelayerInfo) => {
  return (
    <span className='flex'>
      <img className='h-7 w-7' src={relayer.img}  alt={relayer.name}/>
      <p>{relayer.name}</p>
  </span>
  )
}

interface Props extends ISlot {}
  
export default function PreconfBanner({relayer}: Props) {

  return (
      <>
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">Current Preconf Details</h3>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {/* Proposer */}
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Proposer</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">0x4324b...1200s</dd>
              </div>
              {/* Gateway */}
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Gateway</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">Gateway</dd>
              </div>
              {/* Relayer */}
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Relayer</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{relayer && RelayerDisplay(relayer)}</dd>
              </div>
          </dl>
        </div>
        <div>
        
        </div>
      </>
    )
  }
  