"use client"
import SquareCard from "@/components/ui/squarecard";
import EpochList from "./components/EpochList";
import MainContentWrapper from "./components/MainContentWrapper";
import Navbar from "./components/Navbar";
import PreconfBanner from "./components/PreconfBanner";
import EpochRow from "./components/EpochRow";


export default function Home() {
  return (
    <>
    <Navbar/>
    <MainContentWrapper>
      <PreconfBanner />
      <SquareCard />
      <EpochRow />
    </MainContentWrapper>
    </>
  );
}
