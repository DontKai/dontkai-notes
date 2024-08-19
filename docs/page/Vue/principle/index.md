# Vue 2.x 与 Vue 3 响应式系统核心原理

## 一、Vue 2.x 响应式系统机制

在 Vue 2 中，响应式机制主要依赖于`数据劫持-Observer（观察者）`、`依赖收集-Dep（依赖管理器）`、`Watcher（观察者/订阅者）`等组件来实现。

```ts
class Vue {
    constructor(options) {
        this.$data = options.data

        // 调用数据劫持的方法
        Observer(this.$data)
        // ...
        // 调用模板编译的函数
        Compiler(options.el, this)
    }
}
```

### Vue 2.x 响应式系统机制协作过程

1. **初始化阶段**: Vue 实例化时，将 data 对象通过 Observer 转换为响应式数据。
2. **渲染阶段**: Vue 初次渲染时，读取响应式数据触发 getter，Dep 收集 Watcher；同时构建虚拟 DOM 并渲染到真实 DOM。
3. **数据变更**: 当响应式数据被修改时，setter 触发 Dep 通知相关 Watcher。
4. **更新调度**: Watcher 接收到通知后，加入到更新队列，通过异步机制批量处理。
5. **视图更新**: Watcher 执行 update 方法，Vue 重新计算虚拟 DOM，执行 DOM Diff，更新视图。

### 1. 数据劫持-Observer（观察者）

<br />

#### 1.1 基本概念

Vue 数据响应式中的数据劫持机制主要是实现了一种“观察者模式”（Observer Pattern）的设计模式。观察者模式是一种行为设计模式，它定义了对象之间的一对多依赖关系，当一个对象（主题，Subject）的状态发生改变时，所有依赖于它的对象（观察者，Observer）都会得到通知并自动更新。

Vue 在初始化时会遍历 data 对象中的所有属性，并使用`Object.defineProperty`来重新定义这些属性。每个属性都被转换为访问器属性，拥有`getter（获取）`和`setter（设置）`方法。

Vue 使用`Object.defineProperty（Vue 2）`或`Proxy（Vue 3）`来“劫持”数据对象的访问和修改。<br />
这是数据响应性的基础，通过 getter 和 setter 来监控数据变化。<br />
当数据被访问时（getter 触发），Vue 收集依赖（即哪些视图或计算属性正在使用这些数据）；<br />
当数据被修改时（setter 触发），Vue 能感知到变化。

在 Vue 中，`Object.defineProperty` API 扮演着核心角色，用于实现数据的响应式机制。这是 Vue 能够实时监测数据变化并自动更新视图的关键所在。以下是使用`defineProperty创建getter和setter`的详细过程：

#### 1.2 如何工作

1. 遍历数据对象：Vue 在初始化时，会遍历组件的 data 对象中的所有属性

2. 定义 getter 和 setter：getter 中 除了获取属性值，还会进行依赖收集的过程，setter 中 除了更新属性值，还会进行依赖通知的过程

```ts
// 定义一个数据劫持的方法
function Observer(obj) {
    // 这是递归的终止条件
    if (!obj || typeof obj !== 'object') return
    // 通过 Object.keys(obj) 获取到当前 obj 上的每个属性
    Object.keys(obj).forEach((key) => {
        // 依赖收集的类/收集 watcher
        const dep = new Dep()
        // 当前被循环的 key 所对应的属性值
        let value = obj[key]
        // 把 value 这个子节点，进行递归
        Observer(value)
        // 需要为当前的 key 所对应的属性，添加 getter 和 setter
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                // 只要执行了下面这一行，那么刚才 new 的 Watcher 实例，
                // 就被放到了 dep.subs 这个数组中了
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newVal) {
                value = newVal
                Observer(value)
                // 通知每一个订阅者更新自己的文本
                dep.notify()
            }
        })
    })
}
```

### 2. 依赖收集-Dep（依赖管理器）

<br />

#### 2.1 基本概念

getter 内部会执行依赖收集逻辑。当 Vue 在渲染模板时访问这些属性，getter 会被触发，此时 Vue 会将当前的 Watcher（观察者）添加到该属性的依赖集合（Dep）中。Dep 是 Vue 用来存储依赖的容器。

#### 2.2 如何工作

1. Dep 是连接 Observer 和 Watcher 的桥梁，负责管理多个 Watcher 对同一个数据的依赖关系。
2. 每个响应式属性都有一个 Dep 实例，当数据被访问时，Dep 收集当前的 Watcher；当数据变化时，Dep 通知所有 Watcher 进行更新。

```ts
// 依赖收集的类/收集 watcher 订阅者的类
class Dep {
    constructor() {
        // 今后，所有的 watcher 都要存到这个数组中
        this.subs = []
    }

    // 向 subs 数组中，添加 watcher 的方法
    addSub(watcher) {
        this.subs.push(watcher)
    }

    // 负责通知每个 watcher 的方法
    notify() {
        this.subs.forEach((watcher) => watcher.update())
    }
}
```

