/* eslint-disable @next/next/no-img-element */
"use client";
import { createContext, useState } from "react";
import MainContentWrapper from "./components/MainContentWrapper";
import Navbar from "./components/Navbar";
import PreconfBanner from "./components/PreconfBanner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import EpochRow from "./components/EpochRow";
import LogsDisplay from "./components/LogsDisplay";
import { Builders, Preconfs } from "@/interfaces/preconf";
import { DataPayload } from "@/interfaces/api";
import useWebSocket from "@/hooks/useWebsocket";
import { ApiDataContext } from "@/components/apiDataContext";

export default function Home() {
  const [currentSlot, setCurrentSlot] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [slotIndex, setSlotIndex] = useState(0);
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

  //todo: get current builder and preconf
  const currentBuilder = Builders[1];
  const currentPreconf = Preconfs[1];

  return (
    <ApiDataContext.Provider value={data}>
      <main>
        <img
          src="/gradient.png"
          className="absolute top-0 right-0 w-fukll h-auto"
          alt="orb"
        />
        <Navbar />
        <MainContentWrapper>
          <EpochRow />
          <div className="flex gap-x-6 w-full lg:min-w-[1060px]">
            <div className="flex flex-col">
              <PreconfBanner
                builder={currentBuilder}
                preconf={currentPreconf}
                title="Previous Slot Details"
                slot={data?.slot?.currentSlot}
                
              />
              <LogsDisplay
                title="Previous Slot"
                preconfTxns={data?.prevSlotPreconfTxns}
              />
            </div>
            <div className="flex flex-col">
              <PreconfBanner
                builder={currentBuilder}
                preconf={currentPreconf}
                title="Current Slot Details"
                slot={data?.slot?.currentSlot + 1}
              />
              <LogsDisplay
                title="Current Slot"
                preconfTxns={data?.currentSlotPreconfTxns}
              />
            </div>
          </div>
        </MainContentWrapper>
      </main>
    </ApiDataContext.Provider>
  );
}
