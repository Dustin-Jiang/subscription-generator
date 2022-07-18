export type DateType = 
    "yymmdd"
  | "YYYYmmdd"
  | "yymm"
  | "YYYYmm"

export function parseDateType (
  scheme: DateType[],
  offset: number
) : string {
  let timestamp = new Date().valueOf() - offset * 24 * 60 * 60 * 1000
  let time = new Date(timestamp)
  let result = deepCopy(scheme) as string[]

  for (let i in result) {
    result[i] = result[i].replace("yy", time.getUTCFullYear().toString().slice(2))
    result[i] = result[i].replace("YYYY", time.getUTCFullYear().toString())
    result[i] = result[i].replace("mm", ("0" + (time.getUTCMonth() + 1).toString()).slice(-2))
    result[i] = result[i].replace("dd", ("0" + time.getUTCDate().toString()).slice(-2))
  }

  return result.join("/")
}

function deepCopy(obj : any) {
  let _obj = Array.isArray(obj) ? [] : {};
  for (let i in obj) {
    //@ts-ignore
    _obj[i] = typeof obj[i] === "object" ? deepCopy(obj[i]) : obj[i];
  }
  return _obj;
}