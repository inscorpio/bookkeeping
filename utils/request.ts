export enum RequestModule {
  category = 'category',
  bill = 'bill',
}

export async function request<T>(module: RequestModule, init?): Promise<T> {
  const baseUrl = 'http://localhost:3000/api/'
  const res = await fetch(baseUrl + module, init)
  const { data }: { data: T } = await res.json()
  return data
}
