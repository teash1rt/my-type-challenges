interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

type InorderTraversal<T extends TreeNode | null> = T extends null
  ? []
  : InorderTraversal<(T & TreeNode)['left']> extends infer R1
    ? Push<R1, (T & TreeNode)['val']> extends infer R2 extends readonly any[]
      ? Concat<R2, InorderTraversal<(T & TreeNode)['right']>> extends infer R3
        ? R3
        : never
      : never
    : never

//const fn = (tree: TreeNode | null, res: number[]) => {
//  if (!tree) {
//    return []
//  }
//  res = res.concat(fn(tree.left, []))
//  res.push(tree.val)
//  res = res.concat(fn(tree.right, []))
//  return res
//}
