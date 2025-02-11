const User = {
    id: 'serial primary key',
    username: 'varchar(100) unique',
    email: 'varchar(255) unique',
    password: 'varchar(255)',
    role: 'varchar(10) default "user"', // 'user' or 'admin'
  };
  
  export default User;
  