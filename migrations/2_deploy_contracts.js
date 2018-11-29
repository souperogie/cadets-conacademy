var DigitalIdentity = artifacts.require("./DigitalIdentity.sol");

module.exports = function(deployer) {
  deployer.deploy(DigitalIdentity);
};
