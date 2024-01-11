import { collection, doc, getDocs, addDoc, getDoc, getFirestore, query, where } from "firebase/firestore"
import app from "./init"
import bcrypt from 'bcrypt'

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName))
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))

    return data
}

export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id))
    const data = snapshot.data()
    return data
}

export async function register(
    data: {
        fullname: string,
        email: string,
        password: string,
        role?: string,
    },
) {
    try {
        const q = query(
            collection(firestore, 'users'),
            where('email', '==', data.email)
        )
    
        const snapshot = await getDocs(q)
        const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    
        if(users.length > 0) {
            return {
                status: false,
                message: 'Email already exists',
                statusCode: 400,
            }
        }
        else {
            data.role = 'admin',
            data.password = await bcrypt.hash(data.password, 10)
            
            try {
                await addDoc(collection(firestore, 'users'), data)
                return {
                    status: true,
                    statusCode: 200,
                    message: 'register success'
                }
            }
            catch(err) {
                return {
                    status: false,
                    statusCode: 400,
                    message: 'register failed',
                }
            }
        }
    }
    catch (err) {
        console.error('Error in register function:', err);
        return {
            status: false,
            statusCode: 500,
            message: 'Internal Server Error (unexpected)',
        };
    }
}

export async function login(data: { email: string }) {
    const q = query(
        collection(firestore, 'users'),
        where('email', '==', data.email),
    )

    const snapshot = await getDocs(q)
    const user = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))

    if(user) {
        return user[0]
    }
    else {
        return null
    }
}