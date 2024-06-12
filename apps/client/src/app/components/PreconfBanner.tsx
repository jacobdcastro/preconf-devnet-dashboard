/* eslint-disable @next/next/no-img-element */
import SquareCard from "@/components/ui/squarecard"
import { IRelayerInfo, ISlot } from "@/models/preconf"


const RelayerDisplay = (relayer: IRelayerInfo) => {
  return (
    <span className='flex items-center'>
      <img className='h-7 w-7 mr-1' src={relayer.img}  alt={relayer.name}/>
      <p>{relayer.name}</p>
  </span>
  )
}
interface Props extends ISlot {
}
  
export default function PreconfBanner({relayer, slotIndex, gateway, proposerPubKey}: Props) {
  return (
      <>
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-200 ">Current Preconf Details</h3>
          <dl className="grid grid-cols-1 gap-2 sm:grid-cols-4 max-w-4xl mt-2">
              <SquareCard title="Slot" value={slotIndex ? slotIndex: 'Fetching..'}/>
              {/* Proposer */}
              <SquareCard title="Slot" value={proposerPubKey ? proposerPubKey: 'Fetching..'}/>
              {/* Gateway */}
              <SquareCard title="Gateway" value={gateway ? gateway: 'Fetching..'}/>
              <SquareCard title="Relayer" value={relayer ? RelayerDisplay(relayer): 'Fetching..'}/>
          </dl>
        </div>
        <div>
        </div>
      </>
    )
  }
  