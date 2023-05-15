import logo from './logo.svg';
import './App.css';
import { ConnectWallet } from "@thirdweb-dev/react";

function App() {
  return (
    <>
      <ConnectWallet
        theme="dark"
        btnTitle="Connect Wallet"
      />
    </>
  );
}

export default App;
