import { StacksMocknet } from '@stacks/network'
import config from '../utils/config'

const useNetwork = () => {
  const network = new StacksMocknet({ url: config.chainAddress })
  return network
}

export default useNetwork
