export class HttpClient {
  private defaultTimeoutMs: number;

  constructor(defaultTimeoutMs: number = 8000) {
    this.defaultTimeoutMs = defaultTimeoutMs;
  }

  public async get<T>(url: string, timeoutMs?: number): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, timeoutMs || this.defaultTimeoutMs);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new Error(`Petición abortada por timeout (${url})`);
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
}

export const httpClient = new HttpClient();
