import { koreanMetrics, koreanTranslations } from "./ko-KR";

interface LocaleResources {
    translations: Record<string, string>;
    metrics: Record<string, number>;
}

// Register another language here; missing translations and dimensions use English.
const locales: Record<string, LocaleResources> = {
    "ko-KR": { translations: koreanTranslations, metrics: koreanMetrics }
};

export function getLanguage(): string
{
    if (typeof context === "undefined") return "en-GB";
    return context.configuration.get("general.language") as string;
}

function currentLocale(): LocaleResources | undefined
{
    return locales[getLanguage()];
}

export function t(source: string): string
{
    return currentLocale()?.translations[source] ?? source;
}

/** Translate a message with named placeholders; `english` is its fallback. */
export function formatLocalized(key: string, english: string, values: Record<string, string | number>): string
{
    const template = currentLocale()?.translations[key] ?? english;
    return template.replace(/\{(\w+)\}/g, (match, name: string) =>
        Object.prototype.hasOwnProperty.call(values, name) ? String(values[name]) : match);
}

export function localizedMetric(key: string, english: number): number
{
    return currentLocale()?.metrics[key] ?? english;
}

/** Keep English's measured height unless this locale supplies a line height. */
export function localizedTextHeight(key: string, english: number, lines: number, padding: number = 0): number
{
    const lineHeight = localizedMetric(key, 0);
    return lineHeight ? Math.max(lineHeight, lines * lineHeight) + padding : english;
}
