export interface IMenuItem {
  id: string
  name: string
  path: string
  redirect?: string
  icon?: string
  meta: {
    id: string
    title: string
    icon: string
    roles?: string[]
    hidden?: boolean,
    hasOnlyChildren?: boolean
  }
  children?: IMenuItem[]
}
