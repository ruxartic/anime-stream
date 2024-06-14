import { rc4Encrypt } from "../../utils/encrypt";
import { substringAfter, substringAfterLast, substringBefore } from "../helpers";

export async function getApiUrl(url, keyList) {
  const host = new URL(url).host;
  const paramsToString = new URL(url).searchParams.toString();
  const vidId = substringBefore(substringAfterLast(url, "/"), "?");
  const encodedID = encodeID(vidId, keyList);
  const apiSlug = await callFromFuToken(host, encodedID, url);
  let apiUrlString = `https://${host}/${apiSlug}`;
  if (paramsToString) {
    apiUrlString += `?${paramsToString}`;
  }
  return apiUrlString;
}



function encodeID(vidId, keyList) {
  const rc4Key1 = keyList[0];
  const rc4Key2 = keyList[1];
  const rc4 = rc4Encrypt(rc4Key1, new TextEncoder().encode(vidId));
  const rc41 = rc4Encrypt(rc4Key2, rc4);
  return Buffer.from(rc41).toString("base64").replace(/\//g, "_").trim();
}


async function callFromFuToken(host, data, url) {
    const fuTokenScript = await fetch(`https://${host}/futoken`, {
        headers: { Referer: url },
    }).then((res) => res.text());

    let js = "(function";
    js += substringBefore(
        substringAfter(substringAfter(fuTokenScript, "window"), "function").replace(
            "jQuery.ajax(",
            ""
        ),
        "+location.search"
    );
    js += `}("${data}"))`;

    console.log(js); // Log the constructed JavaScript function for debugging

    const jsRes = await eval(js);
    if (jsRes === "error") return "";
    return jsRes;
}



