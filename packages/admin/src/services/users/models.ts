export interface User {
  userID: string;
  phoneNumber: string;
  name: string;
  email: string;
  roleName: string;
  creationDate: Date;
  updateDate: Date;
}
export interface UserForm {
  email: string;
  password: string;
  name: string;
  roleName: string;
  phoneNumber: string;
}

