# 深拷贝和浅拷贝

## 浅拷贝

### 数组的浅拷贝

```javascript
const arr = ['old', 1, true, null, undefined]
const new_arr = arr.concat()
new_arr[0] = 'new'

console.log(arr) // ["old", 1, true, null, undefined]
console.log(new_arr) // ["new", 1, true, null, undefined]
```

## 深拷贝
