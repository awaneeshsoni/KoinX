import axios from 'axios';
import Crypto from '../models/Crypto.js';

const fetchCryptoData = async () => {
    try {
        const coins = ['bitcoin', 'matic-network', 'ethereum'];
        console.log("fetching from gecko")
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price`,
            {
                params: {
                    ids: coins.join(','),
                    vs_currencies: 'usd',
                    include_market_cap: true,
                    include_24hr_change: true,
                },

                headers: {
                    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                    'Content-Type': 'application/json',
                },

            }
        );
        console.log("fecthed from gecko")

        const data = response.data;
        for (const coin of coins) {
            await Crypto.create({
                name: coin,
                price: data[coin].usd,
                marketCap: data[coin].usd_market_cap,
                change24h: data[coin].usd_24h_change,
            });
        }

        console.log('Crypto data updated successfully');
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error.message);
    }
};

export default fetchCryptoData;
