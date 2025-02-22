import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Zond',
  siteTitle: true,
  titleTemplate: 'Zond | :title',
  description:
    "Public testing of the next evolution of post-quantum secure distributed ledger technology",
  themeConfig: {
    //logo: '/zond.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "Testnet",
        activeMatch: '/testnet/',
        items: [
          { text: "Getting Started", link: "/testnet/get-started"},
          { text: "Install", items: [
            { text: "Linux", link: "/testnet/linux" },
            { text: "Mac", link: "/testnet/mac" },
            { text: "Windows", link: "/testnet/windows" },
            ] 
          },
          { text: "Usage", items: [
            { text: "Configuraton", link: "/testnet/configuration" },
            { text: "Connect to Nework", link: "/testnet/connect" },
            { text: "Clef", link: "/testnet/clef" },
            ] 
          },
          { text: "NEXT_LINK", link: "/testnet/testnet"},
        ],
      },
      {
        text: "Betanet",
        activeMatch: '/beta-testnet/',
        items: [
          { text: "Running", link: "/beta-testnet/running" },
          { text: "Getting synced", link: "/beta-testnet/syncing" },
          { text: "Creating a wallet", link: "/beta-testnet/creating-wallet" },
          { text: "Making a transaction", link: "/beta-testnet/transaction" },
          { text: "Staking/Unstaking", link: "/beta-testnet/staking" },
          { text: "Smart Contracts", link: "/beta-testnet/smart-contracts"},
        ],
      },
      {
        text: "Reporting",
        items: [
          { text: "Bug/Error report", link: "/bug" },
          { text: "Success report", link: "/success" },
          { text: "Feature request", link: "/feature" },
        ],
      },

    ],

    sidebar: {
      // shows when the viewer is in the /beta-testnet/ directory
      '/beta-testnet/': [
        {
          text: "Installation",
          items: [
            { text: "Windows", link: "/beta-testnet/windows" },
            { text: "Linux", link: "/beta-testnet/linux" },
            { text: "Mac", link: "/beta-testnet/mac" },
            { text: "Updating", link: "/beta-testnet/updating"},
          ],
        },
        {
          text: "Testing",
          items: [
            { text: "Running", link: "/beta-testnet/running" },
            { text: "Getting synced", link: "/beta-testnet/syncing" },
            { text: "Creating a wallet", link: "/beta-testnet/creating-wallet" },
            { text: "Making a transaction", link: "/beta-testnet/transaction" },
            { text: "Staking/Unstaking", link: "/beta-testnet/staking" },
            { text: "Smart Contracts", link: "/beta-testnet/smart-contracts"},
          ],
        },
        {
          text: "Reporting",
          items: [
            { text: "Bug/Error report", link: "/bug" },
            { text: "Success report", link: "/success" },
            { text: "Feature request", link: "/feature" },
          ],
        },
      ],

      // shows when the viewer is in the /testnet/ directory
      '/testnet/': [
        {
          text: "Zond Testnet BUIDL Preview",
          items: [
            { 
              text: "Install", 
              items: [
                { text: "Linux", link: "/testnet/linux" },
                { text: "Mac", link: "/testnet/mac" },
                { text: "Windows", link: "/testnet/windows" },
              ]
             },

            { 
              text: "Usage", 
              items: [
                { text: "Configuraton", link: "/testnet/configuration" },
                { text: "Connect to Network", link: "/testnet/connect" },
                { text: "Clef", link: "/testnet/clef" },
              ]
             },

            {
              text: "Reporting",
              items: [
                { text: "Bug/Error report", link: "/bug" },
                { text: "Success report", link: "/success" },
                { text: "Feature request", link: "/feature" },
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
