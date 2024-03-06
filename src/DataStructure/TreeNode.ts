// Libi se mi odvaha pouzit datovou strukturu strom.
class TreeNode<T> {
  // Hodil by se komentar, co je "entriesCount" a "childrenEntriesCount".
  //
  // Cast stromu, ktery vznika behem spusteni testu:
  // {
  //   "value": "12",
  //   "entriesCount": 2,
  //   "childrenEntriesCount": 2, // <--- Podezrele. Ma smysl mit hodnotu, ktera je vsude stejna,
  //                                      jako "entriesCount" (az na posledni uzel stromu bez children)?
  //   "children": [
  //     {
  //       "value": "120",
  //       "entriesCount": 2,
  //       "childrenEntriesCount": 2,
  //       "children": [
  //         {
  //           "value": "1200",
  //           "entriesCount": 2,
  //           "childrenEntriesCount": 2,
  //           "children": [
  //             {
  //               "value": "12000",
  //               "entriesCount": 2,
  //               "childrenEntriesCount": 0,
  //               "children": []
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },
    public entriesCount = 0;
    public childrenEntriesCount = 0;
    public children: TreeNode<T>[] = [];

    constructor(public value: T) {}

    // Child se pridava metodou "addchild", ale hodnoty "entriesCount" a "childrenEntriesCount" se nastavuji
    // primym zasahem do fieldu v instanci TreeNode.
    // Cekal bych, ze se o zmenu "entriesCount" a "childrenEntriesCount" postara metoda "addChild"
    // ve chvili, kdy se pridava child (nebo nejaka jina metoda).
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
