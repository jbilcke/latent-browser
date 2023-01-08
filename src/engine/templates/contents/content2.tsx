import {
  P,
  Pitch1,
  Pitch2,
  T,
  Link,
  Image,
  JSXTemplate,
} from '../ai-design-system'

// kitwind.io/products/kometa/components/contents
export const content2: JSXTemplate = {
  description:
    'a content section for a product, with a focus on mobile application',
  layout: (
    <div className="relative flex flex-col-reverse py-16 lg:py-0 lg:flex-col">
      <div className="w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:py-20 lg:max-w-screen-xl">
        <div className="mb-0 lg:max-w-lg lg:pr-8 xl:pr-6">
          <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:text-center">
            <>
              <Pitch1 />
              <br className="hidden md:block" />
              <Pitch2 />
            </>
          </h2>
          <P className="mb-5 text-base text-gray-700 md:text-lg md:text-center">
            some more text explaining the details
          </P>
          <div className="mb-10 text-center md:mb-16 lg:mb-20">
            <Link
              href="{{relative link to a page to know more}}"
              className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
            >
              message about learning more
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 text-sm text-gray-600 md:mb-2">Follow us</div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Link className="text-gray-600 transition-colors duration-300 hover:text-purple-400">
                  <T>an emoji icon</T>
                  <T>some link</T>
                </Link>
              </div>
              <div className="flex items-center">
                <a
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-purple-400"
                >
                  <T>an emoji icon</T>
                  <T>another link</T>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inset-y-0 top-0 right-0 w-full max-w-xl px-4 mx-auto mb-6 md:px-0 lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0">
        <Image className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full">
          illustration caption to illustrate the point, product or service of
          the webpage
        </Image>
      </div>
    </div>
  ),
}
