import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { setUser } from '../redux/authSlice';

export const useAuthState = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Usuario está autenticado
                dispatch(setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                }));
            } else {
                // Usuario no está autenticado
                dispatch(setUser(null));
            }
        });

        // Cleanup function
        return () => unsubscribe();
    }, [dispatch]);
};

export default useAuthState; 