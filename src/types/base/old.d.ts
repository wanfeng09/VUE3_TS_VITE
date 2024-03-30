// declare let count:number // 文件“d:/study/vue3-ts/src/types/index.d.ts”不是模块。
export declare let count: number
export declare let str: string
export declare let position: { top: number; bottom: number }

enum position {
  top = '上',
  bottom = '下',
  left = '左',
  right = '右'
}
export declare function fn(params: position): void

// export declare const fnArrow = (val:number) => number // 报错
type fnType = (a: number, b: number) => number
export declare const fnArrow: fnType
