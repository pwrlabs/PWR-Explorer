import "./header.scss";

import Image from "next/image";

import TextButton from "@/components/internal/text-button/text-button.component";
import Button from "@/components/internal/button/button.component";

export default function HeaderComponent() {
  const navigation = [
    {
      label: "Explore",
      href: "#",
    },
    {
      label: "Blockchain",
      href: "#",
    },
    {
      label: "Tokens",
      href: "#",
    },
    {
      label: "NFTs",
      href: "#",
    },
  ];

  return (
    <nav className="bg-abrandc-dark-blackish">
    <div className="container-2 mx-auto flex items-center justify-between h-[80px]">
      <Image
        className="w-auto h-auto"
        src="/logo/pwr-logo.svg"
        width={20}
        height={20}
        alt=""
      />
      <div className="flex items-center gap-x-4">
        {navigation.map((item, index) => (
          <div key={index}>
            <TextButton href={item.href} className="xs" tag_type="link">
              {item.label}
            </TextButton>
          </div>
        ))}
        <Button className="secondary medium w-[106px]">Connect</Button>
        <Button className="blue medium w-[117px]">Get Wallet</Button>
        <button>
          <Image
            className="w-auto h-auto"
            src="/icons/sun.svg"
            width={20}
            height={20}
            alt=""
          />
        </button>
      </div>
    </div>
    </nav>
  );
}
