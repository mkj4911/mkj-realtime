import { FC, ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { BadgeCheckIcon } from '@heroicons/react/solid'

type Props = {
  title: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ children, title = 'mkj-realtime' }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-mono text-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="h-16 w-full bg-gray-900 text-white">
        <Link href="#">
          <a>
            <img
              src="../../images/logo_mkj.png"
              alt=""
              className="ml-4 h-16 w-16"
            />
          </a>
        </Link>
      </header>
      <main className="flex w-screen flex-1 flex-col items-center justify-center">
        {children}
      </main>
      <footer className="flex h-12 w-full items-center justify-center border-t bg-gray-900">
        <BadgeCheckIcon className="h-6 w-6 text-white" />
      </footer>
    </div>
  )
}
