import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { TimestampUtils } from '../../utils/timestamp-utils';
import { CoreModule } from '../../core.module';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {

	uploadPercent: Observable<number | undefined> = new Observable<number>();
  	downloadURL: Observable<string | undefined> = new Observable<string>();
  	
	constructor(private storage: AngularFireStorage) {}
  
	async uploadFile(file:File) {

		let timestamp = TimestampUtils.getTimestampByDate(new Date())

		const filePath = 'img/' + file.name + '-' + timestamp.toMillis();
		const fileRef = this.storage.ref(filePath);
		const task = this.storage.upload(filePath, file);

		// observe percentage changes
		this.uploadPercent = task.percentageChanges();
		await lastValueFrom(task.percentageChanges());
		// get notified when the download URL is available
		return lastValueFrom(fileRef.getDownloadURL());
	}
}
