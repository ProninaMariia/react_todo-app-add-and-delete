const BASE_URL = 'https://mate.academy/students-api';

export const client = {
  get: async (url: string) => {
    const response = await fetch(`${BASE_URL}${url}`);

    return response.json();
  },
  post: async (url: string, data: unknown) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    return response.json();
  },
};
