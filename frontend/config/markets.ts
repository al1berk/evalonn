/**
 * Market Configuration
 * Central source of truth for all market tickers
 * Last verified: 2026-04-05
 */

// ============================================================================
// BIST (Borsa Istanbul)
// ============================================================================

// All BIST tickers available in the Evalon API (118 verified)
export const BIST_AVAILABLE = [
    'AEFES', 'AGHOL', 'AKBNK', 'AKSA', 'AKSEN', 'ALARK', 'ALTNY', 'ARCLK',
    'ASELS', 'ASTOR', 'BALSU', 'BIMAS', 'BRSAN', 'BRYAT', 'BSOKE', 'BTCIM',
    'CANTE', 'CCOLA', 'CWENE', 'DAPGM', 'DOAS', 'DOHOL', 'DSTKF', 'ECILC',
    'EFOR', 'EGEEN', 'EKGYO', 'ENERY', 'ENJSA', 'ENKAI', 'EREGL', 'EUPWR',
    'FENER', 'FROTO', 'GARAN', 'GENIL', 'GESAN', 'GLRMK', 'GRSEL', 'GRTHO',
    'GSRAY', 'GUBRF', 'HALKB', 'HEKTS', 'IZENR', 'KCAER', 'KCHOL', 'KLRHO',
    'KONTR', 'KRDMD', 'KTLEV', 'KUYAS', 'MAGEN', 'MAVI', 'MGROS', 'MIATK',
    'MPARK', 'OBAMS', 'ODAS', 'OTKAR', 'OYAKC', 'PASEU', 'PATEK', 'PETKM',
    'PGSUS', 'QUAGR', 'RALYH', 'REEDR', 'SASA', 'SISE', 'SKBNK', 'SOKM',
    'TABGD', 'TAVHL', 'TCELL', 'THYAO', 'TKFEN', 'TOASO', 'TRALT', 'TRENJ',
    'TRMET', 'TSKB', 'TSPOR', 'TTKOM', 'TTRAK', 'TUKAS', 'TUPRS', 'TUREX',
    'TURSG', 'ULKER', 'VAKBN', 'VESTL', 'YEOTK', 'YKBNK', 'ZOREN', 'AKCNS',
    'AKENR', 'AKFGY', 'ALGYO', 'ALFAS', 'AHGAZ', 'AGROT', 'ARDYZ', 'BAGFS',
    'BIZIM', 'CLEBI', 'DEVA', 'GWIND', 'KAREL', 'LOGO', 'NETAS', 'PETUN',
    'PNSUT', 'SELEC', 'TMSN', 'VESBE', 'ZEDUR', 'IZFAS'
] as const;

// Tickers NOT available in the API (for reference)
export const BIST_UNAVAILABLE = [
    'ANSGR', 'CIMSA', 'ISCTR', 'ISMEN', 'SAHOL', 'ISGYO'
] as const;

// Popular BIST tickers for quick access (BIST 30 level)
export const BIST_POPULAR = [
    'THYAO', 'GARAN', 'ASELS', 'EREGL', 'AKBNK', 'FROTO', 'KCHOL', 'TUPRS',
    'SISE', 'TCELL', 'HALKB', 'VAKBN', 'BIMAS', 'TOASO', 'ENKAI', 'PGSUS',
    'TAVHL', 'PETKM', 'EKGYO', 'TTKOM', 'SASA', 'MAVI', 'ARCLK', 'ENJSA'
] as const;

// ============================================================================
// US Markets (NASDAQ/NYSE)
// ============================================================================

