import { useCallback, useEffect, useState } from 'react'
import { cvToString, hexToCV } from '@stacks/transactions'
import { CallReadOnlyFunctionRequest } from '@stacks/blockchain-api-client'
import useInterval from '@use-it/interval'
import config from '@/utils/config'
import { getErrorMessage } from '@/utils/helpers'
import useSmartContractApi from './useSmartContractApi'

const { contractAddress, contractName } = config

const request: CallReadOnlyFunctionRequest = {
  contractAddress: contractAddress,
  contractName: contractName,
  functionName: 'get-counter',
  readOnlyFunctionArgs: {
    arguments: [],
    sender: contractAddress,
  },
}

const useSmartContract = () => {
  const client = useSmartContractApi()
  const [counter, setCounter] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getCounterValue = useCallback(async () => {
    try {
      const response = await client.callReadOnlyFunction(request)
      setError('')
      if (response.okay && response.result) {
        // cvToString will return (ok n), that is why the slice here
        const parsedToString = cvToString(hexToCV(response.result)).slice(3, -1)
        const parsedToNumber = parseInt(parsedToString)
        setCounter((p) => (p !== parsedToNumber ? parsedToNumber : p))
      }
    } catch (err) {
      const message = getErrorMessage(err)
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [client])

  useEffect(() => {
    getCounterValue()
  }, [getCounterValue])

  useInterval(getCounterValue, 3000)

  return { loading, error, counter }
}

export default useSmartContract
