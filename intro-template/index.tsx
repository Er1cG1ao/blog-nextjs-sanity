import Image from 'next/image'
import Link from 'next/link'
import { memo, useSyncExternalStore } from 'react'

import cover from './cover.png'

const subscribe = () => () => {}

export default memo(function IntroTemplate() {
  const studioURL = useSyncExternalStore(
    subscribe,
    () => `${window.location.origin}/studio`,
    () => null,
  )
  const createPostURL = useSyncExternalStore(
    subscribe,
    () =>
      `${window.location.origin}/studio/intent/create/template=post;type=post/`,
    () => null,
  )
  const hasEnvFile = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

  if (!studioURL) {
    return null
  }

  return (
    <div className="flex justify-center border border-gray-200 bg-gray-50">
      <div className="mb-8 mt-20 grid max-w-screen-2xl grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32 ">
        <div className="self-center">
          <Image
            alt="An illustration of a browser window, a terminal window, the Sanity.io logo and the NextJS logo"
            src={cover}
          />
        </div>

        <div className="mx-6 md:mx-0 md:mr-24 flex flex-col justify-center">
          <h2 className="mb-8 text-xl font-bold tracking-wide md:text-5xl">
            Start your journey
          </h2>

          {!hasEnvFile && (
            <div
              className="mb-6 rounded-lg bg-yellow-100 p-4 text-sm text-yellow-700"
              role="alert"
            >
              {`It looks like you haven't set up the local environment variables.`}
              <p>
                <a
                  href={
                    'https://github.com/sanity-io/nextjs-blog-cms-sanity-v3#step-2-set-up-the-project-locally'
                  }
                  className={`mx-1 underline hover:text-blue-800`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`Here's how to set them up locally`}
                </a>
              </p>
            </div>
          )}

          <ol>
            <Box
              circleTitle="1"
              element={
                <div>
                  <div className="col-span-2 mb-4 mt-1 font-semibold">
                    Create content with Sanity Studio
                  </div>
                  <div className="text-xs text-gray-700">
                    Build your first website with Sanity Studio!
                  </div>

                  <div className="mt-3">
                    <Link
                      className="inline-flex rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-800"
                      href={createPostURL}
                    >
                      Go to Sanity Studio
                    </Link>
                  </div>
                </div>
              }
            />
          </ol>
        </div>
      </div>
    </div>
  )
})

function Box({
               circleTitle,
               element,
             }: {
  circleTitle: string
  element: JSX.Element
}) {
  return (
    <li className="mt-2 grid grid-flow-col grid-rows-1 place-content-start gap-3">
      <div className="row-span-3 select-none">
        <div className="relative flex h-6 w-6 select-none items-center justify-center rounded-full bg-gray-200 p-4 text-center">
          {circleTitle}
        </div>
      </div>
      {element}
    </li>
  )
}