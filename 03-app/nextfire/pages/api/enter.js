import { googleAuthProvider } from "../../lib/firebase";

export default function Enter(props) {

    const user = null;
    const username = null;

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
            await auth.signInWithPopup(googleAuthProvider);
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
    return <button onClick={() => auth.singOut()}>
        Sign Out
    </button>
}

function UsernameForm() {

}