import { Object3D, Material, MeshPhysicalMaterial, MeshBasicMaterial, MeshStandardMaterial} from "three";
/**
 * 类型“Object3D<Object3DEventMap>”上不存在属性“material”
 * material 属性是 Mesh 类型的属性,而不是通用的 Object3D 类型
 * 如果你确信你的对象是 Mesh 类型，可以使用类型断言来告诉 TypeScript 在处理时将对象视为 Mesh
 *
 * @param object 该函数接受一个参数 object，它是一个 Object3D 类型的对象或者是一个可选的对象。
 * 检查传入的对象是否是 THREE.Mesh 类型
 * 通过 object?.type === 'Mesh' 这行代码，它会首先检查对象是否存在（非空），然后检查对象的 type 属性是否等于字符串 'Mesh'
 * 如果条件成立，函数返回 true，表示对象是 THREE.Mesh 类型；否则，返回 false。
 */
export function isMeshType(object?: Object3D): object is THREE.Mesh {
    return object?.type === "Mesh";
}

// 类型“Material | Material[]”上不存在属性“isMeshPhysicalMaterial”
export function isMeshPhysicalMaterial(material: Material | Material[]): material is MeshPhysicalMaterial {
    return Array.isArray(material) ? false : material instanceof MeshPhysicalMaterial;
}
// 类型“Material | Material[]”上不存在属性“color”。
export function isMaterialWithColor( material: Material | Material[]): material is MeshBasicMaterial {
    return Array.isArray(material) ? false : material instanceof MeshBasicMaterial;
}
// 类型“Material | Material[]”上不存在属性“roughness”。
export function isMeshStandardMaterial(material: Material | Material[]): material is MeshStandardMaterial {
    return Array.isArray(material) ? false : material instanceof MeshStandardMaterial;
}