import Link from 'next/link';

export default function Home() {
  return (
    <section>
      <p><Link href="streams">配信</Link></p>
      <p><Link href="ranking">ランキング</Link></p>
      <p><Link href="channels">配信者一覧</Link></p>
      <p><Link href="about">サイトについて</Link></p>
    </section>
  );
}