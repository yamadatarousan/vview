import Link from 'next/link';

export default async function Page() {
 
  return (
    <span>
		  <p><Link href="streams/group/nijisanji">にじさんじ</Link></p>
		  <p><Link href="streams/group/hololive">ホロライブ</Link></p>
		  <p><Link href="streams/group/vspo">ぶいすぽっ</Link></p>
		  <p><Link href="streams/group/neoporte">ネオポルテ</Link></p>
    </span>
  )
}