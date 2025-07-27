"use client";

import { Card } from "../ui/Card";
import { 
  HeartIcon, 
  TrophyIcon, 
  MoneyIcon, 
  ShieldIcon, 
  DiceIcon,
  ThumbsUpIcon 
} from "../icons";

export function Features() {
  const coreFeatures = [
    {
      icon: <HeartIcon size="lg" />,
      title: "Zero Friction Entry",
      description: "Just follow @Like2Win and start liking posts. No wallet connection or upfront payments required.",
      highlight: "Get started in seconds"
    },
    {
      icon: <TrophyIcon size="lg" />,
      title: "Bi-Weekly Raffles",
      description: "Win real $DEGEN tokens every Wednesday and Sunday at 8PM UTC. Three winners per raffle with guaranteed prizes.",
      highlight: "104 chances to win per year"
    },
    {
      icon: <MoneyIcon size="lg" />,
      title: "Fair Economics",
      description: "90% of all tips go directly to the prize pool. Only 10% operational fee. Transparent and community-first.",
      highlight: "90% redistribution rate"
    },
    {
      icon: <ShieldIcon size="lg" />,
      title: "Provably Fair",
      description: "Powered by Chainlink VRF for transparent, verifiable randomness. All draws are on-chain and auditable.",
      highlight: "Blockchain-verified fairness"
    }
  ];

  const participationMethods = [
    {
      icon: <ThumbsUpIcon size="md" />,
      title: "With Tip Allowance",
      method: "Like = 1 Ticket",
      description: "Users with tip allowance configured get automatic entry with each like",
      color: "from-amber-500 to-yellow-500"
    },
    {
      icon: <HeartIcon size="md" />,
      title: "Without Tip Allowance", 
      method: "Like + Comment + Recast = 1 Ticket",
      description: "Full engagement required for users without tip allowance",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const economicsBreakdown = [
    {
      percentage: "60%",
      recipient: "1st Place Winner",
      description: "Largest share of the prize pool"
    },
    {
      percentage: "30%", 
      recipient: "2nd Place Winner",
      description: "Substantial second prize"
    },
    {
      percentage: "10%",
      recipient: "3rd Place Winner", 
      description: "Consolation prize"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Why Like2Win?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            The first social engagement platform that turns your Farcaster activity into real rewards through transparent, fair raffles.
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {coreFeatures.map((feature) => (
            <Card
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              className="group hover:shadow-2xl transition-all duration-300"
              gradient
            >
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-800 dark:text-amber-200">
                {feature.highlight}
              </div>
            </Card>
          ))}
        </div>

        {/* Participation Methods */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Two Ways to Participate
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We accommodate both users with and without tip allowance configured
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {participationMethods.map((method) => (
              <div
                key={method.title}
                className="relative p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${method.color} rounded-t-2xl`}></div>
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center text-white mr-4`}>
                    {method.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {method.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {method.description}
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {method.method}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prize Distribution */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
              <DiceIcon size="lg" className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Prize Distribution
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              90% of the prize pool distributed across three winners every raffle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {economicsBreakdown.map((prize) => (
              <div
                key={prize.recipient}
                className="text-center p-6 bg-white/80 dark:bg-gray-900/80 rounded-2xl backdrop-blur-sm"
              >
                <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {prize.percentage}
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {prize.recipient}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {prize.description}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 p-4 bg-white/60 dark:bg-gray-900/60 rounded-xl backdrop-blur-sm">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Bootstrap Logic:</span> If tips {"<"} 5,000 $DEGEN, pool = 500 $DEGEN (founder) + 90% tips. 
              If tips ≥ 5,000 $DEGEN, pool = 90% tips (self-sustaining).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}