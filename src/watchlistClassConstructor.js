import convertNumToUSD from "./utilityFunctions"

class WatchlistCoin {
    constructor(coin){
        this.key = coin.name
        this.id = coin.id
        this.name = coin.name
        this.symbol = coin.symbol
        this.image = coin.image
        this.rank = coin.market_cap_rank
        this.currentPrice = convertNumToUSD(coin.current_price)
        this.ath = convertNumToUSD(coin.ath)
        this.high24h = convertNumToUSD(coin.high_24h)
        this.low24h = convertNumToUSD(coin.low_24h)
        this.mktCap = convertNumToUSD(coin.market_cap)
        }
    }

export default WatchlistCoin