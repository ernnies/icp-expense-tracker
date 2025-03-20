// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

//0x11B076DBFAfdf2327F962052397b02E9419eDCfC

const hre = require("hardhat");
const { ethers } = require("hardhat");
const network = hre.network.name;

async function main() {
  const now = Math.round(Date.now() / 1000);
  const Owner = "0x751f24E6FF4A12466a5249Fe380a7cC412dE5164";
  const Receiver = "0x488C38F91624C9bbeb7bf9acc7812Af100F5aef6";
  const contractAddress = "0x7115aE5487314Fec61baf561ACf1B797ca34C869";

  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [Owner, Receiver],
    contract: "contracts/Sale.sol:TokenSale",
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
