import Trie from "../../src/trie";
import { describe, it, expect } from "@jest/globals";

describe("Build trie and return autosuggestion", () => {
  it("Build a Trie from a list of inputs", () => {
    const inputString = ["pokemon", "pokebowl", "at", "attic", "ants"];

    inputString.map((string) => Trie.insert(string));

    console.log(Trie);

    const invalid = Trie.search("bomb");
    const autoSuggestion1 = Trie.search("at");
    const autoSuggestion2 = Trie.search("po");
    const autoSuggestion3 = Trie.search("a");
    const complete = Trie.search("pokemon");

    expect(invalid).toEqual(undefined);
    expect(autoSuggestion1).toContain(["at", "attic"]);
    expect(autoSuggestion2).toEqual(["pokemon", "pokebowl"]);
    expect(autoSuggestion3).toEqual(["at", "attic", "ants"]);
    expect(complete).toEqual(["pokemon"]);
  });
});
