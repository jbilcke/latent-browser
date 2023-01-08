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
  t,
} from '../ai-design-system'

// kitwind.io/products/kometa/components/headers
export const header2: JSXTemplate = {
  description:
    'a minimalist header section for a service or startup, with a focus on collecting email for a mailing list',
  layout: (
    <div className="relative bg-purple-400">
      <div className="absolute inset-x-0 bottom-0">
        <Icon />
      </div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
          <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
            <T>first part of the title</T>
            <br className="hidden md:block" />
            <T>second part of the title</T>
            <span className="relative inline-block px-2">
              <div className="absolute inset-0 transform -skew-x-12 bg-teal-accent-400"></div>
              <span className="relative text-teal-900">
                <T>third part of the main title</T>
              </span>
            </span>
          </h2>
          <P className="mb-6 text-base text-indigo-100 md:text-lg">
            main commercial pitch selling the merits of the service, product or
            startup
          </P>
          <form className="flex flex-col items-center w-full mb-4 md:flex-row md:px-16">
            <input
              placeholder={t('placeholder text of the email input')}
              required
              type="text"
              className="flex-grow w-full h-12 px-4 mb-3 text-white transition duration-200 border-2 border-transparent rounded appearance-none md:mr-2 md:mb-0 bg-purple-900 focus:border-teal-accent-700 focus:outline-none focus:shadow-outline"
            />
            <Link className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-teal-900 transition duration-200 rounded shadow-md md:w-auto hover:text-purple-900 bg-teal-accent-400 hover:bg-teal-accent-700 focus:shadow-outline focus:outline-none">
              label for the subscribe button
            </Link>
          </form>
          <P className="max-w-md mb-10 text-xs tracking-wide text-indigo-100 sm:text-sm sm:mx-auto md:mb-16">
            some text explaining why we need the email and what we do with it
          </P>
          <Link className="flex items-center justify-center w-10 h-10 mx-auto text-white duration-300 transform border border-gray-400 rounded-full hover:text-teal-accent-400 hover:border-teal-accent-400 hover:shadow hover:scale-110">
            <Icon />
          </Link>
        </div>
      </div>
    </div>
  ),
}
