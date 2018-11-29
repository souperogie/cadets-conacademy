pragma solidity 0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/DigitalIdentity.sol";

contract TestUser {
  DigitalIdentity digitalIdentity = DigitalIdentity(DeployedAddresses.DigitalIdentity());

  
}
