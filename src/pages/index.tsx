import { ConnectWalletPaperStaking } from "@/components/ConnectWalletPaperStaking";
import { MainLayout } from "@/components/MainLayout";
import { StakingHeader } from "@/components/StakingHeader";
const IndexPage = () => (
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
        <ConnectWalletPaperStaking
          description={
            <g>
              We couldn’t detect a wallet. Connect a wallet to stake and view
              your balance.
            </g>
          }
        />
      </div>
    </div>
  </>
);

export default IndexPage;
