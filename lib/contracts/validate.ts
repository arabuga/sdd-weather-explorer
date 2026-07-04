import Ajv, { type ValidateFunction } from "ajv";
import addFormats from "ajv-formats";
import { readFileSync } from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";

const OPENAPI_PATH = path.join(
  process.cwd(),
  "docs/features/weather-explorer/contracts/openapi.yaml",
);

let validators: Map<string, ValidateFunction> | null = null;

function loadValidators(): Map<string, ValidateFunction> {
  if (validators) return validators;

  const ajv = new Ajv({ strict: false, allErrors: true });
  addFormats(ajv);

  const doc = parseYaml(readFileSync(OPENAPI_PATH, "utf8")) as {
    components: { schemas: Record<string, object> };
  };

  validators = new Map();
  for (const [name, schema] of Object.entries(doc.components.schemas)) {
    const id = `#/components/schemas/${name}`;
    ajv.addSchema({ ...schema, $id: id }, id);
    const validate = ajv.getSchema(id);
    if (validate) validators.set(name, validate);
  }

  return validators;
}

export function validateAgainstOpenApi(
  schemaName: string,
  data: unknown,
): { valid: true } | { valid: false; errors: string[] } {
  const validate = loadValidators().get(schemaName);
  if (!validate) {
    throw new Error(`OpenAPI schema not found: ${schemaName}`);
  }

  if (validate(data)) return { valid: true };

  return {
    valid: false,
    errors: (validate.errors ?? []).map(
      (e) => `${e.instancePath || "/"} ${e.message ?? "invalid"}`,
    ),
  };
}
