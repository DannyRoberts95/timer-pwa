import clsxm from "@/lib/clsxm";
import React from "react";
import { motion } from "framer-motion";

type PropTypes = {
  label: string;
  selected?: boolean;
  viewOnly?: boolean;
  hidden?: boolean;
  onClick?: () => void | null;
};

const variants = {
  selected: { opacity: 1, transform: "scale(1)" },
  deselected: { opacity: 0, transform: "scale(0.5)" },
};

const parentVariants = {
  visible: { opacity: 1, transform: "scale(1)" },
  hidden: { opacity: 0, transform: "scale(0.5)", display: "none" },
};

const Chip = (props: PropTypes) => {
  const { label, selected, hidden, viewOnly, ...others } = props;
  return (
    <motion.span
      variants={parentVariants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ delay: 0.2, ease: "easeOut", duration: 0.2 }}
    >
      <motion.div
        variants={variants}
        className={clsxm(
          " relative inline-block w-fit overflow-hidden whitespace-nowrap rounded-full border-2 px-3  py-1",
          [
            "text-primary bg-transparent",
            "border border-black",
            "hover:bg-grey-200",
            "cursor-pointer",
          ]
        )}
        {...others}
      >
        <motion.div
          variants={variants}
          animate={selected ? "selected" : "deselected"}
          transition={{
            ease: "easeInOut",
            x: { duration: 0.3 },
            y: { duration: 0.2 },
          }}
          className={clsxm(
            "absolute left-0 top-0 h-full w-full rounded-full bg-black "
          )}
        />
        <span
          className={clsxm(
            "text-sm text-black mix-blend-difference",
            selected && "text-white"
          )}
        >
          {label}
        </span>
      </motion.div>
    </motion.span>
  );
};

export default Chip;
