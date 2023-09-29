import "src/components/internal/text-field/text-field.scss";

import Link from "next/link";
import Image from "next/image";

import Button from "@/components/internal/button/button.component";
import TextButton from "@/components/internal/text-button/text-button.component";

export default function FooterComponent() {
  const navigation = [
    {
      label: "Explore",
      href: "#",
    },
    {
      label: "Transactions",
      href: "#",
    },
    {
      label: "Nodes",
      href: "#",
    },
    {
      label: "PWR Wallet",
      href: "#",
    },
  ];

  const socials = [
    {
      icon: "fas fa-twitter",
      label: "Join our Twitter",
      href: "#",
    },
    {
      icon: "fas fa-instagram",
      label: "Join our Telegram",
      href: "#",
    },
    {
      icon: "fas fa-discord",
      label: "Join our Discord",
      href: "#",
    },
  ];

  return (
    <div className="bg-abrandc-dark-grey py-20">
      <div className="container-2 mx-auto">
        <div className="flex justify-between items-center">
          {/* Navigation */}
          <div className="flex flex-col gap-y-6">
            <Image
              className=""
              src="/logo/pwr-logo.svg"
              width={126}
              height={22}
              alt=""
            />
            <div className="flex items-center gap-x-8">
              {navigation.map((item, index) => (
                <div key={index}>
                  <TextButton className="">{item.label}</TextButton>
                </div>
              ))}
            </div>
          </div>

          {/* New letter */}
          <div className="flex flex-col gap-y-2">
            <h2 className="text-sm text-white">Join our newsletter</h2>
            <div className="flex items-center gap-x-2">
              <div className="field w-[212px]">
                <input className="text-field" placeholder="Enter your email" />
              </div>
              <Button className="blue medium w-[116px]">Subscribe</Button>
            </div>
          </div>
        </div>

        <hr className="border-agrey-800 mt-12" />

        <div className="flex items-center gap-x-4 px-2 mt-4">
          {socials.map((item, index) => (
            <Link
              className="flex items-center gap-x-[26px] bg-white rounded-[16px] py-3 px-4 h-[60px] w-[134px]"
              key={index}
              href={item.href}
            >
              <i className={item.icon}></i>
              <h2 className="text-black text-xs font-medium leading-[18px]">
                {item.label}
              </h2>
            </Link>
          ))}
        </div>

        <div className="flex justify-between">
          <h1 className="text-sm font-medium mt-[30px] text-white">
            @WOM Protocol Pte. Ltd. All Rights reserved
          </h1>
          <div className="flex gap-x-12 px-8 text-sm font-medium text-agrey-600">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
