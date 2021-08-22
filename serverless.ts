import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "api",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      INFURA_ID: "${env:INFURA_ID}",
      COINGECKO_PRICE_API: "https://api.coingecko.com/api/v3/simple/price",
    },
    lambdaHashingVersion: "20201221",
  },
  functions: {
    delegates: {
      handler: "functions/delegates.handler",
      events: [
        {
          http: {
            method: "get",
            path: "delegates",
          },
        },
      ],
    },
    proposals: {
      handler: "functions/proposals.handler",
      events: [
        {
          http: {
            method: "get",
            path: "proposals",
          },
        },
      ],
    },
    markets: {
      handler: "functions/markets.handler",
      events: [
        {
          http: {
            method: "get",
            path: "markets",
          },
        },
      ],
    },
    vaults: {
      handler: "functions/vaults.handler",
      events: [
        {
          http: {
            method: "get",
            path: "vaults",
          },
        },
      ],
    },
    staking: {
      handler: "functions/staking.handler",
      events: [
        {
          http: {
            method: "get",
            path: "staking",
          },
        },
      ],
    },
    tvl: {
      handler: "functions/tvl.handler",
      events: [
        {
          http: {
            method: "get",
            path: "tvl",
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
