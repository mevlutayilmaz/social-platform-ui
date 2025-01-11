import React, { useState, useEffect } from "react";
import moment from "moment";
import "./storyModal.scss";
import { ArrowBackIosRounded, ArrowForwardIosRounded } from "@mui/icons-material";

const StoryModal = ({ stories, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [slideDirection, setSlideDirection] = useState("forward");

  const storyDuration = 5;

  useEffect(() => { 
    let timer;
    let progressTimer;

    if (currentIndex < stories.length) {
      progressTimer = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, storyDuration * 2);

      timer = setTimeout(() => {
        setSlideDirection("forward");
        setCurrentIndex((prev) => prev + 1);
        setProgress(0);
      }, storyDuration * 1000);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [currentIndex, stories.length]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setSlideDirection("forward");
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSlideDirection("backward");
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    }
  };

  if (currentIndex >= stories.length) {
    onClose();
    return null;
  }

  return (
    <div className="story-modal">
      <div className="story-overlay" onClick={onClose}></div>
      <div className="story-content">
        {/* Progress bar */}
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(progress / (storyDuration * 100)) * 100}%` }}
          ></div>
        </div>

        {/* Navigation buttons */}
        <button
          className="navigation-button prev"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ArrowBackIosRounded />
        </button>
        <button
          className="navigation-button next"
          onClick={handleNext}
          disabled={currentIndex === stories.length - 1}
        >
          <ArrowForwardIosRounded />
        </button>

        {/* Sliding image and story details */}
        <div
          className={`story-slide ${
            slideDirection === "forward" ? "slide-in-right" : "slide-in-left"
          }`}
          key={currentIndex}
        >
          <img
            className="story-image"
            src={stories[currentIndex].imageUrl}
            alt="Story"
          />
          <span className="story-date">
            {moment(stories[currentIndex].createdDate).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
