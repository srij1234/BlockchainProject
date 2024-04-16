async function main() {
    // Hardhat setup
    const { ethers } = require("hardhat");

    // Load the contract to deploy
    const Upload = await ethers.getContractFactory("Upload");

    // Deploy the contract
    console.log("Deploying contract...");
    const contract = await Upload.deploy();

    // Wait for the contract to be mined
    await contract.deployed();

    console.log("Contract deployed to:", contract.address);
}

// Execute the deployment script
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
