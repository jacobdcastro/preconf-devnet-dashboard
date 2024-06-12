/* eslint-disable @next/next/no-img-element */
import SquareCard from "@/components/ui/squarecard"
import { IBuilder, IPreconf, ISlot } from "@/interfaces/preconf"
import { truncateAddress } from "../utils/truncate"

const displayBrand = (item: IBuilder | IPreconf) => {
  return (
    <span className='flex items-center'>
      <img className='h-7 w-auto mr-1' src={item.img}  alt={item.name}/>
      <p>{item.name}</p>
  </span>
  )
}

interface Props extends ISlot {
}
  
export default function PreconfBanner({builder, preconf, slotIndex, currentProposerPubkey}: Props) {

  // replace this with real mapping
  // console.log(getNameByPubkey(proposerNames, '0x23'));
  
  const truncatedPubkey = currentProposerPubkey ? truncateAddress({address: currentProposerPubkey, firstCharCount: 5}) : null;
  return (
      <>
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-200 ">Current Slot Data</h3>
          <dl className="grid grid-cols-1 gap-2 sm:grid-cols-4 max-w-4xl mt-2">
              <SquareCard title="Current Slot" value={slotIndex ? slotIndex : 'Fetching..'} />
              <SquareCard title="Proposer" value={ truncatedPubkey ? truncatedPubkey : 'Fetching..'} />
              <SquareCard title="Builder" value={builder ? displayBrand(builder) : 'Fetching..'} />
              <SquareCard title="Preconf Submitted By" value={preconf ? displayBrand(preconf) : 'Fetching..'} />
          </dl>
        </div>
        <div>
        </div>
      </>
    )
  }
  