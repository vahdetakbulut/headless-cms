import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Briefcase, MapPin, PenSquare, Inbox } from "lucide-react";

const stats = [
    { title: "Toplam Sayfa", value: "0", icon: FileText, color: "text-blue-500" },
    { title: "Toplam Hizmet", value: "0", icon: Briefcase, color: "text-green-500" },
    { title: "Toplam Blog", value: "0", icon: PenSquare, color: "text-purple-500" },
    { title: "Hizmet Bölgesi", value: "0", icon: MapPin, color: "text-orange-500" },
    { title: "Okunmamış Mesaj", value: "0", icon: Inbox, color: "text-red-500" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Gösterge Paneli</h1>
                <p className="text-muted-foreground">MedyaGem CMS paneline hoş geldiniz.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {stats.map((stat, idx) => (
                    <Card key={idx}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Son Eklenen Bloglar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Henüz blog yazısı eklenmemiş.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Son Mesajlar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Henüz mesaj bulunmuyor.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
