// App.js
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // corrected import statement

import { ethers } from 'ethers'; // Import ethers.js
import NftCard from './components/NftCard'; // Component to display NFT card
import Upload from './artifacts/contracts/Upload.sol/Upload.json'; // Import the contract artifact
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Create from './pages/Create';
import Mynfts from './pages/Mynfts';

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <Router> {/* Wrap your Routes in Router */}
      <div>
        <Navbar account = {account}/>
        <Routes>
          <Route path="/" element={<Home contract={contract}/>} /> {/* Use the "element" prop */}
          <Route path="/create" element={<Create contract={contract} account={account} />} />
          <Route path="/mynfts" element={<Mynfts contract={contract} account={account} />} />
          <Route path="/home" element={<Home contract={contract} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
