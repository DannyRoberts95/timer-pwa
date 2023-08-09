import Image from "next/image";
import Link from "next/link";
import React from "react";
import classes from "./Header.module.css";
import SectionContainer from "./SectionContainer";

const Header = () => {
  return (
    <SectionContainer padding="small">
      <div className="flex w-full items-center justify-between">
        <Link href="https://www.danhowarddesign.com/" target={"_blank"}>
          <Image
            src={`/icons/icon.png`}
            width={40}
            height={40}
            alt="DHD Logo"
          />
        </Link>

        <nav className="flex gap-2">
          {/* Menu */}
          {/* <Link href="/">Links</Link>
          <Link href="/analytics">Analytics</Link> */}
        </nav>
      </div>
    </SectionContainer>
  );
};

export default Header;