export const NASDAQ_TICKERS = [
    { ticker: 'NVDA', name: 'NVIDIA Corp.' },
    { ticker: 'AAPL', name: 'Apple Inc.' },
    { ticker: 'MSFT', name: 'Microsoft Corp.' },
    { ticker: 'TSLA', name: 'Tesla Inc.' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.' },
    { ticker: 'AMZN', name: 'Amazon.com Inc.' },
    { ticker: 'META', name: 'Meta Platforms Inc.' },
] as const;

// ============================================================================
// Crypto
// ============================================================================

export const CRYPTO_TICKERS = [
    { ticker: 'BTCUSDT_C', name: 'Bitcoin', symbol: 'BTC' },
    { ticker: 'ETHUSDT_C', name: 'Ethereum', symbol: 'ETH' },
    { ticker: 'SOLUSDT_C', name: 'Solana', symbol: 'SOL' },
    { ticker: 'BNBUSDT_C', name: 'Binance Coin', symbol: 'BNB' },
    { ticker: 'XRPUSDT_C', name: 'Ripple', symbol: 'XRP' },
    { ticker: 'LINKUSDT_C', name: 'Chainlink', symbol: 'LINK' },
] as const;

// ============================================================================
// Forex
// ============================================================================

export const FOREX_TICKERS = [
    { ticker: 'EURUSD', name: 'Euro / US Dollar', base: 'EUR', quote: 'USD' },
    { ticker: 'USDJPY', name: 'US Dollar / Yen', base: 'USD', quote: 'JPY' },
    { ticker: 'GBPUSD', name: 'British Pound / US Dollar', base: 'GBP', quote: 'USD' },
    { ticker: 'USDTRY', name: 'US Dollar / Turkish Lira', base: 'USD', quote: 'TRY' },
] as const;

// ============================================================================
// Ticker Names (Display names for UI)
// ============================================================================

export const TICKER_NAMES: Record<string, string> = {
    // BIST
    AEFES: 'Anadolu Efes',
    AGHOL: 'Anadolu Grubu Holding',
    AHGAZ: 'Ahlatcı Holding',
    AGROT: 'Agrotech',
    AKCNS: 'Akçansa',
    AKBNK: 'Akbank',
    AKENR: 'Akenerji',
    AKFGY: 'Akfen GYO',
    AKSA: 'Aksa Akrilik',
    AKSEN: 'Aksa Enerji',
    ALARK: 'Alarko Holding',
    ALFAS: 'Alfa Solar',
    ALGYO: 'Alarko GYO',
    ALTNY: 'Altınyağ',
    ARCLK: 'Arçelik',
    ARDYZ: 'Ard Grup',
    ASELS: 'Aselsan',
    ASTOR: 'Astor Enerji',
    BAGFS: 'Bagfaş',
    BALSU: 'Balsu Su',
    BIMAS: 'BİM Mağazalar',
    BIZIM: 'Bizim Toptan',
    BRSAN: 'Borusan Mannesmann',
    BRYAT: 'Borusan Yatırım',
    BSOKE: 'Batısöke Çimento',
    BTCIM: 'Batıçim',
    CANTE: 'Çan2 Termik',
    CCOLA: 'Coca-Cola İçecek',
    CLEBI: 'Çelebi Holding',
    CWENE: 'CW Enerji',
    DAPGM: 'Dap Gayrimenkul',
    DEVA: 'Deva Holding',
    DOAS: 'Doğuş Otomotiv',
    DOHOL: 'Doğan Holding',
    DSTKF: 'Dostluk Kazanç',
    ECILC: 'Eczacıbaşı İlaç',
    EFOR: 'Efor Taahhüt',
    EGEEN: 'Ege Endüstri',
    EKGYO: 'Emlak Konut GYO',
    ENERY: 'Enerjisa Enerji',
    ENJSA: 'Enerjisa',
    ENKAI: 'Enka İnşaat',
    EREGL: 'Ereğli Demir Çelik',
    EUPWR: 'Europower Enerji',
    FENER: 'Fenerbahçe',
    FROTO: 'Ford Otosan',
    GARAN: 'Garanti BBVA',
    GENIL: 'Genil',
    GESAN: 'Giresun San.',
    GLRMK: 'Gelecek Varlık',
    GRSEL: 'GSD Holding',
    GRTHO: 'Gratis',
    GSRAY: 'Galatasaray',
    GUBRF: 'Gübre Fabrikaları',
    GWIND: 'Galata Wind',
    HALKB: 'Halkbank',
    HEKTS: 'Hektaş',
    IZENR: 'İz Enerji',
    IZFAS: 'İzmir Fuar',
    KAREL: 'Karel',
    KCAER: 'Kartal Çimento',
    KCHOL: 'Koç Holding',
    KLRHO: 'Kalori Klima',
    KONTR: 'Kontrolmatik',
    KRDMD: 'Kardemir (D)',
    KTLEV: 'Katılım Emeklilik',
    KUYAS: 'Kuyumcukent',
    LOGO: 'Logo Yazılım',
    MAGEN: 'Margün Enerji',
    MAVI: 'Mavi Giyim',
    MGROS: 'Migros',
    MIATK: 'MİA Teknoloji',
    MPARK: 'MLP Sağlık',
    NETAS: 'Netaş Telekomünikasyon',
    OBAMS: 'Oba Makarna',
    ODAS: 'Odaş Elektrik',
    OTKAR: 'Otokar',
    OYAKC: 'Oyak Çimento',
    PASEU: 'Paşabahçe',
    PATEK: 'Paşa Teknoloji',
    PETKM: 'Petkim',
    PETUN: 'Petek Un',
    PGSUS: 'Pegasus',
    PNSUT: 'Pınar Süt',
    QUAGR: 'QUA Granite',
    RALYH: 'Rally Holding',
    REEDR: 'Reeder',
    SASA: 'SASA Polyester',
    SELEC: 'Selçuk Ecza',
    SISE: 'Şişecam',
    SKBNK: 'Şekerbank',
    SOKM: 'Şok Marketler',
    TABGD: 'Tab Gıda',
    TAVHL: 'TAV Havalimanları',
    TCELL: 'Turkcell',
    THYAO: 'Türk Hava Yolları',
    TKFEN: 'Tekfen Holding',
    TMSN: 'Tümosan',
    TOASO: 'Tofaş',
    TRALT: 'Türk Altın',
    TRENJ: 'Trend Enerji',
    TRMET: 'Türk Metal',
    TSKB: 'TSKB',
    TSPOR: 'Trabzonspor',
    TTKOM: 'Türk Telekom',
    TTRAK: 'Türk Traktör',
    TUKAS: 'Tukaş',
    TUPRS: 'Tüpraş',
    TUREX: 'Tureks',
    TURSG: 'Türkiye Sigorta',
    ULKER: 'Ülker',
    VAKBN: 'Vakıfbank',
    VESBE: 'Vestel Beyaz Eşya',
    VESTL: 'Vestel',
    YEOTK: 'Yeo Teknoloji',
    YKBNK: 'Yapı Kredi',
    ZEDUR: 'Zedur Enerji',
    ZOREN: 'Zorlu Enerji',
    // Unavailable (for completeness)
    ANSGR: 'Anadolu Sigorta',
    CIMSA: 'Çimsa',
    ISCTR: 'İş Bankası (C)',
    ISMEN: 'İş Yatırım Menkul',
    SAHOL: 'Sabancı Holding',
    ISGYO: 'İş GYO',
    // NASDAQ
    NVDA: 'NVIDIA Corp.',
    AAPL: 'Apple Inc.',
    MSFT: 'Microsoft Corp.',
    TSLA: 'Tesla Inc.',
    GOOGL: 'Alphabet Inc.',
    AMZN: 'Amazon.com Inc.',
    META: 'Meta Platforms Inc.',
    // Crypto
    BTCUSDT_C: 'Bitcoin',
    ETHUSDT_C: 'Ethereum',
    SOLUSDT_C: 'Solana',
    BNBUSDT_C: 'Binance Coin',
    XRPUSDT_C: 'Ripple',
    LINKUSDT_C: 'Chainlink',
};

// ============================================================================
// Legacy exports (for backward compatibility)
// ============================================================================

export const MARKET_TICKERS = {
    BIST: BIST_AVAILABLE,
    NASDAQ: NASDAQ_TICKERS,
    CRYPTO: CRYPTO_TICKERS,
    FOREX: FOREX_TICKERS,
};

// Aliases for backward compatibility
export const AVAILABLE_TICKERS = BIST_AVAILABLE;
export const UNAVAILABLE_TICKERS = BIST_UNAVAILABLE;
export const POPULAR_TICKERS = BIST_POPULAR;

// ============================================================================
// Types
// ============================================================================

export type BistTicker = typeof BIST_AVAILABLE[number];
export type NasdaqTicker = typeof NASDAQ_TICKERS[number]['ticker'];
export type CryptoTicker = typeof CRYPTO_TICKERS[number]['ticker'];
export type ForexTicker = typeof FOREX_TICKERS[number]['ticker'];
