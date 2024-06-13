/* eslint-disable @next/next/no-img-element */
import SquareCard from "@/components/ui/squarecard";
import { IBuilder, IPreconf, proposerNames } from "@/interfaces/preconf";
import { truncateAddress } from "../utils/truncate";
import { useContext, useEffect } from "react";
import { ApiDataContext } from "@/components/apiDataContext";
import {
  NonProposer,
  Proposer,
  findProposerByValidatorIndex,
} from "@/lib/preconfAgentMapping";

export const BrandDisplay = (item: NonProposer) => {
  return (
    <span className="flex items-center">
      {item.img && (
        <img className="h-7 w-auto mr-2" src={item.img} alt={item.name} />
      )}
      <p>{item.name}</p>
    </span>
  );
};

export default function PreconfBanner({
  proposer,
  title,
  slot,
}: {
  proposer: Proposer;
  title: string;
  slot: number;
}) {
  const data = useContext(ApiDataContext);
  const slotIndex = data?.slot?.slotIndex || null;
  const currentValidatorIndex =
    data?.slot?.currentEpochProposers[slotIndex]?.validator_index;

  const displayProposer = () => {
    if (proposer) {
      return BrandDisplay({
        name: proposer.name,
        img: proposer.img,
      });
    } else if (data?.slot?.currentEpochProposers) {
      return truncateAddress({
        address: data?.slot?.currentEpochProposers[slotIndex]?.pubkey,
        firstCharCount: 5,
      });
    } else {
      return "Fetching...";
    }
  };

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
            value={
              proposer
                ? BrandDisplay({
                    name: proposer.name,
                    img: proposer.img,
                  })
                : displayProposer()
            }
          />
          {/* <SquareCard
            title="Builder"
            value={builder ? brandDisplay(builder) : "Fetching.."}
          />
          <SquareCard
            title="Relay"
            value={preconf ? brandDisplay(preconf) : "Fetching.."}
          /> */}

          <SquareCard
            title="Builder"
            value={
              proposer && proposer?.builders && proposer?.builders.length > 0
                ? BrandDisplay(proposer.builders[0])
                : "Unknown"
            }
          />
          <SquareCard
            title="Relay"
            value={
              proposer && proposer?.relays && proposer?.relays.length > 0
                ? BrandDisplay(proposer.relays[0])
                : "Unknown"
            }
          />
        </dl>
      </div>
      <div></div>
    </>
  );
}
