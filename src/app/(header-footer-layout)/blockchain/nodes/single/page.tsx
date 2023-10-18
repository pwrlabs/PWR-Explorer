import Tags from "@/components/internal/tags/tags.component";
import Image from "next/image";

export default function Single() {
  const block = "17222820";

  return (
    <div className="container-2 mx-auto text-white">
      {/* Title */}
      <h1 className="px-2 py-1 text-[36px] font-bold leading-[44px]">
        Nodes Tracker
      </h1>

      {/* Nodes details */}
      <div className="space-y-2 py-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center font-medium">
            <h2 className="px-2">A total of 701829 Nodes found</h2>
            <h3 className="text-ablue-100 px-1">{block}</h3>
          </div>
          <div className="flex gap-x-3 text-sm">
            <h2>First</h2>
            <h2>Last</h2>
          </div>
        </div>
        <h3 className="text-xs font-medium px-2">
          (Showing the last 10000 records only)
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-2">
        {/* hr */}
        <div className="flex items-center gap-x-2 text-white text-sm font-bold h-[48px] px-3 w-[1322px]">
          <div className="w-[140px]">
            <h1 className="px-2">Node ID</h1>
          </div>
          <div className="text-center w-[190px]">
            <h1 className="px-2">Host</h1>
          </div>
          <div className="text-center w-[190px]">
            <h1 className="px-2">Country</h1>
          </div>
          <div className="text-center w-[190px]">
            <h1 className="px-2">Burned/Staked (PWR)</h1>
          </div>
          <div className="text-center w-[190px]">
            <h1 className="px-2">Earnings (PWR)</h1>
          </div>
          <div className="w-[190px]">
            <h1 className="px-2">Blocks per Round</h1>
          </div>
          <div className="text-center w-[190px]">
            <h1 className="px-2">Transactions Processed</h1>
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
            <div className="flex gap-x-2 items-center w-[140px] px-1">
              <h2 className="text-ablue-100">0x96d1643b7d...</h2>
              <Image
                className="w-auto h-auto"
                src="/icons/copy.svg"
                width={20}
                height={20}
                alt=""
              />
            </div>
            <div className="text-center w-[190px]">
              <h2 className="text-white font-normal px-1">54.7942.188</h2>
            </div>
            <div className="text-center w-[190px]">
              <h2 className="text-ablue-100 px-1">Germany</h2>
            </div>
            <div className="text-center w-[190px]">
              <Tags className="grey">0.49867</Tags>
            </div>
            <div className="flex items-center justify-center gap-x-2 w-[188px]">
              <Tags className="grey">0.49867</Tags>
            </div>
            <div className="text-center w-[190px]">
              <h2 className="text-base font-normal">1918</h2>
            </div>
            <div className="text-center w-[190px]">
              <h2 className="text-basw font-normal">1918</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
