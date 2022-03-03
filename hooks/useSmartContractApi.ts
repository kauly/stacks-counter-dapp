import { Configuration, SmartContractsApi } from '@stacks/blockchain-api-client'
import useNetwork from './useNetwork'

const useSmartContractApi = () => {
  const network = useNetwork()
  const config = new Configuration({ basePath: network.coreApiUrl })
  return new SmartContractsApi(config)
}

export default useSmartContractApi
