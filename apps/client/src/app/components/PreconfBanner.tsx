/* eslint-disable @next/next/no-img-element */
import SquareCard from "@/components/ui/squarecard"
import { IRelayerInfo, ISlot } from "@/models/preconf"
import { truncateAddress } from "../utils/truncate"

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
  
export default function PreconfBanner({relayer, slotIndex, gateway, currentProposerPubkey}: Props) {
  
  const truncatedPubkey = currentProposerPubkey ? truncateAddress({address: currentProposerPubkey, firstCharCount: 5}) : null;
  return (
      <>
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-200 ">Current Preconf Details</h3>
          <dl className="grid grid-cols-1 gap-2 sm:grid-cols-3 max-w-4xl mt-2">
              <SquareCard title="Current Slot" value={slotIndex ? slotIndex : 'Fetching..'} currentEpoch={0} currentEpochProposers={[]}/>
              <SquareCard title="Proposer" value={ truncatedPubkey ? truncatedPubkey : 'Fetching..'} currentEpoch={0} currentEpochProposers={[]}/>
              <SquareCard title="Relayer" value={relayer ? RelayerDisplay(relayer) : 'Fetching..'} currentEpoch={0} currentEpochProposers={[]}/>
          </dl>
        </div>
        <div>
        </div>
      </>
    )
  }
  