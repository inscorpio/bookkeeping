export async function request<T>(module: string): Promise<T> {
  const baseUrl = 'http://localhost:3000/api/'
  const res = await fetch(baseUrl + module)
  const { data }: { data: T } = await res.json()
  return data
}
