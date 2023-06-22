import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AngularFireStorageReference } from '@angular/fire/compat/storage';
import { CloudStorageService } from 'src/app/core/services/cloud-storage/cloud-storage.service';
import { StringUtils } from 'src/app/core/utils/string-utils';
import { Speciality } from 'src/app/features/signin/models/speciality';
import { SpecialitiesService } from 'src/app/features/signin/specialities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-specialities-list',
  templateUrl: './specialities-list.component.html',
  styleUrls: ['./specialities-list.component.scss']
})
export class SpecialitiesListComponent {

	specialities:Speciality[] = []
	
	@Output() selectedItem = new EventEmitter<string[]>();
	selectedItems:string[] = []

	@ViewChild('itemInput') emailInputElement!: ElementRef<HTMLInputElement>;

  @ViewChild('fileUploader') fileUploader: any
	specialityImage:File[] = []
	currentFileRef:AngularFireStorageReference | undefined

  newSpecialityName:string = ''

	

	constructor(
    private _specialitiesService:SpecialitiesService,
		private _storage: CloudStorageService, 
    ) {

  }

	ngOnInit(): void {
    this._specialitiesService.getAll().subscribe(x => {
      this.specialities = x
    })
	}

	onItemSelected(speciality:Speciality){
    let item = speciality.name
		if (this.selectedItems.includes(item)) {
			this.selectedItems = this.selectedItems.filter(x => { return x !== item })
		} else {
			this.selectedItems.push(item);
		}
		this.selectedItem.emit(this.selectedItems);
	}

	async onAddItem(){
		if (!this.newSpecialityName || this.specialities.some(x => { return StringUtils.equals(x.name,this.newSpecialityName) })) {
			Swal.fire({
				title: 'Error',
				text: 'Debe seleccionar un nombre para la especialidad, y este no debe existir entre las ya disponibles.',
				icon: 'error',
				confirmButtonText: 'Ok'
			})
			return
		}

		let speciality = new Speciality()
		speciality.name = this.newSpecialityName
		// UPLOAD IMAGE
		for (const image of this.specialityImage) {
			const imgURL = await this._storage.uploadFile(image)
			let imgStr = imgURL as string
			speciality.image = imgStr
		}

		this._specialitiesService.create(speciality)
		// END UPLOAD IMAGE

		this.specialities.push(speciality)
		this.specialityImage = []
	}

	focusItemInput(){
		this.emailInputElement.nativeElement.focus()
	}

	getItemStyle(speciality:Speciality){
    let item = speciality.name
		if (this.selectedItems.includes(item)) {
			return 'item-selected'
		}else {
			return 'chip'
		}
	}

  	handleFileInput(files:File[]){
		this.specialityImage = []
		let maxFileSizeExceeded = false
		files.forEach(x => {
			if (x.size > 2000000) {
				maxFileSizeExceeded = true
			}
		})

		if (maxFileSizeExceeded) {
			Swal.fire({
				title: 'Error',
				text: 'Las imagenes no pueden exceder los 2 MB',
				icon: 'error',
				confirmButtonText: 'Ok'
			})
			this.fileUploader.clear()
			return
		}

		if (files.length != 1) {
			Swal.fire({
				title: 'Error',
				text: 'Debe seleccionar al menos una imagen para la especialidad',
				icon: 'error',
				confirmButtonText: 'Ok'
			})
			this.fileUploader.clear()
			return
		}

		files.forEach((file:File) => {
			this.specialityImage.push(file)
		})

	}

	removeFile(file:File){
		this.specialityImage = this.specialityImage.filter((img:File) => { return img !== file })
	}
}