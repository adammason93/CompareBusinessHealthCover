/**
 * Regenerates public/reviews-carousel.html with config embedded (no extra fetch).
 * Run: npx tsx scripts/generate-reviews-carousel-html.mts
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  getReviewsIoCarouselConfig,
  REVIEWS_IO_ASSET_QUERY,
  REVIEWS_IO_STORE,
} from "../src/config/reviewsIoCarousel.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const cfg = getReviewsIoCarouselConfig(REVIEWS_IO_STORE);
const json = JSON.stringify(cfg).replace(/</g, "\\u003c");
const q = REVIEWS_IO_ASSET_QUERY;

const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Reviews.io carousel</title>
  <link rel="stylesheet" href="https://assets.reviews.io/css/widgets/carousel-widget.css${q}" />
  <link rel="stylesheet" href="https://assets.reviews.io/iconfont/reviewsio-icons/style.css${q}" />
  <style>html,body{margin:0;padding:0;background:transparent;min-height:100%;}</style>
</head>
<body>
  <div id="reviewsio-carousel-widget"></div>
  <script type="application/json" id="reviewsio-cfg">${json}</script>
  <script src="https://widget.reviews.io/carousel-inline-iframeless/dist.js${q}"></script>
  <script>
  (function () {
    var el = document.getElementById("reviewsio-cfg");
    var cfg = el ? JSON.parse(el.textContent || "{}") : {};
    function run() {
      if (typeof carouselInlineWidget === "undefined") {
        setTimeout(run, 50);
        return;
      }
      try {
        new carouselInlineWidget("reviewsio-carousel-widget", cfg);
      } catch (e) {
        console.error("[Reviews.io] init failed", e);
      }
    }
    run();
  })();
  </script>
</body>
</html>
`;

writeFileSync(join(root, "public/reviews-carousel.html"), html, "utf8");
console.log("Wrote public/reviews-carousel.html (store:", REVIEWS_IO_STORE + ")");
