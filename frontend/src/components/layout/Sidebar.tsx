'use client';

import {
    List,
    Clock,
    Newspaper,
    Info,
    Flame,
    Calendar,
    Lightbulb,
    MessageCircle,
    MessageSquare,
    Activity,
    Bell,
    ArrowUpDown,
    Layers,
    GitBranch,
    HelpCircle,
    Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// TradingView Right Toolbar Icons
const tools = [
    { name: 'Watchlist', icon: List },
    { name: 'Alerts', icon: Clock },
    { name: 'News', icon: Newspaper },
    { name: 'Data Window', icon: Info },
    { name: 'Hotlists', icon: Flame },
    { name: 'Calendar', icon: Calendar },
    { name: 'My Ideas', icon: Lightbulb },
    { name: 'Public Chats', icon: MessageCircle },
    { name: 'Private Chats', icon: MessageSquare },
    { name: 'Ideas Stream', icon: Activity },
    { name: 'Notifications', icon: Bell },
    { name: 'Order Panel', icon: ArrowUpDown },
    { name: 'DOM', icon: Layers },
    { name: 'Object Tree', icon: GitBranch },
];

export function Sidebar() {
    const [activeTool, setActiveTool] = useState<string | null>('Watchlist');

    return (
        <aside className="w-[52px] flex flex-col items-center bg-sidebar text-sidebar-foreground border-l border-sidebar-border h-full py-2 z-30 flex-shrink-0">
            <div className="flex-1 flex flex-col items-center gap-1 w-full overflow-y-auto scrollbar-hide">
                {tools.map((tool) => (
                    <button
                        key={tool.name}
                        onClick={() => setActiveTool(activeTool === tool.name ? null : tool.name)}
                        className={cn(
                            "w-full h-[42px] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-colors relative group",
                            activeTool === tool.name && "text-primary bg-card"
                        )}
                        title={tool.name}
                    >
                        <tool.icon size={20} strokeWidth={1.5} />
                        {activeTool === tool.name && (
                            <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-primary" />
                        )}

                        {/* Tooltip on Hover */}
                        <div className="absolute right-full mr-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-border">
                            {tool.name}
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-auto w-full flex flex-col items-center gap-1">
                <button className="w-full h-[42px] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-colors">
                    <HelpCircle size={20} strokeWidth={1.5} />
                </button>
            </div>
        </aside>
    );
}
