"use client";

import Lottie from 'lottie-react'
import React from 'react'

import animationData from "@/../public/LandingAnimation.json";

function LandingAnimation() {
  return (
    <Lottie animationData={animationData} loop={true} />
  )
}

export default LandingAnimation