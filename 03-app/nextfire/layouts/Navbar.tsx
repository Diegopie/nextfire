import { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../lib/context';

export default function Navbar() {

    const { user, username } = useContext(UserContext);

    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link href='/'>
                        <button className='btn-logo'>FEED</button>
                    </Link>
                </li>
                {/* Authenticated */}
                {username && (
                    <>
                        <li className='push-left'>
                            <Link href='/admin'>
                                <button className='btn-blue'>Write Posts</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${username}`}>
                                <img src={user?.photoURL} />
                            </Link>
                        </li>
                    </>

                )}

                {/* Unauthenticated */}
                {!username && (
                    <Link href='/admin'>
                        <button className='btn-blue'>Log in</button>
                    </Link>
                )}
            </ul>
        </nav>
    )

}