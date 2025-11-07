import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  loginForm!: FormGroup;

  constructor(private auth: AuthService, private firestore: AngularFirestore, private router: Router) {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  async onLogin() {
    this.message = '';
    try {
      await this.auth.login(this.email.trim(), this.password);
      this.message = 'Logged in successfully';
    } catch (e: any) {
      this.message = e?.message || 'Login failed';
      console.error(e);
    }
  }

  async onLogout() {
    await this.auth.logout();
    this.message = 'Logged out';
  }


  async login(formData: any){
    if(formData.valid){
      let userList = [];
      console.log(this.firestore, 'firestore');
      this.firestore.collection('users').get().subscribe((userListRes:any) => {
         userList = userListRes.docs.map((list:any) => list.data());
        if(userList && userList.length) {
          let validateUserFromList = userList.find((list: any) => {
            if(list.userName == formData.value.userName && list.password == formData.value.password) {
              return list;
            }
          });
          if(validateUserFromList){
            this.router.navigate(['dashboard']);
            sessionStorage.setItem('isLogin', 'Y');
            // signInWithEmailAndPassword(this.auth, formData?.value?.userName, formData?.value?.password);
          } else {
            alert('Username or Password Incorrect');            
          }
          console.log(validateUserFromList, 'validate');
        }
        
      })
    //   let userList = [];
    //   const userListRes = collection(this.firestore, 'users');
    //   console.log(userListRes, "user list");

    //   const snapshot = await getDocs(userListRes);
    //   userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //   console.log(userList, "user list");
    //   if(userList && userList.length) {
    //     let validateUserFromList = userList.find((list: any) => {
    //       if(list.userName == formData.value.userName && list.password == formData.value.password) {
    //         return list;
    //       }
    //     });
    //     if(validateUserFromList){
    //       this.router.navigate(['dashboard']);
    //       sessionStorage.setItem('isLogin', 'Y');
    //       // signInWithEmailAndPassword(this.auth, formData?.value?.userName, formData?.value?.password);
    //     } else {
    //       alert('Username or Password Incorrect');            
    //     }
    //     console.log(validateUserFromList, 'validate');
    //   }
    // }
  }
}
}