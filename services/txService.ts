import { accountStore } from "stores/accountStore";
import { web3Store } from "stores/web3Store";

/**
 * * This is the status of the tx.
 */
export enum TxStatus {
  Pending = "Pending",
  Success = "Success",
  Failed = "Failed",
}

export type Tx = {
  txHash: string;
  description: string;
  status: TxStatus;
};

const LOCAL_STORAGE_TXS_KEY = "abs";

class TxService {
  initializeLocalStorageTxs = () => {
    const localStorageTxsKey = this.getLocalStorageKey();
    if (!localStorageTxsKey) {
      return;
    }

    const localStoredTxs = localStorage.getItem(localStorageTxsKey);
    if (!localStoredTxs) {
      return;
    }

    try {
      const storedTxs: Record<string, Tx> = JSON.parse(localStoredTxs);
      if (storedTxs) {
        // txStore.setTxs(storedTxs)
      }
    } catch (error) {
      console.error("Error while parsing Local Storage Txs", error);
    }
  };

  send = async (tx, description, _to, value = "0") => {
    const from = accountStore.address;
    const sentTx = tx.send({ from, value });
    const txHash = (await new Promise((resolve, reject) => {
      sentTx.on("transactionHash", (txHash) => {
        // txStore.addTx(txHash, description)
        // openTxDialog(TxStatus.Success, txHash)
        resolve(txHash);
      });
      sentTx.on("error", (error) => {
        // openTxDialog(TxStatus.Failed, '', error?.message)
        reject(error);
      });
    })) as string;

    return txHash;
  };

  // updateTxStatus = async () => {
  //   const txs = txStore.txs
  //   const web3 = web3Store.instance

  //   if (!web3) return

  //   for (const key in txs) {
  //     if (txs[key].status === TxStatus.Success) continue

  //     const txHash = txs[key].txHash
  //     const receipt = await web3.eth.getTransactionReceipt(txHash)

  //     if (receipt?.status) {
  //       txStore.updateTx(txHash, { status: TxStatus.Success })
  //     }

  //     // ! Don't use !receipt.status, receipt === null means Pending, but receipt === false means Revert
  //     if (receipt?.status === false) {
  //       txStore.updateTx(txHash, { status: TxStatus.Failed })
  //     }
  //   }
  // }

  getLocalStorageKey = () => {
    if (!web3Store.chainId) return;
    return `${LOCAL_STORAGE_TXS_KEY}-${web3Store.chainId}`;
  };
}

export const txService = new TxService();
