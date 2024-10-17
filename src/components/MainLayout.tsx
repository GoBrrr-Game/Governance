import React, { ReactNode } from "react";
import TopBarNotify from "./TopBarNotify";
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";

export function MainLayout() {
  return (
    <>
      <TopBarNotify notifyText="Aave Governance has deployed a new ZkSync market" />
      <AppHeader />
      {/* <AppFooter /> */}
    </>
  );
}
