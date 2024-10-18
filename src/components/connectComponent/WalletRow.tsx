import React from "react";
import { Button } from "@mui/material";

interface CustomContentProps {
  title: string;
  onClick: (name: string) => void;
}

const WalletRow: React.FC<CustomContentProps> = ({ title, onClick }) => {
  return (
    <Button
      onClick={() => onClick(title)}
      style={{
        color: "#383D51",
        fontWeight: "500",
        marginLeft: "20px",
        marginRight: "20px",
        marginBottom: "10px",
        padding: "10px 24px",
        border: "1px solid #EAEBEF",
        fontSize: "1rem",
        width: "auto",
        letterSpacing: "0.02875rem",
        background: "#F7F7F9",
        lineHeight: "1.5rem",
        borderRadius: "4px",
        minWidth: "64px",
        textTransform: "none",
        textAlign: "left", // Align text to the left
        justifyContent: "flex-start", // Align items in the button to the left
      }}
    >
      {title}
    </Button>
  );
};

export default WalletRow;
