import { DocumentData, DocumentReference, addDoc, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Ecosystem } from '../types/Ecosystem.type';

export default class EcosystemService {
  public static getEcosystems(adminId: string, callBack: (ecosystems: Ecosystem[]) => void): void {
    const q = query(collection(db, "ecos"), where("admin_id", "==", adminId));
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Ecosystem[];
      callBack(data);
    });
  }

  public static createEcosystem(ecos: Ecosystem, successCallback: (docRef: DocumentReference<DocumentData>) => void, errorCallback: () => void): void {
    const { organization_name, admin_id, time_window, amount_rounds } = ecos;
    addDoc(collection(db, "ecos"), {
      organization_name,
      admin_id,
      responses: 0,
      time_window,
      amount_rounds,
      current_round: 1,
      status: 'not-started',
    }).then((docRef) => {
      successCallback(docRef);
    }).catch((error) => {
      console.error("Error adding document: ", error);
      errorCallback();
    });
  }

  public static updateEcosystem(ecos: Ecosystem): void {
    const { organization_name, admin_id, time_window, amount_rounds, id, status, current_round, responses, participants } = ecos;
    if(id === undefined) throw new Error("Ecosystem id is undefined");

    updateDoc(doc(db,"ecos", id), {
      organization_name,
      admin_id,
      time_window,
      amount_rounds,
      status,
      current_round,
      responses,
      participants
    }).then(() => {
      console.log("Document written with ID: ", id);
    }).catch((error) => {
      console.error("Error adding document: ", error);
      
    });
   
  }

  public static getEcosystem(ecosId: string): Promise<Ecosystem> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(doc(db, "ecos", ecosId), (doc) => {
        if (doc.exists()) {
          const data = {
            id: doc.id,
            ...doc.data(),
          } as Ecosystem;
          resolve(data);
        } else {
          unsubscribe();
          reject("No such document!");
        }
      }, (error) => {
        console.log(error);
        unsubscribe();
        reject(error);
      });

    });
  }

}