import { DocumentData, DocumentReference, addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { EcosProject } from "../types/EcosProject.type";
import { db } from "./firebaseConfig";

export default class EcosProjectService {

  static ecosProjectCollection = "ecos_project";

  public static getEcosProjects(adminId: string, callBack: (ecosystems: EcosProject[]) => void): void {
    const q = query(collection(db, EcosProjectService.ecosProjectCollection), where("admin_id", "==", adminId));
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as EcosProject[];
      callBack(data);
    });
  }

  public static createEcosProject(ecosProject: EcosProject, successCallback: (docRef: DocumentReference<DocumentData>) => void, errorCallback: () => void): void {
    const { name, admin_id, end_date, participants, mandatory_items } = ecosProject;

    addDoc(collection(db, EcosProjectService.ecosProjectCollection), {
      name,
      admin_id,
      end_date,
      participants: participants || [],
      mandatory_items,
      status: 'not-started',
    }).then((docRef) => {
      successCallback(docRef);
    }).catch((error) => {
      console.error("Error adding document: ", error);
      errorCallback();
    });
  }

  public static updateEcosProject(ecosProject: EcosProject, successCallback: (newData: EcosProject) => void, errorCallback: () => void): void {

    const { id, name, admin_id, end_date, participants, mandatory_items, status } = ecosProject;

    if (id === undefined) throw new Error("EcosProject id is undefined");

    updateDoc(doc(db, EcosProjectService.ecosProjectCollection, id), {
      name,
      admin_id,
      end_date,
      status,
      mandatory_items,
      participants: participants || []
    }).then(() => {
      console.log("Document written with ID: ", id);
      successCallback(ecosProject);
    }).catch((error) => {
      console.error("Error adding document: ", error);
      errorCallback();
    });

  }

  public static getEcosProject(ecosId: string): Promise<EcosProject> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(doc(db, EcosProjectService.ecosProjectCollection, ecosId), (doc) => {
        if (doc.exists()) {
          const data = {
            id: doc.id,
            ...doc.data(),
          } as EcosProject;
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

  public static deleteEcosProject(ecosId: string) {
    return deleteDoc(doc(db, EcosProjectService.ecosProjectCollection, ecosId));
  }

}