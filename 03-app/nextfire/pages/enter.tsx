import { useContext } from 'react';
import { auth, signIn } from '../lib/firebase';
import { UserContext } from '../lib/context';

export default function EnterPage(props) {

    const { user, username } = useContext(UserContext);

    return (
        <main>
            {user ?
                !username ? <UsernameForm /> : <SignOutButton />
                :
                <SignInButton />
            }

        </main>
    );
}

function SignInButton() {
    const signInWithGoogle = async () => {
        try {
            await signIn()
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    return (
        <button className='btn-google' onClick={signInWithGoogle}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png' /> Sign in with Google
        </button>
    );
}

function SignOutButton() {
    return <button onClick={() => auth.signOut()}>
        Sign Out
    </button>
}

function UsernameForm() {
    return <div></div>
}