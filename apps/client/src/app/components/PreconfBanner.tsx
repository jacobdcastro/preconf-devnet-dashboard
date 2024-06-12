/* eslint-disable @next/next/no-img-element */
import SquareCard from "@/components/ui/squarecard"
import { IRelayerInfo, ISlot } from "@/interfaces/preconf"
import { truncateAddress } from "../utils/truncate"

const displayRelayerBrand = (relayer: IRelayerInfo) => {
  return (
    <span className='flex items-center'>
      <img className='h-7 w-7 mr-1' src={relayer.img}  alt={relayer.name}/>
      <p>{relayer.name}</p>
  </span>
  )
}

const convertProposerPubkeyToName = (currentProposerPubkey: ISlot) => {
  return (
    <span className='flex'>
      <p></p>
    </span>
  )
}

interface Props extends ISlot {
}
  
export default function PreconfBanner({relayer, slotIndex, currentProposerPubkey}: Props) {
  
  const truncatedPubkey = currentProposerPubkey ? truncateAddress({address: currentProposerPubkey, firstCharCount: 5}) : null;
  return (
      <>
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-200 ">Current Preconf Details</h3>
          <dl className="grid grid-cols-1 gap-2 sm:grid-cols-3 max-w-4xl mt-2">
              <SquareCard title="Current Slot" value={slotIndex ? slotIndex : 'Fetching..'} />
              <SquareCard title="Proposer" value={ truncatedPubkey ? truncatedPubkey : 'Fetching..'} />
              <SquareCard title="Relayer" value={relayer ? displayRelayerBrand(relayer) : 'Fetching..'} />
          </dl>
        </div>
        <div>
        </div>
      </>
    )
  }
  