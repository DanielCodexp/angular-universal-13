import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncryptionService } from './services/encryption.service';
import { VoiceRecognitionService } from './services/voice-recognition.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public loader = false;
  public nameForm: FormGroup;
  public isUserSpeaking: boolean = false;
  encryptedText: string = '';
  cipherInput: string = '';
decryptedText: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private encryptionService: EncryptionService,
    private voiceRecognition: VoiceRecognitionService,
    private titleService: Title,
    private metaService: Meta,
  ) {
    this.nameForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Bienvenido a Banco Azteca');
    this.metaService.updateTag({
      name: 'description',
      content: 'Simulador de bienvenida de Banco Azteca con ingreso de nombre por voz o teclado, validación y cifrado seguro.'
    });
    this.metaService.updateTag({ name: 'author', content: 'Angel Daniel Hernández Herrera' });
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
      // Filtrar solo caracteres alfanuméricos
      const alphanumericInput = input.replace(/[^a-zA-Z0-9]/g, '');
      const trimmedInput = alphanumericInput.slice(0, 15);
      this.nameForm.controls['name'].setValue(trimmedInput);
      console.log("trimmedInput", trimmedInput);
      if (trimmedInput.length >= 15) {
        this.isUserSpeaking = false;
        this.voiceRecognition.stop();
        console.log("stop 15 caracteres", trimmedInput);
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
        this.encryptedText = response.data;
      }
    } catch (error) {
      console.error('Encryption failed:', error);
    } finally {
      this.loader = false;
    }
  }

  async decryptName(): Promise<void> {
    try {
      this.loader = true;
      const response = await this.encryptionService.decryptName(this.cipherInput);
      if (response.status == 200) {
        console.log('Decrypted Name:', response.data);
        this.decryptedText = response.data;
      }
    } catch (error) {
      console.error('Decryption failed:', error);
    } finally {
      this.loader = false;
    }
  }

  copyToClipboard() {
  navigator.clipboard.writeText(this.encryptedText).then(() => {
    alert('Texto copiado al portapapeles');
  }).catch(err => {
    console.error('Error al copiar', err);
  });
}




}
