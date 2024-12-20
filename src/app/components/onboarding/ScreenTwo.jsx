"use client";
import { useEffect } from "react";
import DefaultButton from "./DefaultButton";
import { copy } from "../../lib/content/copy";
import NavigationButtons from "../basics/NavigationButtons";
import Pagination from "./Pagination";
import { useFooterVisibility } from "@/app/lib/context/FooterVisibility";

export default function ScreenTwo({ onBack, onNext, language }) {
  const { setIsFooterVisible } = useFooterVisibility();

  const resetTimer = (duration) => {
    const totalTime = parseInt(duration, 10) * 60 * 60;
    const endTime = new Date(new Date().getTime() + totalTime * 1000);

    localStorage.removeItem("timerEndTime");
    localStorage.setItem("selectedDuration", duration);
    localStorage.setItem("timerEndTime", endTime.toISOString());
  };

  const handleDurationSelect = (duration) => {
    resetTimer(duration);
    onNext();
  };

  useEffect(() => {
    setIsFooterVisible(false);
    return () => setIsFooterVisible(true);
  }, [setIsFooterVisible]);

  return (
    <>
      <h1 className="sr-only">Goboat Onboarding Screen number 2</h1>
      <div className="flex justify-center items-center text-typoPrimary">
        <div className="flex-grow flex flex-col items-center justify-center rounded-3xl bg-grey1 p-8 max-w-lg h-[350px]">
          <h2 className="text-xl font-bold mb-6">
            {copy[language].timer.title}
          </h2>
          <div className="flex flex-col">
            <DefaultButton
              text={copy[language].timer.oneHour}
              onClick={() => handleDurationSelect(1)}
            />
            <DefaultButton
              text={copy[language].timer.twoHours}
              onClick={() => handleDurationSelect(2)}
            />
            <DefaultButton
              text={copy[language].timer.threeHours}
              onClick={() => handleDurationSelect(3)}
            />
          </div>
        </div>
      </div>
      <Pagination currentScreen={1} totalScreens={3} />
      <div className="flex justify-end mt-8">
        <NavigationButtons handlePrev={onBack} handleNext={onNext} />
      </div>
    </>
  );
}
