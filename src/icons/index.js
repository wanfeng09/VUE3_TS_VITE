import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
const req = import.meta.globEager('./svg/*.svg')
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)

export default SvgIcon
