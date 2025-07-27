"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { ExternalLinkIcon, HeartIcon, TrophyIcon } from "../icons";
import {
  Wallet,
  ConnectWallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import { useAccount } from "wagmi";

export function CTA() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { address, isConnected } = useAccount();

  const handleSubscribe = () => {
    setIsSubscribed(true);
    // Here you would integrate with your notification system
  };

  const quickActions = [
    {
      title: "Follow @Like2Win",
      description: "Start your journey on Farcaster",
      href: "https://warpcast.com/like2win",
      icon: <HeartIcon size="md" />,
      primary: true
    },
    {
      title: "Join /degen Channel", 
      description: "Connect with the community",
      href: "https://warpcast.com/~/channel/degen",
      icon: <TrophyIcon size="md" />,
      primary: false
    }
  ];

  const nextRaffle = {
    date: "Wednesday, January 31st",
    time: "8:00 PM UTC",
    prize: "15,000 $DEGEN",
    participants: "2,400+"
  };

  return (
    <section className="py-20 bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-yellow-600/20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Main CTA Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Ready to Start
              <span className="block bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Winning?
              </span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-amber-100 mb-8 leading-relaxed">
              Join thousands of Farcaster users turning their social activity into real $DEGEN rewards
            </p>

            {/* Next Raffle Info */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
              <div className="text-sm font-medium text-amber-200 mb-2">Next Raffle</div>
              <div className="text-2xl font-bold mb-1">{nextRaffle.date}</div>
              <div className="text-lg text-amber-200 mb-3">{nextRaffle.time}</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-yellow-400 font-bold text-lg">{nextRaffle.prize}</div>
                  <div className="text-amber-200">Prize Pool</div>
                </div>
                <div>
                  <div className="text-green-400 font-bold text-lg">{nextRaffle.participants}</div>
                  <div className="text-amber-200">Participants</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4 mb-8">
              {quickActions.map((action, index) => (
                <a
                  key={action.title}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant={action.primary ? "gradient" : "outline"}
                    size="xl"
                    fullWidth
                    className={`justify-between ${action.primary ? 'shadow-2xl hover:shadow-3xl' : 'border-white/30 text-white hover:bg-white hover:text-purple-900'}`}
                  >
                    <div className="flex items-center">
                      {action.icon}
                      <div className="ml-3 text-left">
                        <div className="font-semibold">{action.title}</div>
                        <div className="text-sm opacity-90">{action.description}</div>
                      </div>
                    </div>
                    <ExternalLinkIcon size="md" />
                  </Button>
                </a>
              ))}
            </div>

            {/* Wallet Connection */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-4 text-center">Optional: Connect Your Wallet</h3>
              <p className="text-amber-200 text-sm mb-4 text-center">
                While not required to participate, connecting your wallet lets you track your wins and receive notifications.
              </p>
              
              <div className="flex justify-center">
                <Wallet className="w-full max-w-sm">
                  <ConnectWallet>
                    <Button variant="gradient" size="lg" fullWidth className="shadow-lg hover:shadow-xl">
                      <Name className="text-inherit" />
                    </Button>
                  </ConnectWallet>
                  <WalletDropdown>
                    <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                      <Avatar />
                      <Name />
                      <Address />
                      <EthBalance />
                    </Identity>
                    <WalletDropdownDisconnect />
                  </WalletDropdown>
                </Wallet>
              </div>

              {isConnected && address && (
                <div className="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-400/30">
                  <p className="text-green-200 text-sm text-center">
                    ✅ Wallet connected! You'll receive notifications about raffle results.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Statistics Card */}
          <div className="flex justify-center lg:justify-end">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 max-w-md w-full">
              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Join the Winners</h3>
                  <p className="text-amber-200">See what our community has achieved</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400 mb-1">156</div>
                    <div className="text-amber-200 text-sm">Total Winners</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-1">50K+</div>
                    <div className="text-amber-200 text-sm">$DEGEN Distributed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-amber-400 mb-1">2.4K+</div>
                    <div className="text-amber-200 text-sm">Active Participants</div>
                  </div>
                </div>

                {/* Notification Signup */}
                <div className="border-t border-white/20 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Get Notified</h4>
                  {!isSubscribed ? (
                    <div className="space-y-3">
                      <p className="text-amber-200 text-sm">
                        Get alerts before each raffle and when results are announced
                      </p>
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={handleSubscribe}
                        fullWidth
                      >
                        Enable Notifications
                      </Button>
                    </div>
                  ) : (
                    <div className="p-3 bg-green-500/20 rounded-lg border border-green-400/30">
                      <p className="text-green-200 text-sm">
                        ✅ Notifications enabled! We'll keep you updated.
                      </p>
                    </div>
                  )}
                </div>

                {/* Social Proof */}
                <div className="text-center">
                  <p className="text-amber-200 text-sm mb-2">Trusted by the community</p>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-amber-200 text-xs mt-1">Transparent & Fair</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}