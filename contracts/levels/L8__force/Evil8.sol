// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Evil8 {
    function boom(address topup) external payable {
        selfdestruct(payable(topup));
    }

}