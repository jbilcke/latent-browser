import {
  JSXTemplate,
  Paragraph,
  P,
  T,
  Link,
  Icon,
  Image,
  Title1,
  Title2,
} from '../ai-design-system'

// kitwind.io/products/kometa/components/headers
export const header1: JSXTemplate = {
  description: 'a minimalist header section for a service or startup',
  layout: (
    <div className="bg-purple-700">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
            <a href="/" className="mb-6 sm:mx-auto">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-accent-400">
                <Icon />
              </div>
            </a>
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <Icon />
                  <span className="relative">
                    <Title1 />
                  </span>
                </span>
                <Title2 />
              </h2>
              <P className="text-base text-indigo-100 md:text-lg">
                some marketing pitch
              </P>
            </div>
            <div>
              <Link className="inline-flex items-center justify-center h-12 px-6 font-semibold tracking-wide text-teal-900 transition duration-200 rounded shadow-md hover:text-purple-900 bg-teal-accent-400 hover:bg-purple-100 focus:shadow-outline focus:outline-none">
                <T>a call to action or to get started</T>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}
