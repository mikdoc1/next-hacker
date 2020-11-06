import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  page?: number;
}

const Layout = ({ children, page }: LayoutProps) => {
  return (
    <div className="container">
      <Head>
        <title>Next Hacker</title>
      </Head>
      <header>
        <Link href="/">
          <a>Home</a>
        </Link>
      </header>
      <main>{children}</main>
      <footer>
        {typeof page === 'number' && (
          <Link href={`/?page=${page + 1}`}>
            <a>
              <h3 style={{ color: 'blue' }}>Next page</h3>
            </a>
          </Link>
        )}
      </footer>
    </div>
  );
};

export default Layout;
