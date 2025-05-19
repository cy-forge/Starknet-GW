# Orbis Wallet: Component Requirements Document

## I. Introduction

### 1.1. Project Vision

This section introduces the core concept and goals of the Orbis
Wallet.

The **Orbis Wallet** initiative aims to redefine user interaction
within the Starknet ecosystem by introducing a web-based, extension-less wallet
solution. The core concept revolves around providing users with a seamless and
consistent experience across all integrated decentralized applications (dApps)
on Starknet.

This wallet will maintain a **universal state**, meaning a user's identity,
assets, and potentially permissions remain consistent regardless of the dApp
they are interacting with, provided the dApp integrates the **Global Wallet
SDK**.

This approach seeks to combine the ease of access typically associated with web2
applications, facilitated through diverse authentication methods like social
logins (Google, Facebook, Twitter, Apple) and passkeys (leveraging
**WebAuthn**), with the persistent, cross-dApp state traditionally offered by
browser extension wallets.

The overarching goal is to significantly **lower the barrier to entry** for new
users and enhance the overall usability of the Starknet platform.

### 1.2. Purpose & Scope

This section outlines the document's purpose and the scope of the requirements
covered.

This document provides a detailed decomposition of the technical requirements
for the Orbis Wallet system, broken down by major components.

The scope encompasses requirements for:

- **Frontend** (both the central "Root dApp" and SDK-driven interactions)
- **Backend** services
- The core **Starknet Smart Contract** (Account Contract)
- **Database** infrastructure for off-chain data
- Underlying cloud **Infrastructure**
- Overarching **Security** considerations
- Essential **Integrations** with third-party services and the developer SDK
- **Performance** benchmarks
- Considerations for **Testing, Monitoring, and Maintenance**.

This document serves as a foundational technical blueprint intended for
development teams, technical leads, and architects responsible for designing and
implementing the Orbis Wallet.

### 1.3. Key Differentiator

This section highlights the unique aspects of the Orbis Wallet
compared to existing solutions.

The primary technical innovation and key differentiator of the Orbis
Wallet compared to existing solutions like Privy or Cartridge lies in its
commitment to achieving a **universal state** across all integrated dApps.

While solutions like Privy often utilize embedded wallets where the state or key
access might be scoped per application[^4], and Cartridge focuses on session
keys and controller accounts[^2], the Global Wallet aims for a **single,
persistent user identity and state** accessible seamlessly across the ecosystem
**without requiring a browser extension** .

This necessitates a specific architectural approach heavily reliant on
Starknet's native **account abstraction** and careful state management design,
likely centering the authoritative state within the user's on-chain account
contract.

---

## II. Frontend Requirements (Root dApp & SDK Integration)

The frontend encompasses two primary user experiences: the centralized "**Root
dApp**" web interface where users manage their wallet directly, and the
interactions prompted within integrated dApps via the **Orbis Wallet SDK**.

### 2.1. Root dApp - Centralized Web Interface

This web application serves as the primary management hub for users.

**Functional Requirements:**

- **User Authentication Portal:**
  - Implement robust and user-friendly login flows for all specified
    authentication methods:
    - Social Logins (Google, Facebook, Twitter, Apple) utilizing standard
      protocols like **OAuth 2.0** or **OpenID Connect**.
    - Passkeys leveraging the **WebAuthn API**.[^7]
    - Potentially an option to connect or link an existing MetaMask wallet
      (requires careful design).
- **Account Dashboard:**
  - Display the user's unique Orbis Wallet address.
  - Show an aggregated view of asset balances (fungible tokens, NFTs).
  - List recent transaction history (fetched from Backend APIs).
- **Asset Management:**
  - Provide core wallet functionalities: sending Starknet-based tokens and NFTs.
  - Display the user's address for receiving assets.
  - Include clear input forms, address validation logic, and a transaction
    preview mechanism (showing estimated fees, asset movements) before
    confirmation.
- **Connection Management:**
  - Allow users to view a list of connected dApps.
  - Provide functionality to revoke access or disconnect from specific dApps.
- **Authentication Method Management:**
  - Enable users to link multiple authentication methods (e.g., Google +
    passkey) to their single Global Wallet account.
  - Provide secure flows for adding/unlinking methods.
- **Account Recovery Interface:**
  - Present UI elements for initiating account recovery processes (specific
    mechanisms defined by security/smart contract design).

**UI/UX Considerations:**

- **Intuitive Onboarding:** Ensure a smooth first-time user experience,
  minimizing steps and crypto jargon for authentication and implicit wallet
  creation.
- **Clarity and Feedback:** Provide immediate, unambiguous visual feedback for
  all actions (authentication, transaction signing status, confirmations). Use
  user-friendly error messages.
- **Responsive Design:** Ensure full responsiveness across desktops, tablets,
  and mobile browsers.
- **Accessibility:** Adhere to Web Content Accessibility Guidelines (WCAG).

**Technical Constraints & Dependencies:**

- Heavy reliance on **Backend APIs** for dynamic data and actions
  (authentication, state, connection management, transaction initiation/status).
- Graceful handling of potential API errors, network issues, or blockchain
  confirmation delays.
- **Passkey/WebAuthn** integration depends on browser support and authenticator
  availability.[^7]

**Role as Identity Hub:**

The Root dApp transcends being merely a wallet interface; it functions as the
central **identity and security management hub** for the user within the
Starknet ecosystem facilitated by this wallet. Users manage their authentication
methods (social, passkey) and control which dApps can interact with their
account via this interface.

This central role necessitates a design that constantly reinforces security
awareness, clearly delineating the implications of actions like linking new
authentication methods or approving dApp connections, as a compromise here could
affect the user's entire **universal state** across all integrated applications.

### 2.2. SDK-Initiated Interactions (Within Integrated dApps)

These interactions occur when a user interacts with a third-party dApp that has
integrated the Global Wallet SDK.

**Functional Requirements:**

- **Authentication Prompts:**
  - When a dApp invokes the SDK's `connect` function, display the appropriate
    authentication prompt (redirect, pop-up, modal).
  - Allow the user to choose their preferred, previously linked authentication
    method.
