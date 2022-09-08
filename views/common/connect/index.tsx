import { useEagerConnect } from "hooks/useEagerConnect";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { web3Store } from "stores/web3Store";
import { accountStore } from "stores/accountStore";
import { observer } from "mobx-react-lite";

export const Connect = observer(() => {
  const { active, library, chainId, account } = useWeb3React<Web3>();

  const triedEager = useEagerConnect();

  useEffect(() => {
    if (active) {
      web3Store.setInstance(library);
      web3Store.setChainId(chainId);
      accountStore.setAddress(account ?? undefined);
    } else {
      web3Store.setInstance(undefined);
      web3Store.setChainId(undefined);
      accountStore.setAddress(undefined);
    }

    web3Store.setActive(active);
  }, [active, library, chainId, account]);

  return <div>{accountStore.address}</div>;
});
