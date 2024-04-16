// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract Upload {
   struct nft {
       address owner;
       string url;
       string name;
       uint price;
       bool listed;
       uint value;
  
   }


    nft[] public nfts;


   modifier onlyOwner(uint256 _nftId) {
       require(_nftId < nfts.length, "Invalid ride ID");
       require(msg.sender == nfts[_nftId].owner, "Only ride owner can call this function");
       _;
   }

   function createNft(
        string memory _url,
        string memory _name
   ) public payable{
        nfts.push(nft({
            owner: msg.sender,
            url: _url,
            name: _name,
            value: msg.value,
            price: msg.value,
            listed: false
        }));
   }




    function listNft(
        uint _nftId,
        uint _price
    ) onlyOwner(_nftId) public {
        nft storage temp = nfts[_nftId];
        require(_price>=temp.value, "price should increase ");
        temp.price = _price;
        temp.listed = true;

    }

    function buyNft(
        uint _nftId
    ) public payable {
        nft storage temp = nfts[_nftId];
        uint amount = 2*temp.price-temp.value;
        require(temp.owner != msg.sender, "Owner cannot buy its own nft");
        require(temp.listed, "this nft is not listed");
        require(msg.value>=amount, "Driver is not verified");

        address payable seller=payable(temp.owner);
        seller.transfer(temp.price);

        address payable buyer=payable(msg.sender);
        buyer.transfer(msg.value-amount);
        temp.owner = msg.sender;
        temp.value = temp.price; 
        temp.listed = false; 
    }

   function getNfts() public view returns(nft[] memory _nfts) {
       return nfts;
   }
}