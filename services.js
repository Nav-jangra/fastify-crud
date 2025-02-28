import { auth, db } from './database.js'

export async function signUp(email, password, displayName) {
  console.log('Service:signUp');
  try {
    const userRecord = await auth.createUser({ email, password, displayName });
    return userRecord;
  } catch (err) {
    console.log(err);
    throw err
  }
}

export async function login(email) {
  console.log('Service:login');
  try {
    const userRecord = await auth.getUserByEmail(email);
    const customToken = await auth.createCustomToken(userRecord.uid);

    return { token: customToken };

  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      return { error: 'Invalid credentials' };
    }
    console.log(err);
    throw err
  }
}

export async function create(model) {
  console.log('Service:create');
  try {
    const docRef = await db.collection('items').add(model);
    return { id: docRef.id };
  } catch (err) {
    console.log(err);
    throw err
  }
}

export async function search() {
  console.log('Service:search');
  try {
    const snapshot = await db.collection('items').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return items;
  } catch (err) {
    console.log(err);
    throw err
  }
}


export async function update(id, model) {
  console.log('Service:update');
  try {
    const docRef = db.collection('items').doc(id);
    await docRef.update(model);
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err
  }
}


export async function deleteData(id) {
  console.log('Service:delete');
  try {
    await db.collection('items').doc(id).delete();
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err
  }
}
