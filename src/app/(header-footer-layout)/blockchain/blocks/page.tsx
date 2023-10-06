import Link from "next/link";
import Image from "next/image";

export default function Blocks() {
  const info = [
    {
      label: "NETWORK UTILIZATION (24h)",
      value: "48.0%",
    },
    {
      label: "BLOCK SIZE (24h)",
      value: "34,567 Bytes",
    },
    {
      label: "BLOCK REWARDS (24h)",
      value: "1,2819.99 PWR",
    },
  ];

  return (
    <div className="container-2 mx-auto text-white">
      <div className="space-y-12">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-[36px] font-bold px-2 py-1">Blocks</h1>
          <div className="flex items-center gap-x-4">
            {info.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-center gap-y-1 bg-agrey-900 rounded-[12px] p-4 w-full h-[88px]"
              >
                <h2 className="text-agrey-600 text-sm font-medium px-2">
                  {item.label}
                </h2>
                <h3 className="font-bold px-2">{item.value}</h3>
              </div>
            ))}
          </div>
        </div>
        {/* All blocks */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col font-medium">
              <h1 className="px-2 py-1">Total of 17,242,438 blocks</h1>
              <h2 className="text-xs px-2 py-1">
                (Showing the last 500k blocks)
              </h2>
            </div>
            <div className="flex items-center gap-x-2">
              <h2>First</h2>
              <h2>Last</h2>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {/* hr */}
            <div className="flex items-center gap-x-2 text-white text-sm font-bold h-[48px] px-3 w-[1322px]">
              <div className="flex items-center w-[231px]">
                <h1 className="px-2">Block</h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-center w-[144px]">
                <h1 className="px-2">Age</h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-center w-[232px]">
                <h1 className="px-2">Txn</h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-center w-[232px]">
                <h1 className="px-2">Fee Recipient</h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-center w-[232px]">
                <h1 className="px-2">Reward</h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-center w-[220px]">
                <h1 className="px-2">Burnt Fees (PWR)</h1>
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
                className={`flex items-center gap-x-2 font-medium h-[90px] p-3 rounded-[8px] w-[1322px] ${
                  index % 2 == 0 ? " bg-abrandc-dark-grey" : "bg-transparent"
                }`}
                key={index}
              >
                <Link href="/blockchain/blocks/details" className="w-[231px]">
                  <h1 className="text-ablue-100">26</h1>
                </Link>
                <div className="text-center w-[144px]">
                  <h1 className="font-normal">12 secs ago</h1>
                </div>
                <div className="text-center w-[231px]">
                  <h1 className="text-ablue-100">157</h1>
                </div>
                <div className="flex justify-center items-center gap-x-2 w-[231px]">
                  <h1 className="text-ablue-100">builder0x69</h1>
                  <Image
                    className=""
                    src="/icons/copy.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                </div>
                <div className="text-center w-[231px]">
                  <h1 className="font-normal">0.04759 PWR</h1>
                </div>
                <div className="flex items-center justify-center gap-x-2 w-[220px] px-1">
                  <h1 className="font-normal">0.04759 PWR</h1>
                  <h2 className="text-agrey-500 font-normal">(-91.78%)</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
