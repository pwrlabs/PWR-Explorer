import Image from "next/image";
import Link from "next/link";

export default function BlockTransactions() {
  const block = "17222820";

  return (
    <div className="container-2 mx-auto text-white">
      {/* Title */}
      <div className="flex items-center gap-x-2">
        <h1 className="px-2 py-1 text-[36px] font-bold leading-[44px]">
          Transactions
        </h1>
        <h1 className="text-ablue-100 lg:hidden">{block}</h1>
      </div>

      {/* Transaction details */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center pt-1 font-medium">
            <h2 className="px-2">For Block</h2>
            <h3 className="text-ablue-100 px-1">{block}</h3>
          </div>
          <div className="flex gap-x-3 text-sm">
            <h2>First</h2>
            <h2>Last</h2>
          </div>
        </div>
        <h3 className="text-xs font-medium px-2">
          (A total pf 142 transactions found)
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-3">
        {/* hr */}
        <div className="flex items-center gap-x-2 text-white text-sm font-bold h-[48px] px-3 w-[1322px]">
          <Image
            className="w-auto h-auto invisible"
            src="/icons/eye.svg"
            width={20}
            height={20}
            alt=""
          />
          <div className="flex items-center justify-center w-[140px]">
            <h1 className="px-2">Txn Hash</h1>
            <Image
              className="w-auto h-auto"
              src="/icons/info-circle.svg"
              width={20}
              height={20}
              alt=""
            />
          </div>
          <div className="flex items-center justify-center w-[176px]">
            <h1 className="px-2">Status</h1>
            <Image
              className="w-auto h-auto"
              src="/icons/info-circle.svg"
              width={20}
              height={20}
              alt=""
            />
          </div>
          <div className="flex items-center justify-center w-[176px]">
            <h1 className="px-2">Block</h1>
            <Image
              className="w-auto h-auto"
              src="/icons/info-circle.svg"
              width={20}
              height={20}
              alt=""
            />
          </div>
          <div className="flex items-center justify-center w-[176px]">
            <h1 className="px-2">Timestamp</h1>
            <Image
              className="w-auto h-auto"
              src="/icons/info-circle.svg"
              width={20}
              height={20}
              alt=""
            />
          </div>
          <div className="flex items-center justify-center w-[188px]">
            <h1 className="px-2">From</h1>
            <Image
              className="w-auto h-auto"
              src="/icons/info-circle.svg"
              width={20}
              height={20}
              alt=""
            />
          </div>
          <div className="flex items-center justify-center w-[188px]">
            <h1 className="px-2">To</h1>
            <Image
              className="w-auto h-auto"
              src="/icons/info-circle.svg"
              width={20}
              height={20}
              alt=""
            />
          </div>
          <div className="flex items-center justify-center w-[176px]">
            <h1 className="px-2">Value</h1>
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
            <Image
              className="w-auto h-auto"
              src="/icons/eye.svg"
              width={20}
              height={20}
              alt=""
            />
            <Link href="/blockchain/transactions/details" className="w-[130px]">
              <h1 className="text-ablue-100">0x96d1643b7d...</h1>
            </Link>
            <div className="text-center w-[178px]">
              <h1 className="text-white font-normal">Success</h1>
            </div>
            <div className="text-center w-[178px]">
              <h1 className="text-ablue-100">17214042</h1>
            </div>
            <div className="text-center w-[178px]">
              <h1 className="text-white font-normal">12 secs ago</h1>
            </div>
            <div className="flex items-center justify-center gap-x-2 w-[188px]">
              <h1 className="text-ablue-100">0x71E5eE...4C1681</h1>
              <Image
                className="w-auto h-auto"
                src="/icons/copy.svg"
                width={20}
                height={20}
                alt=""
              />
            </div>
            <Image
              className="w-auto h-auto"
              src="/icons/arrow-circle.svg"
              width={20}
              height={20}
              alt=""
            />
            <div className="flex items-center justify-center gap-x-2 w-[188px]">
              <h1 className="text-ablue-100">0x71E5eE...4C1681</h1>
              <Image
                className="w-auto h-auto"
                src="/icons/copy.svg"
                width={20}
                height={20}
                alt=""
              />
            </div>
            <div className="text-center w-[178px]">
              <h1 className="text-white font-normal">0.4857 PWR</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