### 3. Watcher（观察者/订阅者）

负责监视数据变化并触发相应的更新逻辑，以确保视图与数据保持同步。

#### 3.1 基本概念

1. Watcher 是 Vue 响应式系统的响应单元，代表一个数据的观察者，负责执行具体的更新逻辑。
2. 在 Vue 组件初始化或数据被访问时创建。
3. 在初始化或执行时，通过访问响应式数据，自动收集依赖（即向 Dep 注册自身）。
4. 当依赖的数据发生变化时，Dep 会通知所有相关的 Watcher，Watcher 根据情况决定是否执行更新逻辑。
5. Vue 采用异步队列机制，将 Watcher 的更新操作放入队列，通过 nextTick 机制批量执行，优化性能。

#### 3.2 如何工作

```ts
// 订阅者的类
class Watcher {
    // cb 回调函数中，记录着当前 Watcher 如何更新自己的文本内容
    //    但是，只知道如何更新自己还不行，还必须拿到最新的数据，
    //    因此，还需要在 new Watcher 期间，把 vm 也传递进来（因为 vm 中保存着最新的数据）
    // 除此之外，还需要知道，在 vm 身上众多的数据中，哪个数据，才是当前自己所需要的数据，
    //    因此，必须在 new Watcher 期间，指定 watcher 对应的数据的名字
    constructor(vm, key, cb, options) {
        this.vm = vm // 组件实例
        this.key = key // 属性名
        this.cb = cb // 回调函数，数据变化时执行
        this.options = options // 可选参数，如 deep: true 表示深度监听

        // 初始化时获取数据，触发依赖收集
        this.value = this.get()
    }

    // 负责把创建的 Watcher 实例存到 Dep 实例的 subs 数组中
    get() {
        Dep.target = this
        const value = this.key.split('.').reduce((newObj, k) => newObj[k], this.vm)
        Dep.target = null
        return value
    }

    // watcher 的实例，需要有 update 函数，从而让发布者能够通知我们进行更新！
    update() {
        const value = this.key.split('.').reduce((newObj, k) => newObj[k], this.vm)
        this.cb(value)
    }
}
```

### 4. compiler

Compile 中用到了文档碎片, 借助文档碎片 fragment 来暂存页面文档，操作文档碎片对其中引用的数据进行提取更新等操作，避免了直接操作 DOM 进行数据更新引起多次的重绘，节约浏览器性能。

```ts
// 对 HTML 结构进行模板编译的方法
function Compile(el, vm) {
    // 获取 el 对应的 DOM 元素
    vm.$el = document.querySelector(el)

    // 创建文档碎片，提高 DOM 操作的性能
    const fragment = document.createDocumentFragment()

    while ((childNode = vm.$el.firstChild)) {
        fragment.appendChild(childNode)
    }

    // 进行模板编译
    replace(fragment)

    vm.$el.appendChild(fragment)

    // 负责对 DOM 模板进行编译的方法
    function replace(node) {
        // 定义匹配插值表达式的正则
        const regMustache = /\{\{\s*(\S+)\s*\}\}/

        // 证明当前的 node 节点是一个文本子节点，需要进行正则的替换
        if (node.nodeType === 3) {
            // 注意：文本子节点，也是一个 DOM 对象，如果要获取文本子节点的字符串内容，需要调用 textContent 属性获取
            const text = node.textContent
            // 进行字符串的正则匹配与提取
            const execResult = regMustache.exec(text)
            console.log(execResult)
            if (execResult) {
                const value = execResult[1].split('.').reduce((newObj, k) => newObj[k], vm)
                node.textContent = text.replace(regMustache, value)
                // 在这个时候，创建 Watcher 类的实例
                new Watcher(vm, execResult[1], (newValue) => {
                    node.textContent = text.replace(regMustache, newValue)
                })
            }
            // 终止递归的条件
            return
        }

        // 判断当前的 node 节点是否为 input 输入框
        if (node.nodeType === 1 && node.tagName.toUpperCase() === 'INPUT') {
            // 得到当前元素的所有属性节点
            const attrs = Array.from(node.attributes)
            const findResult = attrs.find((x) => x.name === 'v-model')
            if (findResult) {
                // 获取到当前 v-model 属性的值   v-model="name"    v-model="info.a"
                const expStr = findResult.value
                const value = expStr.split('.').reduce((newObj, k) => newObj[k], vm)
                node.value = value

                // 创建 Watcher 的实例
                new Watcher(vm, expStr, (newValue) => {
                    node.value = newValue
                })

                // 监听文本框的 input 输入事件，拿到文本框最新的值，把最新的值，更新到 vm 上即可
                // ——当然实际Vue处理的不止text类型的input，还有checkbox、selection这些，这里以text类型的举例
                node.addEventListener('input', (e) => {
                    const keyArr = expStr.split('.')
                    const obj = keyArr.slice(0, keyArr.length - 1).reduce((newObj, k) => newObj[k], vm)
                    const leafKey = keyArr[keyArr.length - 1]
                    obj[leafKey] = e.target.value
                })
            }
        }

        // 证明不是文本节点，可能是一个DOM元素，需要进行递归处理
        node.childNodes.forEach((child) => replace(child))
    }
}
```

