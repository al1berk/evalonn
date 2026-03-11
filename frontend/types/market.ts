export interface PriceBar {
    t: string; // Time in ISO format or timestamp
    o: number; // Open
    h: number; // High
    l: number; // Low
    c: number; // Close
    v: number; // Volume
}

export type Timeframe = '1m' | '5m' | '15m' | '1h' | '1d' | '1w' | '1M';

export interface PricesResponse {
    ticker: string;
    timeframe: string;
    rows: number;
    data: PriceBar[];
}

export interface FetchPricesParams {
    ticker: string;
    timeframe: Timeframe;
    limit?: number;
    start?: string; // YYYY-MM-DDTHH:MM:SS
    end?: string;   // YYYY-MM-DDTHH:MM:SS
}

export const TICKERS_RAW = [
    "AEFES", "AGHOL", "AKBNK", "AKSA", "AKSEN", "ALARK", "ALTNY", "ANSGR", "ARCLK", "ASELS",
    "ASTOR", "BALSU", "BIMAS", "BRSAN", "BRYAT", "BSOKE", "BTCIM", "CANTE", "CCOLA", "CIMSA",
    "CWENE", "DAPGM", "DOAS", "DOHOL", "DSTKF", "ECILC", "EFOR", "EGEEN", "EKGYO", "ENERY",
    "ENJSA", "ENKAI", "EREGL", "EUPWR", "FENER", "FROTO", "GARAN", "GENIL", "GESAN", "GLRMK",
    "GRSEL", "GRTHO", "GSRAY", "GUBRF", "HALKB", "HEKTS", "ISCTR", "ISMEN", "IZENR", "KCAER",
    "KCHOL", "KLRHO", "KONTR", "KRDMD", "KTLEV", "KUYAS", "MAGEN", "MAVI", "MGROS", "MIATK",
    "MPARK", "OBAMS", "ODAS", "OTKAR", "OYAKC", "PASEU", "PATEK", "PETKM", "PGSUS", "QUAGR",
    "RALYH", "REEDR", "SAHOL", "SASA", "SISE", "SKBNK", "SOKM", "TABGD", "TAVHL", "TCELL",
    "THYAO", "TKFEN", "TOASO", "TRALT", "TRENJ", "TRMET", "TSKB", "TSPOR", "TTKOM", "TTRAK",
    "TUKAS", "TUPRS", "TUREX", "TURSG", "ULKER", "VAKBN", "VESTL", "YEOTK", "YKBNK", "ZOREN",
    "AKCNS", "AKENR", "AKFGY", "ALGYO", "ALFAS", "AHGAZ", "AGROT", "ARDYZ", "BAGFS",
    "BIZIM", "CLEBI", "DEVA", "GWIND", "ISGYO", "KAREL", "LOGO", "NETAS", "PETUN",
    "PNSUT", "SELEC", "TMSN", "VESBE", "ZEDUR", "IZFAS"
];
