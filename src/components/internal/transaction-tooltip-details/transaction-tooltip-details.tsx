"use client"


import Image from "next/image";




const TransactionTooltipDetails = () => {
  

    return ( 
        <section>
          <main className="absolute bottom-0 left-20">
            <div className=" flex flex-col gap-3 p-3  dark:bg-abrandc-dark-blackish bg-white text-agrey-900 dark:text-white    rounded-2xl z-10 shadow-3xl  w-80 ">
        <div>
          <p>Additional Info</p>
        </div>
        <div className="border-b border-agrey-800 p-1">
          <p className="text-agrey-600">Block</p>
          <div className="flex item-center gap-1">
          <Image src="/icons/verification.png " width={25} height={25} className="inline-block" alt=""/>
          <p className="text-abrandc-dark-green">success</p>
          <p className="text-agrey-600"> (1 block confirmation)</p>
          </div>
          
        </div>
        <div className="border-b border-agrey-800 p-1">
          <p className="text-agrey-600">Transaction Fee:</p>
          <p>0.00036330382688 <span>($0.58)</span></p>
        </div>
        <div>
          <p className="text-agrey-600">Nonce</p>
          <p>267561 <span className="font-normal text-agrey-600">(in the position 149)</span></p>
        </div>
        
        
      </div>
      </main>
      
        </section>
     );
}
 
export default TransactionTooltipDetails;