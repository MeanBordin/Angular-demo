import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  styleUrls: ['./save-form.component.scss']
})
export class SaveFormComponent {
  @Input() imagePreview!: any
  file: File | null = null
  
  @Input() saveForm!: FormGroup

  @Output() onSaveEvent = new EventEmitter();
  @Output() onClearFormEvent = new EventEmitter();
  @Output() onClearFileSeleteEvent = new EventEmitter();
  @Output() onSeleteFileEvent = new EventEmitter();

  onSave(){
    this.onSaveEvent.emit();
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
