import { getAllCoins } from "../api/api"

export const useApi = () => {
    
    const handleAllCoins = () => getAllCoins()
    
    return {
        handleAllCoins,
    }
}