- **Transaction Signing Prompts:**
  - When a dApp requests a transaction signature via the SDK, display a
    standardized, secure prompt.
  - Clearly detail transaction specifics: action, target contract, assets,
    estimated fees, originating dApp.
  - Securely capture explicit user approval (potentially requiring
    re-authentication).
- **Message Signing Prompts:**
  - Support similar secure prompts for signing off-chain messages (e.g.,
    adapting EIP-712 patterns[^9]).

**UI/UX Considerations:**

- **Seamless Integration:** Prompts should feel integrated with the dApp's flow,
  minimizing disruption (secure pop-ups/modals).
- **Security Context:** Clearly indicate the requesting dApp. Include warnings
  for potentially risky operations.

**Technical Constraints & Dependencies:**

- Requires a robust **client-side SDK component** (e.g., JavaScript library) to
  manage communication between the dApp and the Global Wallet backend/frontend.
- Critical need to prevent phishing and UI manipulation. The prompt mechanism
  must resist attempts by malicious dApps to trick users.

**SDK Security Implications:**

The client-side component of the SDK represents a significant interface between
the potentially untrusted environment of a third-party dApp and the user's
secure wallet operations. Its design must prioritize security to prevent dApps
from spoofing prompts, intercepting sensitive data, or manipulating the signing
process.

Techniques like using securely sandboxed iframes for prompts or strict
validation of messages are necessary. Failure to secure this interface could
bypass backend and smart contract security guarantees.

### 2.3. Potential Challenges & Risks (Frontend)

- Maintaining consistency, security, and user-friendliness across diverse
  authentication methods.
- Ensuring cryptographic security and usability of SDK-initiated transaction
  signing prompts.
- Managing client-side state complexity (auth status, wallet details,
  transactions).
- Cross-browser compatibility issues, especially with **WebAuthn/Passkey**.

---

## III. Backend Requirements

The backend infrastructure provides APIs, orchestration logic, and security
enforcement.

### 3.1. Server Architecture

This section details the proposed backend architecture.

A scalable and resilient architecture is required. A **microservices approach**
is recommended, potentially separating concerns like:

- Authentication
- Wallet Operations (API for Root dApp and SDK)
- Transaction Orchestration
- Webhook Notification

Services should be designed to be **stateless** where feasible for horizontal
scaling. Utilizing a **message queue** (e.g., RabbitMQ, Kafka) for asynchronous
tasks (transaction monitoring, webhooks) can improve resilience and
responsiveness.

### 3.2. Authentication Service

This service handles user identity verification and links off-chain credentials
to the Starknet account.

**Functional Requirements:**

- **OAuth 2.0/OIDC Handling:**
  - Implement secure server-side logic for social providers (Google, Facebook,
    Twitter, Apple).
  - Handle redirects, code exchange, token validation, profile fetching, and
    token refresh.
- **Passkey/WebAuthn Server Logic:**
  - Implement Relying Party server-side responsibilities for **WebAuthn**.[^7]
  - **Registration:** Generate challenges, validate registration data
    (attestation, public keys, credential IDs), securely store public key and
    credential ID.
  - **Authentication:** Generate challenges, validate authentication assertions
    (signed challenges) against stored public keys.
  - Strongly recommend using established **FIDO2 server-side libraries**.[^10]
- **Identity Mapping:**
  - Maintain a secure database mapping between verified off-chain identities
    (social ID, passkey ID) and the internal Global Wallet user ID (linked to
    the Starknet address). **This mapping is security-critical.**
- **Session Management:**
  - Implement secure session management for the Root dApp (e.g.,
    signed/encrypted cookies/tokens with HttpOnly, Secure flags, expiration).

**Technical Constraints & Dependencies:**

- Requires secure, encrypted storage for identity mapping data and potentially
  sensitive info (e.g., encrypted refresh tokens).
- Dependencies on third-party social identity providers' availability and APIs.
- Requires careful implementation of **WebAuthn** server logic; using vetted
  libraries[^10] mitigates risk.

### 3.3. Wallet Interaction Service & APIs

This service exposes endpoints and orchestrates blockchain interactions.

**Functional Requirements:**

- **API Endpoints for Root dApp:**
  - Provide secure RESTful or GraphQL APIs for all Root dApp functions (fetching
    state, managing connections/auth methods, initiating transfers, retrieving
    statuses).
- **API Endpoints for SDK:**
  - Expose endpoints for the SDK to initiate authentication, receive signing
    requests, and query basic user info (address).
- **Transaction Orchestration:**
  - Act as the central coordinator for transactions.
  - Receive signing requests, validate, confirm user intent (via Auth Service),
    format for Starknet, interact with relayer/node for submission.
- **State Coordination:**
  - Provide APIs for efficient retrieval of the user's **universal state**.
  - Likely involves reading from a cached/indexed representation of on-chain
    data (in the off-chain Database) for responsiveness.
  - Requires mechanisms to keep the cache synchronized with blockchain state.
- **Webhook Service:**
  - Implement outgoing webhooks to integrated dApps for subscribed events
    (transaction status updates, incoming transfers - similar to Privy[^11]).

**Technical Constraints & Dependencies:**

- Requires reliable, low-latency connections to **Starknet RPC nodes**.
- Must maintain secure communication channels with Frontend and SDK client-side
  component.
- State caching mechanisms need careful design (performance vs. data freshness).

### 3.4. Transaction Signing Coordination (If 2-Signer Model is Chosen)

This section details requirements if a two-signer model (user + backend) is
implemented.

**Functional Requirements:**

- **Backend Key Management:**
  - Implement highly secure generation, storage, rotation, and usage for backend
    private signing key(s).
  - Strongly recommend using **Hardware Security Modules (HSMs)** or secure
    **Trusted Execution Environments (TEEs)** (e.g., AWS Nitro Enclaves, GCP
    Confidential Computing)[^4]. Keys must never be exposed to main application
    logic.
