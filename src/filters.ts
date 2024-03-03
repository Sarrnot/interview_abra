import TreeNode from "./DataStructure/TreeNode";
import Customer from "./types/Customer";

export const createFilters = (customers: Customer[], filterCount: number) => {
    const postalCodes = customers.map((customer) =>
        customer.psc.replace(/ /g, "")
    );

    const tree = createTree(postalCodes);

    return [];
};

const createTree = (values: string[]) => {
    const root = new TreeNode("");

    values.forEach((value) => {
        let currentNode = root;

        currentNode.entriesCount += 1;

        for (let i = 0; i < value.length; i++) {
            const char = value[i];

            const nextNode = currentNode.addChild(char);

            currentNode.childrenEntriesCount += 1;
            nextNode.entriesCount += 1;

            currentNode = nextNode;
        }
    });

    return root;
};
