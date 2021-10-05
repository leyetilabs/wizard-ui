// ---------------------------------------------
// HandleMsg
// ---------------------------------------------
export type IncreaseAllowance = {
  increase_allowance: {
    spender: string;
    amount: string;
  };
};

export type Send = {
  send: {
    amount: string;
    contract: string;
    msg: string;
  };
};

// ---------------------------------------------
// QueryMsg
// ---------------------------------------------
export type Balance = {
  balance: {
    address: string;
  };
};

export type BalanceResponse = {
  balance: string;
};

export type TokenInfo = {
  token_info: {};
};

export type TokenInfoResponse = {
  decimals: number;
  name: string;
  symbol: string;
  total_supply: string;
};
