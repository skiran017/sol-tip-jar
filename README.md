# Solana Based Tip-Jar
This tip-jar can be added to any website – a simple way to accept money without having to use PayPal, Stripe, or any other payment gateway.

If your browser does not have Phantom Wallet

![get](https://user-images.githubusercontent.com/23178403/147459890-9a80251a-89e0-44a6-8e67-10d642b66199.PNG)


If your broswer already has a Phantom wallet

![connect](https://user-images.githubusercontent.com/23178403/147459597-a694d4d1-6d95-41cf-89b7-44ae82baa7d4.PNG)

## To Resolve global error use the snippet below in the head tag of html

```javascript
<script>
      if (global === undefined) {
        var global = window;
      }
</script>
```
### To get started
1. npm i solana-tipjar or yarn add solana-tipjar
2. import {TipWidgetWrapper} from 'solana-tipjar'
3. It takes props of network='devnet' or 'mainnet-beta' and  recieverAddress='INSERT_THE_WALLET_ADDRESS' is the wallet adderss where you want the people to send the tip. 
