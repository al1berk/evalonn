export interface NewsItem {
    id: number
    title: string
    summary: string
    source: string
    time: string
    category: 'market' | 'company' | 'economy' | 'analysis'
    ticker?: string
}

export const mockNews: NewsItem[] = [
    {
        id: 1,
        title: 'BIST 100 Endeksi Güne Yükselişle Başladı',
        summary: 'Borsa İstanbul, yabancı yatırımcı alımlarıyla birlikte güne pozitif başladı. Bankacılık sektörü öncülük ediyor.',
        source: 'Bloomberg HT',
        time: '2 saat önce',
        category: 'market',
    },
    {
        id: 2,
        title: 'Türk Hava Yolları Yolcu Sayısını Artırdı',
        summary: 'THY, Ocak ayında 6.2 milyon yolcu taşıyarak geçen yılın aynı dönemine göre %12 artış kaydetti.',
        source: 'Ekonomist',
        time: '3 saat önce',
        category: 'company',
        ticker: 'THYAO',
    },
    {
        id: 3,
        title: 'Merkez Bankası Faiz Kararını Açıkladı',
        summary: 'TCMB, politika faizini sabit tutarak piyasa beklentilerini karşıladı. Enflasyon görünümü takipte.',
        source: 'Reuters',
        time: '5 saat önce',
        category: 'economy',
    },
    {
        id: 4,
        title: 'Garanti BBVA Kâr Beklentilerini Aştı',
        summary: 'Garanti Bankası, 2025 yılı son çeyrek finansal sonuçlarıyla analist beklentilerinin üzerinde kâr açıkladı.',
        source: 'Finans Gündem',
        time: '6 saat önce',
        category: 'company',
        ticker: 'GARAN',
    },
    {
        id: 5,
        title: 'Teknik Analiz: BIST 100 Direnç Seviyelerini Test Ediyor',
        summary: 'Endeks 10.500 seviyesini aşması halinde yeni zirveler görebilir. Destek 10.200 seviyesinde.',
        source: 'Matriks',
        time: '8 saat önce',
        category: 'analysis',
    },
    {
        id: 6,
        title: 'Aselsan Yeni Savunma İhalesini Kazandı',
        summary: 'Aselsan, NATO ülkelerine yönelik 500 milyon dolarlık savunma sistemleri ihalesini kazandı.',
        source: 'Anadolu Ajansı',
        time: '10 saat önce',
        category: 'company',
        ticker: 'ASELS',
    },
]

export const getCategoryColor = (category: NewsItem['category']): string => {
    const colors = {
        market: 'bg-blue-500/10 text-blue-500',
        company: 'bg-green-500/10 text-green-500',
        economy: 'bg-yellow-500/10 text-yellow-500',
        analysis: 'bg-purple-500/10 text-purple-500',
    }
    return colors[category]
}

export const getCategoryLabel = (category: NewsItem['category']): string => {
    const labels = {
        market: 'Piyasa',
        company: 'Şirket',
        economy: 'Ekonomi',
        analysis: 'Analiz',
    }
    return labels[category]
}
