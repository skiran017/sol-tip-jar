<h1><b><center>Solana Tip Jar</center></b></h1>

- [Introduction](#introduction)
- [Install](#install)
- [Quick Start Example:](#quick-start-example)
- [API Reference](#api-reference)
- [Credits](#credits)

## Introduction

Tip Jars or personal Donate me widgets, they are everywhere these days. Personal webpages to showcase your work and a way to let others support what you do is all awesome and traditionally its Paypal which went popular with its little Donate or custom widget. There are also other Web 2.0 based solutions. 

Solana Tip Jar is a 100% Web 3.0 based solution which will enable you to accept tips/donations on Solana network using Phantom wallet. Why Solana? Why not! Scalable, Low gas fee and Super awesome community. 

**Note: This package is still evolving in terms of features and functionalities**

## Install

npm:

```bash
npm i solana-tipjar
```

yarn:

```bash
yarn add solana-tipjar
```

## Quick Start Example:

Solana Tip Jar provides two solutions:
* hook based
* Widget Component(React)
	* Regular
	* Floating Action Button (FAB) - (Coming soon)

CodeSandbox Link:
https://codesandbox.io/s/solana-tip-jar-z74dm

**Hook Based Custom Implementation**
```jsx
import  *  as  React  from  "react";
import  {  useTipJar  }  from  "solana-tipjar";
export  default  function  DemoHookExample()  {
const  [solVal, setSolVal] =  React.useState(0.02);
const {
phantomWalletExists,connectWallet,sendTransaction,
transactionStatus,userWalletAddressLoaded,resetTipJar} =  useTipJar({ network:  "devnet"  });

if (!phantomWalletExists) {
	return (
		<div>
			<h2>Phantom wallet not found</h2>
			<a  href="https://phantom.app/"  target="_blank">Get here</a>
		</div>
	);
}

if (transactionStatus  ===  "confirmed")  {
	return  (
		<div>
			<h2>Success</h2>
			<button	onClick={() =>  {
				setSolVal(0.02);
				resetTipJar();
			}}>reset</button>
		</div>
	);
}

return (
	<div  className="demohook-container">
		{!userWalletAddressLoaded && (
			<div>
				<button
				onClick={() =>  {
				connectWallet();
				}}>
				connet wallet
				</button>
			</div>
		)}
		{userWalletAddressLoaded && (
		<>
			<input
			type="number"
			value={solVal}
			onChange={(e) =>  setSolVal(+e.target.value)}
			/>
			<button
			className="demohook-tipbtn"
			onClick={() =>  {
				if (solVal >  0) {
					sendTransaction(solVal,"C4rYug44LyJBcYQPgTBC7uy52rzWvoBo4tC1p2DvkNmj");
				}
			}}>
			Tip Me
			</button>
			</>
		)}
	</div>
);
}
```

<a href="https://ibb.co/sszbwt5"><img src="https://i.ibb.co/mhgbqSv/Screenshot-2021-12-28-at-10-08-58-PM.png" alt="Screenshot-2021-12-28-at-10-08-58-PM" border="0"></a>

**Regular component Implementation**

```jsx
import  *  as  React  from  "react";
import  {  TipWidgetWrapper  }  from  "solana-tipjar";

export  default  function  DemoRegular()  {
	return  (
		<TipWidgetWrapper
		network="devnet"
		recieverAddress="R4rYug44LyJBcYQPgTBC7uy52rzWvoBo4tC1p2DvkNmj"/>
	);
}
```

![connect](https://user-images.githubusercontent.com/23178403/147459597-a694d4d1-6d95-41cf-89b7-44ae82baa7d4.PNG)

## API Reference

**Component TipWidgetWrapper**

```ts
import { TipWidgetWrapper } from "solana-tipjar";
```

**Props**

| Name      | Type | Default | Description |
| ----------- | ----------- |  ----------- | ---------|
| network      | "devnet" \| "testnet" \| "mainnet-beta"| "devnet" | Solana Chain network type for txn
| recieverAddress   | String        | |ed25519 public key as buffer or base-58 encoded string

**Hook useTipJar**
```ts
const {
	phantomWalletExists,
	connectWallet,
	sendTransaction,
	transactionStatus,
	userWalletAddressLoaded,
	resetTipJar
} =  useTipJar(options);//{network:"devnet"}
```
**Arguments**
| Name      | Type | Default | Description |
| ----------- | ----------- |  ----------- | ---------|
| options      | Object|      | Config object to init the tipjar hook. just provide network type.

**Return**
	- ***Object***
| Name      | Type | Default | Description |
| ----------- | ----------- |  ----------- | ---------|
| phantomWalletExists  | boolean| false | turns true if phantom wallet is detected in the browser
| transactionStatus   | "idle"\| "submitting"\| "submitted"\| "confirmed"\| "error"| "idle"| Turns to one of the following type during an ongoing transaction
| userWalletAddressLoaded   | Boolean| false| Turns true if user is connected to Phantom wallet
|connectWallet| () => void| | connectWallet(); if userWalletAddressLoaded is false, use this method to connect the user to phantom wallet
|sendTransaction| (tipValue:number, recieverAddress:string) => void| | sendTransaction(0.02,"R4rYug44LyJBcYQPgTBC7uy52rzWvoBo4tC1p2DvkNmj"); On Calling this Fn, status on Txn will be communicated thru transactionStatus property.
|resetTipJar| () => void | | On Calling this Fn, it resets the transaction status to idle again, sets the tipjar for another Txn. Call this after a successful transaction to start fresh again. 

## Issues

If you are facing any issues related to global is undefined please use the below script in the head tag of your html template

```html
<script>
    if (global === undefined) {
      var global = window;
    }
</script>
```

## Credits

- [@FarzaTV(Farza)](https://twitter.com/FarzaTV) and [@_buildspace(BuildSpace)](https://twitter.com/_buildspace) for the first Solana based project which inspired us to build more on Solana chain. 
- [@skranthi97 aka kranthicodes (Sai Kranthi)](https://twitter.com/skranthi97) for contributing to the project.



