import { STAKING_ABI } from "@config/abis";
import { DAYS_PER_YEAR, DOLA3CRV, SECONDS_PER_DAY } from "@config/constants";
import { InfuraProvider } from "@ethersproject/providers";
import { Contract } from "ethers";
import { formatEther, formatUnits } from "ethers/lib/utils";
import "source-map-support";

export const handler = async () => {
  try {
    const provider = new InfuraProvider("homestead", process.env.INFURA_ID);
    const contract = new Contract(DOLA3CRV, STAKING_ABI, provider);

    const rewardRate = await contract.rewardRate();
    const totalSupply = await contract.totalSupply();

    return {
      rates: {
        [DOLA3CRV]: totalSupply.gt(0)
          ? (parseFloat(
              formatEther(rewardRate.mul(SECONDS_PER_DAY * DAYS_PER_YEAR))
            ) /
              parseFloat(formatUnits(totalSupply))) *
            100
          : 0,
      },
    };
  } catch (err) {
    console.error(err);
  }
};
