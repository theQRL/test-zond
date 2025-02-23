---
layout: doc
outline: deep
title: "Windows Install"
description: "This page contains instructions for installing the Zond Testnet #BUIDL Preview on Windows."

---


# {{ $frontmatter.title}}

{{ $frontmatter.description}}



# Setting up prerequisits

## 1. Setting up WSL 

First, issue the install command.

```
wsl --install
```

Restart your system (if WSL is installed first time)

Then, Install Ubuntu-22.04 (Note: Bazel, used in our Private testnet, uses Bazel, which doesn't work on 24.04 as of yet)

```
wsl --install Ubuntu-22.04 
wsl -d Ubuntu-22.04
```

Once in the command line, update

```
sudo apt-get update && sudo apt-get install build-essential
```

## 2. Installing prerequisites

This requires Docker, brew, yq


### Docker Install

```
sudo snap install docker yq
```

Setting up docker permission for non-root user

```
sudo addgroup docker
```

And reboot the subsystem image

```
reboot
```

After rebooting the subsystem image, add users to the group

```
sudo usermod -aG docker $USER
sudo usermod -aG docker root
```

And update the docker.sock user group

```
sudo chown root:docker /var/run/docker.sock
```

### Install yq

```
sudo snap install yq
```

### Install Bazel v6.3.2 (Instructions taken from https://bazel.build/install/ubuntu)

```
sudo apt install apt-transport-https curl gnupg -y
curl -fsSL https://bazel.build/bazel-release.pub.gpg | gpg --dearmor >bazel-archive-keyring.gpg
sudo mv bazel-archive-keyring.gpg /usr/share/keyrings
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/bazel-archive-keyring.gpg] https://storage.googleapis.com/bazel-apt stable jdk1.8" | sudo tee /etc/apt/sources.list.d/bazel.list
sudo apt update
sudo apt-get install bazel-6.3.2
```

### Install Kurtosis 

```
echo "deb [trusted=yes] https://apt.fury.io/kurtosis-tech/ /" | sudo tee /etc/apt/sources.list.d/kurtosis.list
sudo apt update
sudo apt install kurtosis-cli
```

# Getting the network up and running

## 1. Clone the repo & cd into it

```
git clone https://github.com/theQRL/qrysm -b dev && cd qrysm
```

## 2. Running & testing the local Local Private Network

You can easily start and stop the local network by executing the following scripts

To start

```
bash ./scripts/local_testnet/start_local_testnet.sh
```

To stop
```
bash ./scripts/local_testnet/start_local_testnet.sh
```

To test the private test network (replace the MAPPED_PORT in the following with port that is mapped to 8545 that you see after running previous step which is Step 2. Start the private test network).

```
curl http://127.0.0.1:MAPPED_PORT/   -X POST   -H "Content-Type: application/json"   --data '{"method":"zond_getBlockByNumber","params":["latest", false],"id":1,"jsonrpc":"2.0"}' | jq -e
```

:::info PRO-Tip:

If you want to easily see what ports are mapped to 8545 you can use this command
```bash
docker ps --format '{{.Ports}}' | grep 8545 | sed 's/0.0.0.0://g'
```
:::

## 3. PreMined Coins or Funding Accounts at Genesis

```
cd qrysm
nano scripts/local_testnet/network_params.yaml
```

In the yaml, under prefunded_accounts:

Add your Zond address with balance and restart the network

Once you restarted your network you can check the balance by the following command, (Replace MAPPED_PORT by the local mapped port for 8545 and YOUR_ADDRESS with the Zond address that you added in previous step)

```
curl -H "Content-Type: application/json" -X POST localhost:MAPPED_PORT --data '{"jsonrpc":"2.0","method":"zond_getBalance","params":["YOUR_ADDRESS", "latest"],"id":1}'
```