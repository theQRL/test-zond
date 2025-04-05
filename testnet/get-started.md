---
layout: doc
outline: deep
title: "Getting Started"
description: "General information on the Zond Testnet"

---

# {{ $frontmatter.title}}


{{ $frontmatter.description}}

**Key Features of Zond Testnet V1:**

*   **Post-Quantum Security:** Protect your applications from quantum attacks.
*   **EVM Compatibility:** Seamlessly integrate with existing Ethereum tools and infrastructure.
*   **Web3-Ready:** Build the next generation of decentralized applications with confidence.
*   **Developer-Friendly:** Utilize your existing skills and favorite tools to create quantum-safe solutions.

Developers can run a full Private Zond Testnet network, providing a hands-on experience with the successor to our long-running Zond beta-testnet, which was ongoing for a year.

To balance different security needs, Zond employs both stateful and stateless signature schemes:

*   **XMSS (Stateful):** Offers robust security but limits the number of signatures per wallet.
*   **ML-DSA (Stateless):** Allows for an unlimited number of signatures, providing greater flexibility.

While ML-DSA will be mandatory for staking validators, users creating general wallets can choose between XMSS or ML-DSA, allowing them to tailor the security and usability to their specific requirements.
