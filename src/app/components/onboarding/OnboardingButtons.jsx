import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const OnboardingButtons = ({
  onBack,
  onNext,
  nextRoute = "/",
  isAgreed = true, // Default true, men kan bruges til at styre "Next"-knappen
  disableBack = false, // Brug denne til at deaktivere "Tilbage"-knappen
}) => {
  const router = useRouter();

  return (
    <div className="flex justify-end mt-8">
      <div className="flex gap-2">
        {/* Back Button */}
        <button
          onClick={onBack}
          className={`flex items-center justify-center w-11 h-11 bg-goboatYellow  rounded-full transition ${
            disableBack
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-yellow-500"
          }`}
          disabled={disableBack}
        >
          <Image
            src="/Icons/chevron-left.svg"
            alt="Previous"
            width={30}
            height={30}
          />
        </button>

        {/* Next Button */}
        <button
          onClick={() =>
            isAgreed && (onNext ? onNext() : router.push(nextRoute))
          }
          className={`flex items-center justify-center w-11 h-11 rounded-full transition ${
            isAgreed
              ? "bg-goboatYellow hover:bg-yellow-500"
              : "bg-goboatYellow opacity-40 cursor-not-allowed"
          }`}
          disabled={!isAgreed}
        >
          <Image
            src="/Icons/chevron-right.svg"
            alt="Next"
            width={30}
            height={30}
          />
        </button>
      </div>
    </div>
  );
};

export default OnboardingButtons;
