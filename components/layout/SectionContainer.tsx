import React, { FC, ReactNode } from "react";
import clsxm from "@/lib/clsxm";

type SectionVariant = "small" | "medium" | "large";

interface Props {
  padding?: string;
  className?: string;
  variant?: SectionVariant;
  backgroundColor?: string;
  children: ReactNode;
}

const SectionContainer: FC<Props> = ({
  children,
  className = "",
  variant = "medium",
  padding = "medium",
  backgroundColor = "white",
}) => {
  let sectionClass = "flex w-full justify-center ";

  switch (variant) {
    case "small":
      sectionClass += " max-w-screen-lg";
      break;
    case "medium":
      sectionClass += " max-w-screen-xl";
      break;
    case "large":
      sectionClass += " max-w-screen-2xl";
      break;
    default:
      sectionClass += " max-w-screen-2xl";
      break;
  }

  switch (padding) {
    case "small":
      sectionClass += " px-4 py-4";
      break;
    case "medium":
      sectionClass += " px-4 py-8";
      break;
    case "large":
      sectionClass += " px-4 py-12";
      break;
    default:
      sectionClass += " px-4 py-8";
      break;
  }

  return (
    <section
      className={clsxm(
        "flex w-full justify-center bg-white",
        `bg-${backgroundColor}`
      )}
    >
      <div className={clsxm(sectionClass, className)}>{children}</div>
    </section>
  );
};

export default SectionContainer;
