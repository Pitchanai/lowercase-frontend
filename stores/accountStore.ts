import { makeAutoObservable } from "mobx";

class AccountStore {
  address: string | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setAddress = (address: string | undefined) => {
    if (!address) {
      this.address = address;
    } else {
      this.address = address.toLowerCase();
    }
  };
}

export const accountStore = new AccountStore();
