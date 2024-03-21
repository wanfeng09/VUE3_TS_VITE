export function resolveIconComponent(name: string) {
  return import(`@element-plus/icons-vue`).then(m => m[name])
}
