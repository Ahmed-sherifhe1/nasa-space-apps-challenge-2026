const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiGet<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError(
      "The DELTA 2100 data API is not configured. Set NEXT_PUBLIC_API_URL when the verified data service is available.",
      503,
    );
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(
      `Data request failed with status ${response.status}.`,
      response.status,
    );
  }

  return (await response.json()) as T;
}
