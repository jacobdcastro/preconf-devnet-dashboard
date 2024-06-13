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
  currentProposerPubkey,
}) {
  const data = useContext(ApiDataContext);
  const slotIndex = data?.slot.slotIndex - 1;
  const currentSlot = data?.slot.currentSlot;
  const currentEpochProposers = data?.slot.currentEpochProposers;
  console.log(data);
  console.log(currentEpochProposers);

  // replace this with real mapping
  // console.log(getNameByPubkey(proposerNames, '0x23'));

  const truncatedPubkey = currentProposerPubkey
    ? truncateAddress({ address: currentProposerPubkey, firstCharCount: 5 })
    : null;

  return (
    <>
      <div>
        <h3 className="text-lg font-semibold leading-6 text-gray-200 ">
          Current Preconf Details
        </h3>
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-4 max-w-4xl mt-2">
          <SquareCard
            title="Current Slot"
            value={currentSlot ? currentSlot : "Fetching.."}
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
          {/* <SquareCard
            title="Builder"
            value={builder ? displayBrand(builder) : "Fetching.."}
          /> */}
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
