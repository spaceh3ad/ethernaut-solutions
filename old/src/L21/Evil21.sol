// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Evil21 {
    receive() external payable {
        assembly {
            invalid()
        }
    }
}
