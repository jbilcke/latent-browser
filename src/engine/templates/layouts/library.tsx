import {
  JSXTemplate,
  P,
  Link,
  Span,
  Image,
  H1,
  H3,
  H2,
} from '../ai-design-system'

// https://web3templates.com/preview/sandocs
export const libraryLayout: JSXTemplate = {
  description:
    'page to present a software tool or library, open-source or commercial, like on github, with screenshots',
  layout: (
    <div>
      <header className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2">
          <Link className="flex" href="/">
            <Span>emoji and text logo</Span>
          </Link>
        </div>
        <nav className="flex items-center gap-5">
          <Link
            className="hidden sm:inline-flex items-center gap-1 text-sm border-b text-slate-900 hover:text-blue-500 hover:border-blue-200 focus-visible:bg-blue-100 focus-visible:border-blue-100 focus-visible:outline-4 focus-visible:outline-blue-100"
            href="/docs"
          >
            top nav link eg. documentation
          </Link>
          <Link className="hidden sm:inline-flex items-center gap-1 text-sm border-b text-slate-900 hover:text-blue-500 hover:border-blue-200 focus-visible:bg-blue-100 focus-visible:border-blue-100 focus-visible:outline-4 focus-visible:outline-blue-100">
            to nav link eg download
          </Link>
        </nav>
      </header>

      <div className="fixed inset-0 [background:radial-gradient(circle_at_15%_50%,rgb(237,233,254),rgb(255_255_255/0)25%),radial-gradient(circle_at_85%_30%,rgb(216,243,246),rgb(255_255_255/0)25%)] opacity-40 from-blue-100 -z-10"></div>
      <div className="max-w-2xl text-center mx-auto py-24 px-5">
        <Span className="p-4 bg-blue-500 text-white inline-flex rounded-full ">
          emoji logo
        </Span>
        <H1 className="text-3xl md:text-6xl font-bold tracking-tight mt-2">
          main page title
        </H1>
        <P className="mt-3 text-gray-500 md:text-lg">Main paragraph</P>
        <div className="flex justify-center flex-col md:flex-row mt-5 gap-3">
          <span className="bg-blue-100 flex gap-5 items-center justify-between py-3 px-5 rounded-full">
            <code className="text-blue-900 text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
              command line to type to install the tool
            </code>
          </span>
          <Link
            className="bg-blue-500 justify-center inline-flex items-center gap-2 rounded-full py-3 px-6 text-white font-medium hover:bg-blue-700"
            href="/docs"
          >
            link to the documentation
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 max-w-screen-lg mx-auto gap-10 mt-10 px-5">
        <div className="flex gap-4 items-start flex-col">
          <Span className="text-blue-600 bg-blue-500/10 p-3 rounded-full">
            emoji icon
          </Span>
          <div>
            <H3 className="font-semibold text-xl">feature title N</H3>
            <P className="mt-1 text-gray-500">Feature explanation N</P>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 max-w-screen-lg mx-auto mt-40 px-5 gap-5">
        <div className="flex items-center flex-wrap">
          <div className="max-w-sm">
            <Span className="text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full text-xs uppercase font-medium tracking-wider">
              a small tag
            </Span>
            <H2 className="font-semibold text-2xl mt-3">
              title to present the main feature
            </H2>
            <P className="mt-2 text-gray-500">
              More detailed explanations of the feature
            </P>
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex flex-col opacity-100 rounded-3xl shadow-xl bg-gradient-to-br from-[#9795f0] to-[#fbc8d4]">
            <Image>screenshot of the application</Image>
          </div>
        </div>
      </div>
    </div>
  ),
}
