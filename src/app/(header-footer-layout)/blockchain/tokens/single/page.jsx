"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/internal/button/button.component";
import { useState } from "react";
import Transfers from "./Transfers";
import DexTrader from "./DexTrades";
import Holders from "./Holders";

const InfoCard = ({ title, data }) => (
  <div className="flex-1 items-center gap-x-4 dark:bg-agrey-900 bg-abrandc-light-grey rounded-[12px] py-4 px-3 xl:w-[195px] h-[275px]">
    <h1 className="dark:text-white text-abrandc-dark-grey text-xl font-bold font-['Space Grotesk'] leading-loose">
      {title}
    </h1>
    <div className="flex flex-col gap-y-4">
      {data.map((item, index) => (
        <div key={index}>
          <h1 className="text-gray-500 text-sm font-medium">{item.label}</h1>
          <div className="flex items-center gap-2">
            <h1 className="dark:text-white text-abrandc-dark-grey text-base font-bold">
              {item.value}
            </h1>
            {item.icon && (
              <Image src={item.icon} width={40} height={40} alt="" />
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function SingleBlocks() {
  const [selectedView, setSelectedView] = useState("All");

  const handleViewAll = () => setSelectedView("All");
  const handleViewTransfers = () => setSelectedView("Transfers");
  const handleViewHolders = () => setSelectedView("Holders");
  const handleViewDEXTrades = () => setSelectedView("DEXTrades");

  return (
    <div className="container-2 mx-auto text-white">
      <div className="space-y-12">
        {/* Title */}
        <div className="flex xl:flex-row flex-col justify-between items-center">
          <div className="flex flex-1 items-center xl:gap-x-2 gap-x-8 ">
            <Image
              className=""
              src="/currency/BNB.png"
              width={48}
              height={48}
              alt=""
            />
            <h1 className="px-2 py-1 xl:text-[36px] text-[24px] font-bold leading-[44px] dark:text-white text-abrandc-dark-grey">
              Tether USD
            </h1>
            <h1 className="text-4xl font-bold text-gray-500">(USDT)</h1>
          </div>
          <div className="flex flex-1 items-center gap-x-2 w-full xl:justify-end justify-center">
            <Button className="blue !h-[36px] xl:w-[120px] w-[40%]">Buy</Button>
            <Button className="blue !h-[36px] xl:w-[120px] w-[40%]">
              Exchange
            </Button>
          </div>
        </div>
        {/* Three Blocks and they need refactor */}
        <div className="flex  justify-center items-center gap-10">
          <div className="flex-1 items-center gap-x-4 dark:bg-agrey-900 bg-abrandc-light-grey rounded-[12px] py-4 px-3 xl:w-[195px] h-[275px]">
            <h1 className=" dark:text-white text-abrandc-dark-grey text-xl font-bold font-['Space Grotesk'] leading-loose">
              Overview
            </h1>
            <div className="flex flex-col gap-y-4">
              <div className="">
                <h1 className="text-gray-500 text-sm  font-medium">
                  MAX TOTAL SUPPLY
                </h1>
                <div className="flex items-center gap-2">
                  <h1 className="dark:text-white text-abrandc-dark-grey text-base font-bold ">
                    36,283,188,702.721368 PWR
                  </h1>
                  <Image
                    className=""
                    src="/icons/info-circle.svg"
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>
              </div>
              <div className="">
                <h1 className="text-gray-500 text-sm  font-medium">HOLDERS</h1>
                <div className="flex items-center gap-4">
                  <h1 className="dark:text-white text-abrandc-dark-grey text-base font-bold ">
                    4,384,313
                  </h1>
                  <h1 className="text-red-500 text-base font-bold ">
                    (-0.023%)
                  </h1>
                </div>
              </div>
              <div className="">
                <h1 className="text-gray-500 text-sm  font-medium">
                  TOTAL TRANSFERS
                </h1>
                <div className="flex items-center ">
                  <h1 className="dark:text-white text-abrandc-dark-grey text-base font-bold ">
                    186,031,454
                  </h1>
                  <Image
                    className=""
                    src="/icons/info-circle.svg"
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 items-center gap-x-4 dark:bg-agrey-900 bg-abrandc-light-grey rounded-[12px] py-4 px-3 xl:w-[195px] h-[275px]">
            <h1 className=" dark:text-white text-abrandc-dark-grey text-xl font-bold font-['Space Grotesk'] leading-loose">
              Market
            </h1>
            <div className="flex flex-col gap-y-4">
              <div className="">
                <h1 className="text-gray-500 text-sm  font-medium">PRICE</h1>
                <div className="flex items-center gap-2">
                  <h1 className="dark:text-white text-abrandc-dark-grey text-base font-bold ">
                    $1.00
                  </h1>
                  <h1 className="text-gray-500 text-sm  font-medium">
                    @0.000566 PWR
                  </h1>
                  <span className="text-green-600">(+0.07%)</span>
                </div>
              </div>
              <div className="">
                <div className="flex items-center ">
                  <h1 className="text-gray-500 text-sm  font-medium">
                    FULLY DILUTED MARKET CAP
                  </h1>
                  <Image
                    className=""
                    src="/icons/info-circle.svg"
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>

                <h1 className="dark:text-white text-abrandc-dark-grey text-base font-bold ">
                  $36,319,471,891.42
                </h1>
              </div>
              <div className="">
                <div className="flex items-center ">
                  <h1 className="text-gray-500 text-sm  font-medium">
                    CIRCULATING SUPLLY MARKET CAP
                  </h1>
                  <Image
                    className=""
                    src="/icons/info-circle.svg"
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>

                <h1 className="dark:text-white text-abrandc-dark-grey text-base font-bold ">
                  $36,319,471,891.42
                </h1>
              </div>
            </div>
          </div>
          <div className="flex-1 items-center gap-4 space-y-4 dark:bg-agrey-900 bg-abrandc-light-grey rounded-[12px] py-4 px-3 xl:w-[195px] h-[275px]">
            <h1 className=" dark:text-white text-abrandc-dark-grey text-xl font-bold font-['Space Grotesk'] leading-loose">
              Other Info
            </h1>
            <div className="flex flex-col gap-y-2">
              <h1 className="text-gray-500 text-sm  font-medium">
                CIRCULATING SUPLLY MARKET CAP
              </h1>
              <div className="flex items-center ">
                <h1 className="text-blue-700 text-base font-medium">
                  0x71E5eEhnfkk6574u9n479...4C1681
                </h1>
                <Image
                  className=""
                  src="/icons/copy.svg"
                  width={40}
                  height={40}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-4 text-black">
          <button onClick={handleViewAll}>All</button>
          <button onClick={handleViewTransfers}>Transfers</button>
          <button onClick={handleViewHolders}>Holders</button>
          <button onClick={handleViewDEXTrades}>DEX Trades</button>
        </div>

        {selectedView === "All" && (
          <div className="space-y-2">
            <h1 className="text-red-500">All</h1>
          </div>
        )}

        {selectedView === "Transfers" && (
          <div className="space-y-2">
            <Transfers />
          </div>
        )}

        {selectedView === "Holders" && (
          <div className="space-y-2">
          <Holders/>
          </div>
        )}

        {selectedView === "DEXTrades" && (
          <div className="space-y-2">
          <DexTrader/>
          </div>
        )}
      </div>
    </div>
  );
}
