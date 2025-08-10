


export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  
  const token = localStorage.getItem("jwt_token");


  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return response.json();
}