# bem架构

> scss 命名规范
> 熟练使用bem架构编写scss文件
> 全局注册 vite.config.ts配置文件

```ts
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src/'
    }
  },
  plugins: [vue()],
  // this
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "/src/style/bem.scss";`
      }
    }
  }
})
```

```scss
$namespace: 'h' !default;
$block-sel: '-' !default;
$elem-sel: '__' !default;
$mod-sel: '--' !default;

@mixin b($value) {
  $B: #{$namespace + $block-sel + $value};
  .#{$B} {
    @content;
  }
}

@mixin e($value) {
  $selector: &;
  @at-root {
    #{$selector + $elem-sel + $value} {
      @content;
    }
  }
}

@mixin m($value) {
  $selector: &;
  @at-root {
    #{$selector + $mod-sel + $value} {
      @content;
    }
  }
}
```

```html
<div class="h-test">
  test
  <div class="h-test__inner">
    inner
    <div class="h-test--success">success</div>
  </div>
</div>
```

```scss
// vue style
@include b(test) {
  color: greenyellow;

  @include e(inner) {
    color: red;
  }

  @include m(success) {
    background-color: green;
  }
}
```
