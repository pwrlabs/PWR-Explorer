import Link from "next/link";
import Image from "next/image";
import { BsArrowRightShort } from "react-icons/bs";

export default function Transactions() {
  return (
    <div className="container-2 mx-auto">
      <div className="space-y-20">
        <section className="space-y-4">
          {/* Title */}
          <h1 className="text-4xl font-bold dark:text-white text-abrandc-dark-grey px-2 py-1">
            Transactions
          </h1>
          <div className="flex items-center gap-x-4">
            {/* Transactions */}
            <div className="flex items-center gap-x-4 dark:bg-agrey-900 bg-abrandc-light-grey rounded-[12px] p-4 w-full">
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
                <h2 className="dark:text-white text-abrandc-dark-grey font-bold">
                  1,960.01
                  <span className="text-[#00F696] font-normal pl-2">
                    (4.04%)
                  </span>
                </h2>
              </div>
            </div>

            {/* Transactions Fee */}
            <div className="flex items-center gap-x-4 dark:bg-agrey-900 bg-abrandc-light-grey rounded-[12px] p-4 w-full">
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
                <h2 className="dark:text-white text-abrandc-dark-grey font-bold">
                  1,2819.99 PWR
                  <span className="text-abrandc-dark-red font-normal pl-2">
                    (4.04%)
                  </span>
                </h2>
              </div>
            </div>

            {/* Avg Transactions Fee */}
            <div className="flex items-center gap-x-4 dark:bg-agrey-900 bg-abrandc-light-grey  rounded-[12px] p-4 w-full h-[88px]">
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
                <h2 className="dark:text-white text-abrandc-dark-grey font-bold">
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
        <section className="overflow-x-auto">
          <div className="flex justify-between items-center">
            <div className="dark:text-white text-abrandc-dark-grey font-medium">
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
          <div className="w-full mt-5 overflow-x-auto">
            {/* hr */}
            <div className="flex items-center gap-x-2 text-white text-sm font-bold h-[48px] px-3">
              <Image
                className="w-auto h-auto invisible"
                src="/icons/eye.svg"
                width={20}
                height={20}
                alt=""
              />
              <div className="flex items-center justify-center w-[140px]">
                <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
                  Txn Hash
                </h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-center w-[176px]">
                <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
                  Status
                </h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-center w-[176px]">
                <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
                  Block
                </h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-center w-[176px]">
                <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
                  Timestamp
                </h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-center w-[188px]">
                <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
                  From
                </h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-center w-[188px]">
                <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
                  To
                </h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-center w-[176px]">
                <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
                  Value
                </h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
            </div>

            {/* rows */}
            {Array.from({ length: 5 }, (_, index) => (
              <div
                className={`flex items-center gap-x-2 font-medium h-[90px] p-3 rounded-[8px] ${
                  index % 2 == 0
                    ? " dark:bg-abrandc-dark-grey bg-abrandc-light-grey"
                    : "bg-transparent"
                }`}
                key={index}
              >
                <Image
                  className="w-auto h-auto"
                  src="/icons/eye.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <Link
                  href="/blockchain/transactions/details"
                  className="w-[130px]"
                >
                  <h1 className="dark:text-ablue-300 text-ablue-200">
                    0x96d1643b7d...
                  </h1>
                </Link>
                <div className="text-center w-[178px]">
                  <h1 className="dark:text-white text-abrandc-dark-grey font-normal">
                    Success
                  </h1>
                </div>
                <div className="text-center w-[178px]">
                  <h1 className="dark:text-ablue-300 text-ablue-200">
                    17214042
                  </h1>
                </div>
                <div className="text-center w-[178px]">
                  <h1 className="dark:text-white text-abrandc-dark-grey font-normal">
                    12 secs ago
                  </h1>
                </div>
                <div className="flex items-center justify-center gap-x-2 w-[188px]">
                  <h1 className="dark:text-ablue-100 text-ablue-500">
                    0x71E5eE...4C1681
                  </h1>
                  <Image
                    className="w-auto h-auto"
                    src="/icons/copy.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                </div>
                <div className="w-6 h-6 bg-violet-100 dark:bg-agrey-800 rounded-full flex justify-center items-center">
                  <BsArrowRightShort
                    size={30}
                    className="text-agrey-500 dark:text-agrey-600"
                  />
                </div>

                <div className="flex items-center justify-center gap-x-2 w-[188px]">
                  <h1 className="dark:text-ablue-100 text-ablue-500">
                    0x71E5eE...4C1681
                  </h1>
                  <Image
                    className="w-auto h-auto"
                    src="/icons/copy.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                </div>
                <div className="text-center w-[178px]">
                  <h1 className="dark:text-white text-abrandc-dark-grey font-normal">
                    0.4857 PWR
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
