/* eslint-disable @next/next/no-img-element */
import SquareCard from "@/components/ui/squarecard";
import { IBuilder, IPreconf, ISlot } from "@/interfaces/preconf";
import { truncateAddress } from "../utils/truncate";
import { useContext } from "react";
import { ApiDataContext } from "../page";

const displayBrand = (item: IBuilder | IPreconf) => {
  return (
    <span className="flex items-center">
      <img className="h-7 w-auto mr-1" src={item.img} alt={item.name} />
      <p>{item.name}</p>
    </span>
  );
};

export default function PreconfBanner({
  builder,
  preconf,
  slotIndex, 
  title
}) {
  const data = useContext(ApiDataContext);

  // console.log(data);
  // console.log(currentEpochProposers);

  // replace this with real mapping
  // console.log(getNameByPubkey(proposerNames, '0x23'));

  return (
    <>
      <div className='lg:min-w-[530px]'>
        <h3 className="text-lg font-semibold leading-6 text-gray-200 ">
          {title}
        </h3>
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2 mt-2">
          <SquareCard
            title="Slot"
            value={slotIndex > 0 ? slotIndex : slotIndex < 0 ? 'No previous slot' : 'Fetching...'}
          />
          <SquareCard
            title="Proposer"
            value={
              data?.slot.currentEpochProposers
                ? truncateAddress({
                    address:
                      data?.slot.currentEpochProposers[slotIndex]?.pubkey,
                    firstCharCount: 5,
                  })
                : "Fetching.."
            }
          />
          <SquareCard
            title="Builder"
            value={builder ? displayBrand(builder) : "Fetching.."}
          />
          <SquareCard
            title="Relay"
            value={preconf ? displayBrand(preconf) : "Fetching.."}
          />
        </dl>
      </div>
      <div></div>
    </>
  );
}
