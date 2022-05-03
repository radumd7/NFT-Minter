require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
const { ALCHEMY_URL, ACCOUNT_PK } = process.env;
module.exports = {
  solidity: '0.8.1',
  networks: {
    rinkeby: {
      url: ALCHEMY_URL,
      accounts: [`0x${ACCOUNT_PK}`],
    },
  },
};