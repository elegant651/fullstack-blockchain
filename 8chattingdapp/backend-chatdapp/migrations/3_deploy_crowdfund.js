var CrowdFund = artifacts.require('./CrowdFund.sol');

module.exports = function(deployer) {
  deployer.deploy(CrowdFund, 1, 1);
}
