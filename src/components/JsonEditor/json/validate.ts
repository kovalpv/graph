import validateResultBuilder, { Validation } from "./validateResultBuilder";

export default function validate(jsonString: string): Validation {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let json: Record<string, any> = {};
  const validateBuilder = validateResultBuilder();

  try {
    json = JSON.parse(jsonString);
  } catch (error) {
    return validateBuilder
      .addError(`could't string {${JSON.stringify(jsonString)}} parse to json`)
      .build();
  }

  const { nodes } = json;
  const { paths } = json;

  if (!Array.isArray(nodes)) {
    validateBuilder.addError('field "nodes" is not found or is not array');
  } else {
    nodes.forEach((node) => {
      if (!Array.isArray(node)) {
        validateBuilder.addError(
          `nodes: node {${JSON.stringify(node)}} is not array`
        );
      } else if (node.length !== 2) {
        validateBuilder.addError(
          `nodes: node {${JSON.stringify(node)}} length is not two values`
        );
      }
      if (Array.isArray(node)) {
        node.forEach((value) => {
          if (typeof value !== "string") {
            validateBuilder.addError(
              `nodes: node {${JSON.stringify(node)}} value {${JSON.stringify(
                value
              )}} is not string`
            );
          }
        });
      }
    });
  }

  if (!Array.isArray(paths)) {
    validateBuilder.addError('field "paths" is not found or is not array');
  } else {
    paths.forEach((path) => {
      if (!Array.isArray(path)) {
        validateBuilder.addError(
          `paths: path {${JSON.stringify(path)}} is not array`
        );
      } else if (path.length !== 3) {
        validateBuilder.addError(
          `paths: path {${JSON.stringify(path)}} length is not three values`
        );
      }
      if (Array.isArray(path)) {
        path.forEach((value, index) => {
          if (typeof value !== "string" && [0, 1].includes(index)) {
            validateBuilder.addError(
              `paths: path {${JSON.stringify(path)}} value {${JSON.stringify(
                value
              )}} is not string`
            );
          }

          if (typeof value !== "number" && index === 2) {
            validateBuilder.addError(
              `paths: path {${JSON.stringify(path)}} value {${JSON.stringify(
                value
              )}} is not number`
            );
          }
        });
      }
    });
  }

  return validateBuilder.build();
}
