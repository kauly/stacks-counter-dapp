import { useCallback, useEffect, useState } from 'react'
import { cvToString, hexToCV } from '@stacks/transactions'
import useInterval from '@use-it/interval'
import useSmartContractApi from './useSmartContractApi'
import { CallReadOnlyFunctionRequest } from '@stacks/blockchain-api-client'
import config from '../utils/config'

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
        const parsed = cvToString(hexToCV(response.result)).slice(2, -1)
        console.log(
          '🚀 ~ file: useSmartContract.ts ~ line 31 ~ getCounterValue ~ result',
          response.result
        )
        setCounter(parseInt(parsed))
      }
    } catch (err) {
      console.log(
        '🚀 ~ file: useSmartContract.ts ~ line 35 ~ getCounterValue ~ err',
        err
      )
      setError(err?.message)
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
