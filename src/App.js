import logo from './logo.svg';
import './App.css';
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { Web3Button } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import "./styles/home.css";
import { useState } from 'react';

const stakingAddress = "0x51D3D25328ee66a6A399EEA31eD77fa0f3C78E6d"; // Staking Contract
const tokenAddress = "0x2c9125eF71DCfa1D6f0f2f05C253E8394B15C69E" // Mustafa Ensar Token Address
function App() {

  const { contract } = useContract(stakingAddress);
  const {contract: stakingToken, isLoading: isStakingTokenLoading} = useContract(tokenAddress)
  console.log(stakingToken);
  const address = useAddress();
  const { data, isLoading } = useContractRead(contract, "getStakeInfo", [address])

  const [amountToStake, setAmountToStake] = useState(0);

  return (
    <>
      <div className="container">
        <main className="main">
          <h1 className="title">Welcome to staking app!</h1>

          <p className="description">
            Stake certain amount and get reward tokens back!
          </p>

          <div className="connect">
            <ConnectWallet />
          </div>

          {address && 
          
          <div className='stakeContainer'>
            
            <input 
              className='textbox' 
              type='number' 
              value={amountToStake} 
              onChange={(e) => setAmountToStake(e.target.value)} 
            />
            
            <Web3Button
              contractAddress= {stakingAddress}
              action= {async(contract) => {
                await stakingToken.setAllowance(stakingAddress, amountToStake);
                await contract.call('stake', [ethers.utils.parseEther(amountToStake)])}}
              theme="dark"
            >
              Stake
            </Web3Button>
            
            <Web3Button
              contractAddress= {stakingAddress}
              action= {async(contract) => {
                await contract.call('withdraw', [ethers.utils.parseEther(amountToStake)])}}
              theme="dark"
            >
              UnStake (Withdraw)
            </Web3Button>

            <Web3Button
              contractAddress= {stakingAddress}
              action= {async(contract) => {
                await contract.call('claimRewards')}}
              theme="dark"
            >
              Claim
            </Web3Button>
          </div>
          }

          <div className="grid">
            <a className="card">
              Staked: {data?._tokensStaked && ethers.utils.formatEther(data?._tokensStaked)} UT <br></br>
            </a>
            <a className="card">
              Rewards: {data?._rewards && Number(ethers.utils.formatEther(data?._rewards)).toFixed(2)} MET
            </a>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;