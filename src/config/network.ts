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
    tokenContractAddress: '0x6d06d9CE8D0196b7b11f94c6caF1E62fbB2643Fa',
    stakingContractAddrses: '0xC4F216bBaD63E6c8B6219b0FA0eb1421EbA7fD82',
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