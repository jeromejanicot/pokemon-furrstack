import Trie from "../../src/trie";
import { describe, it, expect } from "@jest/globals";

describe("Build trie and return autosuggestion", () => {
  it("Build a Trie from a list of inputs", () => {
    const inputString = ["pokemon", "pokebowl", "at", "attic", "ants"];

    inputString.map((string) => Trie.insert(string));

    const invalid = Trie.search("bomb");
    const autoSuggestion1 = Trie.search("at");
    const autoSuggestion2 = Trie.search("po");
    const autoSuggestion3 = Trie.search("a");
    const complete = Trie.search("pokemon");

    expect(invalid).toEqual(undefined);
    expect(autoSuggestion1?.sort()).toEqual(["at", "attic"].sort());
    expect(autoSuggestion2?.sort()).toEqual(["pokemon", "pokebowl"].sort());
    expect(autoSuggestion3?.sort()).toEqual(["at", "attic", "ants"].sort());
    expect(complete?.sort()).toEqual(["pokemon"].sort());
  });
});
