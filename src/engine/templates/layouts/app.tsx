import {
  JSXTemplate,
  Paragraph,
  P,
  T,
  Div,
  H5,
  Link,
  Span,
  Icon,
  Image,
  H1,
} from '../ai-design-system'

// kitwind.io/products/kometa/components/contents
export const appLayout: JSXTemplate = {
  description:
    'generic application with a top navigation bar, side menu on the left and main content on the right',
  layout: (
    <>
      <div className="w-screen h-screen flex flex-col bg-gray-100 sm:flex-row flex-grow overflow-hidden">
        <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
          <div className="sticky top-0 p-4 bg-gray-300 rounded-xl w-full">
            <ul className="flex sm:flex-col overflow-hidden content-center justify-between text-gray-700">
              <li className="py-2 hover:bg-gray-400 rounded">
                <Link className="truncate">
                  <Span className="hidden sm:inline">menu link 1</Span>
                </Link>
              </li>
              <li className="py-2 hover:bg-indigo-300 rounded">
                <Link className="truncate">
                  <Span className="hidden sm:inline">menu link ..</Span>
                </Link>
              </li>
              <li className="py-2 hover:bg-indigo-300 rounded">
                <Link className="truncate">
                  <Span className="hidden sm:inline">menu link N</Span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="bg-gray-300 rounded-xl border my-3 w-full">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <Span className="block text-blue-600 overflow-ellipsis">
                  marketing punch line
                </Span>
              </h2>
            </div>
          </div>
        </div>
        <main role="main" className="w-full h-full flex-grow p-3 overflow-auto">
          <H1 className="text-3xl md:text-5xl mb-4 font-extrabold text-blue-600">
            application title
          </H1>
          <Div className="py-2 text-xl text-gray-800">main content</Div>
        </main>
      </div>
    </>
  ),
}
