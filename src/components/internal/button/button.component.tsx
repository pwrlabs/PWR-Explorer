import RippleEffect from "../ripple-effect/ripple-effect.component";
import "./button.scss";

import Link from "next/link";

type CustomLinkProps = {
  href?: string;
};

type Props = {
  children: React.ReactNode;
  className?: string;
  tag_type?: "def" | "a" | "link";
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  CustomLinkProps;

export default function Button({
  children,
  className,
  tag_type = "def",
  href = "/",
  ...rest
}: Props) {
  if (tag_type === "link")
    return (
        <Link href={href} className={`comp-button ${className}`} {...rest}>
          {children}
        </Link>
    );

  return (
      <button className={`comp-button ${className}`} {...rest}>
        {children}
      </button>
  );
}
