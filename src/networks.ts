import { NetworkInfo } from "@terra-dev/wallet-types";
import { LocalNetworkConfig } from "./types";

export type LocalNetworkInfo = NetworkInfo & LocalNetworkConfig;

const networks: Record<string, LocalNetworkInfo> = {
  mainnet: {
    name: "mainnet",
    chainID: "columbus-4",
    lcd: "https://lcd.terra.dev",
    contract: "https://whitelist.mirror.finance/columbus.json",
    mantle: "https://mantle.terra.dev/",
    stats: "https://graph.mirror.finance/graphql",
    factory: "terra1ulgw0td86nvs4wtpsc80thv6xelk76ut7a7apj",
    routeContract: "terra19qx5xe6q9ll4w0890ux7lv2p4mf3csd4qvt3ex",
    fee: { gasPrice: 0.15, amount: 100000 }, // 0.1 UST
  },
  testnet: {
    name: "testnet",
    chainID: "tequila-0004",
    lcd: "https://tequila-lcd.terra.dev",
    contract: "https://whitelist.mirror.finance/tequila.json",
    mantle: "https://tequila-mantle.terra.dev/",
    stats: "https://tequila-graph.mirror.finance/graphql",
    factory: "terra18qpjm4zkvqnpjpw0zn0tdr8gdzvt8au35v45xf",
    routeContract: "terra1dtzpdj3lc7prd46tuxj2aqy40uv4v4xsphwcpx",
    fee: { gasPrice: 0.15, amount: 150000 }, // 0.15 UST
  },
  bombay: {
    name: "bombay",
    chainID: "bombay-10",
    lcd: "https://bombay-lcd.terra.dev",
    contract: "https://whitelist.mirror.finance/tequila.json",
    mantle: "https://tequila-mantle.terra.dev/",
    stats: "https://tequila-graph.mirror.finance/graphql",
    factory: "terra18qpjm4zkvqnpjpw0zn0tdr8gdzvt8au35v45xf",
    routeContract: "terra1dtzpdj3lc7prd46tuxj2aqy40uv4v4xsphwcpx",
    fee: { gasPrice: 0.15, amount: 150000 }, // 0.15 UST
  },
};

export const defaultNetwork = networks.mainnet;

export default networks;
