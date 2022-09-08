import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { injectedConnector } from "libs/connectors";

export const useEagerConnect = () => {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    activate(injectedConnector, undefined, true);
  }, []); // * intentionally only running on mount (make sure it's only mounted once :))

  // * if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};
