import { Box, Button, TextField, Typography } from "@mui/joy";
import { useQueryEveryBlock } from "hooks/useQueryEveryBlock";
import { useState } from "react";
import { web3Store } from "stores/web3Store";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import { txService } from "services/txService";
import { accountStore } from "stores/accountStore";

export const Donate = () => {
  const [amount, setAmount] = useState("0");

  const handleDonate = () => {
    const web3 = web3Store.instance;

    const donateAmount = new BigNumber(amount).times("1e18");

    if (!donateAmount.mod("1e15").eq(0)) return;

    web3?.eth.sendTransaction(
      {
        from: accountStore.address,
        to: "0x69ea6652c9a2a65fc64ba1a4c186df7450454677",
        value: donateAmount.toFixed(0),
      },
      () => {}
    );
  };

  return (
    <Box mt={4}>
      <Typography>Donate</Typography>
      <TextField value={amount} onChange={(v) => setAmount(v.target.value)}></TextField>
      <Button onClick={handleDonate}>Submit</Button>
    </Box>
  );
};
