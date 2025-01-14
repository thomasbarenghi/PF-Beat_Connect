export const buildQueryString = (params: any): string => {
  const validParams = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined && value !== 0)
    .map(([key, value]) => `${key}=${encodeURIComponent(value as any)}`)
    .join('&')

  return validParams ? `?${validParams}` : ''
}
