import { FormControl, FormGroup, Validators } from '@angular/forms';

export const loginForm = () => {
  return new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
};
