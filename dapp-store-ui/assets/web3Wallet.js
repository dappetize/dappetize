// import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'

// import { mainnet, arbitrum } from '@wagmi/core/chains'


import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createConfig } from '@wagmi/core'
import { arbitrum, mainnet, polygon } from 'viem/chains'


export async function web3WalletLoad() {


    const chains = [arbitrum, mainnet, polygon]
    const projectId = 'df55b76c41b9f979d8b8896dd1e7c506'

    const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
    const wagmiConfig = createConfig({
        autoConnect: true,
        connectors: w3mConnectors({ projectId, chains }),
        publicClient
    })
    const ethereumClient = new EthereumClient(wagmiConfig, chains)
    return new Web3Modal({ projectId }, ethereumClient)

}

// import { Core } from '@walletconnect/core'
// import { Web3Wallet } from '@walletconnect/web3wallet'



// export async function web3WalletLoad() {


//     const core = new Core({
//         projectId: "df55b76c41b9f979d8b8896dd1e7c506"
//     })

//     const web3wallet = await Web3Wallet.init({
//         core, // <- pass the shared `core` instance
//         metadata: {
//             name: 'Demo app',
//             description: 'Demo Client as Wallet/Peer',
//             url: 'www.walletconnect.com',
//             icons: []
//         }
//     })
// }