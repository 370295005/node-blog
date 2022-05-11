### MYSQL

#### 问题

node连接远程mysql(8.x)时,报错

```
errno: 1251,
sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client'
```

修改mysql的密码验证方式,刷新权限即可

```
alter user 'root'@'%' identified with mysql_native_password by '123456';
flush privileges;
```

