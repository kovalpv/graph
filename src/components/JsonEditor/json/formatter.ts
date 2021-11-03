/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
export default function jsonFormatter(json: Record<any, any>): string {
  const exp = /^[\s]*[\[\*][\s"0-9,]*[\]\*]/gm;
  const indent = 2;
  const jsonString = JSON.stringify(json, null, indent);
  const inline = (str) => {
    const lineIndent = "".padStart(indent * 2, " ");
    const formatString = JSON.stringify(JSON.parse(str)).replaceAll(",", ", ");
    return `${lineIndent}${formatString}`;
  };
  return jsonString.replace(exp, inline);
}
