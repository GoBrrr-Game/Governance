import { networkConfig } from "@/config/network";

export const switchNetwork = async () => {
    const network = {
      chainId: networkConfig.chainId,
      chainName: networkConfig.chainName,
      nativeCurrency: networkConfig.nativeCurrency,
      rpcUrls: [networkConfig.rpcUrl],
      blockExplorerUrls: [networkConfig.blockExplorerUrl],
    };
  
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network.chainId }],
      });
      console.log("Switched Success");
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [network],
          });
          console.log("Rinkeby Test Network added and selected");
        } catch (addError) {
          console.error("Failed to add the network:", addError);
        }
      } else {
        console.error("Failed to switch the network:", error);
      }
    }
}