/**
 * Reviews.io carousel (iframeless). Dashboard → Widgets → copy embed; override store via
 * `VITE_REVIEWS_IO_STORE` if needed.
 */
export const REVIEWS_IO_ASSET_QUERY = "?_t=2026033108" as const;

export const REVIEWS_IO_URLS = {
  script: `https://widget.reviews.io/carousel-inline-iframeless/dist.js${REVIEWS_IO_ASSET_QUERY}`,
  carouselCss: `https://assets.reviews.io/css/widgets/carousel-widget.css${REVIEWS_IO_ASSET_QUERY}`,
  iconsCss: `https://assets.reviews.io/iconfont/reviewsio-icons/style.css${REVIEWS_IO_ASSET_QUERY}`,
} as const;

export const REVIEWS_IO_STORE =
  (import.meta.env.VITE_REVIEWS_IO_STORE as string | undefined)?.trim() ||
  "healthcovercomparison.co.uk-p0p1nby";

const WIDGET_CONTAINER_ID = "reviewsio-carousel-widget";

export type CarouselInlineWidgetConfig = {
  store: string;
  sku: string;
  lang: string;
  carousel_type: string;
  styles_carousel: string;
  options: Record<string, Record<string, unknown>>;
  translations: Record<string, string>;
  styles: Record<string, string>;
};

export function getReviewsIoCarouselConfig(store: string): CarouselInlineWidgetConfig {
  return {
    store,
    sku: "",
    lang: "en",
    carousel_type: "default",
    styles_carousel: "CarouselWidget--sideHeader--withcards",
    options: {
      general: {
        review_type: "company, product",
        min_reviews: "1",
        max_reviews: "20",
        address_format: "CITY, COUNTRY",
        enable_auto_scroll: 10000,
        enable_pause_button: true,
        enable_sorting: false,
      },
      header: {
        enable_overall_stars: true,
        rating_decimal_places: 2,
      },
      reviews: {
        enable_customer_name: true,
        enable_customer_location: true,
        enable_verified_badge: true,
        enable_subscriber_badge: true,
        enable_recommends_badge: true,
        enable_photos: true,
        enable_videos: true,
        enable_review_date: true,
        disable_same_customer: true,
        min_review_percent: 4,
        third_party_source: true,
        hide_empty_reviews: true,
        enable_product_name: true,
        tags: "",
        branch: "",
        enable_branch_name: false,
      },
      popups: {
        enable_review_popups: true,
        enable_helpful_buttons: true,
        enable_helpful_count: true,
        enable_share_buttons: true,
      },
    },
    translations: {
      verified_customer: "Verified Customer",
    },
    styles: {
      "--base-font-size": "16px",
      "--base-maxwidth": "100%",
      "--reviewsio-logo-style": "var(--logo-inverted)",
      "--common-star-color": " #0E1311",
      "--common-star-disabled-color": " rgba(0,0,0,0.25)",
      "--medium-star-size": " 22px",
      "--small-star-size": "19px",
      "--x-small-star-size": "16px",
      "--x-small-star-display": "inline-flex",
      "--header-order": "1",
      "--header-width": "280px",
      "--header-bg-start-color": "#0E1311",
      "--header-bg-end-color": "#0E1311",
      "--header-gradient-direction": "135deg",
      "--header-padding": "1.5em",
      "--header-border-width": "0px",
      "--header-border-color": "rgba(0,0,0,0.1)",
      "--header-border-radius": "0px",
      "--header-shadow-size": "10px",
      "--header-shadow-color": "rgba(0, 0, 0, 0.05)",
      "--header-star-color": "#ffffff",
      "--header-disabled-star-color": "inherit",
      "--header-heading-text-color": "#ffffff",
      "--header-heading-font-size": "inherit",
      "--header-heading-font-weight": "inherit",
      "--header-heading-line-height": "inherit",
      "--header-heading-text-transform": "inherit",
      "--header-subheading-text-color": "#ffffff",
      "--header-subheading-font-size": "inherit",
      "--header-subheading-font-weight": "300",
      "--header-subheading-line-height": "inherit",
      "--header-subheading-text-transform": "inherit",
      "--item-maximum-columns": "5",
      "--item-background-start-color": "#ffffff",
      "--item-background-end-color": "#ffffff",
      "--item-gradient-direction": "135deg",
      "--item-padding": "1.5em",
      "--item-border-width": "0px",
      "--item-border-color": "rgba(0,0,0,0.1)",
      "--item-border-radius": "0px",
      "--item-shadow-size": "10px",
      "--item-shadow-color": "rgba(0,0,0,0.05)",
      "--heading-text-color": " #0E1311",
      "--heading-text-font-weight": " 600",
      "--heading-text-font-family": " inherit",
      "--heading-text-line-height": " 1.4",
      "--heading-text-letter-spacing": "0",
      "--heading-text-transform": "none",
      "--body-text-color": " #0E1311",
      "--body-text-font-weight": "400",
      "--body-text-font-family": " inherit",
      "--body-text-line-height": " 1.4",
      "--body-text-letter-spacing": "0",
      "--body-text-transform": "none",
      "--scroll-button-icon-color": "#0E1311",
      "--scroll-button-icon-size": "24px",
      "--scroll-button-bg-color": "transparent",
      "--scroll-button-border-width": "0px",
      "--scroll-button-border-color": "rgba(0,0,0,0.1)",
      "--scroll-button-border-radius": "60px",
      "--scroll-button-shadow-size": "0px",
      "--scroll-button-shadow-color": "rgba(0,0,0,0.1)",
      "--scroll-button-horizontal-position": "3px",
      "--scroll-button-vertical-position": "0px",
      "--badge-icon-color": "#0E1311",
      "--badge-icon-font-size": "15px",
      "--badge-text-color": "#0E1311",
      "--badge-text-font-size": "inherit",
      "--badge-text-letter-spacing": "inherit",
      "--badge-text-transform": "inherit",
      "--author-font-size": "inherit",
      "--author-font-weight": "inherit",
      "--author-text-transform": "inherit",
      "--photo-video-thumbnail-size": "60px",
      "--photo-video-thumbnail-border-radius": "0px",
      "--popup-backdrop-color": "rgba(0,0,0,0.75)",
      "--popup-color": "#ffffff",
      "--popup-star-color": "inherit",
      "--popup-disabled-star-color": "inherit",
      "--popup-heading-text-color": "inherit",
      "--popup-body-text-color": "inherit",
      "--popup-badge-icon-color": "inherit",
      "--popup-badge-icon-font-size": "19px",
      "--popup-badge-text-color": "inherit",
      "--popup-badge-text-font-size": "14px",
      "--popup-border-width": "0px",
      "--popup-border-color": "rgba(0,0,0,0.1)",
      "--popup-border-radius": "0px",
      "--popup-shadow-size": "0px",
      "--popup-shadow-color": "rgba(0,0,0,0.1)",
      "--popup-icon-color": "#0E1311",
      "--tooltip-bg-color": "#0E1311",
      "--tooltip-text-color": "#ffffff",
    },
  };
}

export { WIDGET_CONTAINER_ID };
