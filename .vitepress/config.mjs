import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "QRL Zond Testnet",
  description:
    "Public testing of the next evolution of post-quantum secure distributed ledger technology",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "Installation",
        items: [
          { text: "Windows", link: "/windows" },
          { text: "Linux", link: "/linux" },
          { text: "Mac", link: "/mac" },
          { text: "Updating", link: "/updating"},
        ],
      },
      {
        text: "Testing",
        items: [
          { text: "Running", link: "/running" },
          { text: "Getting synced", link: "/syncing" },
          { text: "Creating a wallet", link: "/creating-wallet" },
          { text: "Making a transaction", link: "/transaction" },
          { text: "Staking/Unstaking", link: "/staking" },
          { text: "Smart Contracts", link: "/smart-contracts"}
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

    sidebar: [
      {
        text: "Installation",
        items: [
          { text: "Windows", link: "/windows" },
          { text: "Linux", link: "/linux" },
          { text: "Mac", link: "/mac" },
          { text: "Updating", link: "/updating"},
        ],
      },
      {
        text: "Testing",
        items: [
          { text: "Running", link: "/running" },
          { text: "Getting synced", link: "/syncing" },
          { text: "Creating a wallet", link: "/creating-wallet" },
          { text: "Making a transaction", link: "/transaction" },
          { text: "Staking/Unstaking", link: "/staking" },
          { text: "Smart Contracts", link: "/smart-contracts"},
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

    socialLinks: [
      { icon: "github", link: "https://github.com/theqrl/test-zond" },
    ],
  },
});
