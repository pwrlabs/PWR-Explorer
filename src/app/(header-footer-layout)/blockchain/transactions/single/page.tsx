import "src/components/internal/checkbox/checkbox.scss";

import Image from "next/image";

import Button from "@/components/internal/button/button.component";
import Tags from "@/components/internal/tags/tags.component";

export default function SingleTransaction() {
  const section_2_data = [
    {
      label: "From",
      value: "0x71E5eE8736dghf6578892wuhf6578jdgcni7F4C1681",
    },
    {
      label: "Interacted with (To)",
      value: "0x71E5eE8736dghf6578892wuhf6578jdgcni7F4C1681",
    },
  ];

  const section_3_data = [
    {
      label: "Value",
      value: "291.005962459849006914 PWR",
      amount: "($214.40)",
    },
    {
      label: "Transaction Fee",
      value: "0.005962459849006914 PWR",
      amount: "($214.40)",
    },
  ];

  const with_ad = true;

  return (
    <div className="container-2 mx-auto dark:text-white text-abrandc-dark-grey">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <h1 className="px-2 py-1 text-[36px] font-bold leading-[44px]">
            Transaction Details
          </h1>
          <Tags>Transfer</Tags>
        </div>
        <div className="flex items-center gap-x-2">
          <Button className="blue !h-[36px]">Buy</Button>
          <Button className="blue !h-[36px]">Exchange</Button>
        </div>
      </div>

      {/* Transaction details */}
      <div className="flex justify-between items-start mt-12">
        <div className={`space-y-4 ${with_ad ? "max-w-[850px]" : ""}`}>
          {/* First section */}
          <section className="space-y-4">
            {/* Txn Hash */}
            <div className="flex items-center gap-x-[100px] text-sm">
              <div className="flex items-center gap-x-2 px-2 py-1 w-[220px]">
                <h1 className="text-agrey-500 dark:text-agrey-600">
                  Transaction Hash
                </h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-start gap-x-2 px-2 py-1">
                <h2 className="leading-[24px] break-all">
                  0x71E5eE8736dghf6578892wuhf6578jdgcni7F4C1681
                </h2>
                <Image
                  className="w-auto h-auto"
                  src="/icons/copy.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
            </div>
            {/* Txn size */}
            <div className="flex items-center gap-x-[100px] text-sm">
              <div className="flex items-center gap-x-2 px-2 py-1 w-[220px]">
                <h1 className="text-agrey-500 dark:text-agrey-600">
                  Transaction Size (Bytes)
                </h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-center gap-x-2 px-2 py-1">
                <h2>128</h2>
              </div>
            </div>
            {/* Block */}
            <div className="flex items-center gap-x-[100px] text-sm">
              <div className="flex items-center gap-x-2 px-2 py-1 w-[220px]">
                <h1 className="text-agrey-500 dark:text-agrey-600">Block</h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-center gap-x-3">
                <div className="flex items-center gap-x-2 px-2 py-1">
                  <input type="checkbox" checked className="checkbox" />
                  <h2 className="dark:text-ablue-100 text-ablue-500 font-medium">17222820</h2>
                </div>
                <Tags>1153 Block Confirmations</Tags>
              </div>
            </div>
            {/* Timestamp */}
            <div className="flex items-center gap-x-[100px] text-sm">
              <div className="flex items-center gap-x-2 px-2 py-1 w-[220px]">
                <h1 className="text-agrey-500 dark:text-agrey-600">
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
          </section>

          <br className="pt-4"></br>
          <hr className="dark:border-agrey-800 border-agrey-200" />
          <br className="pt-4"></br>

          {/* Second section */}
          <section className="space-y-4">
            {section_2_data.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-x-[100px] text-sm"
              >
                <div className="flex items-center gap-x-2 px-2 py-1 w-[220px]">
                  <h1 className="text-agrey-500 dark:text-agrey-600">
                    {item.label}
                  </h1>
                  <Image
                    className="w-auto h-auto"
                    src="/icons/info-circle.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                </div>
                <div className="flex items-center gap-x-2 px-2 py-1">
                  <h2 className="dark:text-ablue-100 text-ablue-500 font-medium font-medium">
                    {item.value}
                  </h2>
                  <Image
                    className=""
                    src="/icons/copy.svg"
                    height={20}
                    width={20}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </section>

          <br className="pt-4"></br>
          <hr className="dark:border-agrey-800 border-agrey-200" />
          <br className="pt-4"></br>

          {/* Third section */}
          <section className="space-y-4">
            {section_3_data.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-x-[100px] text-sm"
              >
                <div className="flex items-center gap-x-2 px-2 py-1 w-[220px]">
                  <h1 className="text-agrey-500 dark:text-agrey-600">
                    {item.label}
                  </h1>
                  <Image
                    className="w-auto h-auto"
                    src="/icons/info-circle.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                </div>
                <div className="flex items-center gap-x-2 px-2 py-1">
                  {index === 0 && (
                    <Image
                      className=""
                      src="/icons/pwr.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                  )}
                  <h2>{item.value}</h2>
                  <h3 className="text-agrey-500 dark:text-agrey-600 font-medium">
                    {item.amount}
                  </h3>
                </div>
              </div>
            ))}
            {/* Data (Hex) */}
            <div className="flex items-center gap-x-[100px] text-sm">
              <div className="flex items-center gap-x-2 px-2 py-1 w-[220px]">
                <h1 className="text-agrey-500 dark:text-agrey-600">
                  Data (Hex)
                </h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-start gap-x-2 px-2 py-1">
                <p
                  className={`break-all ${
                    with_ad ? "max-w-[482px]" : "max-w-[988px]"
                  }`}
                >
                  0xa9059cbb000000000000000000000000(recipient_address)000000000000000000000000000000000000000000000000000000000000000a
                </p>
                <Image
                  className=""
                  src="/icons/copy.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
            </div>
          </section>
        </div>

        {/* Ad */}
        {with_ad && (
          <Image
            className="w-[241px] h-auto rounded-[30px]"
            src="/large-images/ad.png"
            width={100}
            height={100}
            alt=""
          />
        )}
      </div>

      {/* Disclaimer */}
      <div className="flex items-center gap-x-2 px-2 py-1 mt-8">
        <Image
          className=""
          src="/icons/info-circle.svg"
          width={24}
          height={24}
          alt=""
        />
        <p className="text-sm text-agrey-500 dark:text-agrey-600 leading-[24px] break-all">
          A transaction is a cryptographically signed instruction that changes
          the blockchain state. Block explorers trach the details of all
          transactions in network.
        </p>
      </div>
    </div>
  );
}
