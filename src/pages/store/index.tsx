import { useEffect, useState } from 'react'
import { Badge, Sidebar } from 'flowbite-react'
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi'
import { n } from '@tauri-apps/api/fs-4bb77382'

interface StoreProduct {
  // todo use a fun way to name things?
  // eg.
  // prompt --> "recipe"
  // generate --> "bake"
  type: 'spec' | 'app'
}
// a search result page in the style of a famous search engine =)
function StoreIndex() {
  const apps: {
    id: string
    title: string
    description: string
    prompt: string
  }[] = [
    {
      id: '42',
      title: 'SomeApp',
      description: 'some app!',
      prompt: '',
    },
    {
      id: '43',
      title: 'Anotherapp',
      description: 'another app!',
      prompt: '',
    },
  ]
  return (
    <div className="flex flex-row">
      <div className="w-fit">
        <Sidebar aria-label="Sidebar with call to action button example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiChartPie}>
                Explore
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiViewBoards}>
                Games
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiInbox}>
                Creative apps
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiUser}>
                Business apps
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiShoppingBag}>
                Utilities
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiShoppingBag}>
                Prompt Guide
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <div className="flex flex-col flew-grow">
        <h1 className="text-4xl font-semibold text-gray-800 ">Marketplace</h1>
        <h3 className="text-4xl font-semibold text-gray-800 ">Featured apps</h3>
        <p className="italic text-gray-600">Featured apps</p>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {apps.map((app) => (
            <div key={app.id}>
              <h4>{app.title}</h4>
              <p>{app.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StoreIndex
