import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import LiveStreams from "./components/LiveStreams"


const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: '全体', href: '/', current: true },
  { name: 'にじさんじ', href: '/streams/group/nijisanji', current: false },
  { name: 'ホロライブ', href: '/streams/group/hololive', current: false },
  { name: 'ぶいすぽ', href: '/streams/group/vspo', current: false },
  { name: 'ネオポルテ', href: '/streams/group/neoporte', current: false },
  { name: 'のりプロ', href: '/streams/group/noripro', current: false },
  { name: 'ドットライブ', href: '/streams/group/dotlive', current: false },
  { name: '774inc', href: '/streams/group/774inc', current: false },
  { name: 'ホロスターズ', href: '/streams/group/holostars', current: false },
  { name: 'その他', href: '/streams/group/others', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
} 

export default function Home() {
 
  return (
    <div>
      <h1>YouTubeライブ配信情報</h1>
      <LiveStreams query="ゲーム実況" />
    </div>
  )
}