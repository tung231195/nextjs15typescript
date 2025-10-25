import { AttributeType, ProductAttributeValue, ProductVariant } from "@/app/types";
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // đọc file dưới dạng base64 (dataURL)
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
export type AttributeOption = { value: string; label?: string } | string;

export function generateVariantsFromAttributes(attributes: AttributeType[]): ProductVariant[] {
  const validAttributes = attributes.filter((a) => a.options && a.options.length > 0);
  if (validAttributes.length === 0) return [];

  // ✅ Sinh tổ hợp các giá trị
  const combinations = validAttributes.reduce<string[][]>(
    (acc, attr) => acc.flatMap((a) => (attr.options ?? []).map((option) => [...a, option])),
    [[]],
  );

  // ✅ Map sang ProductVariant
  return combinations.map((values) => {
    const attributesMapped: ProductAttributeValue[] = validAttributes.map((attr, i) => {
      //const opt = values[i];
      const opt = values[i] as AttributeOption;
      const value = typeof opt === "object" ? (opt.value ?? opt.label ?? JSON.stringify(opt)) : opt;

      return {
        attribute: attr._id,
        valueString: value,
      };
    });

    const sku = attributesMapped
      .map((a) => a.valueString)
      .join("-")
      .toUpperCase();

    return {
      sku,
      price: 0,
      stock: 0,
      attributes: attributesMapped,
      images: [],
    };
  });
}
