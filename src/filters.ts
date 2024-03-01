import TreeNode from "./DataStructure/TreeNode";
import { customers } from "./api/customers";
import Customer from "./types/Customer";

export const createFilters = (filterCount: number) => {
    return [];
};

const createPostalCodeTree = (customers: Customer[]) => {
    const postalCodes = customers.map((customer) =>
        customer.psc.replace(/ /g, "")
    );

    const root = new TreeNode("");

    postalCodes.forEach((code) => {
        let currentNode = root;

        currentNode.entriesCount += 1;

        for (let i = 0; i < code.length; i++) {
            const value = code[i];

            let nextNode = currentNode.children.find(
                (child) => child.value === value
            );

            if (!nextNode) {
                nextNode = new TreeNode(value);
                currentNode.addChild(nextNode);
            }

            currentNode.childrenEntriesCount += 1;
            nextNode.entriesCount += 1;
            currentNode = nextNode;
        }
    });
};
