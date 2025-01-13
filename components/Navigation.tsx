import Link from 'next/link';
import { useRouter } from 'next/router';

function Navigation() {
  const { pathname } = useRouter();

  return (
    <nav className="border-b bg-background" aria-label="Main navigation">
      <Link href="/home" className={pathname === '/home' ? 'text-primary font-medium' : ''} aria-current={pathname === '/home' ? 'page' : undefined}>
        Home
      </Link>
      <Link href="/groups" className={pathname === '/groups' ? 'text-primary font-medium' : ''} aria-current={pathname === '/groups' ? 'page' : undefined}>
        Groups
      </Link>
      <Link href="/events" className={pathname === '/events' ? 'text-primary font-medium' : ''} aria-current={pathname === '/events' ? 'page' : undefined}>
        Events
      </Link>
      <Link href="/marketplace" className={pathname === '/marketplace' ? 'text-primary font-medium' : ''} aria-current={pathname === '/marketplace' ? 'page' : undefined}>
        Marketplace
      </Link>
    </nav>
  );
}

export default Navigation;

