import {
  JSXTemplate,
  Paragraph,
  P,
  T,
  Link,
  Icon,
  Image,
} from '../ai-design-system'

// kitwind.io/products/kometa/components/contents
export const content1: JSXTemplate = {
  description:
    'a content section for a product, with a focus on mobile application',
  layout: (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-lg sm:text-center sm:mx-auto">
        <Link className="inline-block mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
            <Icon />
          </div>
        </Link>
        <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
          <span className="relative inline-block">
            <Icon />
            <span className="relative bg-white">
              <T>highlighted portion of the page title</T>
            </span>
          </span>
          <T>rest of the page title</T>
        </h2>
        <Paragraph className="text-base text-gray-700 md:text-lg" />
        <hr className="my-8 border-gray-300" />
        <div className="flex items-center mb-3 sm:justify-center">
          <Link className="mr-3 transition duration-300 hover:shadow-lg">
            <Image className="object-cover object-top w-32 mx-auto" />
          </Link>
          <Link className="transition duration-300 hover:shadow-lg">
            <Image className="object-cover object-top w-32 mx-auto" />
          </Link>
        </div>
        <Paragraph className="max-w-xs text-xs text-gray-600 sm:text-sm sm:max-w-sm sm:mx-auto" />
      </div>
    </div>
  ),
}
