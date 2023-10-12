"use client"
import Image from "next/image";
import {CopyToClipboard} from 'react-copy-to-clipboard';
const Transactions = () => {
    const mockData = [
        {
            id:1,
            number:"0x1234567890abcdef",
            status:"Transfer",
            time:"12 secs ago",
            from:"0xfhgrhr1",
            to:"tofghg1",
            value:"0.49867 PWR",
            block:"b12341"
        },
        {
            id:2,
            number:"0x1234567890abcdef",
            status:"Transfer",
            time:"12 secs ago",
            from:"0xfhgrhr2",
            to:"tofghg2",
            value:"0.49867 PWR",
            block:"b12342"
        },
        {
            id:3,
            number:"0x1234567890abcdef",
            status:"Transfer",
            time:"12 secs ago",
            from:"0xfhgrhr3",
            to:"tofghg3",
            value:"0.49867 PWR",
            block:"b12343"
        },
        {
            id:4,
            number:"0x1234567890abcdef",
            status:"Transfer",
            time:"12 secs ago",
            from:"0xfhgrhr4",
            to:"tofghg4",
            value:"0.49867 PWR",
            block:"b12344"
        },
        {
            id:5,
            number:"0x1234567890abcdef",
            status:"Transfer",
            time:"12 secs ago",
            from:"0xfhgrhr5",
            to:"tofghg5",
            value:"0.49867 PWR",
            block:"b12345"
        },
        {
            id:6,
            number:"0x1234567890abcdef",
            status:"Transfer",
            time:"12 secs ago",
            from:"0xfhgrhr6",
            to:"tofghg6",
            value:"0.49867 PWR",
            block:"b2346"
        }


       
    ]
    return ( 
        <section className=" ml-3 mr-3 h-[100]  md:ml-1 md:mr-1 lg:ml-10 lg:mr-10">
            
        {/* transaction container */}
        <div className=" ">
        <h2 className="font-bold text-white text-xl  mb-5">Transactions</h2>

        {/* transaction blocks container */}
        <div className="flex flex-col w-full gap-3  md:grid grid-cols-3 lg:gap-4">
         {/* block 1 */}
         <div className="bg-agrey-900 rounded-md w-full h-20 p-1 flex items-center gap-x-4 md:h-88 lg:w-81">
             
             <Image src="/icons/Group 13.svg" width={35} height={35} alt="" />
             {/* block 1 text container */}
             <div className='flex flex-col gap-2'>
                 <p className="text-agrey-600 text-sm font-medium">TRANSACTIONS (24H)</p>

                 <p className="text-base font-bold text-white">1,960.01 <span className="text-green-500 font-medium">(4.04%)</span></p>

             </div>
         </div>
         {/* block 2 */}
         <div className="bg-agrey-900 rounded-md w-full h-20 p-1 flex items-center gap-x-4 md:h-88 md:gap-x-2 lg:w-81">
         <Image src="/icons/pwr.svg" width={35} height={35} alt="" />
             {/* block 1 text container */}
             <div className='flex flex-col gap-2'>
                 <p className="md:text-{3px} text-agrey-600 text-sm font-medium">TRANSACTIONS FEE (24H)</p>

                 <p className="text-base font-bold text-white">1,2819.99 PWR <span className="text-red-500 font-medium">(4.04%)</span></p>

             </div>
         </div>
         {/* block 3 */}
         <div className="bg-agrey-900 rounded-md w-full h-20 p-1 flex items-center gap-x-4 md:h-88 md:gap-x-2 lg:w-81">
         <Image src="/icons/Group 15.svg" width={25} height={25} alt="" />
             {/* block 1 text container */}
             <div className='flex flex-col gap-2 ml-3'>
                 <p className="text-agrey-600 text-sm font-medium">AVG. TRANSACTIONS FEE (24H)</p>

                 <p className="text-base font-bold text-white">21.31 USD  <span className="text-red-500 font-medium">(6.04%)</span></p>

             </div>
         </div>
        </div>
        
        </div>

        <p className="text-white font-medium mt-8">More than 1,381,417,561 transactions found</p>

        <p className="pt-2 pb-2 text-white font-medium">(Showing the last 500k records)</p>

        {/* Table */}
             <div className=" mt-10 max-w-full max-h-fit">
    <div className="h-fit overflow-x-scroll sliding-con">
    <table className="min-w-max border-separate border-spacing-0 w-full">
        <thead>
            <th className="text-white font-medium mt-5 p-4 lg:p-8 ">Txn Hash <Image src="/icons/info-circle.svg" width={20} height={20} alt="" className="ml-1 mr-1 inline "/></th>
            <th className="text-white font-medium mt-5 p-4 lg:p-8">Status <Image src="/icons/info-circle.svg" width={20} height={20} alt="" className="ml-1 mr-1 inline "/></th>
            <th className="text-white font-medium mt-5 p-4 lg:p-8">Block <Image src="/icons/info-circle.svg" width={20} height={20} alt="" className="ml-1 mr-1 inline "/></th>
            <th className="text-white font-medium mt-5 p-4 lg:p-8">Timestamp <Image src="/icons/info-circle.svg" width={20} height={20} alt="" className="ml-1 mr-1 inline "/></th>
            <th className="text-white font-medium mt-5 p-4 lg:p-8">From <Image src="/icons/info-circle.svg" width={20} height={20} alt="" className="ml-1 mr-1 inline "/></th>
            <th className="text-white font-medium mt-5 p-4 lg:p-8">To <Image src="/icons/info-circle.svg" width={20} height={20} alt="" className="ml-1 mr-1 inline "/></th>
            <th className="text-white font-medium mt-5 p-4 lg:p-8">Value <Image src="/icons/info-circle.svg" width={20} height={20} alt="" className="ml-1 mr-1 inline "/></th>
           
        </thead>
        <tbody>
            {mockData.map((dat)=>{
                return(
                    <tr key={dat.id} className="roll">
                        <td className="text-ablue-300 p-4 lg:p-8"><Image src="/icons/eye.svg" width={20} height={20} alt="" className="ml-1 mr-1 inline "/>{dat.number}</td>
                        <td className="text-white font-medium p-4 lg:p-8">{dat.status}</td>
                        <td className="text-ablue-300 p-4 lg:p-8">{dat.block}</td>
                        <td className="text-white p-4 lg:p-8">{dat.time}</td>
                        <td className="text-ablue-100 p-4 lg:p-8">{dat.from} <CopyToClipboard text={dat.from} ><Image src="/icons/copy.svg" width={20} height={20} alt="" className="ml-1 mr-1 inline cursor-pointer " /></CopyToClipboard> <Image src="/icons/arrow-circle.svg" width={20} height={20} alt="" className="ml-20 inline  "/> </td>
                        <td className="text-ablue-100 p-4 lg:p-8">{dat.to} <CopyToClipboard text={dat.to} ><Image src="/icons/copy.svg" width={20} height={20} alt="" className="ml-1 mr-1 inline cursor-pointer " /></CopyToClipboard> </td>
                        <td className="p-4 lg:p-8"> <span className="bg-ghostly_grey-100  rounded-md p-1">{dat.value}</span> </td>
                        
                    </tr>
                )
            })}
           

        </tbody>
    </table>
</div>
</div>
            
           
         
     </section>
     );
}
 
export default Transactions;