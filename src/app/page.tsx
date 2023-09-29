import "src/components/internal/text-field/text-field.scss";

import Image from "next/image";

import HeaderComponent from "@/layout/header/header.component";
import FooterComponent from "@/layout/footer/footer.component";

export default function Home() {
  return (
    <>
      <HeaderComponent />

      <div className="pt-20 pb-20 bg-abrandc-dark-blackish">
        <div className="container-2 mx-auto">
          <div className="space-y-20">
            {/* Title */}
            <div className="flex flex-col items-center space-y-4">
              <h1 className="text-[56px] font-bold text-white leading-[68px] p-2">
                The PWR Chain Explorer
              </h1>
              {/* Search */}
              <div className="field w-[800px] relative">
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

            {/* Info */}
            <div className="flex gap-x-4">
              {/* Pwr price and market cap  */}
              <div className="flex flex-col gap-y-4 w-full">
                {/* Price */}
                <div className="flex items-center gap-x-4 bg-agrey-900 rounded-[12px] p-4 w-full">
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
                <div className="flex items-center gap-x-4 bg-agrey-900 rounded-[12px] p-4">
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
                <div className="flex items-center gap-x-4 bg-agrey-900 rounded-[12px] p-4">
                  <Image
                    className="w-auto h-auto"
                    src="/icons/transactions.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <div className="flex flex-col gap-y-2 w-full">
                    <div className="flex justify-between items-center text-agrey-600 text-sm font-medium leading-[24px]">
                      <h1>Transactions</h1>
                      <h1>TPS</h1>
                    </div>
                    <div className="flex justify-between items-center text-base font-bold text-white">
                      <h2>1,960.01 M</h2>
                      <h2>5,200</h2>
                    </div>
                  </div>
                </div>
                {/* Blocks, nodes */}
                <div className="flex gap-x-4">
                  {/* Blocks */}
                  <div className="flex items-center gap-x-4 bg-agrey-900 rounded-[12px] p-4 w-full">
                    <Image
                      className="w-auto h-auto"
                      src="/icons/clock.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                    <div className="flex flex-col gap-y-2">
                      <h1 className="text-agrey-600 text-sm font-medium leading-[24px]">
                        Blocks
                      </h1>
                      <h2 className="text-base font-bold text-white">10199</h2>
                    </div>
                  </div>
                  {/* Nodes */}
                  <div className="flex items-center gap-x-4 bg-agrey-900 rounded-[12px] p-4 w-full">
                    <Image
                      className="w-auto h-auto"
                      src="/icons/nodes.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                    <div className="flex flex-col gap-y-2">
                      <h1 className="text-agrey-600 text-sm font-medium leading-[24px]">
                        Validator Nodes
                      </h1>
                      <h2 className="text-base font-bold text-white">191910</h2>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graph */}
              <div className="flex flex-col gap-y-4 w-full h-[192px] w-full border rounded-xl p-4">
                <h1 className="text-agrey-600 text-sm font-medium">
                  TRANSACTION HISTORY IN 14 DAYS
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterComponent />
    </>
  );
}
