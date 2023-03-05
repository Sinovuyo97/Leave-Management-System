import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { setTimeout } from 'timers';
import { FileUpload } from '../models/file-upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private basePath = '/uploads';

  app = initializeApp(environment.firebase)

  // app = getApp('Filleupload');

  private storage = getStorage(this.app);

  constructor(private toastr: ToastrService) {
  }

  getStorage() {
    console.log(this.storage);
  }

  uploadToStorage(fileUpload: FileUpload) {
    const filePath = `${this.basePath}/${fileUpload?.file?.name}`;
    const storageRef = ref(this.storage, filePath);
   
    if (!fileUpload.file) return null;

    return uploadBytes(storageRef, fileUpload.file)
    .then((snapshot) => {
      return getDownloadURL(ref(this.storage, filePath))
      .then((url) => {
        fileUpload.url = url;
        return fileUpload;
      })
      .catch((error) => {
        // Throw the eror to be handled by the interceptor
        throw error;
      });
    });
  }

  // pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
  //   const filePath = `${this.basePath}/${fileUpload.file.name}`;
  //   const storageRef = this.storage.ref(filePath);
  //   const uploadTask = this.storage.upload(filePath, fileUpload.file);

  //   uploadTask.snapshotChanges().pipe(
  //     finalize(() => {
  //       storageRef.getDownloadURL().subscribe(downloadURL => {
  //         fileUpload.url = downloadURL;
  //         fileUpload.name = fileUpload.file.name;
  //         this.saveFileData(fileUpload);
  //       });
  //     })
  //   ).subscribe();

  //   return uploadTask.percentageChanges();
  // }

  // private saveFileData(fileUpload: FileUpload): void {
  //   this.db.list(this.basePath).push(fileUpload);
  // }

  // getFiles(numberItems: number): AngularFireList<FileUpload> {
  //   return this.db.list(this.basePath, ref =>
  //     ref.limitToLast(numberItems));
  // }

  // deleteFile(fileUpload: FileUpload): void {
  //   this.deleteFileDatabase(fileUpload.key)
  //     .then(() => {
  //       this.deleteFileStorage(fileUpload.name);
  //     })
  //     .catch(error => console.log(error));
  // }

  // private deleteFileDatabase(key: string): Promise<void> {
  //   return this.db.list(this.basePath).remove(key);
  // }

  // private deleteFileStorage(name: string): void {
  //   const storageRef = this.storage.ref(this.basePath);
  //   storageRef.child(name).delete();
  // }
}