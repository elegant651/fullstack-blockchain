pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract DappsToken is ERC20 {
	string public name = "DappsToken";
	string public symbol = "DT";
	uint8 public decimals = 2;
	uint public INITIAL_SUPPLY = 2000000;

	constructor() public {
  	  _mint(msg.sender, INITIAL_SUPPLY);
 	}
}
