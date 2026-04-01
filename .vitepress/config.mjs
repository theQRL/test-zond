import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'QRL 2.0',
  siteTitle: true,
  cleanUrls: true,
  titleTemplate: 'QRL 2.0 | :title',
  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-YN2S7EESNM' }
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-YN2S7EESNM');"
    ]
  ],
  description:
    "Public testing of the next evolution of post-quantum secure distributed ledger technology",
  themeConfig: {
    //logo: '/zond.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "QRL 2.0 Testnet",
        activeMatch: '/testnet/',
        items: [
          { text: "Getting Started", link: "/testnet/get-started"},
          { text: "Install", items: [
            { text: "Linux", link: "/testnet/install/linux" },
            { text: "Mac", link: "/testnet/install/mac" },
            { text: "Windows", link: "/testnet/install/windows" },
            { text: "Private Network", link: "/testnet/install/private-network" },
            ], 
          },
          { text: "Running", items: [
            { text: "Linux", link: "/testnet/running/linux" },
            { text: "Mac", link: "/testnet/running/mac" },
            { text: "Windows", link: "/testnet/running/windows" }
          ],
          },
          { 
            text: "Usage", 
            items: [
              { text: "Web3 Wallet Extension", link: "/testnet/usage/web3-wallet" },
              { text: "Getting Test QRL", link: "/testnet/usage/getting-zond" },
              { text: "Smart Contract Example", link: "/testnet/usage/contract-example" },
              { text: "dApp Example", link: "/testnet/usage/dapp-example" },
              { text: "Kurtosis", link: "/testnet/usage/kurtosis" }
            ]
           }
        ],
      },
      {
        text: "Reporting",
        items: [
          { text: "Bug/Error report", link: "/reporting/bug" },
          { text: "Success report", link: "/reporting/success" },
          { text: "Feature request", link: "/reporting/feature" },
        ],
      },

    ],

    sidebar: {
      // shows when the viewer is in the /testnet/ directory
      '/testnet/': [
        {
          text: "QRL 2.0 Testnet V2",
          items: [
            { text: "Getting Started", link: "/testnet/get-started"},
            { 
              text: "Install", 
              items: [
                { text: "Linux", link: "/testnet/install/linux" },
                { text: "Mac", link: "/testnet/install/mac" },
                { text: "Windows", link: "/testnet/install/windows" },
                { text: "Private Network", link: "/testnet/install/private-network" },
              ]
             },
             { text: "Running", items: [
              { text: "Linux", link: "/testnet/running/linux" },
              { text: "Mac", link: "/testnet/running/mac" },
              { text: "Windows", link: "/testnet/running/windows" }
            ],
            },
            { 
              text: "Usage", 
              items: [
                { text: "Web3 Wallet Extension", link: "/testnet/usage/web3-wallet" },
                { text: "Getting Test QRL", link: "/testnet/usage/getting-zond" },
                { text: "Smart Contract Example", link: "/testnet/usage/contract-example" },
                { text: "dApp Example", link: "/testnet/usage/dapp-example" },
                { text: "Kurtosis", link: "/testnet/usage/kurtosis" }
              ]
             },

            {
              text: "Reporting",
              items: [
            { text: "Bug/Error report", link: "/reporting/bug" },
            { text: "Success report", link: "/reporting/success" },
            { text: "Feature request", link: "/reporting/feature" },
              ],
            },

          ],
        },
      ],

    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2017-present The QRL'
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/theqrl" },
      { icon: "discord", link: "https://theqrl.org/discord" },
      { icon: "x", link: "https://x.com/QRLedger" },        
    ],
  },
});
