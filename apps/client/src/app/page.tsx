"use client"
import SquareCard from "@/components/ui/squarecard";
import EpochList from "./components/EpochList";
import MainContentWrapper from "./components/MainContentWrapper";
import Navbar from "./components/Navbar";
import PreconfBanner from "./components/PreconfBanner";
import EpochRow from "./components/EpochRow";
import { IRelayerInfo, Relayers } from "@/models/preconf";

const getCurrentRelayer = () => {
  return Relayers[0];
}

export default function Home() {
  const currentRelayer = getCurrentRelayer();
  return (
    <>
    <Navbar/>
    <MainContentWrapper>
      <EpochRow />
      <PreconfBanner relayer={currentRelayer} />
      <SquareCard />
    </MainContentWrapper>
    </>
  );
}
