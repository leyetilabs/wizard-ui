export function Header() {
  return (
    <header className="mb-10 flex flex-col items-center">
      {/* <div className="mt-8 w-auto h-12 md:h-36">
        <h1 className="sr-only">@leyetilabs/wizard-ui</h1>
        <LogoType />
      </div> */}

      <h1 className="mt-12 text-6xl font-extrabold tracking-tighter leading-[1.1] sm:text-7xl lg:text-8xl xl:text-8xl text-center mb-6 font-black">
        React Components{" "}
        <span className="text-transparent bg-gradient-to-r from-yellow-500 to-purple-500 bg-clip-text">
          and Hooks for Cosmos
        </span>
      </h1>

      <div className="flex flex-wrap gap-2 justify-center max-w-[28rem] min-h-[3rem]">
        <a
          aria-label="Version"
          href="https://www.npmjs.com/package/@wizard-ui/react"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/npm/v/@wizard-ui/react?colorA=2B323B&colorB=1e2329&style=flat&label=Version"
          />
        </a>

        <a
          aria-label="License"
          href="https://www.npmjs.com/package/@wizard-ui/react"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/npm/l/@wizard-ui/react?colorA=2B323B&colorB=1e2329&style=flat&label=License"
          />
        </a>

        <a
          aria-label="Downloads"
          href="https://www.npmjs.com/package/@wizard-ui/react"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/npm/dm/@wizard-ui/react?colorA=2B323B&colorB=1e2329&style=flat&label=Downloads"
          />
        </a>

        <a
          aria-label="Stars"
          href="https://github.com/leyetilabs/wizard-ui"
          className="h-5"
        >
          <img
            alt=""
            src="https://img.shields.io/github/stars/leyetilabs/wizard-ui?colorA=2B323B&colorB=1e2329&style=flat&label=Stars"
          />
        </a>
      </div>
    </header>
  );
}
