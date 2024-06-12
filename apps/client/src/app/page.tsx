"use client"
import SquareCard from "@/components/ui/squarecard";
import EpochList from "./components/EpochList";
import MainContentWrapper from "./components/MainContentWrapper";
import Navbar from "./components/Navbar";
import PreconfBanner from "./components/PreconfBanner";


export default function Home() {
  return (
    <>
    <Navbar/>
    <MainContentWrapper>
      <PreconfBanner />
      <SquareCard />
    </MainContentWrapper>
    </>
  );
}
