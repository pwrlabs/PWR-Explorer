import HeaderComponent from "@/layout/header/header.component";
import FooterComponent from "@/layout/footer/footer.component";

export default function HeaderFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* *~~*~~*~~*~~*~~ LAYOUT ~~*~~*~~*~~*~~* */}
      {/* <HeaderComponent /> */}

      <div className="bg-abrandc-dark-blackish pt-[80px]"></div>

      <div className="bg-abrandc-dark-blackish">{children}</div>

      <div className="bg-abrandc-dark-blackish pt-[80px]"></div>

      {/* <FooterComponent /> */}
    </>
  );
}
