import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";

const DexTrades = () => {
  return (
    <section className="overflow-x-auto">
      <div className="flex justify-between items-center">
        <div className="dark:text-white text-abrandc-dark-grey font-medium">
          <h1 className="leading-[26px] px-2 py-1">
            More than 1,381,417,561 transactions found
          </h1>
          <h2 className="text-xs px-2 py-1">(Showing the last 500k records)</h2>
        </div>
        <div className="flex items-center gap-x-2 dark:text-white text-abrandc-dark-grey">
          <h3 className="">First</h3>
          <h3 className="">Last</h3>
        </div>
      </div>

      {/* Table */}
      <div className=" mt-5 overflow-x-auto w-full">
        {/* hr */}

        <div className="flex items-center gap-x-2 text-white text-sm font-bold h-[48px] px-3">
          <Image
            className="w-auto h-auto invisible"
            src="/icons/eye.svg"
            width={20}
            height={20}
            alt=""
          />
          <div className="flex items-center justify-center xl:w-[200px] w-[200px] xl:px-0 px-16 ">
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
          <div className="flex items-center justify-center w-[130px] xl:px-0 px-16 ">
            <h1 className="px-2 dark:text-white text-abrandc-dark-grey ">
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
          <div className="flex items-center justify-center w-[130px] xl:px-0 px-16 ">
            <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
              Action
            </h1>
          </div>

          <div className="flex items-center justify-center w-[220px] xl:px-0 px-16 ">
            <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
              Token Amount (Out)
            </h1>
          </div>
          <div className="flex items-center justify-center w-[220px] xl:px-0 px-16 ">
            <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
              Token Amount (In)
            </h1>
          </div>
          <div className="flex items-center justify-center w-[176px] xl:px-0 px-16">
            <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
              Swapped Rate
            </h1>
          </div>

          <div className="flex items-center justify-center w-[176px] xl:px-0 px-16">
            <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
              Value
            </h1>
          </div>
        </div>

        {/* rows */}
        {Array.from({ length: 5 }, (_, index) => (
          <div
            className={`flex items-center gap-x-2 font-medium h-[90px] p-3 rounded-[8px] w-full${
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
              className="w-[130px] xl:px-0 px-16"
            >
              <h1 className="dark:text-ablue-300 text-ablue-200">
                0x96d1643b7d...
              </h1>
            </Link>
            <div className="text-center w-[130px] xl:px-0 px-16">
              <h1 className="dark:text-white text-abrandc-dark-grey font-normal">
                12 secs ago
              </h1>
            </div>
            <div className="text-center w-[80px] xl:px-0">
              <h1 className=" text-green-600">Buy</h1>
            </div>

            <div className="flex items-center justify-center gap-x-2 w-[150px] xl:px-0 ml-5">
              <h1 className="dark:text-ablue-100 text-ablue-500">
                27,432,277,369.00
              </h1>
            </div>

            <div className="flex items-center justify-center gap-x-2 w-[188px] xl:px-0 px-16">
              <h1 className="dark:text-ablue-100 text-ablue-500">
                27,432,277,369.00
              </h1>
            </div>
            <div className="text-center w-[130px]">
              <h1 className="dark:text-white text-abrandc-dark-grey font-normal">
                0.4857 PWR
              </h1>
            </div>

            <div className="text-center w-[130px]">
              <h1 className="dark:text-white text-abrandc-dark-grey font-normal">
                $49.75
              </h1>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DexTrades;
