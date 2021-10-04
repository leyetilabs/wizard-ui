export const toBase64 = (obj: any) => {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
};
