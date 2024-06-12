"use client"
import SquareCard from "@/components/ui/squarecard";
import MainContentWrapper from "./components/MainContentWrapper";
import Navbar from "./components/Navbar";
import PreconfBanner from "./components/PreconfBanner";
import EpochRow from "./components/EpochRow";
import { Relayers } from "@/models/preconf";

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
