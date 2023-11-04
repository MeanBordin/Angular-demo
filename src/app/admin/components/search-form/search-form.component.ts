import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  imagePreview!: any
  file!: File
  
  @Input() searchForm!: FormGroup

  @Output() onSaveEvent = new EventEmitter();
  @Output() onClearFormEvent = new EventEmitter();
  @Output() onClearFileSeleteEvent = new EventEmitter();
  @Output() onSeleteFileEvent = new EventEmitter();

  onSave(){
    this.imagePreview = null
    this.onSaveEvent.emit(this.imagePreview);
  }

  onClear() {
    this.imagePreview = null
    this.onClearFormEvent.emit(this.imagePreview);
  }

  onClearFileSelect() {
    this.onClearFileSeleteEvent.emit()
  }

  onFileSelected(event: any) {
    const metaImage = event.target.files[0]
    if(metaImage) {
      this.file = metaImage
      const reader = new FileReader()
      reader.readAsDataURL(metaImage)
      reader.onload = () => {
        this.imagePreview = reader.result
      }
      this.onSeleteFileEvent.emit(this.file)
    }
  }
}
