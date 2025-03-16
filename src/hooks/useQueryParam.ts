export const useQueryParam = (paramName: string) => {
  const params = new URLSearchParams(window.location.search);
  const value = params.get(paramName);
  return value;
};
