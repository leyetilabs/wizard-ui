export function truncate(str: string) {
  return `${str.substring(0, 6)}...${str.substring(str.length - 4)}`;
}

export function toBase64(obj: object) {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
}
