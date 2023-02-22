import numeral from "numeral";

//the numbers on the dashboard page are generally formatted consistently with each other,
//and usually to greater precision than we want on other pages, so gather the canonical
//formatting treatments for components on the page here

export const formatNum = (val: number) => numeral(val).format("0,"); //123,456,789
export const formatEth = (eth: number) => numeral(eth).format("0.00a"); //123.45k
export const formatOgn = (ogn: number) => numeral(ogn).format("0a"); //123k
export const formatUSD = (usd: number) => numeral(usd).format("0,"); //123,456,789
export const formatChange = (change: number) => numeral(change).format("0.00"); //123.45
