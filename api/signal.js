export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { asset, timeframe } = req.body || {};

  const assets = asset
    ? [asset]
    : [
        "BTC/USDT",
        "ETH/USDT",
        "EUR/USD",
        "GBP/USD",
        "USD/JPY",
        "XAU/USD",
        "NASDAQ",
        "SP500",
        "OTC-EURUSD",
        "OTC-BTC"
      ];

  function analyze(asset) {
    const trend = Math.random();
    const momentum = Math.random();
    const volatility = Math.random();

    const score = trend * 0.4 + momentum * 0.4 + volatility * 0.2;

    return {
      asset,
      signal: score > 0.55 ? "BUY" : "SELL",
      confidence: Number(score.toFixed(2)),
      timeframe: timeframe || "1–10 min",
      engine: "vercel-backend",
      time: new Date().toISOString()
    };
  }

  const signals = assets.map(analyze);

  res.status(200).json({ signals });
}
