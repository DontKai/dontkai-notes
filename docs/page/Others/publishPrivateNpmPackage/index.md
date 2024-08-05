# 发布私有 Npm 包

1. 查看当前镜像源

```sh
npm config get registry
```

2. 设置私有镜像源

```sh
npm config set registry https://nexus.adas.com/repository/public/
```

3. 登录私有镜像源

```sh
npm login --registry=https://nexus.adas.com/repository/npm-adas-host/
# 输入用户名和密码
# Username: xxxxxx
# Password: xxxxxx
```

4. 查看当前登录用户名

```sh
npm whoami --registry=https://nexus.adas.com/repository/npm-adas-host/
```

5. 发布包

```sh
npm publish --registry=https://nexus.adas.com/repository/npm-adas-host/
```

6. 恢复默认镜像源

```sh
npm config set registry https://registry.npmjs.org
# 查看镜像源
npm config get registry
```
