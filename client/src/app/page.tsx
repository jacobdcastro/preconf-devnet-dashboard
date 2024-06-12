/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import MainContentWrapper from "./components/MainContentWrapper";
import Navbar from "./components/Navbar";
import PreconfBanner from "./components/PreconfBanner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import EpochRow from "./components/EpochRow";
import LogsDisplay from "./components/LogsDisplay";
import { useEffect } from "react";
import { Builders, Preconfs } from "@/interfaces/preconf";


export default function Home() {
  const { data } = useQuery({
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

  // remove thisssss omfg
  const [requestedEvents, setRequestedEvents ] = useState([
    {
      protocol_id: 1234556,
      tx_hash: "0xabc123",
      timestamp: Date.now(),
      slot: 8960,
      validator_index: 98,
      endpoint: "endpoint1",
    },
    {
      protocol_id: 1234556,
      tx_hash: "0xdef456",
      timestamp: Date.now(),
      slot: 8961,
      validator_index: 160,
      endpoint: "endpoint2",
    },
    {
      protocol_id: 1234556,
      tx_hash: "0xghi789",
      timestamp: Date.now(),
      slot: 8962,
      validator_index: 198,
      endpoint: "endpoint3",
    },
  ])
  const [responseEvents, setResponseEvents ] = useState([
    {
      protocol_id: 1234556,
      tx_hash: "0xjkl012",
      timestamp: Date.now(),
      slot: 8960,
      validator_index: 51,
      endpoint: "endpoint4",
    },
    {
      protocol_id: 1234556,
      tx_hash: "0xmnq345",
      timestamp: Date.now(),
      slot: 8961,
      validator_index: 153,
      endpoint: "endpoint5",
    },
    {
      protocol_id: 1234556,
      tx_hash: "0xrst678",
      timestamp: Date.now(),
      slot: 8962,
      validator_index: 195,
      endpoint: "endpoint6",
    },
  ])

  const [confirmedBlock, setConfirmedBlock] = useState({
    protocol_id: 1234556,
    tx_hash: "0xuvw901",
    timestamp: Date.now(),
    slot: 8962,
    block_number: 123456,
    block_hash: "0xhash123",
    graffiti: "example graffiti",
    validator_index: 198,
    endpoint: "endpoint7",
    tx_hashes: ["0xhash1", "0xhash2", "0xhash3"],
  })

  //todo: get current builder and preconf
  const currentBuilder = Builders[1];
  const currentPreconf = Preconfs[1];

  // todo: get proposer of future slots in the same epoch and pass it to EpochRow

  useEffect(() => {
      console.log(data?.slot)
      console.log(data?.slot.currentEpochProposers[data?.slot.slotIndex].pubkey)
      setSlotIndex(data?.slot.slotIndex + 1)
      setCurrentEpoch(data?.slot.currentEpoch);
      setCurrentEpochProposers(data?.slot.currentEpochProposers)
      setCurrentProposerPubKey(data?.slot.currentEpochProposers[data?.slot.slotIndex].pubkey);
      // setRequestedEvents(data?.requestedEvents)
      // setResponseEvents(data?.responseEvents)
      // setConfirmedBlock(data?.confirmedBlock)
    }, [data, slotIndex, currentEpochProposers]);
  return (
    <main>
      <img src="/gradient.png" className="absolute top-0 right-0 w-fukll h-auto" alt="orb" />
      <Navbar />
      <MainContentWrapper>
        <EpochRow currentEpoch={currentEpoch} slotIndex={slotIndex} currentEpochProposers={currentEpochProposers} />
        <PreconfBanner currentProposerPubkey={currentProposerPubkey} builder={currentBuilder} slotIndex={slotIndex} preconf={currentPreconf} currentEpoch={currentEpoch} currentEpochProposers={[]} />
        <LogsDisplay requestedEvents={requestedEvents} responseEvents={responseEvents} confirmedBlock={confirmedBlock} currentEpoch={0} currentEpochProposers={[]} />
      </MainContentWrapper>
    </main>
  );
}
