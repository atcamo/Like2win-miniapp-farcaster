"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Modal } from "../ui/Modal";
import { LoadingButton } from "../ui/Loading";
import { HeartIcon, TrophyIcon, DiceIcon } from "../icons";
import { TransactionExample } from "../transaction/TransactionExample";
import { useAccount } from "wagmi";

export function Demo() {
  const { isConnected } = useAccount();
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tickets, setTickets] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [simulationResult, setSimulationResult] = useState<{
    position: number;
    prize: number;
  } | null>(null);

  const steps = [
    {
      title: "Follow @Like2Win",
      description: "Get eligible for all future raffles",
      icon: <HeartIcon size="md" />,
      action: "Follow",
      completed: false
    },
    {
      title: "Like Posts",
      description: "Each like = 1 raffle ticket",
      icon: <HeartIcon size="md" />,
      action: "Like",
      completed: false
    },
    {
      title: "Wait for Raffle",
      description: "Bi-weekly draws on Wed & Sun",
      icon: <DiceIcon size="md" />,
      action: "Wait",
      completed: false
    },
    {
      title: "Win $DEGEN",
      description: "Top 3 winners share the prize pool",
      icon: <TrophyIcon size="md" />,
      action: "Win!",
      completed: false
    }
  ];

  const samplePosts = [
    {
      id: 1,
      text: "🎯 New raffle starting! Like this post to enter the prize pool. Current pool: 12,500 $DEGEN",
      likes: 143,
      timestamp: "2h ago",
      liked: false
    },
    {
      id: 2,
      text: "💰 Congratulations to our last winners! @alice won 9,000 $DEGEN, @bob won 4,500 $DEGEN, @charlie won 1,500 $DEGEN!",
      likes: 89,
      timestamp: "1d ago",
      liked: false
    },
    {
      id: 3,
      text: "🚀 Like2Win is growing! We now have 2,400+ active participants. The more participants, the bigger the prize pools!",
      likes: 256,
      timestamp: "2d ago",
      liked: false
    }
  ];

  const [posts, setPosts] = useState(samplePosts);

  const handleLikePost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
    
    if (!posts.find(p => p.id === postId)?.liked) {
      setTickets(prev => prev + 1);
    } else {
      setTickets(prev => Math.max(0, prev - 1));
    }
  };

  const startSimulation = async () => {
    setIsSimulating(true);
    setCurrentStep(0);
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentStep(i + 1);
    }
    
    // Simulate raffle result
    const random = Math.random();
    let position = 4; // Default: no win
    let prize = 0;
    
    if (random < 0.01) { // 1% chance first place
      position = 1;
      prize = 9000;
    } else if (random < 0.03) { // 2% chance second place  
      position = 2;
      prize = 4500;
    } else if (random < 0.06) { // 3% chance third place
      position = 3;
      prize = 1500;
    }
    
    setSimulationResult({ position, prize });
    setShowResultModal(true);
    setIsSimulating(false);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setTickets(0);
    setShowResultModal(false);
    setSimulationResult(null);
    setPosts(samplePosts);
  };

  const currentPoolSize = 15000;
  const nextRaffleDate = "Wednesday, 8PM UTC";

  return (
    <section id="demo" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Try It Yourself
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Experience how Like2Win works with our interactive demo. See how easy it is to participate and win!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Demo */}
          <div className="space-y-6">
            <Card title="Interactive Demo" gradient>
              <div className="space-y-6">
                {/* Current Stats */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {tickets}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Your Tickets
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {currentPoolSize.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      $DEGEN Pool
                    </div>
                  </div>
                </div>

                {/* Sample Posts */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    Sample Posts (Try liking them!)
                  </h4>
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        {post.text}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>{post.timestamp}</span>
                          <span>{post.likes} likes</span>
                        </div>
                        <Button
                          variant={post.liked ? "primary" : "outline"}
                          size="sm"
                          onClick={() => handleLikePost(post.id)}
                          icon={<HeartIcon size="sm" className={post.liked ? "text-white" : ""} />}
                        >
                          {post.liked ? "Liked" : "Like"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <LoadingButton
                    variant="gradient"
                    onClick={startSimulation}
                    disabled={tickets === 0}
                    isLoading={isSimulating}
                    loadingText="Simulating..."
                    className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-600 text-white hover:from-amber-700 hover:to-yellow-700 transition-all duration-200"
                  >
                    Simulate Raffle
                  </LoadingButton>
                  <Button
                    variant="outline"
                    onClick={resetDemo}
                    className="flex-1"
                  >
                    Reset Demo
                  </Button>
                </div>

                {tickets > 0 && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700">
                    <p className="text-amber-800 dark:text-amber-200 text-sm">
                      🎉 You have {tickets} ticket{tickets !== 1 ? 's' : ''} for the next raffle on {nextRaffleDate}!
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* How It Works Steps */}
          <div className="space-y-6">
            <Card title="How It Works" gradient>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`
                      flex items-center p-4 rounded-xl transition-all duration-500
                      ${index < currentStep 
                        ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700' 
                        : index === currentStep && isSimulating
                        ? 'bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 animate-pulse'
                        : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                      }
                    `}
                  >
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors
                      ${index < currentStep
                        ? 'bg-green-500 text-white'
                        : index === currentStep && isSimulating
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                      }
                    `}>
                      {index < currentStep ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step.icon
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {step.description}
                      </p>
                    </div>
                    <div className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${index < currentStep
                        ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                        : index === currentStep && isSimulating
                        ? 'bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                      }
                    `}>
                      {index < currentStep ? 'Done' : step.action}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Web3 Integration Demo */}
          <div className="space-y-6">
            <Card title="Web3 Integration" gradient>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Test Web3 functionality with MiniKit and Base network integration.
                </p>
                {isConnected ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        ✅ Wallet connected! You can now test transactions.
                      </p>
                    </div>
                    <TransactionExample />
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      Connect your wallet to test Web3 functionality:
                    </p>
                    <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      <li>• Test transactions on Base network</li>
                      <li>• Experience MiniKit integration</li>
                      <li>• Preview future raffle features</li>
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Result Modal */}
        <Modal
          isOpen={showResultModal}
          onClose={() => setShowResultModal(false)}
          title="Raffle Results"
          size="md"
        >
          <div className="text-center space-y-6">
            {simulationResult && simulationResult.position <= 3 ? (
              <>
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <TrophyIcon size="xl" className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    🎉 Congratulations!
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    You finished in {simulationResult?.position === 1 ? '1st' : simulationResult?.position === 2 ? '2nd' : '3rd'} place!
                  </p>
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {simulationResult?.prize.toLocaleString()} $DEGEN
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your prize has been distributed to your wallet
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 mx-auto bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <DiceIcon size="xl" className="text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Better luck next time!
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    You didn&apos;t win this time, but keep participating!
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Next raffle: {nextRaffleDate}
                  </p>
                </div>
              </>
            )}
            <Button
              variant="primary"
              onClick={() => setShowResultModal(false)}
              fullWidth
            >
              Try Again
            </Button>
          </div>
        </Modal>
      </div>
    </section>
  );
}