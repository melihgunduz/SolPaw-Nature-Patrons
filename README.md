# SolPaw Nature Patrons

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Future Ideas](#future-ideas)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Run Project](#run-project)
- [Contributing](#contributing)

## Overview

SolPaw Nature Patrons is an eco-friendly NFT platform that leverages Solana technology to protect animals and the
environment. Donors become guardians of nature by contributing to a sustainable future through exclusive NFTs.

## Features

- Users can make donation defined collections about social responsibility.
- Users can got NFT's about related project.
- NFT creation costs paid by project.
- Responsive design.

## Future Ideas

- Creating an NFT tier system for any type of donors. With these tiers users could be able to reach different
  advantages.
- Users will got badge related donations.
- Users can create new collections about which social responsibility project about environment they want.
- NFT creation costs will be improved, system will refill itself.
- Mobile app support.

## Getting Started

1. Create a Solana network supported wallet. (We suggest you use Solflare)
2. Make sure you are using wallet in devnet (go to settings in your favorite wallet and then check your connected
   network status) and you have enough SOL for make donations and transaction fees. You can get
   devnet SOL
   from here: https://faucet.solana.com/
3. Follow these steps from https://docs.solanalabs.com/cli/wallets/paper to create local wallet for using in backend
   project. Define your wallet keypair in backend as we did (check .js files inside /backend/metaplex). And send some
   DEVNET SOL to this wallet.
4. Follow the steps below inside the projects to set up the whole project locally.

### Installation

1. Make sure you have installed Node in your computer. If it's not visit: https://nodejs.org/en/download/package-manager
   Check with:

```bash
  node -v
```

2. Clone the repository:

```bash
  git clone https://github.com/melihgunduz/SolPaw-Nature-Patrons.git
```

3. Navigate to the project directory:

```bash
  cd SolPaw-Nature-Patrons
```

4. Install dependencies

```bash
  npm install
```

- Also install dependencies for server.

```bash
  cd backend/config
  npm install
```

## Run Project

1. Run server in backend project.

```bash
  cd backend/config
  node server.js
```

2. Run app in frontend project. Open new terminal in main path of project and run

```bash
  npm run dev
```

## Contributing

Contributions to this project are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Make changes and test thoroughly.
4. Commit with clear and concise messages.
5. Push changes to your fork.
6. Submit a pull request describing your changes.
