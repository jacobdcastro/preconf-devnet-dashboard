"use client";
import Epoch from "./components/Epoch";
import MainContentWrapper from "./components/MainContentWrapper";
import Navbar from "./components/Navbar";
import PreconfBanner from "./components/PreconfBanner";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["data", { timestamp: Date.now() }],
    queryFn: async () => {
      const data = axios({
        method: "GET",
        url: process.env.NEXT_PUBLIC_PRECONF_DASHBOARD_API_BASE_URL + "/data",
      });
      return data;
    },
  });

  return (
    <>
      <Navbar />
      <MainContentWrapper>
        <PreconfBanner />
        <Epoch />
      </MainContentWrapper>
    </>
  );
}
