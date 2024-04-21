import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavBarProps {
    backendName: string;
  }

const NavBar : React.FC<NavBarProps> = ({ backendName }) => {
    const pathname = usePathname()

    return (
        <>
        <div className="flex items-center justify-between border-b border-gray-700" style={{ background: 'linear-gradient(180deg, #1b112b 40%, #070510 69%, #070510 99%)' }}>
            <div className="flex flex-row justify-between h-20 items-center pl-20 ">
                <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
                <div className="mr-8">Ai Fusion</div>
                </Link>
                <Link className={`link ${pathname === '/textGenerations' ? 'active' : ''}`} href="/textGenerations">
                <div className="mr-8">Audio to Text</div>
                </Link>
                <Link className={`link ${pathname === '/newpage' ? 'active' : ''}`} href="/newpage">
                <div className="mr-8">Question Answering</div>
                </Link>
                <div className="mr-8">Customers</div>
                <div className="mr-8">Pricing</div>
                <div>Contact</div>
            </div>
            <div className="flex flex-row justify-center h-20 items-center px-10">
                <button type="submit" className="peer hidden whitespace-nowrap rounded-full bg-gray-50 px-9 py-2 font-normal text-gray-900 duration-300 hover:cursor-pointer hover:bg-gray-300 md:flex ">Login</button>
            </div>
        </div>
        </>
    );
}

export default NavBar;