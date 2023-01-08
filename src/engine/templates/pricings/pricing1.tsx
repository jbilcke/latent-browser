import {
  JSXTemplate,
  Paragraph,
  Div,
  Span,
  P,
  T,
  Link,
  Icon,
  Image,
  Title1,
  Title2,
} from '../ai-design-system'

// kitwind.io/products/kometa/components/headers
export const pricing1: JSXTemplate = {
  description: 'a pricing page for a product',
  layout: (
    <div className="relative w-full h-full">
      <div className="absolute hidden w-full bg-gray-50 lg:block h-96"></div>
      <div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern id="42" x="0" y="0" width=".135" height=".30">
                    <circle cx="1" cy="1" r=".7"></circle>
                  </pattern>
                </defs>
                <rect fill="url(#42)" width="52" height="24"></rect>
              </svg>
              <Span className="relative">
                first half of a pricing page title
              </Span>
            </span>
            <T>second half of a pricing page title</T>
          </h2>
          <P className="text-base text-gray-700 md:text-lg">
            small marketing pitch explaining the pricing model to customers
          </P>
        </div>
        <div className="grid max-w-screen-md gap-10 md:grid-cols-2 sm:mx-auto">
          <div>
            <div className="p-8 bg-gray-900 rounded">
              <div className="mb-4 text-center">
                <P className="text-xl font-medium tracking-wide text-white">
                  title of the first plan
                </P>
                <div className="flex items-center justify-center">
                  <P className="mr-2 text-5xl font-semibold text-white lg:text-6xl">
                    price of the first plan, in dollar
                  </P>
                  <P className="text-lg text-gray-500">
                    / time unit used for the pricing (eg. month, year..)
                  </P>
                </div>
              </div>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center">
                  <Div className="mr-3">
                    an emoji to illustrate a pricing feature eg. checkmark emoji
                  </Div>
                  <P className="font-medium text-gray-300">
                    10 deploys per day
                  </P>
                </li>
              </ul>
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
                Label of a button to buy, get, purchase or sign-up
              </button>
            </div>
            <div className="w-11/12 h-2 mx-auto bg-gray-900 rounded-b opacity-75"></div>
            <div className="w-10/12 h-2 mx-auto bg-gray-900 rounded-b opacity-50"></div>
            <div className="w-9/12 h-2 mx-auto bg-gray-900 rounded-b opacity-25"></div>
          </div>
        </div>
      </div>
    </div>
  ),
}
