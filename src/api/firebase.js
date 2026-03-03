import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const DB_URL = process.env.REACT_APP_FIREBASE_DB_URL;

async function getToken() {
  const user = auth.currentUser;
  return user ? user.getIdToken() : null;
}

async function dbGet(path) {
  const token = await getToken();
  const url = token
    ? `${DB_URL}/${path}.json?auth=${token}`
    : `${DB_URL}/${path}.json`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

async function dbSet(path, data) {
  const token = await getToken();
  const url = token
    ? `${DB_URL}/${path}.json?auth=${token}`
    : `${DB_URL}/${path}.json`;
  return fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

async function dbRemove(path) {
  const token = await getToken();
  const url = token
    ? `${DB_URL}/${path}.json?auth=${token}`
    : `${DB_URL}/${path}.json`;
  return fetch(url, { method: 'DELETE' });
}

export function login(main) {
  if (main === 'google') {
    signInWithPopup(auth, googleProvider).catch(console.error);
  } else if (main === 'facebook') {
    signInWithPopup(auth, facebookProvider).catch(console.error);
  }
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    addUserId(user);
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  try {
    const admins = await dbGet('admins');
    if (Array.isArray(admins) && admins.includes(user.uid)) {
      return { ...user, isAdmin: true };
    }
    return { ...user, isAdmin: false };
  } catch (err) {
    console.warn('Firebase admins read failed:', err?.message || err);
    return { ...user, isAdmin: false };
  }
}

export async function addNewProduct(product, image) {
  const id = uuid();
  return dbSet(`shop/${id}`, {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(','),
  });
}

export async function getProducts() {
  try {
    const val = await dbGet('shop');
    if (val && typeof val === 'object') {
      return [...Object.values(val)];
    }
    return [];
  } catch (err) {
    console.warn('Firebase getProducts failed:', err?.message || err);
    return [];
  }
}

export async function getCart(userId) {
  try {
    const val = await dbGet(`carts/${userId}`);
    const items = val && typeof val === 'object' ? val : {};
    return Object.values(items);
  } catch (err) {
    console.warn('Firebase getCart failed:', err?.message || err);
    return [];
  }
}
export async function addOrUpdateToCart(userId, product) {
  return dbSet(`carts/${userId}/${product.id}`, product);
}
export async function removeFromCart(userId, productId) {
  return dbRemove(`carts/${userId}/${productId}`);
}

export async function getAccount(userId) {
  try {
    const val = await dbGet(`account/${userId}`);
    const items = val && typeof val === 'object' ? val : {};
    return Object.values(items);
  } catch (err) {
    console.warn('Firebase getAccount failed:', err?.message || err);
    return [];
  }
}
export async function addOrUpdateToAccount(userId, account) {
  return dbSet(`account/${userId}`, account);
}

const addUserId = async (userId) => {
  if (!userId) return;
  try {
    const val = await dbGet('users');
    const users = val && typeof val === 'object' ? Object.values(val) : [];
    const currentUser = userId.uid;
    const hasFirstUser = users.some((u) => u && u.uid === currentUser);
    if (!hasFirstUser) {
      await dbSet(`users/${currentUser}`, {
        uid: currentUser,
        name: userId.displayName || '',
      });
    }
  } catch (err) {
    console.warn('Firebase users read failed:', err?.message || err);
  }
};
