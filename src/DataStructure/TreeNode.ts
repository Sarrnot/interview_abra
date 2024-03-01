class TreeNode<T> {
    public entriesCount = 0;
    public childrenEntriesCount = 0;

    constructor(public value: T, public children: TreeNode<T>[] = []) {}

    addChild(newChild: TreeNode<T>) {
        this.children.push(newChild);
    }
}

export default TreeNode;
