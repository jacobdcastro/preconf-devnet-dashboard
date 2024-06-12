/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import MainContentWrapper from "./components/MainContentWrapper";
import Navbar from "./components/Navbar";
import PreconfBanner from "./components/PreconfBanner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SquareCard from "@/components/ui/squarecard";
import EpochRow from "./components/EpochRow";
import { Relayers } from "@/models/preconf";
import LogsDisplay from "./components/LogsDisplay";
import { useEffect } from "react";

const getCurrentRelayer = () => {
  return Relayers[0];
};


export default function Home() {
  const { data, isLoading, isPending, error } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const { data } = await axios({
        method: "GET",
        url: process.env.NEXT_PUBLIC_PRECONF_DASHBOARD_API_BASE_URL + "/data",
      });
      return data;
    },
    refetchInterval: 400,
    refetchIntervalInBackground: true,
  });

  const [currentEpoch, setCurrentEpoch] = useState(null);
  const [slotIndex, setSlotIndex] = useState(0);
  const [currentEpochProposers, setCurrentEpochProposers] = useState([])
  const [currentProposerPubkey, setCurrentProposerPubKey] = useState('')

  useEffect(() => {
      console.log(data?.slot)
      console.log(data?.slot.currentEpochProposers[data?.slot.slotIndex].pubkey)
      setSlotIndex(data?.slot.slotIndex + 1)
      setCurrentEpoch(data?.slot.currentEpoch);
      setCurrentEpochProposers(data?.slot.currentEpochProposers)
      setCurrentProposerPubKey(data?.slot.currentEpochProposers[data?.slot.slotIndex].pubkey);

    }, [data, slotIndex, currentEpochProposers]);
  


  const currentRelayer = getCurrentRelayer();
  return (
    <main>
      <img src="/gradient.png" className="absolute top-0 right-0 w-fukll h-auto" alt="orb" />
      <Navbar />
      <MainContentWrapper>
        <EpochRow currentEpoch={currentEpoch} slotIndex={slotIndex} currentEpochProposers={currentEpochProposers} />
        <PreconfBanner currentProposerPubkey={currentProposerPubkey} relayer={currentRelayer} slotIndex={slotIndex} currentEpoch={null} currentEpochProposers={[]} />
        <LogsDisplay />
      </MainContentWrapper>
    </main>
  );
}
