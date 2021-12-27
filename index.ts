import { getPermitDigest, sign } from "./DaiSigner";
import { ethers } from "ethers";

const name = "Dai Stablecoin";
const address = "0x307b3c3ebfba36a0c1828e0208c22c42a5380acc";
const chainId = 4;
const approve = {
  owner: "0xbF1FC65e8A3ff1044f20570cF0DD7D7dd6799712",
  spender: "0x9651819cfa16c8F3Ba927d5350Ca25417591166B",
  value: 100,
};

const ownerPrivateKey = Buffer.from(
  "b10338ffc128bdd2aa9d66dc59c8d19393a50cb87ecd5cb1bbcd45fe102ae857",
  "hex"
);

var nonce = 0;
var deadline = 100000000000000;
const allowed = true;

const permitDigest = getPermitDigest(
  name,
  address,
  chainId,
  approve,
  nonce,
  deadline,
  allowed
);

console.log("permitDigest: ", permitDigest);

const { v, r, s } = sign(permitDigest, ownerPrivateKey);

console.log("v: ", v);
console.log("r: ", r.toString("hex"));
console.log("s: ", s.toString("hex"));
// console.log("r: ", ethers.utils.formatBytes32String(r.toString("hex")));
// console.log("s: ", ethers.utils.formatBytes32String(s.toString("hex")));

const expandedSig = {
  r: "0x" + r.toString("hex"),
  s: "0x" + s.toString("hex"),
  v: v,
};
const signature = ethers.utils.joinSignature(expandedSig);
const recoveredAddress = ethers.utils.recoverAddress(permitDigest, signature);
console.log("recovered address must be holder: ", recoveredAddress);
