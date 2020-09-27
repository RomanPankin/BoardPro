export class StringUtils {
   public static filterEmptyOrDash(value: string): string {
      if (value == null) {
         return null;
      }

      value = value.trim();

      // 'feature' of SuperHeroAPI
      return value === '-' || value === 'null' || value.length === 0 ? null : value;
   }
}
