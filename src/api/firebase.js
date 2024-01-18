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
import { get, getDatabase, ref, remove, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const database = getDatabase(app);

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
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, 'admins')).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}

export async function addNewProduct(product, image) {
  const id = uuid();
  // return set(ref(database, `shop/${product.category}/${id}`), {
  return set(ref(database, `shop/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(','),
  });
}

export async function getProducts() {
  return get(ref(database, 'shop')).then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(Object.keys(snapshot.val()))
      // console.log(Object.values(snapshot.val()))
      // console.log(Object.entries(snapshot.val()))
      const copyAllItems = [...Object.values(snapshot.val())];
      // const allArrCategory = copyAllItems.map((category) => {
      //   return Object.values(category);
      // });
      return copyAllItems;
      // return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}
export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}
export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}

export async function getAccount(userId) {
  return get(ref(database, `account/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}
export async function addOrUpdateToAccount(userId, account) {
  return set(ref(database, `account/${userId}`), account);
}
