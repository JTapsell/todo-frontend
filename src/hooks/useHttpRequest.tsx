// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, useEffect, useRef } from 'react';

interface RequestProps {
  url: string;
  method: string;
  headers?: any;
  body?: string | null;
}

export const useHttpRequest = () => {
  const activeRequests = useRef([]);

  const sendRequest = useCallback(async (props: RequestProps) => {
    const { url, method, headers, body } = props;
    const httpAbortControl = new AbortController();
    activeRequests.current.push(httpAbortControl);

    try {
      const request = await fetch(url, {
        method,
        headers,
        body,
        signal: httpAbortControl.signal,
      });
      const requestData = await request.json();

      if (!request.ok) {
        throw new Error(requestData.message);
      }

      return requestData;
    } catch (err) {
      console.log(err);
    }
    return null;
  }, []);

  useEffect(() => {
    return () => {
      activeRequests.current.forEach(ctrl => ctrl.abort());
    };
  }, []);
  return { sendRequest };
};
