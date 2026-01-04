import { cn } from "../src/lib/utils";

describe("Utility: cn", () => {
    it("should merge tailwind classes", () => {
        const result = cn("text-red-500", "bg-blue-500");
        expect(result).toContain("text-red-500");
        expect(result).toContain("bg-blue-500");
    });
});
