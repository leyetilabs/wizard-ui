import { useTheme } from "next-themes";

const github = "https://github.com/leyetilabs/wizard-ui";

export default {
  docsRepositoryBase: `${github}/tree/main/docs/pages`,
  feedbackLabels: "feedback",
  feedbackLink: () => {
    return "Question? Give us feedback →";
  },
  floatTOC: true,
  footerEditLink: `Edit this page on GitHub`,
  footerText: () => (
    <div className="text-current text-sm">
      Yeti Labs {new Date().getFullYear()} © yetilabs.io
    </div>
  ),
  github,
  head: ({ title, meta }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { systemTheme } = useTheme();
    const description_ =
      meta.description_ ||
      'Wizard UI is a collection of React Hooks containing everything you need to start working with Cosmos. lfg makes it easy to "Connect Wallet," display ENS and balance information, sign messages, interact with contracts, and much more — all with caching, request deduplication, and persistence.';
    const title_ =
      title && !title.startsWith("Wizard")
        ? title + " – Wizard UI"
        : "Wizard UI: React Components and Hooks for Cosmos";
    return (
      <>
        {/* General */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <title>{title_}</title>

        {/* SEO */}
        <meta name="description" content={description_} />
        <meta name="og:description" content={description_} />
        <meta name="og:title" content={title_} />
        <meta name="og:image" content="https://yetilabs.io/wizard-ui/og.png" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Misc */}
        <meta name="apple-mobile-web-app-title" content="lfg" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        {/* Dynamic favicon */}
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicons/favicon.svg"
          key="dynamic-favicon"
        />
      </>
    );
  },
  logo: () => {
    return (
      <>
        <span className="mr-2 font-extrabold">Wizard UI</span>
        <span className="text-gray-600 font-normal hidden md:inline">
          React Components and Hooks for Cosmos
        </span>
      </>
    );
  },
  nextLinks: true,
  nextThemes: {
    defaultTheme: "dark",
  },
  prevLinks: true,
  projectLink: github,
  search: true,
  titleSuffix: " – Wizard UI",
  unstable_flexsearch: true,
};
