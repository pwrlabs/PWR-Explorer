import Image from "next/image";

export default function Nodes() {
  const countries_stats = [
    {
      flag: "",
      name: "United States",
      percentage: "5058 (51.32%)",
      up_24: true,
      last_24: "0.00%",
      up_: false,
      last_7: "34.72%",
    },
    {
      flag: "",
      name: "Germany",
      percentage: "5058 (51.32%)",
      up_24: true,
      last_24: "0.00%",
      up_: false,
      last_7: "34.72%",
    },
    {
      flag: "",
      name: "Japan",
      percentage: "5058 (51.32%)",
      up_24: true,
      last_24: "0.00%",
      up_: false,
      last_7: "34.72%",
    },
    {
      flag: "",
      name: "Canada",
      percentage: "5058 (51.32%)",
      up_24: true,
      last_24: "0.00%",
      up_: false,
      last_7: "34.72%",
    },
    {
      flag: "",
      name: "Singapore",
      percentage: "5058 (51.32%)",
      up_24: true,
      last_24: "0.00%",
      up_: false,
      last_7: "34.72%",
    },
    {
      flag: "",
      name: "Ireland",
      percentage: "5058 (51.32%)",
      up_24: true,
      last_24: "0.00%",
      up_: false,
      last_7: "34.72%",
    },
    {
      flag: "",
      name: "United Kingd..",
      percentage: "5058 (51.32%)",
      up_24: true,
      last_24: "0.00%",
      up_: false,
      last_7: "34.72%",
    },
    {
      flag: "",
      name: "France",
      percentage: "5058 (51.32%)",
      up_24: true,
      last_24: "0.00%",
      up_: false,
      last_7: "34.72%",
    },
    {
      flag: "",
      name: "Russia",
      percentage: "5058 (51.32%)",
      up_24: true,
      last_24: "0.00%",
      up_: false,
      last_7: "34.72%",
    },
    {
      flag: "",
      name: "China",
      percentage: "5058 (51.32%)",
      up_24: true,
      last_24: "0.00%",
      up_: false,
      last_7: "34.72%",
    },
  ];
  return (
    <div className="container-2 mx-auto text-white">
      {/* Title */}
      <h1 className="text-[36px] font-bold px-2 py-1">Nodes</h1>

      {/* Stats */}
      <div className="flex gap-x-6 mt-12">
        {/* Countries */}
        <div className="bg-abrandc-dark-grey rounded-[12px] space-y-2 px-4 py-2">
          <div className="flex justify-between items-center">
            <h1 className="text-[20px] font-bold px-2 py-1">
              Top 10 Countries
            </h1>
            <h2 className="text-sm font-medium text-ablue-100 px-2 py-1"></h2>
          </div>
          <h2 className="font-medium px-2 py-1">
            A total of 9,719 Nodes found
          </h2>
          {/* hr */}
          <div className="flex gap-x-2 items-center h-[32px] px-2 text-sm font-bold">
            <i className="fas fa-hashtag text-xs px-1"></i>
            <h2 className="px-2 w-[140px]">Countries</h2>
            <h2 className="flex items-center gap-x-2">
              <span>Last 24 Hours</span>
              <i className="fas fa-chevron-down text-xs"></i>
            </h2>
            <h2 className="w-[155px] text-center">Last 24 Hours</h2>
            <h2 className="w-[155px] text-center">Last 7 Days</h2>
          </div>

          {/* td */}
          <div className="flex flex-col">
            {countries_stats.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-x-2 h-[48px] px-2 ${
                  index % 2 === 0
                    ? "bg-abrandc-dark-blackish"
                    : "bg-transparent"
                }`}
              >
                {/* Countries */}
                <div className="flex w-[164px] items-start">
                  <span
                    className={`text-sm font-medium ${
                      index > 8 ? "px-[5px]" : " px-2 "
                    }`}
                  >
                    {index + 1}
                  </span>
                  <Image
                    className="ml-1 mt-1"
                    src="/icons/US.svg"
                    width={24}
                    height={16}
                    alt=""
                  />
                  <h2 className="text-sm font-medium px-2">{item.name}</h2>
                </div>
                {/* percentage */}
                <div className="w-[119px]">
                  <h2 className="px-1">{item.percentage}</h2>
                </div>
                {/* Last 24 hours */}
                <div className="w-[155px] text-center">
                  <h2 className="px-1">{item.last_24}</h2>
                </div>
                {/* Last 7 days */}
                <div className="w-[155px] text-center">
                  <h2 className="px-1">{item.last_7}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Node stats */}
        <div className="bg-abrandc-dark-grey rounded-[12px] space-y-4 px-4 pt-2 pb-6 w-full">
          <h1 className="text-[20px] font-bold px-2 pt-1">Node Stats</h1>
          <div className="flex gap-x-2">
            {/* last 24 hours */}
            <div className="flex flex-col items-center gap-y-2 bg-abrandc-dark-blackish rounded-[12px] p-2 w-full">
              <div className="flex items-center gap-x-1 px-1 text-abrandc-dark-green mt-1">
                <i className="fas fa-caret-up text-xl"></i>
                <h2 className="text-[20px] font-medium">1.68%</h2>
              </div>
              <h3 className="text-sm font-medium text-agrey-600 px-2">
                LAST 24 HOURS
              </h3>
            </div>
            {/* last 7 days */}
            <div className="flex flex-col items-center gap-y-2 bg-abrandc-dark-blackish rounded-[12px] p-2 w-full">
              <div className="flex items-center gap-x-1 px-1 text-abrandc-dark-green mt-1">
                <i className="fas fa-caret-up text-xl"></i>
                <h2 className="text-[20px] font-medium">1385.87%</h2>
              </div>
              <h3 className="text-sm font-medium text-agrey-600 px-2">
                LAST 7 DAYS
              </h3>
            </div>
          </div>
          {/* last 30 days */}
          <div className="flex flex-col items-center gap-y-2 bg-abrandc-dark-blackish rounded-[12px] p-2 w-full">
            <div className="flex items-center gap-x-1 px-1 text-abrandc-dark-red mt-1">
              <i className="fas fa-caret-down text-xl"></i>
              <h2 className="text-[20px] font-medium">33.55%</h2>
            </div>
            <h3 className="text-sm font-medium text-agrey-600 px-2">
              LAST 30 DAYS
            </h3>
          </div>
          {/* graph */}
          <div className="flex justify-center items-center bg-abrandc-dark-blackish rounded-[12px] font-medium text-sm text-agrey-600 h-[338px]">
            <div className="flex flex-col items-center h-[282px]">
              <div className="flex gap-x-2 items-center">
                <div className="flex flex-col gap-y-16">
                  <h3>15k</h3>
                  <h3>10k</h3>
                  <h3>5k</h3>
                  <h3>0k</h3>
                </div>
                <Image
                  className="w-[400px] h-full"
                  src="/graph.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <div className="flex justify-between items-center gap-x-[58px] ml-[60px]">
                <h3>May 7</h3>
                <h3>May 14</h3>
                <h3>May 21</h3>
                <h3>May 28</h3>
                <h3>Jun 4</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* map */}
      <Image
        className="w-full mt-6"
        src="/large-images/map.svg"
        height={20}
        width={624}
        alt=""
      />
    </div>
  );
}
