import {
  JSXTemplate,
  Div,
  H2,
  P,
  T,
  Span,
  Link,
  Image,
} from '../ai-design-system'

// kitwind.io/products/kometa/components/contents
export const content3: JSXTemplate = {
  description:
    'a content section for a product, with 3 photo or illustrations set in a triptych',
  layout: (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
          <Div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-accent-400">
            some emoji icon
          </Div>
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              <T>some text</T>
              <Span className="inline-block text-purple-400">
                some important fact
              </Span>
            </h2>
            <P className="text-base text-gray-700 md:text-lg">
              some more content about the product
            </P>
          </div>
          <div>
            <Link className="inline-flex items-center font-semibold transition-colors duration-200 text-purple-400 hover:text-purple-800">
              message about an action to learn more
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center -mx-4 lg:pl-8">
          <div className="flex flex-col items-end px-3">
            <Image className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40">
              illustration caption of the product in the bottom left corner of a
              triptych
            </Image>
          </div>
          <div className="px-3">
            <Image className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40">
              illustration caption of the product in the bottom left corner of a
              triptych
            </Image>
          </div>
        </div>
      </div>
    </div>
  ),
}
