import Image from "next/image";
import Link from "next/link";

import Button from "@/components/internal/button/button.component";
import Tags from "@/components/internal/tags/tags.component";

export default function SingleBlock() {
  const block = "17222820";

  const section_2_data = [
    {
      label: "Block Reward",
      value:
        "0.047598858328293488 PWR (0 + 0.981970538585756278 - 0.93437168025746279",
    },
    {
      label: "Size",
      value: "86,992 bytes",
    },
  ];

  return (
    <div className="container-2 mx-auto dark:text-white text-abrandc-dark-grey">
      {/* Title */}
      <div className="flex items-center gap-x-2">
        <h1 className="px-2 py-1 text-[36px] font-bold leading-[44px]">
          Blocks Details
        </h1>
        <Tags>{block}</Tags>
      </div>

      {/* Block details */}
      <div className="space-y-4 mt-12">
        {/* First section */}
        <section className="space-y-4">
          {/* Block height */}
          <div className="flex xl:flex-row flex-col xl:items-center items-start gap-x-[100px] text-sm">
            <div className="flex items-center gap-x-2 px-2 py-1 w-[220px]">
              <h1 className="text-agrey-500 dark:text-agrey-600">Block Height</h1>
              <Image
                className="w-auto h-auto"
                src="/icons/info-circle.svg"
                width={20}
                height={20}
                alt=""
              />
            </div>
            <h2 className="px-2 py-1">{block}</h2>
          </div>
          {/* Timestamp */}
          <div className="flex xl:flex-row flex-col xl:items-center items-start gap-x-[100px] text-sm">
            <div className="flex items-center gap-x-2 px-2 py-1 w-[220px]">
              <h1 className="text-agrey-500 dark:text-agrey-600">Timestamp</h1>
              <Image
                className="w-auto h-auto"
                src="/icons/info-circle.svg"
                width={20}
                height={20}
                alt=""
              />
            </div>
            <div className="flex items-center gap-x-2 px-2 py-1">
              <Image
                className=""
                src="/icons/clock.svg"
                width={18.5}
                height={18.5}
                alt=""
              />
              <h2 className="leading-[24px] break-all">
                3 hrs 53 mins ago (May 09 2023 12:13:59 +UTC)
              </h2>
            </div>
          </div>
          {/* Proposed on */}
          <div className="flex xl:flex-row flex-col xl:items-center items-start gap-x-[100px] text-sm">
            <div className="flex items-center gap-x-2 px-2 py-1 w-[220px]">
              <h1 className="text-agrey-500 dark:text-agrey-600">Proposed on</h1>
              <Image
                className="w-auto h-auto"
                src="/icons/info-circle.svg"
                width={20}
                height={20}
                alt=""
              />
            </div>
            <h2 className="px-2 py-1">
              Block proposed on slot{" "}
              <span className="dark:text-ablue-100 text-ablue-500 font-medium">6420882</span> epoch{" "}
              <span className="dark:text-ablue-100 text-ablue-500 font-medium">6420882</span>
            </h2>
          </div>
          {/* Transactions */}
          <div className="flex xl:flex-row flex-col xl:items-center items-start gap-x-[100px] text-sm">
            <div className="flex items-center gap-x-2 px-2 py-1 w-[220px]">
              <h1 className="text-agrey-500 dark:text-agrey-600">Transactions</h1>
              <Image
                className="w-auto h-auto"
                src="/icons/info-circle.svg"
                width={20}
                height={20}
                alt=""
              />
            </div>
            <div className="flex items-center gap-x-2 px-2 py-1">
              <h2 className="dark:text-ablue-100 text-ablue-500 font-medium">157 transactions</h2>
              <h2>in this block</h2>
            </div>
          </div>
        </section>

        <br className="pt-4"></br>
        <hr className="dark:border-agrey-800 border-agrey-200" />
        <br className="pt-4"></br>

        {/* Second section */}
        <section className="space-y-4">
          {/* Fee */}
          <div className="flex xl:flex-row flex-col xl:items-center items-start gap-x-[100px] text-sm">
            <div className="flex items-center gap-x-2 px-2 py-1 w-[220px]">
              <h1 className="text-agrey-500 dark:text-agrey-600">Fee Recipient</h1>
              <Image
                className="w-auto h-auto"
                src="/icons/info-circle.svg"
                width={20}
                height={20}
                alt=""
              />
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-x-2 px-2 py-1">
                <h2 className="dark:text-ablue-100 text-ablue-500 font-medium">builder0x69</h2>
                <Image
                  className=""
                  src="/icons/copy.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
              <h2 className="px-2 py-1">in 12 secs</h2>
            </div>
          </div>
          {/* Other */}
          {section_2_data.map((item, index) => (
            <div
              key={index}
              className="flex xl:flex-row flex-col xl:items-center items-start gap-x-[100px] text-sm"
            >
              <div className="relative flex items-center gap-x-2 px-2 py-1 w-[220px]">
                <h1 className="text-agrey-500 dark:text-agrey-600">{item.label}</h1>
                <Image
                  className=""
                  src="/icons/info-circle.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
              <h2 className="px-2 py-1">{item.value}</h2>
            </div>
          ))}
          {/* Block confirmations */}
          <div className="flex xl:flex-row flex-col xl:items-center items-start gap-x-[100px] text-sm">
            <div className="relative flex items-center pl-2">
              <h1 className="text-agrey-500 dark:text-agrey-600 w-[220px]">
                Number of Block Confirmations
              </h1>
              <Image
                className="absolute right-[-24px]"
                src="/icons/info-circle.svg"
                width={24}
                height={24}
                alt=""
              />
            </div>
            <h2 className="py-1 xl:px-0 px-2">620</h2>
          </div>
        </section>

        <br className="pt-4"></br>
        <hr className="dark:border-agrey-800 border-agrey-200" />
        <br className="pt-4"></br>

        {/* Third section */}
        <section className="space-y-4">
          {/* Burnt fees */}
          <div className="flex xl:flex-row flex-col xl:items-center items-start gap-x-[100px] text-sm">
            <div className="flex items-center gap-x-2 px-2 py-1 w-[220px]">
              <h1 className="text-agrey-500 dark:text-agrey-600">Burnt fees</h1>
              <Image
                className="w-auto h-auto"
                src="/icons/info-circle.svg"
                width={20}
                height={20}
                alt=""
              />
            </div>
            <h2 className="px-2 py-1">0.93437168025746279 PWR</h2>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="flex xl:items-center items-start gap-x-2 px-2 py-1 mt-8">
          <Image
            className=""
            src="/icons/info-circle.svg"
            width={24}
            height={24}
            alt=""
          />
          <p className="text-sm text-agrey-500 dark:text-agrey-600 leading-[24px] break-all">
            Blocks are batches of transactions linked via cryptographic hashes.
            Any tampering of a block would invalidate all following blocks as
            all subsequent hashes would change.
          </p>
        </div>
      </div>
    </div>
  );
}
