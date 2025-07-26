---
layout: doc
outline: deep
title: "Private Zond Network with Kurtosis "
description: ""
---

# {{ $frontmatter.title}}


The QRL project Zond testnet can be setup in a local private network allowing developers looking to develop a dApp, roll-ups, L2's, bridges, multi-chain relay etc. full control of the testing environment and all of the ancillary services related.

This guide and accompanying [Private Network installation docs](/testnet/install/private-network) will help you setup fully functional test environment, consisting of execution layer `GZond` nodes, consensus `Qrysm` clients and validators, all using Kurtosis in a stand alone private network tailored to your needs.  

## Prerequisites 

The following assumes that you have followed the guide to run a [Private QRL Network](/testnet/install/private-network) and have a functional Kurtosis and docker install. 

:::info Run On Kubernetes
The Kurtosis Zond package will also work the same way over on Kubernetes. More information can be found in the [QRL zond-package GitHub docs](https://github.com/theQRL/zond-package?tab=readme-ov-file#run-on-kubernetes)
:::

## QRL Zond-Package Info

Built from the great work over at kurtosis.com the QRL `zond-package` will spin up a private Zond testnet using Docker or Kubernetes with multi-client support, Flashbot's mev-boost infrastructure for PBS-related testing/validation, and other useful network tools (*transaction spammer, monitoring tools, etc.*). Kurtosis packages are entirely reproducible and composable, so this will work the same way over Docker or Kubernetes, in the cloud or locally on your machine.

This gives the ability to control the development environment without external complications. Designed to be used for testing, validation and development of QRL project Zond clients and software, and is not intended for production use.

### Defaults and Initial Settings

Running the `start_local_testnet.sh` will generate all of the necessary genesis information, build and bootstrap a network of QRL project Zond nodes

1. Generate Execution Layer (EL) & Consensus Layer (CL) genesis information using [the Zond genesis generator](https://github.com/theQRL/zond-genesis-generator).
2. Configure & bootstrap a network of Zond nodes of *n* size using the genesis data generated above
3. Spin up a [transaction spammer](https://github.com/MariusVanDerWijden/tx-fuzz) to send fake transactions to the network
4. Spin up and connect a [testnet verifier](https://github.com/ethereum/merge-testnet-verifier)
5. Spin up a Grafana and Prometheus instance to observe the network

Additionally, there are optional features that can be enabled bringing further functionality. These are enabled via flags or parameter files at runtime.

- Block until the Beacon nodes finalize an epoch (i.e. finalized_epoch > 0)
- Spin up & configure parameters for the infrastructure behind Flashbot's implementation of PBS using `mev-boost`, in either `full` or `mock` mode. More details [here](https://github.com/theQRL/zond-package/?tab=readme-ov-file#proposer-builder-separation-pbs-emulation).
- Spin up & connect the network to a [beacon metrics gazer service](https://github.com/dapplion/beacon-metrics-gazer) to collect network-wide participation metrics.
- Spin up and connect a [JSON RPC Snooper](https://github.com/ethDreamer/json_rpc_snoop) to the network log responses & requests between the EL engine API and the CL client.
- Specify extra parameters to be passed in for any of the: CL client Beacon, and CL client validator, and/or EL client containers
- Specify the required parameters for the nodes to reach an external block building network
- Generate keystores for each node in parallel

#### Node Containers

When deploying the QRL zond-package by default you will spin up and deploy an enclave locally containing 2 of each:

- Execution Layer Nodes (`el-#-gzond-qrysm`)
- Consensus Layer Nodes (` cl-#-qrysm-gzond`)
- Validation enabled Consensus Nodes (`vc-#-gzond-qrysm `)  

:::info 
This behavior can be configured in the `network_params.yaml` file under `participants.count` which default is set to 2.
:::


## Logging

Each node container has internal logs that can be access using the Kurtosis cli. 

You will need the service name and information to pass to the cli.

### Print Running Services

To print the active running services in the enclave, use the following command, ensuring the network name matches your local environment (*defaults to `local-testnet`*)

```bash
kurtosis enclave inspect local-testnet
```
:::details Example Output

```bash
fr1t2@qrl-node-1:~$ kurtosis enclave inspect local-testnet
Name:            local-testnet
UUID:            220a9b86bb73
Status:          RUNNING
Creation Time:   Fri, 25 Jul 2025 06:39:06 MDT
Flags:

========================================= Files Artifacts =========================================
UUID           Name
3ffcdc3d7520   1-qrysm-gzond-0-63
5aa297072851   2-qrysm-gzond-64-127
2141c67b8c24   el_cl_genesis_data
6aeb5a7cafcf   final-genesis-timestamp
6a761a3e555f   genesis-el-cl-env-file
34d3846e9be7   jwt_file
0b90a6ac3842   keymanager_file
4bb996b882a0   qrysm-password
cce61740d239   validator-ranges

========================================== User Services ==========================================
UUID           Name                                             Ports                                         Status
f3249da5cd1f   cl-1-qrysm-gzond                                 http: 3500/tcp -> http://127.0.0.1:32784      RUNNING
                                                                metrics: 8080/tcp -> http://127.0.0.1:32787
                                                                profiling: 6060/tcp -> 127.0.0.1:32786
                                                                rpc: 4000/tcp -> 127.0.0.1:32785
                                                                tcp-discovery: 13000/tcp -> 127.0.0.1:32788
                                                                udp-discovery: 12000/udp -> 127.0.0.1:32770
1dd98046504b   cl-2-qrysm-gzond                                 http: 3500/tcp -> http://127.0.0.1:32789      RUNNING
                                                                metrics: 8080/tcp -> http://127.0.0.1:32792
                                                                profiling: 6060/tcp -> 127.0.0.1:32791
                                                                rpc: 4000/tcp -> 127.0.0.1:32790
                                                                tcp-discovery: 13000/tcp -> 127.0.0.1:32793
                                                                udp-discovery: 12000/udp -> 127.0.0.1:32771
355566e78113   el-1-gzond-qrysm                                 engine-rpc: 8551/tcp -> 127.0.0.1:32776       RUNNING
                                                                metrics: 9001/tcp -> http://127.0.0.1:32777
                                                                rpc: 8545/tcp -> 127.0.0.1:32774
                                                                tcp-discovery: 30303/tcp -> 127.0.0.1:32778
                                                                udp-discovery: 30303/udp -> 127.0.0.1:32768
                                                                ws: 8546/tcp -> 127.0.0.1:32775
9924787dbaa9   el-2-gzond-qrysm                                 engine-rpc: 8551/tcp -> 127.0.0.1:32781       RUNNING
                                                                metrics: 9001/tcp -> http://127.0.0.1:32782
                                                                rpc: 8545/tcp -> 127.0.0.1:32779
                                                                tcp-discovery: 30303/tcp -> 127.0.0.1:32783
                                                                udp-discovery: 30303/udp -> 127.0.0.1:32769
                                                                ws: 8546/tcp -> 127.0.0.1:32780
99eff6cbb5c4   validator-key-generation-cl-validator-keystore   <none>                                        RUNNING
f2241347254b   vc-1-gzond-qrysm                                 metrics: 8080/tcp -> http://127.0.0.1:32794   RUNNING
7485bdadc86f   vc-2-gzond-qrysm                                 metrics: 8080/tcp -> http://127.0.0.1:32795   RUNNING
```
:::

### Print Logs from Running Service

From the example output above, running the `kurtosis enclave inspect local-testnet` command shows us the name of all running services. To gather logs from these services we will use the Kurtosis `service logs` command.

You will need to insert the name from the service you wish to view for `$SERVICE_NAME` in the command below.

```bash
kurtosis service logs local-testnet $SERVICE_NAME
```

For example, to print the logs from the execution layer node #1:

```bash
kurtosis service logs local-testnet el-1-gzond-qrysm
```
:::details Example log output

```bash
[el-1-gzond-qrysm] INFO [07-25|21:37:56.059] Imported new potential chain segment     number=538 hash=cbdc41..a3e240 blocks=1 txs=0 mgas=0.000 elapsed=1.658ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:37:56.137] Chain head was updated                   number=538 hash=cbdc41..a3e240 root=9fa53c..96e241 elapsed=1.301833ms
[el-1-gzond-qrysm] INFO [07-25|21:37:56.138] Starting work on payload                 id=0xea80b5543c763835
[el-1-gzond-qrysm] INFO [07-25|21:37:56.138] Updated payload                          id=0xea80b5543c763835 number=539 hash=5de6a4..43a040 txs=0 withdrawals=0 gas=0 fees=0 root=9fa53c..96e241 elapsed="103.171µs"
[el-1-gzond-qrysm] INFO [07-25|21:38:05.776] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:38:15.791] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:38:25.808] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:38:35.826] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:38:45.842] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:38:55.859] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:38:56.051] Stopping work on payload                 id=0xea80b5543c763835 reason=delivery
[el-1-gzond-qrysm] INFO [07-25|21:38:56.082] Imported new potential chain segment     number=539 hash=5de6a4..43a040 blocks=1 txs=0 mgas=0.000 elapsed=1.872ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:38:56.157] Chain head was updated                   number=539 hash=5de6a4..43a040 root=9fa53c..96e241 elapsed=1.239373ms
[el-1-gzond-qrysm] INFO [07-25|21:39:05.875] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:39:15.891] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:39:24.809] Regenerated local transaction journal    transactions=0 accounts=0
[el-1-gzond-qrysm] INFO [07-25|21:39:25.905] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:39:35.921] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:39:45.938] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:39:55.952] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:39:56.086] Imported new potential chain segment     number=540 hash=0112b3..650d8f blocks=1 txs=0 mgas=0.000 elapsed=1.587ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:39:56.116] Chain head was updated                   number=540 hash=0112b3..650d8f root=9fa53c..96e241 elapsed=1.28824ms
[el-1-gzond-qrysm] INFO [07-25|21:39:56.118] Starting work on payload                 id=0xf1345bff5c8efc1b
[el-1-gzond-qrysm] INFO [07-25|21:39:56.119] Updated payload                          id=0xf1345bff5c8efc1b number=541 hash=b37c2f..930770 txs=0 withdrawals=0 gas=0 fees=0 root=9fa53c..96e241 elapsed="32.687µs"
[el-1-gzond-qrysm] INFO [07-25|21:40:05.966] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:40:15.985] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:40:25.998] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:40:36.014] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:40:46.031] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:40:56.032] Stopping work on payload                 id=0xf1345bff5c8efc1b reason=delivery
[el-1-gzond-qrysm] INFO [07-25|21:40:56.046] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:40:56.064] Imported new potential chain segment     number=541 hash=b37c2f..930770 blocks=1 txs=0 mgas=0.000 elapsed=1.820ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:40:56.148] Chain head was updated                   number=541 hash=b37c2f..930770 root=9fa53c..96e241 elapsed=1.71938ms
[el-1-gzond-qrysm] INFO [07-25|21:41:06.060] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:41:16.076] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:41:26.090] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:41:36.105] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:41:46.118] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:41:56.080] Imported new potential chain segment     number=542 hash=8ef2d8..41133d blocks=1 txs=0 mgas=0.000 elapsed=1.484ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:41:56.103] Chain head was updated                   number=542 hash=8ef2d8..41133d root=9fa53c..96e241 elapsed=1.5057ms
[el-1-gzond-qrysm] INFO [07-25|21:41:56.105] Starting work on payload                 id=0x14a8cc731ceac302
[el-1-gzond-qrysm] INFO [07-25|21:41:56.105] Updated payload                          id=0x14a8cc731ceac302 number=543 hash=64d56b..d53475 txs=0 withdrawals=0 gas=0 fees=0 root=9fa53c..96e241 elapsed="81.433µs"
[el-1-gzond-qrysm] INFO [07-25|21:41:56.133] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:42:06.150] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:42:16.169] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:42:26.187] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:42:36.204] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:42:46.220] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:42:56.024] Stopping work on payload                 id=0x14a8cc731ceac302 reason=delivery
[el-1-gzond-qrysm] INFO [07-25|21:42:56.055] Imported new potential chain segment     number=543 hash=64d56b..d53475 blocks=1 txs=0 mgas=0.000 elapsed=1.375ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:42:56.127] Chain head was updated                   number=543 hash=64d56b..d53475 root=9fa53c..96e241 elapsed=1.459538ms
[el-1-gzond-qrysm] INFO [07-25|21:42:56.129] Starting work on payload                 id=0xc2c575e0597980bb
[el-1-gzond-qrysm] INFO [07-25|21:42:56.129] Updated payload                          id=0xc2c575e0597980bb number=544 hash=9c6cfc..23fba0 txs=0 withdrawals=0 gas=0 fees=0 root=9fa53c..96e241 elapsed="43.359µs"
[el-1-gzond-qrysm] INFO [07-25|21:42:56.234] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:43:06.251] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:43:16.264] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:43:26.281] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:43:36.294] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:43:46.310] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:43:56.037] Stopping work on payload                 id=0xc2c575e0597980bb reason=delivery
[el-1-gzond-qrysm] INFO [07-25|21:43:56.069] Imported new potential chain segment     number=544 hash=9c6cfc..23fba0 blocks=1 txs=0 mgas=0.000 elapsed=1.847ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:43:56.143] Chain head was updated                   number=544 hash=9c6cfc..23fba0 root=9fa53c..96e241 elapsed=1.373018ms
[el-1-gzond-qrysm] INFO [07-25|21:43:56.325] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:44:06.341] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:44:16.356] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:44:26.372] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:44:36.387] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:44:46.403] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:44:56.082] Imported new potential chain segment     number=545 hash=ab4ba0..3462df blocks=1 txs=0 mgas=0.000 elapsed=1.634ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:44:56.107] Chain head was updated                   number=545 hash=ab4ba0..3462df root=9fa53c..96e241 elapsed=1.307494ms
[el-1-gzond-qrysm] INFO [07-25|21:44:56.110] Starting work on payload                 id=0x44c1d4acec759082
[el-1-gzond-qrysm] INFO [07-25|21:44:56.110] Updated payload                          id=0x44c1d4acec759082 number=546 hash=73686e..965ec5 txs=0 withdrawals=0 gas=0 fees=0 root=9fa53c..96e241 elapsed="63.058µs"
[el-1-gzond-qrysm] INFO [07-25|21:44:56.420] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:45:06.437] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:45:16.453] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:45:26.470] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:45:36.485] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:45:46.500] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:45:56.031] Stopping work on payload                 id=0x44c1d4acec759082 reason=delivery
[el-1-gzond-qrysm] INFO [07-25|21:45:56.066] Imported new potential chain segment     number=546 hash=73686e..965ec5 blocks=1 txs=0 mgas=0.000 elapsed=3.003ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:45:56.141] Chain head was updated                   number=546 hash=73686e..965ec5 root=9fa53c..96e241 elapsed=1.162419ms
[el-1-gzond-qrysm] INFO [07-25|21:45:56.142] Starting work on payload                 id=0x36765fa50f0d8bf0
[el-1-gzond-qrysm] INFO [07-25|21:45:56.143] Updated payload                          id=0x36765fa50f0d8bf0 number=547 hash=9108e6..6d6fb3 txs=0 withdrawals=0 gas=0 fees=0 root=9fa53c..96e241 elapsed="45.968µs"
[el-1-gzond-qrysm] INFO [07-25|21:45:56.518] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:46:06.532] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:46:16.547] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:46:26.565] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:46:36.579] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:46:46.595] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:46:56.044] Stopping work on payload                 id=0x36765fa50f0d8bf0 reason=delivery
[el-1-gzond-qrysm] INFO [07-25|21:46:56.076] Imported new potential chain segment     number=547 hash=9108e6..6d6fb3 blocks=1 txs=0 mgas=0.000 elapsed=2.694ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:46:56.152] Chain head was updated                   number=547 hash=9108e6..6d6fb3 root=9fa53c..96e241 elapsed=1.069959ms
[el-1-gzond-qrysm] INFO [07-25|21:46:56.609] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:47:06.624] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:47:16.641] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:47:26.655] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:47:36.674] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:47:46.689] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:47:56.073] Imported new potential chain segment     number=548 hash=ec175e..70e8d4 blocks=1 txs=0 mgas=0.000 elapsed=1.651ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:47:56.102] Chain head was updated                   number=548 hash=ec175e..70e8d4 root=9fa53c..96e241 elapsed=2.501146ms
[el-1-gzond-qrysm] INFO [07-25|21:47:56.707] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:48:06.721] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:48:16.734] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:48:26.751] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:48:36.768] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:48:46.784] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:48:56.070] Imported new potential chain segment     number=549 hash=7113c5..e028ee blocks=1 txs=0 mgas=0.000 elapsed=2.229ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:48:56.093] Chain head was updated                   number=549 hash=7113c5..e028ee root=9fa53c..96e241 elapsed=1.334577ms
[el-1-gzond-qrysm] INFO [07-25|21:48:56.801] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:49:06.818] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:49:16.835] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:49:26.852] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:49:36.867] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:49:46.881] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:49:56.085] Imported new potential chain segment     number=550 hash=5ac713..87b19a blocks=1 txs=0 mgas=0.000 elapsed=2.012ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:49:56.109] Chain head was updated                   number=550 hash=5ac713..87b19a root=9fa53c..96e241 elapsed=1.629525ms
[el-1-gzond-qrysm] INFO [07-25|21:49:56.897] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:50:06.913] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:50:16.930] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:50:26.946] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:50:36.962] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:50:46.977] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:50:56.083] Imported new potential chain segment     number=551 hash=cdf1e8..2702ac blocks=1 txs=0 mgas=0.000 elapsed=1.700ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:50:56.118] Chain head was updated                   number=551 hash=cdf1e8..2702ac root=9fa53c..96e241 elapsed=1.326853ms
[el-1-gzond-qrysm] INFO [07-25|21:50:56.990] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:51:07.006] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:51:17.021] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:51:27.037] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:51:37.052] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:51:47.067] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:51:56.084] Imported new potential chain segment     number=552 hash=6afcca..17b27a blocks=1 txs=0 mgas=0.000 elapsed=2.063ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:51:56.110] Chain head was updated                   number=552 hash=6afcca..17b27a root=9fa53c..96e241 elapsed=2.616012ms
[el-1-gzond-qrysm] INFO [07-25|21:51:56.112] Starting work on payload                 id=0x29e46403ad8aa8bb
[el-1-gzond-qrysm] INFO [07-25|21:51:56.112] Updated payload                          id=0x29e46403ad8aa8bb number=553 hash=1ab502..bc16e1 txs=0 withdrawals=0 gas=0 fees=0 root=9fa53c..96e241 elapsed="51.901µs"
[el-1-gzond-qrysm] INFO [07-25|21:51:57.083] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:52:07.096] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:52:17.109] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:52:27.123] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:52:37.140] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:52:47.154] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:52:56.027] Stopping work on payload                 id=0x29e46403ad8aa8bb reason=delivery
[el-1-gzond-qrysm] INFO [07-25|21:52:56.067] Imported new potential chain segment     number=553 hash=1ab502..bc16e1 blocks=1 txs=0 mgas=0.000 elapsed=2.485ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:52:56.141] Chain head was updated                   number=553 hash=1ab502..bc16e1 root=9fa53c..96e241 elapsed=1.206007ms
[el-1-gzond-qrysm] INFO [07-25|21:52:57.170] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:53:07.184] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:53:17.200] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:53:27.216] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:53:37.232] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:53:47.249] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:53:56.079] Imported new potential chain segment     number=554 hash=47e385..e7abd5 blocks=1 txs=0 mgas=0.000 elapsed=1.524ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:53:56.107] Chain head was updated                   number=554 hash=47e385..e7abd5 root=9fa53c..96e241 elapsed=1.213167ms
[el-1-gzond-qrysm] INFO [07-25|21:53:56.109] Starting work on payload                 id=0x038f3934a7b63b22
[el-1-gzond-qrysm] INFO [07-25|21:53:56.110] Updated payload                          id=0x038f3934a7b63b22 number=555 hash=aa34eb..4ce004 txs=0 withdrawals=0 gas=0 fees=0 root=9fa53c..96e241 elapsed="36.356µs"
[el-1-gzond-qrysm] INFO [07-25|21:53:57.265] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:54:07.279] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:54:17.294] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:54:27.309] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:54:37.326] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:54:47.342] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:54:56.038] Stopping work on payload                 id=0x038f3934a7b63b22 reason=delivery
[el-1-gzond-qrysm] INFO [07-25|21:54:56.072] Imported new potential chain segment     number=555 hash=aa34eb..4ce004 blocks=1 txs=0 mgas=0.000 elapsed=4.063ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:54:56.143] Chain head was updated                   number=555 hash=aa34eb..4ce004 root=9fa53c..96e241 elapsed=1.076557ms
[el-1-gzond-qrysm] INFO [07-25|21:54:57.355] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:55:07.369] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:55:17.384] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:55:27.403] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:55:37.419] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:55:47.435] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:55:56.072] Imported new potential chain segment     number=556 hash=89fc6e..99f184 blocks=1 txs=0 mgas=0.000 elapsed=1.899ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:55:56.101] Chain head was updated                   number=556 hash=89fc6e..99f184 root=9fa53c..96e241 elapsed=1.263273ms
[el-1-gzond-qrysm] INFO [07-25|21:55:56.102] Starting work on payload                 id=0xd86a58d32bd49125
[el-1-gzond-qrysm] INFO [07-25|21:55:56.103] Updated payload                          id=0xd86a58d32bd49125 number=557 hash=ef68f1..e8909b txs=0 withdrawals=0 gas=0 fees=0 root=9fa53c..96e241 elapsed="32.977µs"
[el-1-gzond-qrysm] INFO [07-25|21:55:57.450] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:56:07.466] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:56:17.483] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:56:27.498] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:56:37.512] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:56:47.526] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:56:56.042] Stopping work on payload                 id=0xd86a58d32bd49125 reason=delivery
[el-1-gzond-qrysm] INFO [07-25|21:56:56.074] Imported new potential chain segment     number=557 hash=ef68f1..e8909b blocks=1 txs=0 mgas=0.000 elapsed=1.490ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:56:56.148] Chain head was updated                   number=557 hash=ef68f1..e8909b root=9fa53c..96e241 elapsed=1.31688ms
[el-1-gzond-qrysm] INFO [07-25|21:56:56.150] Starting work on payload                 id=0x4c090122ae94a866
[el-1-gzond-qrysm] INFO [07-25|21:56:56.150] Updated payload                          id=0x4c090122ae94a866 number=558 hash=65204c..0776e3 txs=0 withdrawals=0 gas=0 fees=0 root=9fa53c..96e241 elapsed="54.115µs"
[el-1-gzond-qrysm] INFO [07-25|21:56:57.542] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:57:07.561] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:57:17.579] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:57:27.597] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:57:37.612] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:57:47.627] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:57:56.036] Stopping work on payload                 id=0x4c090122ae94a866 reason=delivery
[el-1-gzond-qrysm] INFO [07-25|21:57:56.067] Imported new potential chain segment     number=558 hash=65204c..0776e3 blocks=1 txs=0 mgas=0.000 elapsed=1.453ms     mgasps=0.000 triedirty=0.00B
[el-1-gzond-qrysm] INFO [07-25|21:57:56.141] Chain head was updated                   number=558 hash=65204c..0776e3 root=9fa53c..96e241 elapsed=1.262366ms
[el-1-gzond-qrysm] INFO [07-25|21:57:56.143] Starting work on payload                 id=0x53af3ba1d984e47a
[el-1-gzond-qrysm] INFO [07-25|21:57:56.143] Updated payload                          id=0x53af3ba1d984e47a number=559 hash=beab74..64fc22 txs=0 withdrawals=0 gas=0 fees=0 root=9fa53c..96e241 elapsed="87.412µs"
[el-1-gzond-qrysm] INFO [07-25|21:57:57.643] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:58:07.658] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:58:17.678] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:58:27.693] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:58:37.708] Looking for peers                        peercount=1 tried=0 static=0
[el-1-gzond-qrysm] INFO [07-25|21:58:47.724] Looking for peers                        peercount=1 tried=0 static=0
```

:::

### Dump all Logs

To retrieve all logs from the Kurtosis engine you can use the command:

```bash
kurtosis dump $OUTPUT_DIRECTORY
```

This will create a folder named `$OUTPUT_DIRECTORY` in the present working directory that contains all logs and other information. 

You will get the container logs & configuration in the output directory for further analysis & sharing. This would contain all engines & enclaves.

If you don't specify the `$OUTPUT_DIRECTORY` Kurtosis will dump it to a directory with a name following the schema `kurtosis-dump--TIMESTAMP`


## Configuration

The defaults can be configured by passing values to the command line at execution or via the configuration file. 

:::info
Stop the private network and rebuild anytime you make changes to the configuration file.

:::

### network_params.yaml

The `qrysm/scripts/local_testnet
/network_params.yaml` file manages the setup of the private network and is referenced when launching nodes and connecting network components together.

Modify this file before launching the `start_lical_testnet.sh` script to pick up the changes. You can also launch the script with the `-n $NETWORK_PARAMS_YAML` file where `$NETWORK_PARAMS_YAML` is your custom configuration. 

```bash
# Full configuration reference [here](https://github.com/theQRL/zond-package?tab=readme-ov-file#configuration).
participants:
  - el_type: gzond
    el_image: qrledger/go-zond:stable
    cl_type: qrysm
    cl_image: qrledger/qrysm:beacon-chain-latest
    # local build
    # cl_image: theqrl-dev/qrysm-beacon-chain:latest
    vc_type: qrysm
    vc_image: qrledger/qrysm:validator-latest
    # local build
    # vc_image: theqrl-dev/qrysm-validator:latest
    count: 2
    # use_remote_signer: true
    # remote_signer_type: clef
network_params:
  preset: "mainnet"
  prefunded_accounts: '{"Z25941dC771bB64514Fc8abBce970307Fb9d477e9": {"balance": "10ETH"}, "Z4107be99052d895e3ee461C685b042Aa975ab5c0": {"balance": "1ETH"}, "Z2099d76d9a34cdd2694c4dc703930a6fbbc1d402": {"balance": "2000000ETH"}, "Z2018DcfF6a42061E4203d3b8cbF48E9B890Cbdf2": {"balance": "2000000ETH"}}'

# global_log_level: debug

# additional_services:
#  - full_beaconchain_explorer
#  - tx_spammer

# tx_spammer_params:
#   image: qrledger/zond-tx-spammer:latest
#   scenario: eoatx
#   throughput: 100
#   max_pending: 100
#   max_wallets: 50
#   tx_spammer_extra_args: []
```


:::details full network_params.yaml configuration file

```bash
# Specification of the participants in the network
participants:
  # EL(Execution Layer) Specific flags
    # The type of EL client that should be started
    # Valid values are gzond
  - el_type: gzond

    # The Docker image that should be used for the EL client; leave blank to use the default for the client type
    # Defaults by client:
    # - gzond: qrledger/go-zond:stable
    el_image: ""

    # The log level string that this participant's EL client should log at
    # If this is emptystring then the global `logLevel` parameter's value will be translated into a string appropriate for the client (e.g. if
    # global `logLevel` = `info` then Gzond would receive `3`)
    # If this is not emptystring, then this value will override the global `logLevel` setting to allow for fine-grained control
    # over a specific participant's logging
    el_log_level: ""

    # A list of optional extra env_vars the el container should spin up with
    el_extra_env_vars: {}

    # A list of optional extra labels the el container should spin up with
    # Example; el_extra_labels: {"zond-package.partition": "1"}
    el_extra_labels: {}

    # A list of optional extra params that will be passed to the EL client container for modifying its behaviour
    el_extra_params: []

    # A list of tolerations that will be passed to the EL client container
    # Only works with Kubernetes
    # Example: el_tolerations:
    # - key: "key"
    #   operator: "Equal"
    #   value: "value"
    #   effect: "NoSchedule"
    #   toleration_seconds: 3600
    # Defaults to empty
    el_tolerations: []

    # Persistent storage size for the EL client container (in MB)
    # Defaults to 0, which means that the default size for the client will be used
    # Default values can be found in /src/package_io/constants.star VOLUME_SIZE
    el_volume_size: 0

    # Resource management for el containers
    # CPU is milicores
    # RAM is in MB
    # Defaults to 0, which results in no resource limits
    el_min_cpu: 0
    el_max_cpu: 0
    el_min_mem: 0
    el_max_mem: 0

  # CL(Consensus Layer) Specific flags
    # The type of CL client that should be started
    # Valid values are qrysm
    cl_type: qrysm

    # The Docker image that should be used for the CL client; leave blank to use the default for the client type
    # Defaults by client:
    # - qrysm: qrledger/qrysm:beacon-chain-latest
    cl_image: ""

    # The log level string that this participant's CL client should log at
    # If this is emptystring then the global `logLevel` parameter's value will be translated into a string appropriate for the client (e.g. if
    # global `logLevel` = `info` then Qrysm would receive `info`, etc.)
    # If this is not emptystring, then this value will override the global `logLevel` setting to allow for fine-grained control
    # over a specific participant's logging
    cl_log_level: ""

    # A list of optional extra env_vars the cl container should spin up with
    cl_extra_env_vars: {}

    # A list of optional extra labels that will be passed to the CL client Beacon container.
    # Example; cl_extra_labels: {"zond-package.partition": "1"}
    cl_extra_labels: {}

    # A list of optional extra params that will be passed to the CL client Beacon container for modifying its behaviour
    # If the client combines the Beacon & validator nodes, then this list will be passed to the combined Beacon-validator node
    cl_extra_params: []

    # A list of tolerations that will be passed to the CL client container
    # Only works with Kubernetes
    # Example: el_tolerations:
    # - key: "key"
    #   operator: "Equal"
    #   value: "value"
    #   effect: "NoSchedule"
    #   toleration_seconds: 3600
    # Defaults to empty
    cl_tolerations: []

    # Persistent storage size for the CL client container (in MB)
    # Defaults to 0, which means that the default size for the client will be used
    # Default values can be found in /src/package_io/constants.star VOLUME_SIZE
    cl_volume_size: 0

    # Resource management for cl containers
    # CPU is milicores
    # RAM is in MB
    # Defaults to 0, which results in no resource limits
    cl_min_cpu: 0
    cl_max_cpu: 0
    cl_min_mem: 0
    cl_max_mem: 0

    # Whether to act as a supernode for the network
    # Supernodes will subscribe to all subnet topics
    # This flag should only be used with peerdas
    # Defaults to false
    supernode: false

    # Whether to use a separate validator client attached to the CL client.
    # Defaults to false for clients that can run both in one process
    use_separate_vc: true

  # VC (Validator Client) Specific flags
    # The type of validator client that should be used
    # Valid values are qrysm
    # ( The qrysm validator only works with a qrysm CL client )
    # Defaults to matching the chosen CL client (cl_type)
    vc_type: ""

    # The Docker image that should be used for the separate validator client
    # Defaults by client:
    # - qrysm: qrledger/qrysm:validator-latest
    vc_image: ""

    # The log level string that this participant's validator client should log at
    # If this is emptystring then the global `logLevel` parameter's value will be translated into a string appropriate for the client (e.g. if
    # global `logLevel` = `info` then Qrysm would receive `info`, etc.)
    # If this is not emptystring, then this value will override the global `logLevel` setting to allow for fine-grained control
    # over a specific participant's logging
    vc_log_level: ""

    # A list of optional extra env_vars the vc container should spin up with
    vc_extra_env_vars: {}

    # A list of optional extra labels that will be passed to the validator client validator container.
    # Example; vc_extra_labels: {"zond-package.partition": "1"}
    vc_extra_labels: {}

    # A list of optional extra params that will be passed to the validator client container for modifying its behaviour
    # If the client combines the Beacon & validator nodes, then this list will also be passed to the combined Beacon-validator node
    vc_extra_params: []

    # A list of tolerations that will be passed to the validator container
    # Only works with Kubernetes
    # Example: el_tolerations:
    # - key: "key"
    #   operator: "Equal"
    #   value: "value"
    #   effect: "NoSchedule"
    #   toleration_seconds: 3600
    # Defaults to empty
    vc_tolerations: []

    # Resource management for vc containers
    # CPU is milicores
    # RAM is in MB
    # Defaults to 0, which results in no resource limits
    vc_min_cpu: 0
    vc_max_cpu: 0
    vc_min_mem: 0
    vc_max_mem: 0

    # Count of the number of validators you want to run for a given participant
    # Default to null, which means that the number of validators will be using the
    # network parameter num_validator_keys_per_node
    validator_count: null

    # Whether to use a remote signer instead of the vc directly handling keys
    # Defaults to false
    use_remote_signer: false

  # Remote signer Specific flags
    # The type of remote signer that should be used
    # Valid values are web3signer, clef
    # Defaults to clef
    remote_signer_type: "clef"

    # The Docker image that should be used for the remote signer
    # Defaults to "qrledger/go-zond:alltools-stable"
    remote_signer_image: "qrledger/go-zond:alltools-stable"

    # A list of optional extra env_vars the remote signer container should spin up with
    remote_signer_extra_env_vars: {}

    # A list of optional extra labels that will be passed to the remote signer container.
    # Example; remote_signer_extra_labels: {"zond-package.partition": "1"}
    remote_signer_extra_labels: {}

    # A list of optional extra params that will be passed to the remote signer container for modifying its behaviour
    remote_signer_extra_params: []

    # A list of tolerations that will be passed to the remote signer container
    # Only works with Kubernetes
    # Example: remote_signer_tolerations:
    # - key: "key"
    #   operator: "Equal"
    #   value: "value"
    #   effect: "NoSchedule"
    #   toleration_seconds: 3600
    # Defaults to empty
    remote_signer_tolerations: []

    # Resource management for remote signer containers
    # CPU is milicores
    # RAM is in MB
    # Defaults to 0, which results in no resource limits
    remote_signer_min_cpu: 0
    remote_signer_max_cpu: 0
    remote_signer_min_mem: 0
    remote_signer_max_mem: 0

  # Participant specific flags
    # Node selector
    # Only works with Kubernetes
    # Example: node_selectors: { "disktype": "ssd" }
    # Defaults to empty
    node_selectors: {}

    # A list of tolerations that will be passed to the EL/CL/validator containers
    # This is to be used when you don't want to specify the tolerations for each container separately
    # Only works with Kubernetes
    # Example: tolerations:
    # - key: "key"
    #   operator: "Equal"
    #   value: "value"
    #   effect: "NoSchedule"
    #   toleration_seconds: 3600
    # Defaults to empty
    tolerations: []

    # Count of nodes to spin up for this participant
    # Default to 1
    count: 1

    # Snooper local flag for a participant.
    # Snooper can be enabled with the `snooper_enabled` flag per client or globally
    # Snooper dumps all JSON-RPC requests and responses including BeaconAPI, EngineAPI and ExecutionAPI.
    # Default to null
    snooper_enabled: null

    # Enables Ethereum Metrics Exporter for this participant. Can be set globally.
    # Defaults null and then set to global ethereum_metrics_exporter_enabled (false)
    ethereum_metrics_exporter_enabled: null

    # Enables Xatu Sentry for this participant. Can be set globally.
    # Defaults null and then set to global xatu_sentry_enabled (false)
    xatu_sentry_enabled: null

    # Prometheus additional configuration for a given participant prometheus target.
    # Execution, beacon and validator client targets on prometheus will include this
    # configuration.
    prometheus_config:
      # Scrape interval to be used. Default to 15 seconds
      scrape_interval: 15s
      # Additional labels to be added. Default to empty
      labels: {}

    # A set of parameters the node needs to reach an external block building network
    # If `null` then the builder infrastructure will not be instantiated
    # Example:
    #
    # "relay_endpoints": [
    #  "https://0xdeadbeefcafa@relay.example.com",
    #  "https://0xdeadbeefcafb@relay.example.com",
    #  "https://0xdeadbeefcafc@relay.example.com",
    #  "https://0xdeadbeefcafd@relay.example.com"
    # ]
    builder_network_params: null

    # Participant flag for keymanager api
    # This will open up http ports to your validator services!
    # Defaults null and then set to default global keymanager_enabled (false)
    keymanager_enabled: null

# Participants matrix creates a participant for each combination of EL, CL and VC clients
# Each EL/CL/VC item can provide the same parameters as a standard participant
participants_matrix: {}
  # el:
  #   - el_type: gzond
  #   - el_type: gzond
  # cl:
  #   - cl_type: qrysm
  #   - cl_type: qrysm
  # vc:
  #   - vc_type: qrysm
  #   - vc_type: qrysm


# Default configuration parameters for the network
network_params:
  # Network name, used to enable syncing of alternative networks
  # Defaults to "kurtosis"
  # You can sync any public network by setting this to the network name (e.g. "mainnet", "sepolia")
  # You can sync any devnet by setting this to the network name (e.g. "dencun-devnet-12")
  network: "kurtosis"

  # The network ID of the network.
  network_id: "3151908"

  # The address of the staking contract address
  deposit_contract_address: "Z4242424242424242424242424242424242424242"

  # Number of seconds per slot on the Beacon chain
  seconds_per_slot: 60

  # The number of validator keys that each CL validator node should get
  num_validator_keys_per_node: 64

  # This mnemonic will a) be used to create keystores for all the types of validators that we have and b) be used to generate a CL genesis.ssz that has the children
  # validator keys already preregistered as validators
  preregistered_validator_keys_mnemonic: "veto waiter rail aroma aunt chess fiend than sahara unwary punk dawn belong agent sane reefy loyal from judas clean paste rho madam poor pay convoy duty circa hybrid circus exempt splash"

  # The number of pre-registered validators for genesis. If 0 or not specified then the value will be calculated from the participants
  preregistered_validator_count: 0

  # How long you want the network to wait before starting up
  genesis_delay: 20

  # The gas limit of the network set at genesis
  genesis_gaslimit: 30000000

  # Max churn rate for the network
  # Defaults to 8
  max_per_epoch_activation_churn_limit: 8

  # Churn limit quotient for the network
  # Defaults to 65536
  churn_limit_quotient: 65536

  # Ejection balance
  # Defaults to 16ETH
  # 16000000000 gwei
  ejection_balance: 16000000000

  # ETH1 follow distance
  # Defaults to 2048
  eth1_follow_distance: 2048

  # The number of epochs to wait validators to be able to withdraw
  # Defaults to 256 epochs ~27 hours
  min_validator_withdrawability_delay: 256

  # The period of the shard committee
  # Defaults to 256 epoch ~27 hours
  shard_committee_period: 256

  # Network sync base url for syncing public networks from a custom snapshot (mostly useful for shadowforks)
  # Defaults to "https://snapshots.ethpandaops.io/"
  # If you have a local snapshot, you can set this to the local url:
  # network_snapshot_url_base = "http://10.10.101.21:10000/snapshots/"
  # The snapshots are taken with https://github.com/ethpandaops/snapshotter
  network_sync_base_url: https://snapshots.theqrl.org/

  # The number of data column sidecar subnets used in the gossipsub protocol
  data_column_sidecar_subnet_count: 128
  # Number of DataColumn random samples a node queries per slot
  samples_per_slot: 8
  # Minimum number of subnets an honest node custodies and serves samples from
  custody_requirement: 4

  # Preset for the network
  # Default: "mainnet"
  # Options: "mainnet", "minimal"
  # "minimal" preset will spin up a network with minimal preset. This is useful for rapid testing and development.
  # 192 seconds to get to finalized epoch vs 1536 seconds with mainnet defaults
  # Please note that minimal preset requires alternative client images.
  # For an example of minimal preset, please refer to [minimal.yaml](.github/tests/minimal.yaml)
  preset: "mainnet"

  # Preloaded contracts for the chain
  additional_preloaded_contracts: {}
  # Example:
  # additional_preloaded_contracts: '{
  #  "Z123463a4B065722E99115D6c222f267d9cABb524":
  #   {
  #     balance: "1ETH",
  #     code: "0x1234",
  #     storage: {},
  #     nonce: 0,
  #     secretKey: "0x",
  #   }
  # }'

  # Repository override for devnet networks
  # Default: ethpandaops
  devnet_repo: ethpandaops

  # A number of prefunded accounts to be created
  # Defaults to no prefunded accounts
  # Example:
  # prefunded_accounts: '{"Z25941dC771bB64514Fc8abBce970307Fb9d477e9": {"balance": "10ETH"}}'
  # 10ETH to the account Z25941dC771bB64514Fc8abBce970307Fb9d477e9
  # To prefund multiple accounts, separate them with a comma
  #
  # prefunded_accounts: '{"Z25941dC771bB64514Fc8abBce970307Fb9d477e9": {"balance": "10ETH"}, "Z4107be99052d895e3ee461C685b042Aa975ab5c0": {"balance": "1ETH"}}'
  prefunded_accounts: {}

  # Maximum size of gossip messages in bytes
  # 10 * 2**20 (= 10485760, 10 MiB)
  # Defaults to 10485760 (10MB)
  gossip_max_size: 10485760



# Global parameters for the network

# By default includes
# - A transaction spammer is launched to fake transactions sent to the network
# - Forkmon for EL will be launched
# - A prometheus will be started, coupled with grafana
# - A beacon metrics gazer will be launched
# - A light beacon chain explorer will be launched
# - Default: []
additional_services:
  - assertoor
  - broadcaster
  - custom_flood
  - tx_spammer
  - el_forkmon
  - blockscout
  - beacon_metrics_gazer
  - dora
  - full_beaconchain_explorer
  - prometheus_grafana
  - dugtrio
  - blutgang
  - forky
  - apache
  - tracoor

# Configuration place for blockscout explorer - https://github.com/blockscout/blockscout
blockscout_params:
  # blockscout docker image to use
  # Defaults to blockscout/blockscout:latest
  image: "blockscout/blockscout:latest"
  # blockscout smart contract verifier image to use
  # Defaults to ghcr.io/blockscout/smart-contract-verifier:latest
  verif_image: "ghcr.io/blockscout/smart-contract-verifier:latest"
  # Frontend image
  # Defaults to ghcr.io/blockscout/frontend:latest
  frontend_image: "ghcr.io/blockscout/frontend:latest"

# Configuration place for dora the explorer - https://github.com/ethpandaops/dora
dora_params:
  # Dora docker image to use
  # Defaults to the latest image
  image: "ethpandaops/dora:latest"
  # A list of optional extra env_vars the dora container should spin up with
  env: {}

# Configuration place for prometheus
prometheus_params:
  storage_tsdb_retention_time: "1d"
  storage_tsdb_retention_size: "512MB"
  # Resource management for prometheus container
  # CPU is milicores
  # RAM is in MB
  min_cpu: 10
  max_cpu: 1000
  min_mem: 128
  max_mem: 2048
  # Prometheus docker image to use
  # Defaults to the latest image
  image: "prom/prometheus:latest"

# Configuration place for grafana
grafana_params:
  # A list of locators for grafana dashboards to be loaded be the grafana service
  additional_dashboards: []
  # Resource management for grafana container
  # CPU is milicores
  # RAM is in MB
  min_cpu: 10
  max_cpu: 1000
  min_mem: 128
  max_mem: 2048
  # Grafana docker image to use
  # Defaults to the latest image
  image: "grafana/grafana:latest"

# Configuration place for the assertoor testing tool - https://github.com/ethpandaops/assertoor
assertoor_params:
  # Assertoor docker image to use
  # Defaults to the latest image
  image: "ethpandaops/assertoor:latest"

  # Check chain stability
  # This check monitors the chain and succeeds if:
  # - all clients are synced
  # - chain is finalizing for min. 2 epochs
  # - >= 98% correct target votes
  # - >= 80% correct head votes
  # - no reorgs with distance > 2 blocks
  # - no more than 2 reorgs per epoch
  run_stability_check: false

  # Check block propöosals
  # This check monitors the chain and succeeds if:
  # - all client pairs have proposed a block
  run_block_proposal_check: false

  # Run normal transaction test
  # This test generates random EOA transactions and checks inclusion with/from all client pairs
  # This test checks for:
  # - block proposals with transactions from all client pairs
  # - transaction inclusion when submitting via each client pair
  # test is done twice, first with legacy (type 0) transactions, then with dynfee (type 2) transactions
  run_transaction_test: false

  # Run all-opcodes transaction test
  # This test generates a transaction that triggers all EVM OPCODES once
  # This test checks for:
  # - all-opcodes transaction success
  run_opcodes_transaction_test: false

  # Run validator lifecycle test (~48h to complete)
  # This test requires exactly 500 active validator keys.
  # The test will cause a temporary chain unfinality when running.
  # This test checks:
  # - Deposit inclusion with/from all client pairs
  # - BLS Change inclusion with/from all client pairs
  # - Voluntary Exit inclusion with/from all client pairs
  # - Attester Slashing inclusion with/from all client pairs
  # - Proposer Slashing inclusion with/from all client pairs
  # all checks are done during finality & unfinality
  run_lifecycle_test: false

  # Run additional tests from external test definitions
  # Entries may be simple strings (link to the test file) or dictionaries with more flexibility
  # eg:
  #   - https://raw.githubusercontent.com/ethpandaops/assertoor/master/example/tests/block-proposal-check.yaml
  #   - file: "https://raw.githubusercontent.com/ethpandaops/assertoor/master/example/tests/block-proposal-check.yaml"
  #     config:
  #       someCustomTestConfig: "some value"
  tests: []


# If set, the package will block until a finalized epoch has occurred.
wait_for_finalization: false

# The global log level that all clients should log at
# Valid values are "error", "warn", "info", "debug", and "trace"
# This value will be overridden by participant-specific values
global_log_level: "info"

# Snooper global flag for all participants
# Snooper can be enabled with the `snooper_enabled` flag per client or globally
# Snooper dumps all JSON-RPC requests and responses including BeaconAPI, EngineAPI and ExecutionAPI.
# Default to false
snooper_enabled: false

# Enables Ethereum Metrics Exporter for all participants
# Defaults to false
ethereum_metrics_exporter_enabled: false

# Parallelizes keystore generation so that each node has keystores being generated in their own container
# This will result in a large number of containers being spun up than normal. We advise users to only enable this on a sufficiently large machine or in the cloud as it can be resource consuming on a single machine.
parallel_keystore_generation: false

# Disable peer scoring to prevent nodes impacted by faults from being permanently ejected from the network
# Default to false
disable_peer_scoring: false

# Whether the environment should be persistent; this is WIP and is slowly being rolled out accross services
# Note this requires Kurtosis greater than 0.85.49 to work
# Defaults to false
persistent: false

# Docker cache url enables all docker images to be pulled through a custom docker registry
# Disabled by default
# Defaults to empty cache url
# Images pulled from dockerhub will be prefixed with "/dh/" by default (docker.io)
# Images pulled from github registry will be prefixed with "/gh/" by default (ghcr.io)
# Images pulled from google registory will be prefixed with "/gcr/" by default (gcr.io)
# If you want to use a local image in combination with the cache, do not put "/" in your local image name
docker_cache_params:
  enabled: false
  url: ""
  dockerhub_prefix: "/dh/"
  github_prefix: "/gh/"
  google_prefix: "/gcr/"

# Supports three valeus
# Default: "null" - no mev boost, mev builder, mev flood or relays are spun up
# "mock" - mock-builder & mev-boost are spun up
# "flashbots" - mev-boost, relays, flooder and builder are all spun up, powered by [flashbots](https://github.com/flashbots)
# "mev-rs" - mev-boost, relays and builder are all spun up, powered by [mev-rs](https://github.com/ralexstokes/mev-rs/)
# "commit-boost" - mev-boost, relays and builder are all spun up, powered by [commit-boost](https://github.com/Commit-Boost/commit-boost-client)
# We have seen instances of multibuilder instances failing to start mev-relay-api with non zero epochs
mev_type: null

# Parameters if MEV is used
mev_params:
  # The image to use for MEV boost relay
  mev_relay_image: flashbots/mev-boost-relay
  # The image to use for the builder
  mev_builder_image: ethpandaops/flashbots-builder:main
  # The image to use for the CL builder
  # mev_builder_cl_image: sigp/lighthouse:latest
  # The image to use for mev-boost
  mev_boost_image: flashbots/mev-boost
  # Parameters for MEV Boost. This overrides all arguments of the mev-boost container
  mev_boost_args: []
  # Extra parameters to send to the API
  mev_relay_api_extra_args: []
  # Extra parameters to send to the housekeeper
  mev_relay_housekeeper_extra_args: []
  # Extra parameters to send to the website
  mev_relay_website_extra_args: []
  # Extra parameters to send to the builder
  mev_builder_extra_args: []
  # Prometheus additional configuration for the mev builder participant.
  # Execution, beacon and validator client targets on prometheus will include this configuration.
  mev_builder_prometheus_config:
    # Scrape interval to be used. Default to 15 seconds
    scrape_interval: 15s
    # Additional labels to be added. Default to empty
    labels: {}
  # Image to use for mev-flood
  mev_flood_image: flashbots/mev-flood
  # Extra parameters to send to mev-flood
  mev_flood_extra_args: []
  # Number of seconds between bundles for mev-flood
  mev_flood_seconds_per_bundle: 15
  # Optional parameters to send to the custom_flood script that sends reliable payloads
  custom_flood_params:
    interval_between_transactions: 1

# Enables Xatu Sentry for all participants
# Defaults to false
xatu_sentry_enabled: false

# Xatu Sentry params
xatu_sentry_params:
  # The image to use for Xatu Sentry
  xatu_sentry_image: ethpandaops/xatu:latest
  # GRPC Endpoint of Xatu Server to send events to
  xatu_server_addr: localhost:8080
  # Enables TLS to Xatu Server
  xatu_server_tls: false
  # Headers to add on to Xatu Server requests
  xatu_server_headers: {}
  # Beacon event stream topics to subscribe to
  beacon_subscriptions:
    - attestation
    - block
    - chain_reorg
    - finalized_checkpoint
    - head
    - voluntary_exit
    - contribution_and_proof

# Apache params
# Apache public port to port forward to local machine
# Default to port None, only set if apache additional service is activated
apache_port: null

# Global tolerations that will be passed to all containers (unless overridden by a more specific toleration)
# Only works with Kubernetes
# Example: tolerations:
# - key: "key"
#   operator: "Equal"
#   value: "value"
#   effect: "NoSchedule"
#   toleration_seconds: 3600
# Defaults to empty
global_tolerations: []

# Global node selector that will be passed to all containers (unless overridden by a more specific node selector)
# Only works with Kubernetes
# Example: global_node_selectors: { "disktype": "ssd" }
# Defaults to empty
global_node_selectors: {}

# Global parameters for keymanager api
# This will open up http ports to your validator services!
# Defaults to false
keymanager_enabled: false

# Global flag to enable checkpoint sync across the network
checkpoint_sync_enabled: false

# Global flag to set checkpoint sync url
checkpoint_sync_url: ""

# Transaction spammer params
tx_spammer_params:
  # The image to use for tx spammer
  image: theqrl/zond-tx-spammer:latest
  # The scenario to use (see https://github.com/theQRL/zond-tx-spammer)
  # Valid scenarios are:
  #  eoatx, erctx, deploytx, depoy-destruct, gasburnertx
  # Defaults to eoatx
  scenario: eoatx
  # Throughput of tx spammer
  # Defaults to 1000
  throughput: 1000
  # Max pending transactions for tx spammer
  # Defaults to 1000
  max_pending: 1000
  # Max wallets for tx spammer
  # Defaults to 500
  max_wallets: 500
  # Extra parameters to send to tx spammer
  # Defaults to empty
  tx_spammer_extra_args: []

# Zond genesis generator params
zond_genesis_generator_params:
  # The image to use for zond genesis generator
  image: qrledger/qrysm:zond-genesis-generator-latest

# Global parameter to set the exit ip address of services and public ports
port_publisher:
  # if you have a service that you want to expose on a specific interfact; set that IP here
  # if you set it to auto it gets the public ip from ident.me and sets it
  # Defaults to constants.PRIVATE_IP_ADDRESS_PLACEHOLDER
  # The default value just means its the IP address of the container in which the service is running
  nat_exit_ip: KURTOSIS_IP_ADDR_PLACEHOLDER
  # Execution Layer public port exposed to your local machine
  # Disabled by default
  # Public port start defaults to 32000
  # You can't run multiple enclaves on the same port settings
  el:
    enabled: false
    public_port_start: 32000
  # Consensus Layer public port exposed to your local machine
  # Disabled by default
  # Public port start defaults to 33000
  # You can't run multiple enclaves on the same port settings
  cl:
    enabled: false
    public_port_start: 33000
  # Validator client public port exposed to your local machine
  # Disabled by default
  # Public port start defaults to 34000
  # You can't run multiple enclaves on the same port settings
  vc:
    enabled: false
    public_port_start: 34000
  # remote signer public port exposed to your local machine
  # Disabled by default
  # Public port start defaults to 35000
  # You can't run multiple enclaves on the same port settings
  remote_signer:
    enabled: false
    public_port_start: 35000
  # Additional services public port exposed to your local machine
  # Disabled by default
  # Public port start defaults to 36000
  # You can't run multiple enclaves on the same port settings
  additional_services:
    enabled: false
    public_port_start: 36000
```

:::

### CLI options

The `start_local_testnet.sh` script comes with some CLI options, which can be viewed with `./start_local_testnet.sh -h`. 

```bash
fr1t2@qrl-node-1:~/qrysm/scripts/local_testnet$ ./start_local_testnet.sh -h
Start a local testnet with kurtosis.

usage: ./start_local_testnet.sh <Options>

Options:
   -e: enclave name                                default: local-testnet
   -b: whether to build Qrysm docker image         default: true
   -n: kurtosis network params file path           default: /home/fr1t2/qrysm/scripts/local_testnet/network_params.yaml
   -p: enable builder proposals
   -c: CI mode, run without other additional services like Grafana and explorer
   -k: keeping enclave to allow starting the testnet without destroying the existing one
   -h: this help
```


A helpful command option is to avoid rebuilding Qrysm each time the testnet starts, this is only needed if there have been changes to the core components. To avoid this extra work, use the command:

```bash
./start_local_testnet.sh -b false
```


## References

- Pre-configured Kurtosis Package for QRL: [`zond-package`](https://github.com/theQRL/zond-package/tree/main)
- QRL Project Zond Private Network [Scripts and Config](https://github.com/theQRL/qrysm/tree/main/scripts/local_testnet)
- Ethereum Kurtosis [fundamentals documentation](https://geth.ethereum.org/docs/fundamentals/kurtosis)
- Kurtosis [CLI reference](https://docs.kurtosis.com/cli)
- QRL `zond-package` [architecture documentation](https://github.com/theQRL/zond-package/blob/main/docs/architecture.md)

