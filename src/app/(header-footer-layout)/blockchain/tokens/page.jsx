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
        <div className="space-y-4 ">
          <h1 className="text-4xl font-bold dark:text-white text-abrandc-dark-grey px-2 py-1">
            Token Tracker
          </h1>
        </div>
        {/* All blocks */}
        <div className="space-y-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-medium dark:text-white text-abrandc-dark-grey">
              <h1 className="px-2 py-1 leading-[26px]">
                A total of 1.249 token contracts found
              </h1>
            </div>
            <div className="flex items-center gap-x-2 dark:text-white text-abrandc-dark-grey">
              <h2>First</h2>
              <h2>Last</h2>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {/* hr */}
            <div className="flex items-center gap-x-2 text-white text-sm font-bold h-[48px] px-3">
              <div className="flex items-center xl:w-[30px]">
                <h1 className="dark:text-white text-abrandc-dark-grey xl:px-2 px-8 ">
                  #
                </h1>
              </div>
              <div className="flex items-center justify-start xl:w-[144px] w-[200px] xl:px-4 px-8 ">
                <h1 className="dark:text-white text-abrandc-dark-grey ">
                  Token
                </h1>
              </div>
              <div className="flex items-center justify-start w-[200px] xl:px-4 px-16">
                <h1 className="px-10 dark:text-white text-abrandc-dark-grey">
                  Price
                </h1>
              </div>
              <div className="flex items-center justify-center w-[120px] xl:px-2 px-16">
                <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
                  Change %
                </h1>
              </div>
              <div className="flex items-center justify-center w-[232px] xl:px-0 px-16">
                <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
                  Volume (24h)
                </h1>
              </div>
              <div className="flex items-center justify-center w-[220px] xl:px-0 px-16">
                <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
                  Circulating Market Cap
                </h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-center w-[200px] xl:px-0 px-16 ">
                <h1 className="px-2 dark:text-white text-abrandc-dark-grey">
                  On Chain Market Cap
                </h1>
                <Image
                  className="w-auto h-auto"
                  src="/icons/info-circle.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex items-center justify-end w-[100px] xl:px-0 px-16 ">
                <h1 className="dark:text-white text-abrandc-dark-grey">
                  Holders
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
                <Link
                  href="/blockchain/blocks/details"
                  className="w-[30px] xl:px-0 px-8"
                >
                  <h1 className="dark:text-ablue-100 text-ablue-500 pl-2 ">
                    1
                  </h1>
                </Link>
                <div className="flex justify-center item-center gap-4 text-center w-[144px]">
                  <Image
                    className=""
                    src="/currency/BNB.png"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <h1 className="font-normal dark:text-white text-abrandc-dark-grey">
                    BNB
                  </h1>
                  <span className="font-normal text-gray-700 xl:px-0 px-20">
                    (BNB)
                  </span>
                </div>
                <div className="w-[210px] xl:px-12 px-24">
                  <h1 className="dark:text-white text-abrandc-dark-grey">
                    $1.001
                  </h1>
                  <h1 className="text-gray-500">0.000566 PWR</h1>
                </div>
                <div className="flex justify-center items-center gap-x-2 w-[100px] xl:px-0 px-12">
                  <Image
                    className=""
                    src="/icons/copy.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <h1 className="dark:text-ablue-100 text-ablue-500">0.08%</h1>
                </div>
                <div className="text-center w-[231px] xl:px-0 px-16 ml-3">
                  <h1 className="font-normal dark:text-white text-abrandc-dark-grey">
                    $27,432,277,369.00
                  </h1>
                </div>
                <div className="flex items-center justify-center gap-x-2 w-[220px] xl:px-1 px-20">
                  <h1 className="font-normal dark:text-white text-abrandc-dark-grey">
                    $27,432,277,369.00
                  </h1>
                </div>
                <div className="flex items-center justify-center gap-x-2 w-[220px] xl:px-1 px-20">
                  <h1 className="font-normal dark:text-white text-abrandc-dark-grey">
                    $27,432,277,369.00
                  </h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-x-2 w-[100px] xl:px-1 px-20">
                  <h1 className="font-normal dark:text-white text-abrandc-dark-grey">
                    4,358,025
                  </h1>
                  <h1 className="text-red-500">-0.023%</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
