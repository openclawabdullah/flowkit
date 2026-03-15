/**
 * FlowKit - JSON Utilities
 * 
 * Helper functions for parsing JSON from LLM responses.
 * LLMs often return double-encoded JSON with escaped characters.
 */

/**
 * Unescape common escape sequences from LLM responses
 * 
 * LLMs often return JSON like:
 * `{\"widgets\":[{\"type\":\"ProductGrid\",...}]}`
 * 
 * This function handles:
 * - `\"` → `"`
 * - `\/` → `/`
 * - `\\` → `\`
 * - `\n` → newline
 * - `\t` → tab
 * 
 * @param str - The potentially escaped JSON string
 * @returns Unescaped string
 */
export function unescapeLLMJson(str: string): string {
  if (!str || typeof str !== 'string') return str
  
  let result = str
  
  // Handle double-encoded sequences (most common from LLMs)
  // Order matters: do \\ last to avoid double-unescaping
  result = result.replace(/\\"/g, '"')      // \" → "
  result = result.replace(/\\\//g, '/')     // \/ → /
  result = result.replace(/\\n/g, '\n')     // \n → newline
  result = result.replace(/\\t/g, '\t')     // \t → tab
  result = result.replace(/\\r/g, '\r')     // \r → carriage return
  result = result.replace(/\\\\/g, '\\')    // \\ → \
  
  return result
}

/**
 * Parse JSON from LLM response with automatic unescaping
 * 
 * Tries multiple strategies:
 * 1. Direct JSON.parse
 * 2. Unescape then parse
 * 3. Extract JSON from markdown code blocks
 * 4. Extract JSON from mixed text
 * 
 * @param response - Raw response from LLM
 * @returns Parsed JSON object or null if parsing fails
 */
export function parseLLMJson<T = any>(response: string): T | null {
  if (!response || typeof response !== 'string') return null
  
  // Trim whitespace
  let jsonStr = response.trim()
  
  // Strategy 1: Try direct parse
  try {
    return JSON.parse(jsonStr)
  } catch (e) {
    // Continue to next strategy
  }
  
  // Strategy 2: Unescape and parse
  try {
    const unescaped = unescapeLLMJson(jsonStr)
    return JSON.parse(unescaped)
  } catch (e) {
    // Continue to next strategy
  }
  
  // Strategy 3: Extract from markdown code blocks
  const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (codeBlockMatch) {
    try {
      const extracted = codeBlockMatch[1].trim()
      const unescaped = unescapeLLMJson(extracted)
      return JSON.parse(unescaped)
    } catch (e) {
      // Continue to next strategy
    }
  }
  
  // Strategy 4: Find JSON object/array in the response
  const jsonMatch = jsonStr.match(/(\{[\s\S]*\}|\[[\s\S]*\])/)
  if (jsonMatch) {
    try {
      const extracted = jsonMatch[1]
      const unescaped = unescapeLLMJson(extracted)
      return JSON.parse(unescaped)
    } catch (e) {
      // Continue to next strategy
    }
  }
  
  // Strategy 5: Remove outer quotes if present (sometimes LLMs return "\"{...}\"")
  if (jsonStr.startsWith('"') && jsonStr.endsWith('"')) {
    try {
      const unquoted = jsonStr.slice(1, -1)
      const unescaped = unescapeLLMJson(unquoted)
      return JSON.parse(unescaped)
    } catch (e) {
      // Failed
    }
  }
  
  // Strategy 6: Aggressive unescape (multiple passes)
  try {
    let aggressive = jsonStr
    for (let i = 0; i < 3; i++) {  // Max 3 passes
      const prev = aggressive
      aggressive = unescapeLLMJson(aggressive)
      if (aggressive === prev) break  // No more changes
    }
    return JSON.parse(aggressive)
  } catch (e) {
    // All strategies failed
  }
  
  return null
}

/**
 * Parse widgets from LLM response
 * 
 * Handles various response formats:
 * - Single widget: `{ "type": "ProductCard", ... }`
 * - Widget array: `{ "widgets": [...] }`
 * - Response wrapper: `{ "response": { "widgets": [...] } }`
 * 
 * @param response - Raw response from LLM
 * @returns Array of widgets
 */
export function parseWidgetsFromLLM(response: string): any[] {
  const parsed = parseLLMJson(response)
  
  if (!parsed) return []
  
  // Single widget
  if (parsed.type) {
    return [parsed]
  }
  
  // Widgets array
  if (Array.isArray(parsed.widgets)) {
    return parsed.widgets
  }
  
  // Response wrapper
  if (parsed.response?.widgets) {
    return parsed.response.widgets
  }
  
  // Array of widgets
  if (Array.isArray(parsed)) {
    return parsed.filter(w => w && w.type)
  }
  
  return []
}

/**
 * Safely stringify widgets for LLM context
 * 
 * @param widgets - Array of widgets
 * @returns JSON string suitable for LLM context
 */
export function stringifyWidgetsForLLM(widgets: any[]): string {
  return JSON.stringify(widgets, null, 2)
}

export default {
  unescapeLLMJson,
  parseLLMJson,
  parseWidgetsFromLLM,
  stringifyWidgetsForLLM,
}