## 二、Vue 3 响应式系统机制

Vue 3 的响应式系统相较于 Vue 2 有了显著的改进，主要引入了 `Proxy API` 来替代 `Object.defineProperty`，通过 `Proxy & Reflect`、`Reactive & Ref`、`Effect (formerly Watcher)`、`Track(追踪依赖: dep+effect绑定) & Trigger(触发依赖更新)` 等提供更全面且高效的数据监测机制。

#### 3.2 如何工作 简易版本

```ts
// 依赖收集和更新的简单实现
const targetMap = new WeakMap() // 存储对象和其属性的依赖关系

// 当前激活的 effect
let activeEffect = null

// 定义 effect 函数，用于注册副作用
function effect(fn) {
    // 包装 effect 函数，以便在执行时设置和清除 activeEffect
    const wrappedEffect = () => {
        activeEffect = wrappedEffect // 设置当前激活的 effect
        fn() // 执行 effect 函数
        activeEffect = null // 清除激活的 effect
    }
    wrappedEffect() // 执行一次 effect 以便初始化
}

// 追踪依赖
function track(target, key) {
    // 确保 target 是对象且不为 null
    if (typeof target !== 'object' || target === null) return

    // 获取当前激活的 effect（即正在执行的副作用函数）
    const currentEffect = activeEffect

    // 只有在有当前 effect 时才进行追踪
    if (currentEffect) {
        // 从 targetMap 中获取 target 的依赖映射表
        let depsMap = targetMap.get(target)
        if (!depsMap) {
            // 如果不存在，创建一个新的 Map 并存储
            depsMap = new Map()
            targetMap.set(target, depsMap)
        }
        // 从 depsMap 中获取指定 key 的依赖集合
        let deps = depsMap.get(key)
        if (!deps) {
            // 如果不存在，创建一个新的 Set 并存储
            deps = new Set()
            depsMap.set(key, deps)
        }
        // 将当前 effect 添加到依赖集合中
        deps.add(currentEffect)
    }
}

// 触发依赖更新
function trigger(target, key) {
    // 确保 target 是对象且不为 null
    if (typeof target !== 'object' || target === null) return

    // 从 targetMap 中获取 target 的依赖映射表
    const depsMap = targetMap.get(target)
    if (!depsMap) return

    // 从 depsMap 中获取指定 key 的依赖集合
    const deps = depsMap.get(key)
    if (deps) {
        // 遍历依赖集合并执行每个 effect（即触发副作用更新）
        deps.forEach((effect) => effect())
    }
}

// 实现 ref，用于创建响应式数据
function ref(initialValue) {
    // 创建一个响应式的初始值
    let _value = createReactiveProxy(initialValue)

    // 返回一个对象，包含响应式的 getter 和 setter
    const obj = {
        get value() {
            track(obj, 'value') // 追踪对 value 的依赖
            return _value
        },
        set value(newValue) {
            if (newValue !== _value) {
                // 只有在值发生变化时才更新
                _value = createReactiveProxy(newValue) // 更新 _value 并重新代理
                trigger(obj, 'value') // 触发更新
            }
        }
    }
    return obj
}

// 创建响应式 Proxy
function createReactiveProxy(obj) {
    // 如果 obj 不是对象或为 null，则不需要代理
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }

    // 创建并返回 Proxy 对象
    return new Proxy(obj, {
        // 处理 get 操作
        get(target, key) {
            // 获取属性值
            const result = Reflect.get(target, key)
            track(target, key) // 追踪对属性的依赖
            return createReactiveProxy(result) // 递归代理嵌套对象
        },
        // 处理 set 操作
        set(target, key, value) {
            // 获取旧的属性值
            const oldValue = target[key]
            const result = Reflect.set(target, key, value) // 设置新的属性值
            if (oldValue !== value) {
                // 只有在值发生变化时才触发更新
                trigger(target, key) // 触发更新
            }
            return result
        }
    })
}

// 示例代码
const count = ref(0) // 创建一个响应式的 count 值

// // 注册 effect 以监听 count 的变化
// effect(() => {
//     console.log(`Count is ${count.value}`) // 打印 count 的值
//     console.log(count) // 打印 count 的值
// })

count.value = count.value + 1 // 更新 count 的值，触发 effect
count.value = 2 // 更新 count 的值，触发 effect

// const obj = ref({
//     name: 'zhangsan'
// }) // 创建一个响应式的对象

// // 注册 effect 以监听 obj.name 的变化
// effect(() => {
//     console.log(`Name is ${obj.value.name}`) // 打印 obj 的 name 属性值
//     console.log(obj) // 打印 obj 的 name 属性值
// })

// obj.value.name = 'lisi' // 更新 obj 的 name 属性值，触发 effect
// obj.value.name = 'wangwu' // 再次更新 obj 的 name 属性值，触发 effect
```
