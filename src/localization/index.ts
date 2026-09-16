import { koreanTranslations } from "./ko-KR";

export function getLanguage(): string
{
    if (typeof context === "undefined") return "en-GB";
    return context.configuration.get("general.language") as string;
}

export function isKorean(): boolean
{
    return getLanguage() === "ko-KR";
}

export function t(source: string): string
{
    return isKorean() ? koreanTranslations[source] ?? source : source;
}

export function localizedMetric(english: number, korean: number): number
{
    return isKorean() ? korean : english;
}
