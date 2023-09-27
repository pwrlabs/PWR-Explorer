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
      <HeaderComponent />

      <div className="pt-[80px]"></div>

      <div>{children}</div>

      <FooterComponent />
    </>
  );
}