- **Co-Signing Logic:**
  - Develop logic within a secure environment (HSM/TEE) to:
    - Receive user-approved signing requests.
    - Verify user approval and request authenticity.
    - Potentially apply policy checks (limits, allowlists).
    - Generate the backend's signature share if all checks pass.
- **API for Co-signing:**
  - Provide a secure internal API for the Wallet Interaction Service to request
    a backend signature.

**Technical Constraints & Dependencies:**

- Introduces critical operational dependency on the backend signing
  infrastructure's availability, performance, and security.
- Requires specialized expertise in secure key management and HSM/TEE
  integration.
- Significantly increases **centralization** compared to client-side signing or
  AA-based validation, potentially conflicting with user expectations of
  self-custody.[^13]

**Backend Security Role:**

The backend serves as a critical **bridge and security enforcement point**
between diverse off-chain authentication methods and the high-value Starknet
account contract. Its reliability, scalability, and security are paramount. It
translates off-chain authenticated actions into authorized on-chain operations.

Vulnerabilities in identity mapping, session management, API security, or
backend signing keys could lead to unauthorized fund access. This demands
security practices exceeding typical web standards.

**WebAuthn Implementation Note:**

Implementing server-side **WebAuthn/Passkeys** logic requires specialized
knowledge due to complex cryptographic protocols.[^7] Relying on vetted **FIDO2
server libraries**[^10] is crucial.

**2-Signer Model Considerations:**

Implementing a **2-signer model** introduces substantial operational complexity
and centralization risks. The backend signer becomes a high-value target and
single point of failure.[^13] Its compromise could grant control over all
co-signed funds. Alternatives leveraging Starknet's native **account
abstraction** or **MPC/TSS**[^15] should be carefully evaluated for better
alignment with decentralization and self-custody principles.

### 3.5. Potential Challenges & Risks (Backend)

- Ensuring scalability of authentication flows and state synchronization under
  load.
- Managing security risks of storing identity mappings and potentially backend
  signing keys.
- Handling dependencies on third-party authentication providers (uptime, API
  changes).
- Complexity in correctly and securely implementing **WebAuthn/Passkey** server
  logic.

---

## IV. Smart Contract Requirements (Starknet Account Contract)

The core of the user's on-chain presence and the enabler of universal state is
the Starknet smart contract account.

### 4.1. Core Architecture: Native Account Abstraction (AA)

This section defines the fundamental smart contract architecture.

The wallet **must** leverage Starknet's native **Account Abstraction (AA)**
capabilities, where every user account is a smart contract.[^1] This allows for
programmable validation logic.

The account contract must:

- Adhere to the **SNIP-6** standard account interface (implementing
  `__execute__`, `__validate__`, `is_valid_signature`).[^1]
- Support the **SNIP-5** `supports_interface` method for discoverability.[^1]
- The deployed address represents the user's persistent, **universal identity**.

### 4.2. Automatic Account Creation

This outlines the process for creating user accounts on-chain.

A mechanism for seamless, on-chain deployment of the account contract is
required upon the user's first successful authentication. This should ideally be
invisible to the user.

**Counterfactual deployment** is the likely approach:

1. Backend calculates the deterministic future address based on initial auth
   data.
2. Actual deployment transaction (e.g., using `deploy_syscall`[^1]) is triggered
   only when needed (e.g., first interaction).
3. Backend service likely orchestrates deployment, potentially covering initial
   gas fees.

### 4.3. Multi-Authentication Validation Logic (`__validate__`)

The `__validate__` function is the heart of the custom logic, enabling diverse
authentication methods.

The contract must implement specific verification routines within
`__validate__`:[^1]

- **Starknet Key Support:** Allow validation based on standard Starknet
  (stark-curve) key signatures (e.g., for admin/recovery).[^1]
- **Social Login/Off-Chain Proofs:**
  - Likely requires a **backend attestation model**:
    1. User authenticates via social provider.
    2. Backend verifies and generates a signed attestation (confirming auth for
       user/transaction).
    3. Frontend/SDK passes attestation with the transaction.
    4. Contract's `__validate__` verifies attestation signature against a
       trusted backend public key stored in contract state.
  - **Constraint:** Introduces trust dependency on the backend service and its
    key.
- **Passkey/WebAuthn Support:**
  - Direct on-chain verification offers greater decentralization but is
    challenging. Requires:
    1. Storing WebAuthn public key identifiers in contract storage.
    2. Implementing **secp256r1** curve verification logic in Cairo (using
       precompiles, libraries, or custom code - Argent demonstrates
       feasibility[^21]).
  - **Constraint:** On-chain crypto verification (esp. non-native curves) can be
    computationally expensive (**higher gas costs**).
