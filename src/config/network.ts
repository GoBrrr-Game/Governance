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
    stakingContractAddrses: '0x9dfb0cfb227b7c81a564c3880292f2ff5251b67b',
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