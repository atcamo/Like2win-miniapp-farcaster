"use client";

import { ExternalLinkIcon } from "../icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: "Features", href: "#features" },
      { name: "How it Works", href: "#how-it-works" },
      { name: "Demo", href: "#demo" },
    ],
    community: [
      { name: "Farcaster", href: "https://warpcast.com/like2win", external: true },
      { name: "Base", href: "https://base.org", external: true },
      { name: "Degen Channel", href: "https://warpcast.com/~/channel/degen", external: true },
    ],
    legal: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Fair Play", href: "/fair-play" },
    ],
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L2W</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Like2Win
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Convert social engagement on Farcaster into real chances to win $DEGEN through transparent bi-weekly raffles.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-500">
              <span>Built on</span>
              <a 
                href="https://base.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Base
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              {links.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-sm flex items-center space-x-1"
                  >
                    <span>{link.name}</span>
                    {link.external && <ExternalLinkIcon size="sm" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} Like2Win. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
            <span>Powered by</span>
            <a 
              href="https://onchainkit.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-600 hover:text-amber-700 font-medium flex items-center space-x-1"
            >
              <span>OnchainKit</span>
              <ExternalLinkIcon size="sm" />
            </a>
            <span>•</span>
            <a 
              href="https://chainlink.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-600 hover:text-amber-700 font-medium flex items-center space-x-1"
            >
              <span>Chainlink VRF</span>
              <ExternalLinkIcon size="sm" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}