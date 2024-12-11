"use client";
import React, { useState, useEffect } from "react";

export default function Timer({ onTimeUpdate, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [hasCalledTimeUp, setHasCalledTimeUp] = useState(false);

  useEffect(() => {
    const savedEndTime = localStorage.getItem("timerEndTime");
    if (savedEndTime) {
      const remainingTime = Math.max(
        Math.floor((new Date(savedEndTime) - new Date()) / 1000),
        0
      );
      setTimeLeft(remainingTime);

      if (remainingTime === 0 && onTimeUp) {
        setHasCalledTimeUp(true);
        onTimeUp();
      }
    } else {
      const duration = localStorage.getItem("selectedDuration");
      if (duration) {
        const totalTime = parseInt(duration, 10) * 60 * 60; // Konverter timer til sekunder
        const endTime = new Date(new Date().getTime() + totalTime * 1000);
        localStorage.setItem("timerEndTime", endTime.toISOString());
        setTimeLeft(totalTime);
      }
    }
  }, [onTimeUp]);

  useEffect(() => {
    if (timeLeft === 0 && !hasCalledTimeUp) {
      setHasCalledTimeUp(true);
      if (onTimeUp) {
        onTimeUp();
      }
    }

    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, hasCalledTimeUp, onTimeUp]);

  useEffect(() => {
    if (onTimeUpdate) {
      onTimeUpdate(timeLeft);
    }
  }, [timeLeft, onTimeUpdate]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="text-lg font-mono font-medium text-center min-w-[100px]">
      {timeLeft !== null ? formatTime(timeLeft) : "Loading..."}
    </div>
  );
}
