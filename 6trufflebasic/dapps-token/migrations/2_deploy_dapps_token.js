var DappsToken = artifacts.require("DappsToken");

module.exports = function(deployer) {
  deployer.deploy(DappsToken);
};