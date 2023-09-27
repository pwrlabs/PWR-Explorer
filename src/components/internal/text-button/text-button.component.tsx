import Link from "next/link";

import styles from './text-button.module.scss';

const {comp_text_button} = styles

type CustomLinkProps = {
  href?: string;
};

type Props = {
  children: React.ReactNode;
  className?: string;
  tag_type?: "def" | "a" | "link";
} & CustomLinkProps;

export default function TextButton({
  children,
  className,
  href = "#",
  tag_type = "def",
  ...rest
}: Props) {
  if (tag_type === "link")
    return (
      <Link href={href} className={`${comp_text_button} ${className}`} {...rest}>
        {children}
      </Link>
    );

  return (
    <button className={`${comp_text_button} ${className}`} {...rest}>
      {children}
    </button>
  );
}
