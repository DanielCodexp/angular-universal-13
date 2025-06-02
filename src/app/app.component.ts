import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncryptionService } from './services/encryption.service';
import { VoiceRecognitionService } from './services/voice-recognition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-universal-13';
  public loader = false;
  public nameForm: FormGroup;
  public isUserSpeaking: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private encryptionService: EncryptionService,
    private voiceRecognition: VoiceRecognitionService
  ) {
    this.nameForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],
    });
  }

  ngOnInit(): void {
    this.initVoiceInput();
  }

  stopRecording() {
    this.voiceRecognition.stop();
    this.isUserSpeaking = false;
  }

  initVoiceInput() {

    this.voiceRecognition.init().subscribe(() => {

    });


    this.voiceRecognition.speechInput().subscribe((input) => {
      const trimmedInput = input.slice(0, 15);
      this.nameForm.controls['name'].setValue(input);
      if (trimmedInput.length >= 15) {
        this.stopRecording();
      }
    });
  }

  startRecording() {
    this.isUserSpeaking = true;
    this.voiceRecognition.start();
    this.nameForm.controls['name'].reset();
  }


  allowAlphaNumericOnly(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z0-9]$/;
    const inputChar = event.key;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }



  async validateForm(): Promise<void> {
    if (this.nameForm.invalid) {
      this.nameForm.markAllAsTouched();
      return;
    }
    await this.encryptName();
  }

  async encryptName(): Promise<void> {
    try {
      this.loader = true;
      const name = this.nameForm.get('name')?.value;
      const response = await this.encryptionService.encryptName(name);
      if (response.status == 200) {
        console.log('Encrypted Name:', response.data);
      }
    } catch (error) {
      console.error('Encryption failed:', error);
    } finally {
      this.loader = false;
    }
  }


}
