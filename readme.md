# Orbis Wallet (formally Orbis Wallet

**A Cross-Application Smart Wallet for Starknet**

Orbis Wallet simplifies user onboarding and interaction with decentralized applications (dApps) by providing a unified, secure, and user-friendly smart contract wallet experience.  Drawing inspiration from Argent's security and user experience focus and Abstract Global Wallet's cross-application connectivity, Orbis Wallet aims to bridge the gap between Web2 familiarity and Web3 accessibility.

## Overview

Orbis Wallet is a smart contract wallet built on Starknet that enables users to seamlessly connect and interact with *any* Starknet dApp.  It leverages familiar Web2 technologies like OAuth and social logins to drastically reduce the friction traditionally associated with Web3 onboarding.  Users can create a Orbis Wallet by just connecting to any dapp, using their existing Google, Apple, or other social accounts.

**Key Features:**

* **Simplified Onboarding:** Create a Starknet wallet using familiar Web2 authentication methods (OAuth, social logins). No need to manage complex seed phrases or private keys directly. Key management is handled securely behind the scenes.

* **Cross-Application Connectivity:** Connect to *any* Starknet dApp with your Orbis Wallet. No more switching between wallets or managing multiple accounts. One wallet grants access to the entire Starknet ecosystem.

* **Enhanced Security:**  Inspired by Argent's security model, Orbis Wallet prioritizes user safety. Features like transaction simulation, multi-signature support (future implementation), and fraud detection mechanisms will be explored to protect user funds.

* **User-Friendly Interface:** Orbis Wallet offers a clean and intuitive interface, making it easy for users of all technical backgrounds to manage their assets and interact with dApps.

* **Gas Abstraction:** Explore options for gas abstraction to further simplify the user experience. Potentially allow users to pay gas fees in stablecoins or even fiat currency (via integrations).

* **Developer-Friendly SDK:** A comprehensive SDK will be provided to enable developers to easily integrate Orbis Wallet into their dApps.

## Technical Architecture

Orbis Wallet will utilize smart contracts written in Cairo and deployed on the Starknet network. The frontend will be built using a modern JavaScript framework (e.g., React, Vue) and will interact with the Starknet network through a dedicated library (e.g., starknet.js). The backend will handle user authentication and manage the connection between the frontend and the Starknet network.

## Getting Started (for Developers)

*(soon)*

## Roadmap

* **Phase 1: Core Wallet Functionality:** Smart contract development, basic UI, social login integration.
* **Phase 2: Cross-Application Connectivity:** SDK development, dApp integration examples.
* **Phase 3: Enhanced Security Features:** Transaction simulation, multi-sig support.
* **Phase 4: Gas Abstraction:** Explore and implement gas abstraction mechanisms.

## Further Considerations:

* **Key Management:** Explore secure key management solutions, potentially leveraging MPC (Multi-Party Computation) or other advanced techniques.  Consider integrating hardware wallet support.
* **Recovery Mechanisms:** Implement robust account recovery mechanisms in case of lost devices or compromised accounts.  Social recovery is a strong option.
* **Audits:** Prioritize security audits to ensure the safety of user funds.  Transparency is key.
* **Scalability:** Design the wallet with scalability in mind to handle future growth of the Starknet ecosystem.
* **Internationalization:** Plan for internationalization (i18n) from the start to make the wallet accessible to a global audience.

## Contributing

See [Contributing.md](Contributing.md) for more information.

## License

See [License.md](License.md) for more information.
