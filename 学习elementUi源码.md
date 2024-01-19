# element ui源码学习

## 遇到的问题

- 下载源码后npm install报错：npm版本问题，下载10.16.3左右的版本运行OK。（忽视报错）

## element基本工程

- ​	build:脚本工程文件

- ​	package：组件源码
- ​	examples：element网站组件展示

## 组件间传参

-  props 和 emit：父子

-  provide 和inject：祖孙

  ```javascript
  //在祖先组件中使用provide提供需要共享的数据或方法：
  export default {
    provide() {
      return {
        sharedData: 'Hello, world!', // 共享的数据
        sharedMethod: this.sharedMethod, // 共享的方法
      };
    },
    methods: {
      sharedMethod() {
        console.log('This is a shared method.');
      },
      // ...
    },
    // ...
  };
  ```

  ```javascript
  //在子组件中使用inject来获取祖先组件提供的数据或方法
  export default {
    inject: ['sharedData', 'sharedMethod'],
    created() {
      console.log(this.sharedData); // 输出 'Hello, world!'
      this.sharedMethod(); // 执行共享的方法
    },
    // ...
  };
  ```

- mixin  ：跨组件引用

  ```javascript
  // mixins/MyMixin.js
  export default {
    data() {
      return {
        message: 'Hello from mixin',
      };
    },
    methods: {
      greet() {
        console.log(this.message);
      },
    },
  }
  ```

```javascript
// MyComponent.vue
import MyMixin from './mixins/MyMixin';

export default {
  mixins: [MyMixin],
  mounted() {
    this.greet(); // 调用来自mixin的方法
    console.log(this.message); // 访问来自mixin的数据
  },
};
```



## 	插槽slot

​	匿名插槽:使用slot标签占位，用父元素内容填坑

```vue

<template>
  <div>
    <my-component>
      <p>这是插入到插槽中的内容</p>
    </my-component>
  </div>
</template>
```

```vue
<template>
  <div>
    <slot></slot>
    <p>这是默认内容</p>
  </div>
</template>
```

​	具名插槽：添加name属性

```html
<template>
  <div>
    <my-component>
      <template v-slot:header>
        <h1>这是自定义的头部</h1>
      </template>
      
      <template v-slot:content>
        <p>这是自定义的内容</p>
      </template>
      
      <template v-slot:footer>
        <p>这是自定义的底部</p>
      </template>
    </my-component>
  </div>
</template>
```

​	

```html
<template>
  <div>
    <slot name="header">这是默认头部</slot>
    <slot name="content">这是默认内容</slot>
    <slot name="footer">这是默认底部</slot>
  </div>
</template>
```

​	作用域插槽

> ​	作用域插槽是一种特殊的插槽，它允许我们在插槽内部访问组件实例的数据，允许父组件将数据传递到子组件中，并在子组件中使用



​	使用`<template slot="slotName" v-slot="scope">`来访问插槽内部的数据

```vue
// 父组件 App.vue
<template>
  <div class="container">
    <Category title="食物" >
      <template v-slot="scope">
        {{ scope }}
      </template>
    </Category>
  </div>
</template>

<script>
import Category from './components/Category.vue'
export default {
  name: "App",
  components: {Category},
}
</script>

```

在组件的模板中使用`<slot name="slotName" v-bind:slotData="data"></slot>`定义作用域插槽

```vue
// 子组件 Category.vue
<template>
  <div class="category">
    <h3>{{title}}分类组件</h3>
    <slot :foods="foods" :games="games" :films="films">我是插槽1</slot>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["title"],
  data(){
    return {
      foods: ["红烧肉","番茄炒蛋","鱼香肉丝"],
      games: ["红色警戒", "穿越火线", "魔兽世界"],
      films: ["肖申克的救赎", "火影忍者", "泰坦尼克号"]
    }
  }
}
</script>

```

