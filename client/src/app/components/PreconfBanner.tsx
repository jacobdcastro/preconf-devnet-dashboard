/* eslint-disable @next/next/no-img-element */
import SquareCard from "@/components/ui/squarecard";
import { IBuilder, IPreconf, ISlot, proposerNames } from "@/interfaces/preconf";
import { truncateAddress } from "../utils/truncate";
import { useContext } from "react";
import { ApiDataContext } from "../page";
import { findProposerNameByValidatorIndex } from "../utils/getName";


export const displayBrand = (item: IBuilder | IPreconf) => {
  return (
    <span className="flex items-center">
      <img className="h-7 w-auto mr-1" src={item.img} alt={item.name} />
      <p>{item.name}</p>
    </span>
  );
};

export default function PreconfBanner({ builder, preconf, title, slot}) {
  const data = useContext(ApiDataContext);
  const slotIndex = data?.slot?.slotIndex || null;
  const currentValidatorIndex = data?.slot?.currentEpochProposers[slotIndex]?.validator_index;
  const currentProposerName = findProposerNameByValidatorIndex(proposerNames, currentValidatorIndex);

  const displayProposer = () => {
    if (currentProposerName) {
      return currentProposerName
    } else if (data?.slot?.currentEpochProposers) {
      return truncateAddress({
        address:
          data?.slot?.currentEpochProposers[slotIndex]?.pubkey,
        firstCharCount: 5,
      })
    } else {
      return 'Fetching...'
    }
  }
 
  return (
    <>
      <div className="lg:min-w-[530px]">
        <h3 className="text-lg font-semibold leading-6 text-gray-200 ">
          {title}
        </h3>
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2 mt-2">
          <SquareCard title="Slot" value={slot || "Fetching..."} />
          <SquareCard
            title="Proposer"
            value={displayProposer()}
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
