/* eslint-disable quotes */
import validate from "./validate";

describe("jsonValidate", () => {
  test("should return failure when string is empty", () => {
    const jsonString = "";
    expect({
      messages: ['could\'t string {""} parse to json'],
      success: false,
    }).toEqual(validate(jsonString));
  });

  describe("Not found or not array", () => {
    const notFound = {
      messages: [
        'field "nodes" is not found or is not array',
        'field "paths" is not found or is not array',
      ],
      success: false,
    };

    test("should return failure when json is empty", () => {
      const jsonString = "{}";
      expect(notFound).toEqual(validate(jsonString));
    });

    test("should return failure when json is number", () => {
      const jsonString = '{"nodes": 0, "paths": 0}';
      expect(notFound).toEqual(validate(jsonString));
    });

    test("should return failure when json is string", () => {
      const jsonString = '{"nodes": "0", "paths": "0"}';
      expect(notFound).toEqual(validate(jsonString));
    });

    test("should return failure when json is boolean", () => {
      const jsonString = '{"nodes": false, "paths": false}';
      expect(notFound).toEqual(validate(jsonString));
    });
    test("should return failure when json is null", () => {
      const jsonString = '{"nodes": null, "paths": null}';
      expect(notFound).toEqual(validate(jsonString));
    });
  });

  describe("Nodes validate", () => {
    test("should return failure when node is not array", () => {
      const jsonString = '{"nodes": ["2"], "paths": []}';
      expect({
        messages: ['nodes: node {"2"} is not array'],
        success: false,
      }).toEqual(validate(jsonString));
    });

    test("should return failure when node is not array", () => {
      const jsonString = '{"nodes": [false], "paths": []}';
      expect({
        messages: ["nodes: node {false} is not array"],
        success: false,
      }).toEqual(validate(jsonString));
    });

    test("should return failure when node length is not equals two", () => {
      const jsonString = '{"nodes": [["01"]], "paths": []}';
      expect({
        messages: ['nodes: node {["01"]} length is not two values'],
        success: false,
      }).toEqual(validate(jsonString));
    });

    test("should return failure when node values is not string", () => {
      const jsonString = '{"nodes": [[1, "2"]], "paths": []}';
      expect({
        messages: ['nodes: node {[1,"2"]} value {1} is not string'],
        success: false,
      }).toEqual(validate(jsonString));
    });
  });

  describe("Paths validate", () => {
    test("should return failure when path is not array", () => {
      const jsonString = '{"nodes": [], "paths": ["2"]}';
      expect({
        messages: ['paths: path {"2"} is not array'],
        success: false,
      }).toEqual(validate(jsonString));
    });

    test("should return failure when path is not array", () => {
      const jsonString = '{"nodes": [], "paths": [false]}';
      expect({
        messages: ["paths: path {false} is not array"],
        success: false,
      }).toEqual(validate(jsonString));
    });

    test("should return failure when path length is not equals three", () => {
      const jsonString = '{"nodes": [], "paths": [["01"]]}';
      expect({
        messages: ['paths: path {["01"]} length is not three values'],
        success: false,
      }).toEqual(validate(jsonString));
    });

    test("should return failure when carthage is [string, string, string]", () => {
      const jsonString = '{"nodes": [], "paths": [["1", "2", "14"]]}';
      expect({
        messages: ['paths: path {["1","2","14"]} value {"14"} is not number'],
        success: false,
      }).toEqual(validate(jsonString));
    });

    test("should return failure when carthage is [number, string, number]", () => {
      const jsonString = '{"nodes": [], "paths": [[1, "2", 14]]}';
      expect({
        messages: ['paths: path {[1,"2",14]} value {1} is not string'],
        success: false,
      }).toEqual(validate(jsonString));
    });

    test("should return failure when carthage is [number, number, string]", () => {
      const jsonString = '{"nodes": [], "paths": [[1, 2, "14"]]}';
      expect({
        messages: [
          'paths: path {[1,2,"14"]} value {1} is not string',
          'paths: path {[1,2,"14"]} value {2} is not string',
          'paths: path {[1,2,"14"]} value {"14"} is not number',
        ],
        success: false,
      }).toEqual(validate(jsonString));
    });
  });

  test("should return success when is valid", () => {
    const jsonString = '{"nodes": [["01", "1"], ["02", "2"]], "paths": [["01", "02", 14]]}';
    expect({
      success: true,
    }).toEqual(validate(jsonString));
  });
});
