import { useState } from 'react';

export function useAsync(asyncFunction) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [lastArg, setLastArg] = useState(null);

  const run = async (arg) => {
    setLastArg(arg);
    setStatus('loading');
    setError(null);

    try {
      const result = await asyncFunction(arg);
      setData(result);
      setStatus('success');
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setStatus('error');
      throw err;
    }
  };

  const retry = () => {
    return run(lastArg);
  };

  const reset = () => {
    setStatus('idle');
    setData(null);
    setError(null);
  };

  return {
    status,
    data,
    error,
    run,
    retry,
    reset,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    isIdle: status === 'idle',
  };
}

export default useAsync;
