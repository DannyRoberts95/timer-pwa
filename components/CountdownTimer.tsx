import useSound from "@/hooks/useSound";
import clsxm from "@/lib/clsxm";
import { Time } from "@/pages";
import React, { useState, useEffect } from "react";
import Button from "./buttons/Button";

interface Props {
  time: Time;
}

const CountdownTimer: React.FC<Props> = ({ time }) => {
  const pad = (value: number | string) => {
    const val = value.toString();
    if (val.length < 2) return "0" + val;
    return val.slice(0, 2);
  };

  const textProps = {
    className: clsxm(`text-[126px] md:text-[200px] `),
    style: { "-webkit-text-stroke": "1px white", color: "black" },
  };

  return (
    <>
      <div className="flex w-full items-baseline justify-center">
        <h1 {...textProps}>{pad(time.minutes)}:</h1>
        <h1 {...textProps}>{pad(time.seconds)}</h1>
        <h1 {...textProps}>.{pad(time.milliseconds)}</h1>
      </div>
    </>
  );
};

export default CountdownTimer;
