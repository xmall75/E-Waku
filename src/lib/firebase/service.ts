import { collection, doc, getDocs, addDoc, getDoc, getFirestore, query, where, updateDoc } from "firebase/firestore"
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

export async function getUserByEmail(email: any) {
    try {
        const q = query(
        collection(firestore, 'prediction'),
        where('email', '==', email)
        )

        const snapshot = await getDocs(q)
        const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        if(users.length > 0) {
            const getData = await getDoc(doc(firestore, 'prediction', users[0].id))
            const data = getData.data()

            return data
        }
        else {
            return {
                status: 404,
                message: 'No users found',
            }
        }
    }
    catch (err) {
        
    }
}

export async function storePrediction(
    data: {
        email: string,
        score?: number,
        result?: string,
        estimationBudget?: number,
        budget?: number,
        feeding_cycle?: number,
        poor_water?: number,
        fish_type?: string,
        land_area?: number,
        food_type?: string,
        total_ponds?: number,
        food_ratio?: number,
        land_type?: string,
        total_seeds?: number,
    }
) {
    try {
        const q = query(
            collection(firestore, 'prediction'),
            where('email', '==', data.email)
        )
    
        const snapshot = await getDocs(q)
        const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        if(users.length > 0) {
            // return users
            const userRef = doc(firestore, 'prediction', users[0].id)

            await updateDoc(userRef, data)

            return {
                status: true,
                statusCode: 200,
                message: 'User updated successfully',
            }
        }
        else {
            try {
                await addDoc(collection(firestore, 'prediction'), data)
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
    } catch (err) {
        console.error('Error in changeUser function:', err)
        return {
            status: false,
            statusCode: 500,
            message: 'Internal Server Error (unexpected)',
        }
    }
}

export async function register(
    data: {
        fullname: string,
        email: string,
        password: string,
        type?: string,
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
            try {
                data.type = 'free'
                data.password = await bcrypt.hash(data.password, 10)

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