# Orbis Wallet Contracts on Starknet

This project is a fork of
[Argent Contracts for Starknet](https://github.com/argentlabs/argent-contracts-starknet.git)
under the GPL-3.0 license.

## Original Project

This codebase is derived from Argent's wallet contracts. The original
implementation and specification can be found at their GitHub repository:
[https://github.com/argentlabs/argent-contracts-starknet.git](https://github.com/argentlabs/argent-contracts-starknet.git)

## Specification

See [Argent Account](./docs/argent_account.md) and
[Argent Multisig](./docs/multisig.md) for more details on the original
implementation that this project builds upon.

## Deployments

Deployment artifacts are located in [/deployments/](./deployments/)

## Development

### Setup

We recommend you to install scarb through ASDF. Please refer to
[these instructions](https://docs.swmansion.com/scarb/download.html#install-via-asdf).\
Thanks to the [.tool-versions file](./.tool-versions), you don't need to install
a specific scarb or starknet foundry version. The correct one will be
automatically downloaded and installed.

## Test the contracts (Cairo)

```
scarb test
```

## Test the contracts (JavaScript)

### Install the devnet (run in project root folder)

You should have docker installed in your machine then you can start the devnet
by running the following command:

```shell
scarb run start-devnet
```

### Install JS dependencies

Install all packages:

```shell
yarn
```

Run all integration tests:

```shell
scarb run test-ts
```

Run single integration test file (need to run previous command first):

```shell
yarn mocha ./tests/accountEscape.test.ts
```

You also have access to the linter and a code formatter:

```shell
scarb run lint
scarb run format
```

### Contract fixtures

The [fixtures folder](./tests-integration/fixtures/) contains pre-compiled
contracts used for tests (both json and casm).

### Interface IDs

For compatibility reasons we support legacy interface IDs. But new interface IDs
will follow
[SNIP-5](https://github.com/starknet-io/SNIPs/blob/main/SNIPS/snip-5.md#how-interfaces-are-identified)
Tool to calculate interface IDs: https://github.com/ericnordelo/src5-rs

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0).

As a derivative work of Argent's contracts, it maintains the original GPL-3.0
license. This means any modifications or distributions of this code must also be
made available under the same license terms.
