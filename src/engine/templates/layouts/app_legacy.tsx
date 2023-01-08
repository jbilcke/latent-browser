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
} from '../ai-design-system'

// kitwind.io/products/kometa/components/contents
export const appLayout: JSXTemplate = {
  description:
    'application layout, with a top navigation bar, side menu on the left and main content on the right',
  layout: (
    <>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            <Link>application name</Link>
          </div>
          <ul className="space-y-2 tracking-wide mt-8">
            <li>
              <Link className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                <Span className="-mr-1 font-medium">active menu label</Span>
              </Link>
            </li>
            <li>
              <Link className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <Span className="group-hover:text-gray-700">menu label</Span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <Span className="group-hover:text-gray-700">
              bottom left menu action
            </Span>
          </button>
        </div>
      </aside>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <H5 className="hidden text-2xl text-gray-600 font-medium lg:block">
              left side of the top navigation bar (eg. title)
            </H5>
            <Div className="flex space-x-4">
              right side of the top navigation bar (eg. button)
            </Div>
          </div>
        </div>
        <div className="px-6 pt-6 2xl:container">
          <Div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            html content
          </Div>
        </div>
      </div>
    </>
  ),
}
