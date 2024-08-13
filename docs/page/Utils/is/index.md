# is

## 代码内容

::: details 点我查看代码
<<< @/utils/is.ts
:::

## 示例一: 判断两个值是否相等 isEqual

```ts
console.log(isEqual(0, 0)) // true
console.log(isEqual(0, -0)) // false

console.log(isEqual(null, null)) // true
console.log(isEqual(null, 0)) // flase

console.log(isEqual(NaN, NaN)) // true
console.log(isEqual(Number(NaN), Number(NaN))) // true

console.log(isEqual('Curly', new String('Curly'))) // true

console.log(isEqual([1], [1])) // true
console.log(isEqual({ value: 1 }, { value: 1 })) // true

let a: any, b: any

a = { foo: { b: { foo: { c: { foo: null } } } } }
b = { foo: { b: { foo: { c: { foo: null } } } } }
a.foo.b.foo.c.foo = a
b.foo.b.foo.c.foo = b

console.log(isEqual(a, b)) // true
```
