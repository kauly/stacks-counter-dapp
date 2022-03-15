import { StacksMocknet, HIRO_TESTNET_DEFAULT } from '@stacks/network'

const useNetwork = () => {
  const network = new StacksMocknet({ url: HIRO_TESTNET_DEFAULT })
  return network
}

export default useNetwork
