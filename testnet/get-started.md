---
layout: doc
outline: deep
title: "Getting Started"
description: "General information on the Zond Testnet"

---

# {{ $frontmatter.title}}


{{ $frontmatter.description}}

Our documentation includes two sections: Zond BUIDL Preview and Beta Testnet. 

- **Betanet** has been running for over a year. 
- **Zond BUIDL Preview** represents the next evolution, transitioning our beta-testnet to a full testnet environment.

Built upon Ethereum's foundation, Zond BUIDL Preview introduces the Zond Virtual Machine (ZVM), similar to Hyperion, featuring a post-quantum secure address space powered by Dilithium. This allows developers to leverage their existing Ethereum tools and workflows while benefiting from a critical upgrade: quantum-resistant security.  Build with confidence, knowing your applications are protected from the looming threat of quantum attacks.

**Key Features of Zond BUIDL Preview:**

*   **Post-Quantum Security:** Protect your applications from quantum attacks.
*   **EVM Compatibility:** Seamlessly integrate with existing Ethereum tools and infrastructure.
*   **Web3-Ready:** Build the next generation of decentralized applications with confidence.
*   **Developer-Friendly:** Utilize your existing skills and favorite tools to create quantum-safe solutions.

Developers can run a full Private Zond Testnet Preview network locally, providing a hands-on experience with the successor to our long-running Project Zond beta-testnet.

To balance different security needs, Zond employs both stateful and stateless signature schemes:

*   **XMSS (Stateful):** Offers robust security but limits the number of signatures per wallet.
*   **ML-DSA (Stateless):** Allows for an unlimited number of signatures, providing greater flexibility.

While ML-DSA will be mandatory for staking validators, users creating general wallets can choose between XMSS or ML-DSA, allowing them to tailor the security and usability to their specific requirements.