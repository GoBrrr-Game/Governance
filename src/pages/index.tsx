import { ConnectWalletPaperStaking } from "@/components/ConnectWalletPaperStaking";
import { MainLayout } from "@/components/MainLayout";
import { StakingHeader } from "@/components/StakingHeader";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store"; // Import the RootState type
import { TestStaking } from "@/components/TestStaking";
const IndexPage: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const accountValue = useSelector(
    (state: RootState) => state.connectWallet.account
  );
  return (
    <>
      <MainLayout />
      <StakingHeader />
      <div style={{ width: "100%", marginTop: "-32px" }}>
        <div
          style={{
            paddingLeft: "6rem",
            paddingRight: "6rem",
          }}
        >
          {accountValue == "" ? (
            <ConnectWalletPaperStaking
              description={
                <g>
                  We couldn’t detect a wallet. Connect a wallet to stake and
                  view your balance.
                </g>
              }
            />
          ) : (
            <TestStaking
              address={accountValue}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default IndexPage;
