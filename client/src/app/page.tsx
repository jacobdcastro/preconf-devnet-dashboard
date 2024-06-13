/* eslint-disable @next/next/no-img-element */
"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import MainContentWrapper from "./components/MainContentWrapper";
import Navbar from "./components/Navbar";
import PreconfBanner from "./components/PreconfBanner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import EpochRow from "./components/EpochRow";
import LogsDisplay from "./components/LogsDisplay";
import { Builders, Preconfs, proposerNames } from "@/interfaces/preconf";
import { DataPayload } from "@/interfaces/api";
import useWebSocket from "@/hooks/useWebsocket";
import { ApiDataContext } from "@/components/apiDataContext";
import { proposers } from "@/lib/preconfAgentMapping";
import { truncateHex } from "./utils/truncate";

export default function Home() {
  const [currentSlot, setCurrentSlot] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  // const [slotIndex, setSlotIndex] = useState(0);
  const [currentEpochProposers, setCurrentEpochProposers] = useState([]);
  const [currentProposerPubkey, setCurrentProposerPubKey] = useState("");

  // const { data } = useQuery<DataPayload>({
  //   queryKey: ["data", { slot: currentSlot }],
  //   queryFn: async () => {
  //     const { data } = await axios<{}>({
  //       method: "GET",
  //       url: process.env.NEXT_PUBLIC_PRECONF_DASHBOARD_API_BASE_URL + "/epoch",
  //     });
  //     // console.log(data);
  //     setCurrentSlot(data?.slot.currentSlot);
  //     setSlotIndex(data?.slot.slotIndex + 1);
  //     setCurrentEpoch(data?.slot.currentEpoch);
  //     setCurrentEpochProposers(data?.slot.currentEpochProposers);
  //     setCurrentProposerPubKey(
  //       data?.slot.currentEpochProposers[data?.slot.slotIndex].pubkey
  //     );
  //     return data;
  //   },
  //   refetchInterval: 400,
  //   refetchIntervalInBackground: true,
  //   placeholderData: placeholderDataPayload,
  // });

  const data = useWebSocket(
    process.env.NEXT_PUBLIC_PRECONF_DASHBOARD_API_BASE_URL
  );

  const [slotIndexInEpoch, setSlotIndexInEpoch] = useState(0);

  const slotIndexEpoch = data?.slot?.slotIndex;
  const slotIndexFromTxn = data?.currentSlotPreconfTxns[0]?.slot % 32;

  useEffect(() => {
    if (slotIndexFromTxn && slotIndexEpoch) {
      setSlotIndexInEpoch(
        slotIndexEpoch <= slotIndexFromTxn % 32
          ? slotIndexFromTxn % 32
          : slotIndexEpoch
      );
    }
  }, [slotIndexEpoch, slotIndexFromTxn]);

  const proposerCurrentSlot = useMemo(() => {
    const valIndex =
      data?.slot?.currentEpochProposers[slotIndexInEpoch]?.validator_index;
    return proposers.find((proposer) =>
      proposer.validatorIndices.includes(parseInt(valIndex?.toString()))
    );
  }, [data?.slot?.currentEpochProposers, slotIndexInEpoch]);

  const proposerPreviousSlot = useMemo(() => {
    const valIndex =
      data?.slot?.currentEpochProposers[slotIndexInEpoch - 1]?.validator_index;
    return (
      proposers.find((proposer) =>
        proposer.validatorIndices.includes(
          valIndex ? parseInt(valIndex?.toString()) : null
        )
      ) || {
        name: truncateHex({
          hexStr: data?.slot?.currentEpochProposers[slotIndexInEpoch].pubkey,
        }),
        img: "",
      }
    );
  }, [data?.slot?.currentEpochProposers, slotIndexInEpoch]);

  useEffect(() => {
    console.log("prevIndex", slotIndexEpoch - 1, proposerPreviousSlot);
    console.log("currIndex", slotIndexEpoch, proposerCurrentSlot);
  }, [proposerCurrentSlot, proposerPreviousSlot, slotIndexEpoch]);

  return (
    <ApiDataContext.Provider value={{ ...data, slotIndexInEpoch }}>
      <main>
        <img
          src="/gradient.png"
          className="absolute top-0 right-0 w-fukll h-auto z-0 pointer-events-none"
          alt="orb"
        />
        <Navbar />
        <MainContentWrapper>
          <EpochRow />
          <div className="flex gap-x-6 w-full lg:min-w-[1060px]">
            <div className="flex flex-col">
              <PreconfBanner
                proposer={proposerPreviousSlot}
                title="Previous Slot Details"
                slot={data?.slot?.currentSlot}
              />
              <LogsDisplay
                title="Previous Slot"
                preconfTxns={data?.prevSlotPreconfTxns}
                isCurrent={false}
              />
            </div>
            <div className="flex flex-col">
              <PreconfBanner
                proposer={proposerCurrentSlot}
                title="Current Slot Details"
                slot={data?.slot?.currentSlot + 1}
              />
              <LogsDisplay
                title="Current Slot"
                preconfTxns={data?.currentSlotPreconfTxns}
                isCurrent={true}
              />
            </div>
          </div>
        </MainContentWrapper>
      </main>
    </ApiDataContext.Provider>
  );
}
