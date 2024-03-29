import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavBarProps {
    backendName: string;
  }

const NavBar : React.FC<NavBarProps> = ({ backendName }) => {
    const pathname = usePathname()

    return (
        <>
        <div className="flex items-center justify-between border-b border-gray-700">
            <div className="flex flex-row justify-between h-20 items-center pl-20 ">
                <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
                <div className="mr-8">Ai Fusion</div>
                </Link>
                <div className="mr-8">Sentiment analysis</div>
                <Link className={`link ${pathname === '/newpage' ? 'active' : ''}`} href="/newpage">
                <div className="mr-8">Question Answering</div>
                </Link>
                <div className="mr-8">Customers</div>
                <div className="mr-8">Pricing</div>
                <div>Cotact</div>
            </div>
            <div className="flex flex-row justify-center h-20 items-center px-10">
                <div className="mr-4">Login</div>
                <div className="bg-blue-700 ml-14 text-white rounded px-6 py-3 hover:opacity-75 cursor-pointer">
                    Get started
                </div>
            </div>
        </div>
        </>
    );
}

export default NavBar;