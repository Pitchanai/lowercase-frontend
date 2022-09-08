import { useQueryEveryBlock } from "hooks/useQueryEveryBlock";
import { contractService } from "services/contractService";

import ERC20 from "ABI/ERC20.json";
import { accountStore } from "stores/accountStore";
import { observer } from "mobx-react-lite";
import BigNumber from "bignumber.js";
import { Box, Typography } from "@mui/joy";

export const CheckAmount = observer(() => {
  const { queryResult: balance } = useQueryEveryBlock(async () => {
    const erc20Contract = contractService.getContract(ERC20.abi, "0x69ea6652c9a2a65fc64ba1a4c186df7450454677");
    const balance = await erc20Contract?.methods.balanceOf(accountStore.address).call();
    console.log("fetchingBalance");
    return new BigNumber(balance);
  }, [accountStore.address]);

  return (
    <Box mt={4}>
      <Typography>Transferred</Typography>
      <Typography>{!balance ? "..." : balance?.div("1e18").toFormat(6)} ETH</Typography>
    </Box>
  );
});
