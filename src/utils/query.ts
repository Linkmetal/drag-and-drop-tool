import qs from "query-string";

export const objectToQueryString = (obj: Object) => {
  const newQsValue = qs.stringify(obj, {
    arrayFormat: "comma",
    skipEmptyString: true,
    skipNull: true,
  });

  return newQsValue.length ? `?${newQsValue}` : "";
};

export const queryStringToObject = (query: string) => {
  return qs.parse(query, {
    arrayFormat: "comma",
  });
};
