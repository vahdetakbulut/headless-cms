"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    MapPin,
    PenSquare,
    HelpCircle,
    Images,
    Hash,
    Users,
    Quote,
    Award,
    Image as ImageIcon,
    Video,
    Menu as MenuIcon,
    PanelBottom,
    FolderOpen,
    Inbox,
    Settings,
    UserCog,
    LogOut,
    ExternalLink,
    Construction,
    ChevronRight,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface SubMenuItem {
    name: string;
    path: string;
}

interface NavItem {
    name: string;
    icon: any;
    path?: string;
    external?: boolean;
    type?: "toggle" | "link";
    submenu?: SubMenuItem[];
    badge?: number;
}

interface NavGroup {
    group: string;
    items: NavItem[];
}

const navigation: NavGroup[] = [
    {
        group: "GENEL",
        items: [
            { name: "Gösterge Paneli", icon: LayoutDashboard, path: "/admin", type: "link" },
            { name: "Siteye Git", icon: ExternalLink, path: "/", external: true, type: "link" },
            { name: "Bakım Modu", icon: Construction, type: "toggle" },
        ],
    },
    {
        group: "İÇERİK",
        items: [
            { name: "Sayfalar", icon: FileText, path: "/admin/pages" },
            { name: "Hizmetler", icon: Briefcase, path: "/admin/services" },
            { name: "Hizmet Bölgeleri", icon: MapPin, path: "/admin/service-areas" },
            {
                name: "Blog Yazıları",
                icon: PenSquare,
                path: "/admin/blogs",
                submenu: [
                    { name: "Tüm Yazılar", path: "/admin/blogs" },
                    { name: "Kategoriler", path: "/admin/blogs/categories" },
                ],
            },
            { name: "Sık Sorulanlar", icon: HelpCircle, path: "/admin/faqs" },
        ],
    },
    {
        group: "MODÜLLER",
        items: [
            { name: "Slider", icon: Images, path: "/admin/sliders" },
            { name: "Sayaçlar", icon: Hash, path: "/admin/counters" },
            { name: "Ekip", icon: Users, path: "/admin/team" },
            { name: "Müşteri Yorumları", icon: Quote, path: "/admin/testimonials" },
            { name: "Referanslar", icon: Award, path: "/admin/references" },
            { name: "Foto Galeri", icon: ImageIcon, path: "/admin/gallery" },
            { name: "Video Galeri", icon: Video, path: "/admin/videos" },
        ],
    },
    {
        group: "MENÜ",
        items: [
            { name: "Header Menü", icon: MenuIcon, path: "/admin/menus/header" },
            { name: "Footer Menü", icon: PanelBottom, path: "/admin/menus/footer" },
        ],
    },
    {
        group: "MEDYA",
        items: [
            { name: "Medya Kütüphanesi", icon: FolderOpen, path: "/admin/media" },
        ],
    },
    {
        group: "İLETİŞİM",
        items: [
            { name: "Gelen Kutusu", icon: Inbox, path: "/admin/contacts", badge: 0 },
        ],
    },
    {
        group: "AYARLAR",
        items: [
            {
                name: "Site Ayarları",
                icon: Settings,
                path: "/admin/settings",
                submenu: [
                    { name: "Genel", path: "/admin/settings/general" },
                    { name: "İletişim", path: "/admin/settings/contact" },
                    { name: "Sosyal Medya", path: "/admin/settings/social" },
                    { name: "SEO", path: "/admin/settings/seo" },
                ],
            },
            { name: "Yöneticiler", icon: UserCog, path: "/admin/users" },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-[280px] flex-col border-r bg-card text-card-foreground">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/admin" className="flex items-center gap-2 font-bold text-primary">
                    <div className="h-8 w-8 rounded-lg bg-primary" />
                    <span>MedyaGem CMS</span>
                </Link>
            </div>
            <ScrollArea className="flex-1 px-3 py-4">
                {navigation.map((group, idx) => (
                    <div key={idx} className="mb-6">
                        <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {group.group}
                        </h4>
                        <div className="space-y-1">
                            {group.items.map((item, itemIdx) => {
                                const isActive = pathname === item.path || (item.submenu && item.path && pathname.startsWith(item.path));

                                if (item.type === "toggle") {
                                    return (
                                        <Button
                                            key={itemIdx}
                                            variant="ghost"
                                            className="w-full justify-between px-3 font-normal"
                                        >
                                            <span className="flex items-center gap-3">
                                                <item.icon className="h-4 w-4" />
                                                {item.name}
                                            </span>
                                            <div className="h-2 w-2 rounded-full bg-destructive" />
                                        </Button>
                                    )
                                }

                                return (
                                    <div key={itemIdx}>
                                        <Button
                                            asChild
                                            variant={isActive ? "secondary" : "ghost"}
                                            className={cn(
                                                "w-full justify-start px-3 font-normal",
                                                isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                                            )}
                                        >
                                            <Link href={item.path || "#"} target={item.external ? "_blank" : undefined}>
                                                <item.icon className="h-4 w-4 mr-3" />
                                                {item.name}
                                                {item.submenu && (
                                                    <ChevronRight className={cn("ml-auto h-4 w-4 transition-transform", isActive && "rotate-90")} />
                                                )}
                                            </Link>
                                        </Button>
                                        {item.submenu && isActive && (
                                            <div className="mt-1 ml-4 border-l pl-4 space-y-1">
                                                {item.submenu.map((sub: SubMenuItem, subIdx: number) => (
                                                    <Button
                                                        key={subIdx}
                                                        asChild
                                                        variant={pathname === sub.path ? "secondary" : "ghost"}
                                                        className={cn(
                                                            "w-full justify-start h-8 px-3 text-sm font-normal",
                                                            pathname === sub.path && "text-primary bg-primary/5"
                                                        )}
                                                    >
                                                        <Link href={sub.path}>{sub.name}</Link>
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </ ScrollArea>
            <div className="border-t p-4">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-destructive"
                    onClick={() => signOut()}
                >
                    <LogOut className="mr-3 h-4 w-4" />
                    Çıkış Yap
                </Button>
            </div>
        </div>
    );
}
