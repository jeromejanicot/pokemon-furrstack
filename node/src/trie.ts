interface Node {
  character: string;
  word: boolean;
  children: Node[] | undefined[];
}

class Trie {
  private root: Node;
  constructor() {
    this.root = { character: "", word: false, children: [] };
  }

  createNode(char: string) {
    return { character: char, word: false, children: [] };
  }

  insert(key: string) {
    let curr = this.root;

    for (let i = 0; i < key.length; i++) {
      const index = key.charCodeAt(i) - 97;
      if (curr.children != undefined && curr.children[index]) {
        curr = curr.children[index] as Node;
        continue;
      }
      curr.children[index] = this.createNode(key.charAt(i));
      curr = curr.children[index] as Node;
    }
    curr.word = true;
  }

  search(key: string) {
    let curr = this.root;
    const rec: string[] = [];
    let prefix = "";

    for (let i = 0; i < key.length; i++) {
      const index = key.charCodeAt(i) - 97;
      if (!curr.children[index]) {
        return;
      }
      prefix += key.charAt(i);
      curr = curr.children[index] as Node;
    }
    this.suggestRec(curr, rec, prefix);
    return rec;
  }

  suggestRec(node: Node, rec: string[], prefix: string) {
    if (node.word) {
      rec.push(prefix + node.character);
    }

    for (let i = 0; i < node.children.length; i++) {
      if (node.children[i]) {
        node = node.children[i] as Node;
        this.suggestRec(node, rec, prefix + node.character);
      }
    }
  }
}

export default new Trie();
