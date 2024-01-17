---
outline: deep
---

# Staking / Unstaking

Follow these steps to begin staking on Zond testnet.

**General Flow**

1. Download and build the staking-deposit-cli and validator client
2. Generate new dilithium address and grab the seed. (also generates the files needed for step 4/5)
2. Import that seed into the zond accounts and record the public address. Write seed to file (without the `0x`).
3. Fund that address with minimum 40000 +gas for a single validator
4. transmit the Staking Deposit Transaction data
5. Start the validator client to begin staking

## Download and build the required staking tools

Download the validator client binary release for your distro in the [qrysm repository](https://github.com/theQRL/qrysm/releases/latest)

**OR**
Clone the [qrysm repository](https://github.com/theQRL/qrysm) locally and build the validator client. Ensure Golang v1.20 is available.

#### Windows 

```
git clone https://github.com/theQRL/qrysm.git
cd qrysm
go1.20 build -o=../validator.exe ./cmd/validator
go1.20 build -o=../staking-deposit-cli ./cmd/staking-deposit-cli/deposit
```

#### Linux / MacOS

```bash
git clone https://github.com/theQRL/qrysm.git
cd qrysm
gobrew use 1.20.12
go build -o=../validator ./cmd/validator
go build -o=../staking-deposit-cli ./cmd/staking-deposit-cli/deposit
cd ../
```

These binaries should live in the same directory as the main beacon and gzond binaries. 

## Generate a new dilithium staking address

Modify the number of validators based on the balance the new address will have. *Each validator requires minimum 40000 quanta to stake.*

```bash
./staking-deposit-cli new-seed --num-validators 1
```

Please note down your Dilithium seed, and write only it to file. Named `staking_wallet.seed` in the example below.

### Import new address seed for public key

```bash
./gzond-v0.1.0-linux-amd64 --datadir=gzonddata account import staking_wallet.seed 
```

Please note down your Public address (*given without the `0x` added to the front of the string*)

### Fund the new address

Provide the newly created address to the [Discord chat](https://theqrl.org/discord) for a testnet funds request.

Or if you already posses these funds in another address transfer them with the gzond console: 

```js
zond.sendTransaction({from:'0xFromZondAddress', to:'0xToZondAddress', value: web3.toWei(40001.0, "ether"), gas:21000});
```

### Broadcast the staking deposit transaction

```bash
./staking-deposit-cli submit --validator-keys-dir=./validator_keys --zond-seed-file= staking_wallet.seed
```

### Import validator wallet

```bash
./validator accounts import --keys-dir=validator_keys --wallet-dir gzonddata/keystore/
```

### Start the validator client to begin staking

```bash
./validator \
--datadir=validatordata \
--accept-terms-of-use \
--force-clear-db \
--chain-config-file=config.yml \
--config-file=config.yml \
--wallet-dir=wallet-dir
```

Upon successful connection you will see log files similar to:

```
[2024-01-17 19:36:11]  INFO validator: Validating for public key publicKey=0x6c6e1dc1a3f7
[2024-01-17 19:36:11]  INFO validator: Validator activated index=513 publicKey=0x6c6e1dc1a3f7
```

When the node validator becomes active you will see log files similar to:

```
[2024-01-17 07:33:15]  INFO validator: Attestation schedule attesterDutiesAtSlot=1 p
ubKeys=[0x6c6e1dc1a3f7] slot=4378 slotInEpoch=26 timeTillDuty=21m0s totalAttestersIn
Epoch=1
[2024-01-17 07:54:55]  INFO validator: Submitted new attestations AggregatorIndices=
[513] AttesterIndices=[513] BeaconBlockRoot=0xd64ceefa455e CommitteeIndex=0 Slot=437
8 SourceEpoch=33 SourceRoot=0x539e0750bcf6 TargetEpoch=34 TargetRoot=0xbb58ae7a93fa
```


You must have a running beacon client and gzond client opperating on the local host fully synced.