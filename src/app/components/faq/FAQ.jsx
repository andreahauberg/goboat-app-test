"use client";

import React, { useState } from "react";
import Image from "next/image";

const FAQ = ({ mainTitle, questions }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className=" px-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{mainTitle}</h2>
      <div className="space-y-4">
        {questions.map((faq, index) => (
          <div
            key={index}
            className={`rounded-3xl shadow-md border ${
              activeIndex === index ? "bg-grey2" : "bg-grey1"
            }`}
          >
            <div
              className="flex justify-between items-center px-4 py-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focusOrange
 rounded-3xl"
              onClick={() => toggleAccordion(index)}
              tabIndex={0} // Gør elementet fokusérbart via tastatur
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleAccordion(index);
              }}
            >
              <h3 className="text-md font-semibold">{faq.title}</h3>
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-transparent">
                <Image
                  src={
                    activeIndex === index
                      ? "/icons/minus.svg"
                      : "/icons/plus.svg"
                  }
                  alt={activeIndex === index ? "Collapse" : "Expand"}
                  width={30}
                  height={30}
                />
              </div>
            </div>
            {activeIndex === index && (
              <div className="px-4 py-2 text-typoSecondary">
                {faq.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
