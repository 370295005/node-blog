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

### REDIS

开启服务： redis-server

进入命令行: redis-cli

退出: shutdown 

=> exit

重启: shutdown

=>exit

redis-server redis.conf  以redis.conf为配置重新启动服务



进入redis-cli后

```
// 验证密码
auth 123456
// 设置键值对
set key value
// 获取键值对
get key
// 删除键值对
del key
// 显示key
keys key (*) 星号则显示全部
```

### NGINX

```
sudo nginx -t // 测试配置文件是否正确
sudo nginx -s reload // 重新加载配置文件并使其生效不会重启不影响服务
```

### DOCKER

```
sudo service docker start // 启动docker
```

### API

```
推荐文章，首页，默认10个
/blog/recommend GET
登录
/user/login POST
注册
/user/register POST
获取用户信息
/user/userinfo?nickname=&id= GET
上传头图
/upload POST
新建文章
/create POST
编辑文章
/edit POST
```

### 服务器响应头set-cookie不生效的问题

```
axios配置withCredentials:true 且 cors配置origin为对应的域名
```