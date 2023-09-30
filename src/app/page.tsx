import "src/components/internal/text-field/text-field.scss";

import Image from "next/image";
import Link from "next/link";

import HeaderComponent from "@/layout/header/header.component";
import FooterComponent from "@/layout/footer/footer.component";

export default function Home() {
  return (
    <>
      <HeaderComponent />

      <div className="bg-abrandc-dark-blackish">
        <div className="container-2 mx-auto pt-20 pb-20">
          <div className="space-y-20">
            {/* Title */}
            <div className="flex flex-col items-center space-y-4">
              <h1 className="text-[56px] font-bold text-white leading-[68px] p-2 text-center">
                The PWR Chain Explorer
              </h1>
              {/* Search */}
              <div className="field lg:w-[800px] w-full relative">
                {/* Filter */}
                <div className="absolute left-6 top-[18px]">
                  <button className="flex items-center gap-x-2 bg-agrey-900 rounded-[8px] px-2 py-1 text-white text-sm font-medium">
                    <span>All Filters</span>
                    <Image
                      className="w-auto h-auto"
                      src="/icons/arrow-down.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                  </button>
                </div>
                <input
                  className="text-field !h-[64px] !rounded-[16px] !pl-36"
                  placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-x-4">
              {/* Pwr price and market cap  */}
              <div className="flex flex-col gap-y-4 xl:w-full">
                {/* Price */}
                <div className="flex items-center gap-x-4 bg-agrey-900 rounded-[12px] p-4 xl:w-[480px] w-[218px]">
                  <Image
                    className="w-auto h-auto"
                    src="/icons/pwr.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <div className="flex flex-col gap-y-2">
                    <h1 className="text-agrey-600 text-sm font-medium leading-[24px]">
                      PWR PRICE
                    </h1>
                    <h2 className="text-base font-bold text-white">
                      $1.098
                      <span className="font-medium text-ared-400 pl-2 pr-2">
                        (-4.19%)
                      </span>
                    </h2>
                  </div>
                </div>
                {/* Market cap */}
                <div className="flex items-center gap-x-4 bg-agrey-900 rounded-[12px] p-4 xl:w-[480px] w-[218px]">
                  <Image
                    className="w-auto h-auto"
                    src="/icons/globe.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <div className="flex flex-col gap-y-2">
                    <h1 className="text-agrey-600 text-sm font-medium leading-[24px]">
                      PWR MARKET CAP
                    </h1>
                    <h2 className="text-base font-bold text-white">
                      $1,000,000,00...
                    </h2>
                  </div>
                </div>
              </div>

              {/* Transactions, blocks, nodes */}
              <div className="flex flex-col gap-y-4 w-full">
                {/* Transactions */}
                <div className="flex items-center gap-x-4 bg-agrey-900 rounded-[12px] p-4 xl:w-[475px] w-[218px]">
                  <Image
                    className="w-auto h-auto"
                    src="/icons/transactions.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <div className="flex flex-col gap-y-2 w-full">
                    <div className="flex justify-between items-center text-agrey-600 text-sm font-medium leading-[24px]">
                      <h1>TRANSACTIONS</h1>
                      <h1>TPS</h1>
                    </div>
                    <div className="flex justify-between items-center text-base font-bold text-white">
                      <h2>1,960.01 M</h2>
                      <h2>5,200</h2>
                    </div>
                  </div>
                </div>
                {/* Blocks, nodes */}
                <div className="flex gap-x-4 w-full">
                  {/* Blocks */}
                  <div className="flex items-center gap-x-4 bg-agrey-900 rounded-[12px] p-4 w-[230px] h-[88px]">
                    <Image
                      className="w-auto h-auto"
                      src="/icons/clock.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                    <div className="flex flex-col gap-y-2">
                      <h1 className="text-agrey-600 text-sm font-medium leading-[24px]">
                        BLOCKS
                      </h1>
                      <h2 className="text-base font-bold text-white">10199</h2>
                    </div>
                  </div>
                  {/* Nodes */}
                  <div className="flex items-center gap-x-4 bg-agrey-900 rounded-[12px] p-4 w-[230px]">
                    <Image
                      className="w-auto h-auto"
                      src="/icons/nodes.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                    <div className="flex flex-col gap-y-2">
                      <h1 className="text-agrey-600 text-sm font-medium leading-[24px]">
                        VALIDATOR NODES
                      </h1>
                      <h2 className="text-base font-bold text-white">191910</h2>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graph */}
              <div className="flex flex-col gap-y-4 border rounded-xl p-4 w-full">
                <h1 className="text-agrey-600 text-sm font-medium">
                  TRANSACTION HISTORY IN 14 DAYS
                </h1>
                <div className="flex gap-x-2 mt-4 font-medium text-sm text-agrey-600 items-end">
                  <span className="translate-y-[-23px]">840k</span>
                  <div className="flex flex-col gap-y-1">
                    <Image
                      className="w-[262px] h-auto"
                      src="/graph.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                    <div className="flex justify-between items-center mx-1">
                      <span>Apr 23</span>
                      <span>Apr 30</span>
                      <span>May 7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest */}
            <div className="flex gap-x-8">
              {/* Latest Blocks */}
              <div className="flex flex-col w-full">
                <h1 className="text-white text-2xl font-medium leading-[36px] mb-3">
                  Latest Block
                </h1>
                {Array.from({ length: 5 }, (_, index) => (
                  <div
                    key={index}
                    className={`flex gap-x-2 lg:gap-x-6 items-center rounded-[8px] py-3 px-4 ${
                      index % 2 === 0 ? "bg-abrandc-dark-grey" : ""
                    }`}
                  >
                    <Image
                      className="w-auto h-auto"
                      src="/icons/block.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                    <div className="flex lg:justify-between justify-start items-center gap-x-4 w-full text-ablue-300">
                      <div className="flex flex-col gap-y-2">
                        <h1 className="font-medium pr-2 translate-y-1">
                          17214042
                        </h1>
                        <h1 className="font-medium text-sm text-white pr-2">
                          10 secs ago
                        </h1>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <h1 className="text-white">
                          Fee Recipient
                          <span className="text-ablue-300 font-medium pl-2">
                            rsync-build
                          </span>
                        </h1>
                        <h1 className="font-medium">89 txns</h1>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <h1 className="bg-agrey-800 rounded-[8px] text-white text-sm py-1 px-2">
                          0.49867 PWR
                        </h1>
                      </div>
                    </div>
                  </div>
                ))}
                <Link
                  href="#"
                  className="flex items-center justify-center gap-x-2 font-medium text-white leading-[26px] mt-3.5"
                >
                  <span>VIEW ALL BLOCKS</span>
                  <Image
                    className=""
                    src="/icons/arrow-down.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                </Link>
              </div>

              {/* Latest Transactions */}
              <div className="flex flex-col w-full">
                <h1 className="text-white text-2xl font-medium leading-[36px] mb-3">
                  Latest Transactions
                </h1>
                {Array.from({ length: 5 }, (_, index) => (
                  <div
                    key={index}
                    className={`flex gap-x-2 lg:gap-x-6 items-center rounded-[8px] py-3 px-4 ${
                      index % 2 === 0 ? "bg-abrandc-dark-grey" : ""
                    }`}
                  >
                    <Image
                      className="w-auto h-auto"
                      src="/icons/list.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                    <div className="flex lg:justify-between justify-start items-center gap-x-4 text-ablue-300 w-full">
                      <div className="flex flex-col gap-y-2">
                        <h1 className="font-medium pr-2 translate-y-1">
                          0x7796a..
                        </h1>
                        <h1 className="font-medium text-sm text-white pr-2">
                          10 secs ago
                        </h1>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <h1 className="text-white">
                          From{" "}
                          <span className="font-medium text-ablue-300 pl-1">
                            0x95222...feg5
                          </span>
                        </h1>
                        <h1 className="text-white">
                          To
                          <span className="text-ablue-100 font-medium pl-1">
                            0x95222...CC4ba
                          </span>
                        </h1>
                      </div>
                      <div className="">
                        <h1 className="bg-agrey-800 rounded-[8px] text-white text-sm py-1 px-2 lg:translate-">
                          0.49867 PWR
                        </h1>
                      </div>
                    </div>
                  </div>
                ))}
                <Link
                  href="#"
                  className="flex items-center justify-center gap-x-2 font-medium text-white leading-[26px] mt-3.5"
                >
                  <span>VIEW ALL TRANSACTIONS</span>
                  <Image
                    className=""
                    src="/icons/arrow-down.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterComponent />
    </>
  );
}
