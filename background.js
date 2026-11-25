
function isAllowedHost(host) {
    const allowedDomains = [
      "chatgpt.com", "claude.ai", "gemini.google.com", "openai.com", "perplexity.ai", "mistral.ai", "openrouter.ai", "character.ai"
    ];

    return allowedDomains.some(
        domain => host === domain || host.endsWith("." + domain)
    );
}

function handleProxyRequest(requestInfo) {
    const url = new URL(requestInfo.url);

    const isProxied = isAllowedHost(url.hostname);

    if (!isProxied) {
        return { type: "direct" };
    }
        console.log("Proxying request to:", url.href);
        return {
            type: "https",
            host: "cdn.klukva.mom",
            port: 443,
            proxyAuthorizationHeader: "Basic " + btoa("a183a8cc835e8dec136ac2466938558e:669fb0a4fff6e5f3d6d732e017cdb1d7")
        };
}

browser.proxy.onRequest.addListener(handleProxyRequest, {
  urls: ["<all_urls>"],
});
