"use client";
import React from 'react';
import { useLanguage } from "../../lib/context/language";
import { copy } from "../../lib/content/copy"; 

export default function ScreenOne({ onNext }) {
  const { changeLanguage, language } = useLanguage();
  console.log('Language Context:', { changeLanguage, language });

  const handleLanguageSelect = (lang) => {
    changeLanguage(lang);
    onNext();
  };

  return (
    <div className="flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center rounded-lg">
        <h2 className="text-xl font-bold mb-4">{copy[language].welcome}</h2>
        <p className="text-center mb-8">
          {copy[language].chooseLanguage}
        </p>
        <button
          className="bg-yellow-400 px-6 py-2 rounded-full mb-4"
          onClick={() => handleLanguageSelect('da')}
        >
          {copy[language].language.danish}
        </button>
        <button
          className="bg-yellow-400 px-6 py-2 rounded-full"
          onClick={() => handleLanguageSelect('en')}
        >
          {copy[language].language.english}
        </button>

        <div className="flex justify-between mt-8">
          <button disabled className="w-10 h-10 bg-gray-500 rounded-full"></button>
          <button onClick={onNext} className="w-10 h-10 bg-yellow-400 rounded-full"></button>
        </div>
      </main>
    </div>
  );
}
