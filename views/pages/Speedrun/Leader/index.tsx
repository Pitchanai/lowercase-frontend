import { useQueryEveryBlock } from "hooks/useQueryEveryBlock";
import { web3Store } from "stores/web3Store";

import { uniq } from "lodash";
import { contractService } from "services/contractService";
import ERC20 from "ABI/ERC20.json";
import BigNumber from "bignumber.js";
import { Box, Typography } from "@mui/joy";
import { accountStore } from "stores/accountStore";
import { observer } from "mobx-react-lite";

export const Leader = observer(() => {
  const { queryResult: leaders } = useQueryEveryBlock(async () => {
    const logs = await web3Store.instance?.eth.getPastLogs({
      fromBlock: 11343191,
      toBlock: "latest",
      address: "0x69ea6652c9a2a65fc64ba1a4c186df7450454677",
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      ],
    });

    const interestAddress = logs?.map((log) => web3Store.instance?.eth.abi.decodeParameter("address", log.topics[2]));
    const uniqueAddress = uniq(interestAddress);

    const erc20Contract = contractService.getContract(ERC20.abi, "0x69ea6652c9a2a65fc64ba1a4c186df7450454677");
    const totalBalance = await contractService.makeMulticallNullable(
      uniqueAddress.map((address) => erc20Contract?.methods.balanceOf(address))
    );

    console.log("totalBalance", totalBalance);

    const results = uniqueAddress.map((address, idx) => ({ address, balance: new BigNumber(totalBalance[idx]) }));
    const sortedResults = results.sort((a, b) => (a.balance.minus(b.balance).gt(0) ? -1 : 1)).slice(10);

    console.log("results", sortedResults);

    return sortedResults;
  }, [accountStore.address]);
  return (
    <Box mt={4}>
      <Typography>Leader Board</Typography>
      {leaders?.map((leader) => (
        <Typography>
          {leader.address}: {leader.balance.div("1e18").toFormat(6)} ETH
        </Typography>
      ))}
    </Box>
  );
});
