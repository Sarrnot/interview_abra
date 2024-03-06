import TreeNode from "./DataStructure/TreeNode";
import Customer from "./types/Customer";

export const getPostalCodes = (customers: Customer[]) =>
    customers.map((customer) => customer.psc.replace(/ /g, ""));

const createTree = (values: string[]) => {
    const root = new TreeNode("");

    values.forEach((value) => {
        let currentNode = root;

        currentNode.entriesCount += 1;

        for (let i = 1; i <= value.length; i++) {
            const part = value.slice(0, i);

            const nextNode = currentNode.addChild(part);

            currentNode.childrenEntriesCount += 1;
            nextNode.entriesCount += 1;

            currentNode = nextNode;
        }
    });

    return root;
};

const findFilterNodes = (root: TreeNode<string>, filterCount: number) => {
    const splittableNodes: TreeNode<string>[] = [root];
    const unsplittableNodes: TreeNode<string>[] = [];
    const nodesCount = () => splittableNodes.length + unsplittableNodes.length;

    // Mam podezreni, ze tyto vypocty nefunguji moc dobre, viz testy, 
    // ktere jsem pridaval - vznika vzdy prazdny, nebo dva stejne filtry.
    while (splittableNodes.length > 0) {
        if (nodesCount() === filterCount) break;

        splittableNodes.sort((a, b) => {
            if (a.entriesCount > b.entriesCount) {
                return -1;
            }
            if (a.entriesCount < b.entriesCount) {
                return 1;
            }
            return 0;
        });

        for (let i = 0; i < splittableNodes.length; i++) {
            const node = splittableNodes[i];

            const hasDirectEntries =
                node.entriesCount > node.childrenEntriesCount;
            const wouldExceedLimit =
                nodesCount() + node.children.length - 1 > filterCount;

            if (hasDirectEntries || wouldExceedLimit) {
                unsplittableNodes.push(node);
                splittableNodes.splice(i, 1);
                continue;
            }

            splittableNodes.splice(i, 1, ...node.children);
            break;
        }
    }

    return [...splittableNodes, ...unsplittableNodes];
};

// Chybi navratovy typ. Je to skoda, kdyz uz jsou typy u parametru.
//
// Podle testu je vysledkem Array<string>. Sel by takovy filtr pozdeji pouzit v aplikaci
// pro filtrovani tabulky?
export const createFilters = (customers: Customer[], filterCount: number) => {
    const postalCodes = getPostalCodes(customers);
    const root = createTree(postalCodes);
    const filterNodes = findFilterNodes(root, filterCount);
    const filters: string[] = filterNodes.map((node) => node.value);

    return filters;
};
