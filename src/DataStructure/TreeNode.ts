class TreeNode<T> {
    public entriesCount = 0;
    public childrenEntriesCount = 0;
    public children: TreeNode<T>[] = [];

    constructor(public value: T) {}

    addChild(value: T) {
        let childNode = this.children.find((child) => child.value === value);

        if (!childNode) {
            childNode = new TreeNode(value);
            this.children.push(childNode);
        }

        return childNode;
    }
}

export default TreeNode;
