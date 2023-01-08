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
export const header3: JSXTemplate = {
  description:
    'a minimalist header section for a service or startup, with a badge and focus on collecting the name and the email for a mailing list',
  layout: (
    <div className="flex flex-col items-center justify-center px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:pt-32 md:px-0">
      <div className="flex flex-col items-center max-w-2xl md:px-8">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <P className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-400">
              colored badge
            </P>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <Icon />
              <span className="relative">
                <T>first word of the title</T>
              </span>
            </span>
            <T>rest of the title</T>
          </h2>
          <P className="text-base text-gray-700 md:text-lg">
            some marketing pitch
          </P>
        </div>
        <form className="flex flex-col items-center w-full mb-4 md:flex-row">
          <input
            placeholder="{{placeholder text for the name form input}}"
            required
            type="text"
            className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
          />
          <input
            placeholder="{{placeholder text for the email form input}}"
            required
            type="text"
            className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
          >
            <T>label for the subscribe button</T>
          </button>
        </form>
        <P className="max-w-md mb-10 text-xs text-gray-600 sm:text-sm md:text-center">
          some text explaining why we need the email and what we do with it
        </P>
      </div>
      <Image className="w-full max-w-screen-sm mx-auto rounded shadow-2xl md:w-auto lg:max-w-screen-md">
        caption for a big illustration image, generally a big screenshot of the
        application of photo off the product
      </Image>
    </div>
  ),
}
