const NETWORK = process.env.NETWORK || 'testnet';

interface Config {
    rpcUrl: string;
    chainId: string;
    chainName: string;
    nativeCurrency: {
        [index: string]: any
    };
    blockExplorerUrl: string;
    tokenContractAddress: string;
    stakingContractAddrses: string;
}

const testConfig: Config = {
    rpcUrl: 'https://rpc.sepolia.org',
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    chainId: '0xaa36a7',
    chainName: 'Ethereum Sepolia',
    nativeCurrency: {
        name: 'Sepolia Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    tokenContractAddress: '0xA590CeeE761B560044c4BED66848e60641Fd69BE',
    stakingContractAddrses: '0x18f6A39676FE5dEe1868273a31167e4D268173c0',
};

const mainConfig: Config = {
    rpcUrl: 'https://mainnet.infura.io/v3/',
    blockExplorerUrl: 'https://etherscan.io',
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    tokenContractAddress: '',
    stakingContractAddrses: '',
};

export const networkConfig = NETWORK == 'mainnet' ? mainConfig : testConfig;