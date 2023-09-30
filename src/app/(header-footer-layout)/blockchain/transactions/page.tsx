import Link from "next/link";
import Image from "next/image";

export default function Transactions() {
  return (
    <div className="container-2 mx-auto pb-20">
      <div className="space-y-20">
        <section className="space-y-4">
          {/* Title */}
          <h1 className="text-4xl font-bold text-white px-2 py-1">
            Transactions
          </h1>
          <div className="flex items-center gap-x-4">
            {/* Transactions */}
            <div className="flex items-center gap-x-4 bg-agrey-900 rounded-[12px] p-4 w-full">
              <Image
                className="w-auto h-auto px-2.5"
                src="/icons/transactions.svg"
                width={20}
                height={20}
                alt=""
              />
              <div className="flex flex-col gap-y-2">
                <h1 className="font-medium text-agrey-600 text-sm">
                  TRANSACTIONS (24H)
                </h1>
                <h2 className="text-white font-bold">
                  1,960.01
                  <span className="text-[#00F696] font-normal pl-2">
                    (4.04%)
                  </span>
                </h2>
              </div>
            </div>

            {/* Transactions Fee */}
            <div className="flex items-center gap-x-4 bg-agrey-900 rounded-[12px] p-4 w-full">
              <Image
                className="w-auto h-auto px-2.5"
                src="/icons/pwr.svg"
                width={20}
                height={20}
                alt=""
              />
              <div className="flex flex-col gap-y-2">
                <h1 className="font-medium text-agrey-600 text-sm">
                  TRANSACTION FEE (24h)
                </h1>
                <h2 className="text-white font-bold">
                  1,2819.99 PWR
                  <span className="text-abrandc-dark-red font-normal pl-2">
                    (4.04%)
                  </span>
                </h2>
              </div>
            </div>

            {/* Avg Transactions Fee */}
            <div className="flex items-center gap-x-4 bg-agrey-900 rounded-[12px] p-4 w-full h-[88px]">
              <Image
                className="w-auto h-auto px-2.5"
                src="/icons/transactions.svg"
                width={20}
                height={20}
                alt=""
              />
              <div className="flex flex-col gap-y-2">
                <h1 className="font-medium text-agrey-600 text-sm">
                  AVG. TRANSACTION FEE (24h)
                </h1>
                <h2 className="text-white font-bold">
                  21.31 USD
                  <span className="text-abrandc-dark-red font-normal pl-2">
                    (6.04%)
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="table w-full">
          <div className="flex justify-between items-center">
            <div className="text-white font-medium">
              <h1 className="leading-[26px] px-2 py-1">
                More than 1,381,417,561 transactions found
              </h1>
              <h2 className="text-xs px-2 py-1">
                (Showing the last 500k records)
              </h2>
            </div>
            <div className="flex items-center gap-x-2 text-white">
                <h3 className="">First</h3>
                <h3 className="">Last</h3>
            </div>
          </div>

          {/* Table */}
          <div className="">
            
          </div>
        </section>
      </div>
    </div>
  );
}
