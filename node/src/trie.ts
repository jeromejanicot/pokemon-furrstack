export interface Node {
  character: string;
  word: boolean;
  children: Node[] | undefined[];
}

export interface TrieType {
  insert: (key: string) => void;
  search: (key: string) => string[] | undefined;
}

class Trie {
  private root: Node;
  constructor() {
    this.root = { character: "", word: false, children: [] };
  }

  private createNode(char: string): Node {
    return { character: char, word: false, children: [] };
  }

  public insert(key: string) {
    let curr = this.root;

    for (let i = 0; i < key.length; i++) {
      const index = key.charCodeAt(i) - 97;
      if (!curr.children[index]) {
        curr.children[index] = this.createNode(key.charAt(i));
      }
      curr = curr.children[index] as Node;
    }
    curr.word = true;
  }

  public search(key: string) {
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
    this.suggestRec(curr, rec, prefix.substring(0, prefix.length - 1));
    return rec;
  }

  private suggestRec(node: Node, rec: string[], prefix: string) {
    if (node.word) {
      rec.push(prefix + node.character);
    }

    for (const child in node.children)
      this.suggestRec(
        node.children[child] as Node,
        rec,
        prefix + node.character,
      );
  }
}

export default new Trie();
