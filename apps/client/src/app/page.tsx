"use client"
import Epoch from "./components/Epoch";
import MainContentWrapper from "./components/MainContentWrapper";
import Navbar from "./components/Navbar";
import PreconfBanner from "./components/PreconfBanner";
import Image from "next/image";


export default function Home() {
  return (
    <>
    <Navbar/>
    <MainContentWrapper>
      <PreconfBanner />
      <Epoch />
    </MainContentWrapper>
    </>
  );
}
