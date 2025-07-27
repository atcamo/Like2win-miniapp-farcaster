"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { HeartIcon, TrophyIcon, MoneyIcon } from "../icons";
import { FallingLikesAnimation } from "../FallingLikesAnimation";
import { PerformanceMonitor } from "../PerformanceMonitor";

export function Hero() {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { label: "Total Winners", value: "156", icon: TrophyIcon },
    { label: "$DEGEN Distributed", value: "50,000+", icon: MoneyIcon },
    { label: "Active Participants", value: "2,400+", icon: HeartIcon },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-amber-900/20">
      <FallingLikesAnimation />
      <PerformanceMonitor />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 2 }}>
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 mt-10">
            <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Like2Win
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 mb-4 font-medium">
            Turn Your Farcaster Likes Into
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-8">
            Real $DEGEN Rewards
          </p>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join bi-weekly transparent raffles where every like counts. 
            Follow @Like2Win, engage with posts, and win real $DEGEN tokens through our 
            provably fair system powered by Chainlink VRF.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              variant="gradient"
              size="xl"
              onClick={scrollToDemo}
              className="shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              Start Winning Now
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={scrollToFeatures}
              className="border-2 hover:bg-amber-600 hover:text-white transition-all duration-300"
            >
              How It Works
            </Button>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isActive = currentStat === index;
              return (
                <div
                  key={stat.label}
                  className={`
                    p-6 rounded-2xl backdrop-blur-lg transition-all duration-500
                    ${isActive 
                      ? 'bg-white/90 dark:bg-gray-800/90 shadow-2xl scale-105 border-2 border-amber-300 dark:border-amber-500' 
                      : 'bg-white/60 dark:bg-gray-800/60 shadow-lg hover:shadow-xl'
                    }
                  `}
                >
                  <div className={`mb-3 transition-all duration-500 ${isActive ? 'scale-110' : ''}`}>
                    <Icon 
                      size="lg" 
                      className={`mx-auto transition-colors duration-500 ${
                        isActive 
                          ? 'text-amber-600 dark:text-amber-400' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`} 
                    />
                  </div>
                  <div className={`text-3xl font-bold transition-all duration-500 ${
                    isActive 
                      ? 'text-amber-600 dark:text-amber-400 scale-110' 
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Raffle Countdown */}
          <div className="mt-16 p-6 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-2xl backdrop-blur-lg border border-amber-200/30 dark:border-amber-700/30 max-w-md mx-auto">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Next Raffle
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              Wednesday 8PM UTC
            </div>
            <div className="text-sm text-amber-600 dark:text-amber-400 font-medium">
              Prize Pool: 15,000 $DEGEN
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}