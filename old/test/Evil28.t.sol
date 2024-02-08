// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";

import {Evil28} from "../src/L28/Evil28.sol";

contract TestEvil_28 is Test {
    Evil28 evil;

    address samaritan = 0x594e81BbDd5AC66a60741830ced8e1732B016546;
    address wallet = 0xa4C79EC43cfacacFA455e0E11b108c05243B9D39;
    address coin = 0xb21288A70C41508AaA74Dd7cC8C3c7f8395229FD;

    function setUp() public {
        evil = new Evil28();
        vm.label(samaritan, "samaritan");
        vm.label(wallet, "wallet");
        vm.label(coin, "coin");
    }

    function test_pwn() external {
        evil.pwn();
    }
}
