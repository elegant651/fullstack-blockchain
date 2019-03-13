var Vote = artifacts.require("./Vote.sol");
module.exports = function(deployer) {  
  var options = ['Option1', 'Option2', 'Option3', 'Option4', 'Option5']

  deployer.deploy(Vote, options);
};