- **MetaMask/EOA Signature Support:**
  - If required, `__validate__` needs logic to verify **secp256k1** signatures
    (ref: OpenZeppelin's EthAccountComponent[^1]).

**`__validate__` Design:**

- Must securely parse transaction data to identify the auth method and route
  validation correctly.
- Must adhere to Starknet constraints on allowed operations within
  `__validate__` to prevent DoS vectors.[^19]

### 4.4. Transaction Execution (`__execute__`)

This section describes the standard execution function.

The contract must implement the standard `__execute__` function as defined by
**SNIP-6**.[^1]

- Called by Starknet OS after successful `__validate__`.
- Takes an array of `Call` structs (target, selector, calldata).
- Executes calls sequentially.
- Returns an array of results.

### 4.5. Signature Verification (`is_valid_signature`)

This covers the function for off-chain signature verification.

The `is_valid_signature` function (part of **SNIP-6**[^1]) must be implemented.

- Allows off-chain services (dApps) to verify signatures over arbitrary message
  hashes using any supported auth method.
- Essential for "Sign-In with Starknet" and other off-chain authentication use
  cases without an on-chain transaction.

### 4.6. On-Chain State Management

The account contract is the primary custodian of the user's universal on-chain
state.

**Inherent State:**

- User's STRK balance.
- Ownership of standard tokens (ERC20) and NFTs (ERC721/ERC1155).

**Contract Internal State:**

- **Authentication Method Data:** Securely store identifiers/public keys for
  linked methods (Starknet key, WebAuthn ID, trusted backend key).
- **Access Control Data:** Store info on ownership/administrative roles
  (upgrades, auth method management).
- **Nonce Management:** Utilize Starknet's built-in sequential nonce for replay
  protection.[^22] (Future "nonce abstraction" noted[^18]).
- **(Optional) Policy State:** Configuration for on-chain policies (spending
  limits, dApp permissions).

**Prioritizing On-Chain State:** Maximizing reliance on state within the account
contract is crucial for the **"universal state"** promise.

### 4.7. Upgradeability

The contract must be upgradeable for future updates and fixes.

- Implement using Starknet's native `replace_class_syscall` system call
  (replaces code/class hash, preserves storage).[^23]
- Utilize well-audited components like OpenZeppelin's **UpgradeableComponent**
  and an access control component (e.g., **OwnableComponent**) for secure
  management.[^24]
- Strictly control the authority to trigger upgrades (e.g., high-security user
  key, multi-sig).
- Requires a clear, documented, tested process for declaring versions and
  executing upgrades.

### 4.8. Security Considerations (Smart Contract)

- **`__validate__` is critical:** Requires rigorous testing, formal verification
  (if feasible) against unauthorized execution, replay attacks, signature
  malleability.
- **Robust Access Control:** Implement for sensitive admin functions (auth
  methods, upgrades).
- **Audits:** Mandatory, comprehensive third-party audits by Starknet/Cairo
  experts are essential.
- **Secure Development Practices:** Adhere to Cairo best practices (reentrancy,
  arithmetic checks, event emission).

### 4.9. Potential Challenges & Risks (Smart Contract)

- Complexity and gas cost of implementing/verifying diverse signature schemes
  (esp. **secp256r1**) on-chain.
- Securely managing the lifecycle of the trusted backend key (if using
  attestation model).
- Ensuring the upgrade mechanism is secure and robust against errors/breaking
  changes.
- Balancing rich on-chain state/policy with gas costs and complexity.

**Smart Contract Importance:**

The Starknet Account Contract forms the **bedrock of the Global Wallet's
security model** and value proposition. Its design choices dictate security,
decentralization, and the feasibility of supporting diverse auth methods and
**universal state**. Flaws are fundamental and potentially catastrophic.

**WebAuthn Implementation Choice:**

A major decision is handling **WebAuthn/passkey** auth:

- **On-chain verification** (secp256r1 in `__validate__`): Highest
  decentralization/trustlessness, but technically complex and potentially high
  gas cost.[^21]
- **Backend attestation:** Simpler on-chain, but introduces strong trust in the
  backend service/key. This trade-off is a central design consideration.

**Upgradeability Note:**

Starknet's `replace_class_syscall`[^23] is simpler than Ethereum proxies[^25]
but requires the new code version to be compatible with the existing storage
layout. Securing the upgrade function (e.g., via audited components like
OpenZeppelin's Upgradeable/Ownable[^24]) is paramount.

---

## V. Database Requirements (Off-Chain Storage)

While authoritative state is on-chain, an off-chain database supports
functionalities, improves performance, and manages mappings.

### 5.1. Data Models & Schemas

- **User Profiles:** Essential user info linked to Starknet address (internal
  ID, timestamp, status, non-sensitive preferences).
- **Authentication Method Mappings:** **Securely** store associations between
  internal user IDs and linked off-chain auth methods (social provider IDs,
  passkey credential IDs, metadata). **Never store raw secrets or private
  keys.**
- **Session Data:** Manage active Root dApp sessions (session tokens/identifiers
  linked to user IDs - suitable for Redis).
- **Cached/Indexed Blockchain Data:** (Non-authoritative read cache) Indexed
  transaction history, cached balances, NFT metadata to optimize frontend
  performance. Needs periodic sync/invalidation.
- **SDK/dApp Integration Data:** Info about integrated dApps (API keys, webhook
  identifiers). Off-chain dApp permissions (if not on-chain).
- **Audit Logs:** Comprehensive logs of significant backend actions (logins,
  auth method changes, signing requests).

### 5.2. Technology Considerations

- **Relational Database (e.g., PostgreSQL):** Suitable for structured data with
  integrity needs (profiles, mappings).
- **Key-Value Store/Cache (e.g., Redis):** Effective for session management and
  caching blockchain data.
- Prioritize **data consistency** for critical mappings and **performance** for
  cached data.

### 5.3. Data Security & Privacy

- **Encryption:** Encrypt sensitive data **at rest**. Encrypt communication **in
  transit** (TLS).
- **Access Control:** Implement strict, role-based database access control
  (least privilege). Securely manage credentials.
- **Compliance:** Adhere to relevant data privacy regulations (GDPR, CCPA).
  Minimize PII collection/storage.

### 5.4. Backup & Recovery

- Implement robust, regular, automated database backups.
- Define and regularly test a disaster recovery plan.

### 5.5. Potential Challenges & Risks (Database)

- Maintaining consistency between the off-chain cache and authoritative on-chain
  state.
- Ensuring database scalability for users, auth methods, and cached data.
- Protecting sensitive user authentication mapping data from breaches
  (**critical security challenge**).

**Database Role Clarification:**

The off-chain database is primarily **supportive**, focusing on **performance
optimization** and **managing the mapping** between non-native identities
(social, passkey) and the on-chain account. Critical state (balances, ownership,
core permissions) should reside **authoritatively on-chain** within the Account
Contract to fulfill the **"universal state"** promise.

**Mapping Security:**

The **secure management of the mapping** between off-chain identifiers and the
Starknet address is a paramount security function. A compromise here could allow
linking an attacker's credential to a victim's account. This demands robust
database security, secure backend code, strong access controls, and potential
anomaly detection.

---

## VI. Infrastructure Requirements

The underlying infrastructure hosts backend services, databases, and facilitates
Starknet communication.

### 6.1. Hosting Environment

- Recommend a major **cloud provider** (AWS, GCP, Azure) for managed services,
  scalability, security.
- Utilize **containerization** (Docker) and **orchestration** (Kubernetes) for
  deployment, scaling, management.

### 6.2. Starknet Node Access

Reliable access to Starknet nodes is critical.

- **Option 1: Third-Party Providers:** (e.g., Infura, Alchemy, Nethermind,
  Cartridge RPC[^6]) Simplifies management, introduces external dependency and
  potential costs/limits.
- **Option 2: Self-Hosted Nodes:** Provides control, potentially lower latency,
  but significantly increases operational complexity and cost.
- **Hybrid Approach:** Primary provider with failover.

Ensure redundant, low-latency connections to **Starknet RPC endpoints**. Monitor
node health/performance.

### 6.3. Scalability & High Availability

Design for growth and resilience.

- **Horizontal Scaling:** Load balancers, auto-scaling for backend compute
  instances.
- **Database Scalability:** Managed services with scaling features (read
  replicas, pooling, sharding).
- **High Availability:** Deploy critical components across multiple availability
  zones (AZs). Consider multi-region for disaster recovery.
- **Monitoring & Alerting:** Comprehensive infrastructure monitoring (CPU,
  memory, network, disk) and alerts.

### 6.4. Deployment (CI/CD)

- Establish automated **CI/CD pipelines** for frontend/backend updates.
- Use a separate, more controlled pipeline for Starknet smart contract
  deployments/upgrades (manual approvals, rigorous checks).

### 6.5. Networking & Security

- Implement network segmentation (VPCs, subnets).
- Configure firewalls/security groups (least privilege).
- Terminate TLS/SSL at load balancers; enforce internal TLS.
- Utilize Web Application Firewalls (**WAFs**) and DDoS mitigation services.

### 6.6. Potential Challenges & Risks (Infrastructure)

- Cost/complexity of running Starknet nodes vs. costs/limits of third-party
  providers.
- Ensuring rapid, cost-effective scaling for unpredictable user activity/network
  congestion.
- Maintaining robust cloud infrastructure security against threats and
  misconfigurations.

**Node Access Criticality:**

Reliable and scalable access to **Starknet nodes** is a critical pillar.
Performance degradation, downtime, or rate limiting directly impacts the Global
Wallet's responsiveness and UX. A robust node access strategy is essential.

**Infrastructure Impact of 2-Signer Model:**

If a **2-signer model** is chosen, infrastructure requirements escalate
significantly due to the need for secure backend key storage (**HSMs** or
**TEEs**[^4][^12]). This adds considerable complexity and cost compared to
architectures relying solely on user keys or on-chain validation.

---

## VII. Security Requirements

Security is paramount and must be integrated into every layer.

### 7.1. Authentication Security

- **OAuth/OIDC:** Implement secure flows (PKCE). Validate tokens rigorously.
  Prevent CSRF. Securely manage client secrets.
- **Passkey/WebAuthn:** Strictly adhere to W3C spec.[^7] Use recommended FIDO2
  server libraries.[^10] Prevent credential replay. Securely store public
  keys/IDs. Protect challenge generation/validation.
- **Secure Linking:** Make associating off-chain auth methods with the Starknet
  account resistant to hijacking (e.g., require re-auth/MFA). Mitigate
  phishing/credential theft risks.[^26]
- **Session Management:** Use secure cookie flags (HttpOnly, Secure, SameSite).
  Implement short timeouts, explicit logout (server-side invalidation).

### 7.2. Transaction Signing Security

Security depends heavily on the chosen architecture.

- **Architecture Evaluation:** Thorough risk assessment of **Client-side AA
  validation**, **2-Signer Backend**, and **MPC/TSS** is required (security
  guarantees, decentralization, UX, complexity).
- **If 2-Signer:** Requires exceptional security for backend signing key(s)
  (secure generation, HSM/TEE storage[^4], access controls, rotation, audits).
  Mitigate compromise, insider threats, collusion.[^13]
- **If Client-side AA:** Security relies on the `__validate__` function
  robustness and secure SDK/frontend prompts preventing manipulation.
- **If MPC/TSS:** Security depends on protocol soundness (e.g., GG19/GG20[^17]),
  secure implementation, secure share storage (device encryption + server
  TEEs[^4]), robust share management. Understand SSS vs. TSS differences.[^17]
- **Clear Signing Intent:** UI (frontend/SDK prompts) must accurately display
  all critical transaction details before approval to prevent phishing/trickery.[^14]

**Table 2: Transaction Signing Architecture Comparison**

| Feature                   | Client-Side AA Validation                                 | 2-Signer Backend                                                   | MPC/TSS (e.g., 2-of-2)                                                 |
| :------------------------ | :-------------------------------------------------------- | :----------------------------------------------------------------- | :--------------------------------------------------------------------- |
| **Security (Key Risk)**   | User auth method compromise; AA contract flaw             | Backend signer key compromise (**high impact**); User auth         | Key share compromise (requires multiple); MPC protocol flaw            |
| **Attack Vectors**        | Phishing user auth; Exploiting `__validate__`; SDK manip. | Targeting backend key infra; Phishing user auth; Collusion         | Targeting share storage (device/server); Protocol attacks; Social eng. |
| **Decentralization**      | **High** (relies on user & contract)                      | **Low** (backend is central point of control/failure)              | **Medium** (distributes trust, no single key)                          |
| **User Experience**       | Potentially seamless (passkey)                            | User action + backend action (potentially invisible)               | User action (signing) + backend action (signing)                       |
| **Implementation**        | Complex `__validate__` (Cairo); Secure SDK/UI             | Secure backend key mgmt (HSM/TEE); Backend logic; Simpler contract | MPC library integration; Secure share mgmt; Complex crypto             |
| **Key Management Burden** | User manages auth methods; Dev manages contract           | Provider manages **highly sensitive** backend keys                 | Provider manages server share; User manages device share (implicit)    |

### 7.3. Smart Contract Security

- **Audits:** Mandatory, independent audits by Starknet/Cairo specialists before
  mainnet. Multiple audits recommended.
- **Best Practices:** Strict adherence to secure Cairo/Starknet development
  (external calls, state changes, access control, reentrancy, arithmetic,
  events).
- **Logic Validation:** Rigorous testing, potential formal verification of
  `__validate__` and access control.
- **Upgrade Security:** Secure, controlled, thoroughly tested upgrade process
  ensuring compatibility and no new vulnerabilities.

### 7.4. Backend & Infrastructure Security

- **API Security:** Strong authN/authZ, input validation, output encoding, rate
  limiting, OWASP Top 10 protection.
- **Infrastructure Hardening:** Secure OS/DB/cloud config. Minimize attack
  surface. Vulnerability scanning, penetration testing.
- **Data Encryption:** Encrypt sensitive data at rest and in transit (TLS).
- **Logging & Monitoring:** Comprehensive, centralized security logging.
  Real-time monitoring (SIEM, IDS/IPS) for anomalies, intrusions, abuse.
- **Dependency Management:** Regular vulnerability scanning and patching of all
  dependencies.

### 7.5. Key Management & Recovery

- **Backend Keys:** Secure lifecycle management for all secrets (API keys, DB
  creds, **especially backend signing keys**).
- **Account Recovery:** Design user-friendly yet highly secure recovery
  mechanisms (alternative linked methods, social recovery via AA contract,
  backup options). Must not bypass primary auth.[^27]

### 7.6. SDK Security

- Provide clear security guidelines/best practices for dApp developers.
- Design SDK to minimize trust required from dApp (cannot arbitrarily trigger
  signing, access sensitive data beyond address). Consider isolating SDK UI
  components.

### 7.7. Potential Challenges & Risks (Security)

- Complexity of securing the bridge between web auth and blockchain control.
- Ensuring end-to-end security of the chosen transaction signing architecture.
- Potential unknown vulnerabilities due to nascency of Cairo/Starknet.
- Balancing robust security with smooth UX.

**Security as Cross-Cutting Concern:**

Security is fundamental and **cross-cutting**, permeating every layer. A
vulnerability anywhere could lead to irreversible financial loss. A holistic
strategy, including threat modeling, is essential.

**Unique Attack Surfaces:**

Combining web auth (social, passkeys) with blockchain accounts (Starknet AA)
creates **unique attack surfaces** at their intersection.[^26] Attackers might
target web aspects (account compromise, phishing) or blockchain aspects
(contract exploits, transaction manipulation). Securing the linkage (backend
mapping, `__validate__`) requires expertise in both web and blockchain security.[^28]

**Signing Architecture Shapes Trust Model:**

The core **transaction signing architecture** (AA vs. 2-signer vs. MPC/TSS)
fundamentally shapes the system's **trust model and security posture**.

- **2-signer:** Centralizes trust/risk in the backend operator.[^13]
- **Client-side AA:** Trusts user auth methods and contract logic.
- **MPC/TSS:** Distributes trust (user device, server, crypto protocol).[^12]
  This decision must align with goals for self-custody, convenience, and
  security management burden.

---

## VIII. Integration Requirements

Seamless integration with external auth providers and a robust SDK are needed.

### 8.1. Third-Party Authentication Providers

- Implement standard client-side **OAuth 2.0 / OpenID Connect** flows for
  Google, Facebook, Twitter, Apple.
- Backend must handle code exchange, token validation (sig verification,
  audience/issuer checks), refresh, profile parsing.
- Securely manage provider client IDs/secrets.

### 8.2. Passkey/WebAuthn Integration

- **Frontend:** Use standard `navigator.credentials.create()` / `.get()`
  JavaScript APIs.[^7] Handle flows/errors gracefully.
- **Backend:** Implement Relying Party server logic per spec[^7] (challenge
  generation, validation, credential management).[^10]
- Consider platform APIs (Android Credential Manager[^10]) for native mobile
  apps.

### 8.3. Developer SDK

The SDK is critical for dApp integration and adoption.

**Functional Requirements:**

- `connect()`: Initiate user connection/authentication flow.
- `signTransaction()` / `sendTransaction()`: Request user signature for Starknet
  transactions (accept standard params). `sendTransaction` also handles
  submission.
- `signMessage()`: Request signing of off-chain messages (e.g., EIP-712 adapted
  for Starknet[^9]).
- **State Access:** Methods to retrieve connected user address, connection
  status, etc.
- **Event Handling:** Subscription mechanism for events (account change,
  disconnect, network change).

**Technical Requirements:**

- Well-packaged libraries for popular frontend environments (JS/TS - React, Vue,
  Angular, Vanilla).
- Clear, concise, well-documented API (strongly typed - TypeScript).
- Abstract complexity of underlying auth/signing flows (unified API).
- Comprehensive documentation (guides, references, tutorials, examples).
- Lightweight library, optimized for performance.

**SDK Importance:** Quality and ease of use are paramount for driving
**developer adoption**, a critical success factor.

### 8.4. MetaMask Integration (If Pursued)

- Role needs careful definition. Using as just another auth factor (signing a
  message) might be feasible.
- Using MetaMask to directly sign Starknet transactions contradicts the
  "extension-less" principle.
- Any integration must avoid compromising core value prop or UX.

### 8.5. Potential Challenges & Risks (Integration)

- Maintenance effort for keeping up with third-party social login API changes.
- Achieving widespread SDK adoption requires significant developer relations
  effort.
- Ensuring consistent **WebAuthn/Passkey** functionality across
  browsers/OS/authenticators.

**SDK as a Product:**

View the Developer SDK as a **product targeting dApp developers**. Success
hinges on excellent developer experience (DX). A high-quality, well-documented,
easy-to-integrate SDK is crucial for network effects. Invest significantly in
its design, development, documentation, and support.

**External Dependencies:**

Relying on multiple third-party auth systems introduces **external dependencies
and potential points of failure** (outages, API changes, policy shifts, browser
implementation changes). Architecture must anticipate these (support multiple
methods per user, clear error handling, vigilance).

---

## IX. Performance Requirements

Performance is crucial for user satisfaction, especially targeting web2 users.

### 9.1. Latency Targets

Define and measure targets for key interactions:

- **Authentication Flows:**
  - Social login (end-to-end, excluding user time): Target **< 2 seconds**.
  - Passkey interaction (prompt to validation): Target **sub-second**.
- **Transaction Signing Prompts:** (dApp request to prompt display): Target **<
  500 milliseconds**.
- **State Synchronization:**
  - Backend API responses (cached state): Target **< 300 milliseconds (p95)**.
    (Privy benchmark: sub-300ms p95 for signatures[^11]).
  - Clearly indicate pending states for on-chain confirmations.

### 9.2. Throughput Requirements

- Define target concurrent user sessions for Root dApp/backend.
- Define target transaction signing requests per second during peak load.

### 9.3. Scalability

- Entire system must scale horizontally (frontend, backend, DB, node access).
- Leverage auto-scaling mechanisms.

### 9.4. Resource Utilization

- Optimize frontend bundle size and runtime performance.
- Monitor/optimize backend service resource consumption.
- Optimize **gas usage** of the account contract, especially `__validate__`.

### 9.5. Potential Challenges & Risks (Performance)

- Achieving low latency for operations dependent on Starknet blockchain
  performance (congestion, node speed).
- Scaling components (DB, node interaction) cost-effectively under high load.
- Optimizing gas efficiency of custom AA logic.

**Perceived Performance:**

Perceived performance (login, transaction approval) is a major factor for
adoption. Aggressive targets for off-chain operations are needed for a smooth,
web2-like feel.

**Starknet Network Latency:**

Recognize that **Starknet's network performance** (block times, finality, RPC
speed) imposes a **lower bound on latency** for on-chain operations. Backend
caching helps read speed, but manage user expectations regarding on-chain
finality using clear visual indicators (pending states).

---

## X. Testing, Monitoring, and Maintenance

A robust strategy is essential for reliability, security, and longevity.

### 10.1. Testing Strategy

Multi-layered approach required:

- **Unit Testing:** Extensive tests for individual functions/components
  (Frontend, Backend, SDK, Smart Contract - Cairo).
- **Integration Testing:** Verify interactions between components (FE <> BE, BE
  <> DB/Node, SDK <> BE, BE <> Contract).
- **End-to-End (E2E) Testing:** Automate tests simulating full user journeys
  (registration, linking auth, viewing balance, connecting dApp, signing tx,
  sending assets) covering various auth paths.
- **Smart Contract Testing:** Use Starknet frameworks (Foundry, Scarb) for
  comprehensive contract tests (`__validate__` logic for all methods, access
  control, upgradeability, edge cases).
- **Security Testing:** Regular penetration testing (web app, APIs, infra, SDK).
  Specific security code reviews (auth, session, signing). Mandatory third-party
  contract audits + internal reviews.
- **Load Testing:** Simulate expected/peak loads to verify performance targets
  and find bottlenecks.

### 10.2. Monitoring Strategy

Comprehensive monitoring across all layers:

- **Infrastructure Monitoring:** Standard metrics (CPU, memory, disk, network)
  for servers, containers, DBs, nodes.
- **Application Performance Monitoring (APM):** Tools (Datadog, New Relic,
  Sentry) for API latency, error rates, throughput, DB queries. Frontend
  performance monitoring (load times, delays, JS errors).
- **Blockchain Monitoring:** Starknet node health/responsiveness. Transaction
  success/failure rates. Gas prices. Specific contract events.
- **Security Monitoring:** Real-time monitoring for security events (failed
  logins, suspicious auth patterns, API abuse, cloud security alerts, anomalous
  tx patterns).
- **Logging:** Structured, centralized logging (FE, BE, SDK, contract events).
  Sufficient detail for debugging/security analysis.
- **Alerting:** Automated alerts for critical conditions (high errors, latency
  thresholds, resource exhaustion, unavailability, security events, contract
  errors, key process failures).

### 10.3. Maintenance Strategy

- **Regular Patching:** Process for applying security patches/updates (OS,
  containers, DBs, dependencies).
- **Dependency Management:** Actively manage/update libraries/frameworks.
- **Smart Contract Upgrades:** Formal, secure, tested process for deploying new
  contract versions (testnet testing, communication plan, authorized execution,
  post-upgrade monitoring).
- **Incident Response Plan:** Documented procedures for identifying, assessing,
  responding to, recovering from incidents.
- **Backup & Recovery Drills:** Regularly test backup/recovery procedures
  against RTO/RPO.

### 10.4. Potential Challenges & Risks (Testing, Monitoring, Maintenance)

- Complexity of setting up comprehensive E2E testing environments simulating
  Starknet/third-party interactions.
- Ensuring monitoring provides meaningful insights/alerts without excessive
  noise.
- Safely managing smart contract upgrades (storage compatibility, avoiding
  regressions/vulnerabilities).

**Testing Rigor:**

Given direct handling of financial assets and web/blockchain interplay, a
**rigorous, multi-faceted testing strategy is non-negotiable**. Testing must
cover security deeply (pen tests, audits), all auth/signing paths, performance
under load, and complex off-chain/on-chain interactions.

**Proactive Monitoring Focus:**

Monitoring must extend beyond standard web metrics, focusing intently on
**security events and Starknet interaction health**. Track compromised account
indicators, tx success/failure, gas usage anomalies, contract errors, abuse
patterns. Early detection is critical.

---

## XI. Conclusion

### 11.1. Summary of Requirements

This document outlines technical requirements for the Orbis Wallet,
covering:

- User-friendly **Frontend** (Root dApp, SDK prompts)
- Secure, scalable **Backend** (auth, APIs, state, potential co-signing)
- Sophisticated **Smart Contract** (AA, SNIP-6, multi-auth validation,
  upgradeability)
- Supporting **Database** and **Infrastructure** (incl. node access)
- Robust **Security** throughout
- Seamless **Integrations** (social, passkeys, SDK)
- Defined **Performance** targets

Critical dependencies and the link between off-chain auth and on-chain control
were emphasized.

### 11.2. Key Technical Challenges Revisited

- **Secure Multi-Authentication:** Complex, security-critical design for linking
  diverse auth methods to the on-chain account (`__validate__`, backend
  mapping). On-chain vs. backend attestation trade-offs.
- **Achieving Universal State:** Requires careful architecture prioritizing
  on-chain state and reliable sync mechanisms.
- **Transaction Signing Architecture:** Balancing security, decentralization,
  UX, complexity (AA vs. 2-Signer vs. MPC/TSS). Fundamental impact on trust
  model.
- **Developer SDK Design & Adoption:** Crucial for network effect; requires high
  quality, good DX, and developer relations effort.

### 11.3. Architectural Recommendations (High-Level)

- **Prioritize On-Chain Logic:** Use Account Contract for authoritative
  state/validation for universality.
- **Emphasize Security at the Seams:** Focus on interfaces connecting off-chain
  auth to on-chain control (mapping, `__validate__`, SDK prompts).
- **Invest Heavily in SDK Quality:** Treat SDK as a first-class product to
  maximize adoption.
- **Carefully Evaluate Signing Architecture:** Consciously weigh trade-offs (AA
  vs. 2-Signer vs. MPC/TSS) against goals. Consider starting simple (AA) and
  evolving.
- **Leverage Established Libraries:** Use audited libraries (FIDO2 server, Cairo
  crypto, OpenZeppelin components).

---

## Appendix

[^1]: Accounts - OpenZeppelin Docs, accessed April 14, 2025,
    https://docs.openzeppelin.com/contracts-cairo/0.14.0/accounts

[^2]: AW Frontier: The Ultimate Guide to Starknet's Full-Chain Games -
    ChainCatcher, accessed April 14, 2025,
    https://www.chaincatcher.com/en/article/2114963

[^3]: Controller Getting Started – Cartridge Documentation, accessed April 14,
    2025, https://docs.cartridge.gg/controller/getting-started

[^4]: Security architecture - Privy docs, accessed April 14, 2025,
    https://docs.privy.io/guide/server-wallets/architecture

[^5]: Overview - Privy docs, accessed April 14, 2025,
    https://docs.privy.io/guide/react/wallets/overview

[^6]: Wallets - Starknet React, accessed April 14, 2025,
    https://www.starknet-react.com/docs/wallets

[^7]: A Short Introduction to WebAuthn Authentication. - Auth0, accessed April
    14, 2025, https://auth0.com/blog/webauthn-a-short-introduction/

[^8]: WebAuthn - Wikipedia, accessed April 14, 2025,
    https://en.wikipedia.org/wiki/WebAuthn

[^9]: A guide on Starknet signatures - DEV Community, accessed April 14, 2025,
    https://dev.to/bastienfaivre/a-guide-on-starknet-signatures-a3m

[^10]: Introduction to server-side passkey implementation | Authentication ...,
    accessed April 14, 2025,
    https://developers.google.com/identity/passkeys/developer-guides/server-introduction

[^11]: Server wallets | Privy Docs, accessed April 14, 2025,
    https://docs.privy.io/guide/server-wallets/

[^12]: Security (MPC-TSS) - Particle Network docs, accessed April 14, 2025,
    https://developers.particle.network/landing/wallet-abstraction/waas/mpc-tss

[^13]: Why Multi-Signature Wallets Are Crucial for Blockchain Security ...,
    accessed April 14, 2025,
    https://builtin.com/articles/multi-signature-crypto-wallets

[^14]: How Bybit's multi-signature crypto wallet was compromised - Intelligent
    Tech Channels, accessed April 14, 2025,
    https://www.intelligenttechchannels.com/2025/03/06/how-bybits-multi-signature-crypto-wallet-was-compromised/

[^15]: What Is Threshold Signature Scheme (TSS) Wallet? - Web3 Universe,
    accessed April 14, 2025,
    https://web3universe.today/what-is-threshold-signature-scheme-tss-wallet/

[^16]: Embedded MPC Wallets for Payments Apps on Solana - Helius, accessed April
    14, 2025, https://www.helius.dev/blog/solana-mpc-wallet

[^17]: MPC Shamir Secret Sharing & Threshold Signature Scheme (TSS), accessed
    April 14, 2025,
    https://blog.web3auth.io/shamirs-secret-sharing-sss-vs-threshold-signature-scheme-tss-explained/

[^18]: What is an account? :: Starknet documentation, accessed April 14, 2025,
    https://docs.starknet.io/architecture-and-concepts/accounts/introduction/

[^19]: Account Contract Interface - - The Starknet Book, accessed April 14,
    2025, https://book.starknet.io/zh-cn/ch04-01-accounts.html

[^20]: Account Contract - Starknet by Example, accessed April 14, 2025,
    https://starknet-by-example.voyager.online/advanced-concepts/account_abstraction/account_contract/

[^21]: argent-contracts-starknet/docs/signers_and_signatures.md at main ...,
    accessed April 14, 2025,
    https://github.com/argentlabs/argent-contracts-starknet/blob/main/docs/signers_and_signatures.md

[^22]: Starknet's account interface, accessed April 14, 2025,
    https://docs.starknet.io/architecture-and-concepts/accounts/approach/

[^23]: Upgradeable Contract - Starknet by Example, accessed April 14, 2025,
    https://starknet-by-example.voyager.online/applications/upgradeable_contract/

[^24]: Upgradeability - The Cairo Programming Language, accessed April 14, 2025,
    https://book.cairo-lang.org/ch103-03-upgradeability.html

[^25]: Upgrades - Documentation - OpenZeppelin Docs, accessed April 14, 2025,
    https://docs.openzeppelin.com/contracts-cairo/0.12.0/upgrades

[^26]: Crypto Wallet Security Best Practices - Apriorit, accessed April 14,
    2025,
    https://www.apriorit.com/dev-blog/crypto-wallet-security-best-practices

[^27]: Login and authentication in 2023 explained — Passkeys, Google
    Authenticator, TouchID, accessed April 14, 2025,
    https://www.ory.sh/blog/overview-login-password-passkey-webauthn-totp-sso-faceid

[^28]: WebAuthn Passkey Smart Wallets - YouTube, accessed April 14, 2025,
    https://www.youtube.com/watch?v=QGUh6CjcNcA
