import CountdownTimer from "@/components/CountdownTimer";
import SectionContainer from "@/components/layout/SectionContainer";
import Slider from "@/components/Slider";

import { useEffect, useState } from "react";
import Chip from "@/components/Chip";
import useSound from "@/hooks/useSound";
import Button from "@/components/buttons/Button";
import { motion } from "framer-motion";

import Header from "@/components/layout/Header";

export interface Time {
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const calcTime = ({ minutes, seconds, milliseconds }: Time) =>
  (minutes * 60 + seconds) * 1000 + milliseconds;

const Index = ({ updateLocalData, clearLocalData, data }: PageProps) => {
  const [sliderValue, setSliderValue] = useState(5);
  const [isRunningTimer, setIsRunningTime] = useState(false);
  const [intervalTime, setIntervalTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const [time, setTime] = useState<Time>({
    minutes: sliderValue,
    seconds: 0,
    milliseconds: 0,
  });
  const [timeRemaining, setTimeRemaining] = useState(calcTime(time));

  const intervals = [
    {
      value: calcTime({ minutes: 0, seconds: 10, milliseconds: 0 }),
      text: "10 seconds",
    },
    {
      value: calcTime({ minutes: 1, seconds: 0, milliseconds: 0 }),
      text: "1 Minute",
    },
    {
      value: calcTime({ minutes: 5, seconds: 0, milliseconds: 0 }),
      text: "5 Minutes",
    },
    {
      value: calcTime({ minutes: 10, seconds: 0, milliseconds: 0 }),
      text: "10 Minutes",
    },
    {
      value: calcTime({ minutes: 15, seconds: 0, milliseconds: 0 }),
      text: "15 Minutes",
    },
    {
      value: calcTime({
        minutes: sliderValue * 0.5,
        seconds: 0,
        milliseconds: 0,
      }),
      text: "Halfway",
    },
  ];

  useEffect(() => {
    if (timeRemaining <= 0) {
      setIsRunningTime(false);
      handleCountdownComplete();
      playEndBell();
    }
  }, [timeRemaining]);

  useEffect(() => {
    handleReset();
    setTime({ minutes: sliderValue, seconds: 0, milliseconds: 0 });
    setIntervalTime(null);
  }, [sliderValue]);

  useEffect(() => {
    setTimeRemaining(calcTime(time));

    if (
      intervalTime &&
      isRunningTimer &&
      timeRemaining > 0 &&
      // timeRemaining !== calcTime(time) &&
      timeRemaining % intervalTime === 0
    ) {
      playIntervalBell();
    }
  }, [time]);

  useEffect(() => {
    if (isRunningTimer) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 10);
        setTime((prevTime) => {
          const { minutes, seconds, milliseconds } = prevTime;
          if (milliseconds === 0) {
            if (seconds === 0 && minutes === 0) {
              return prevTime;
            } else if (seconds === 0) {
              return { minutes: minutes - 1, seconds: 59, milliseconds: 990 };
            } else {
              return { minutes, seconds: seconds - 1, milliseconds: 990 };
            }
          } else {
            return { minutes, seconds, milliseconds: milliseconds - 10 };
          }
        });
      }, 10);

      return () => clearInterval(timer);
    }
  }, [isRunningTimer]);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);

    const newStartTime = new Date().getTime();
    const newEndDate = newStartTime + new Date(timeRemaining).getTime();
    setStartTime(new Date(newStartTime));
    setEndTime(new Date(newEndDate));
  };

  const handleCountdownComplete = () => {
    setIsRunningTime(false);
    playEndBell();
  };

  const handleStart = () => {
    setIsRunningTime(true);
    !isRunningTimer && playStartBell();
  };

  const handlePause = () => {
    setIsRunningTime(false);
    pauseStartBell();
  };
  const handleReset = () => {
    handlePause();
    setTime({ minutes: sliderValue, seconds: 0, milliseconds: 0 });
    setTimeRemaining(sliderValue * 60 * 1000);
  };
  const handleIntervalSelect = (interval: number | null) => {
    intervalTime === interval
      ? setIntervalTime(null)
      : setIntervalTime(interval);
  };

  const { play: playStartBell, pause: pauseStartBell } = useSound(
    "/sounds/bell_00.mp3",
    0.75
  );

  const { play: playEndBell, pause: pauseEndBell } = useSound(
    "/sounds/bell_02.mp3",
    0.25
  );

  const { play: playIntervalBell, pause: pauseIntervalBell } = useSound(
    "/sounds/bell_01.mp3",
    0.25
  );

  return (
    <div className="h-screen border-2 border-red-300">
      <motion.span
        className=" w-full self-start"
        animate={isRunningTimer ? "hidden" : "visible"}
        variants={{
          visible: { opacity: 1, height: "auto" },
          hidden: { opacity: 0, height: 0 },
        }}
        transition={{ ease: "easeInOut", duration: 0.55 }}
      >
        <Header />
        <SectionContainer padding="small">
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col">
              <p className="mb-2 text-sm">
                How long would you like to sit for?
              </p>
              <Slider value={sliderValue} onChange={handleSliderChange} />
            </div>

            <div className="flex w-full flex-col">
              <p className="mb-2 text-sm">Interval Bell</p>
              <div className="flex w-full flex-wrap gap-2">
                <Chip
                  selected={!intervalTime}
                  label={"None"}
                  onClick={() => handleIntervalSelect(null)}
                />
                {intervals.map(({ value, text }) => (
                  <Chip
                    hidden={value > timeRemaining}
                    selected={intervalTime === value}
                    key={text}
                    label={text}
                    onClick={() => handleIntervalSelect(value)}
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionContainer>
      </motion.span>

      <SectionContainer
        backgroundColor="transparent"
        padding="small"
        className="grow border-2 border-green-600 text-white"
      >
        <CountdownTimer time={time} />
      </SectionContainer>

      <motion.div className="w-full justify-self-end">
        <SectionContainer
          padding="small"
          backgroundColor={isRunningTimer ? "transparent" : "white"}
        >
          <div className="flex w-full items-center justify-end gap-2 ">
            {endTime && (
              <p className="mr-2 text-sm">
                Finished at{" "}
                {`${endTime.getHours()}:${endTime.getMinutes()}.${endTime?.getSeconds()}`}
              </p>
            )}

            {isRunningTimer ? (
              <Button onClick={handlePause}>Pause</Button>
            ) : (
              <Button onClick={handleStart}>Begin</Button>
            )}

            {isRunningTimer && (
              <Button onClick={handleReset}>Stop Session</Button>
            )}
          </div>
        </SectionContainer>
      </motion.div>
    </div> // parent
  );
};

export default Index;
